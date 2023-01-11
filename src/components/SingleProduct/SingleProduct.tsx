import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContextInterface, Product } from '../../types/contexts';
import useCartContext from '../../hooks/useCartContext';
import style from './SingleProduct.module.scss';
import formatPrice from '../../utils/formatPrice';
import ChangeAmount from '../ChangeAmount';
import PaymentModal from '../PaymentModal';

export default function SingleProduct({
    title,
    brand,
    category,
    description,
    id,
    images,
    price,
    thumbnail,
    stock,
    rating,
}: Product) {
    const { cart, addToCart, removeFromCart } = useCartContext() as CartContextInterface;
    const product: Product = { title, brand, category, description, id, images, price, thumbnail, stock, rating };
    const navigate = useNavigate();
    const cartItem = cart.find((p) => p.id === id);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refs = useRef<HTMLLIElement[]>([]);
    refs.current = [];

    const addListItemsRefs = (el: HTMLLIElement) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };
    const hoverHander = (image: string, i: number) => {
        setCurrentImage(image);
        refs.current.forEach((el) => el.classList.remove(style['singleProduct__imageWrapper--active']));
        refs.current[i].classList.add(style['singleProduct__imageWrapper--active']);
    };

    return (
        <article className={style.singleProduct}>
            <h3 className={style.singleProduct__title}>
                {title}
                <span className={style.singleProduct__brand}>{brand}</span>
                <span className={style.singleProduct__brand}>{category}</span>
            </h3>

            <b className={style.singleProduct__price}>{formatPrice(price)}</b>
            <div className={style.singleProduct__imagesLayout}>
                <ul className={style.singleProduct__images}>
                    {images.map((img, i) => (
                        <li
                            key={img}
                            className={
                                i === 0
                                    ? [
                                          style.singleProduct__imageWrapper,
                                          style['singleProduct__imageWrapper--active'],
                                      ].join(' ')
                                    : style.singleProduct__imageWrapper
                            }
                            onMouseEnter={() => {
                                hoverHander(img, i);
                            }}
                            ref={addListItemsRefs}
                        >
                            <img className={style.singleProduct__image} key={img} src={img} alt={title} />
                        </li>
                    ))}
                </ul>
                <img className={style.singleProduct__thumbnail} src={currentImage} alt={title} />
            </div>

            <p className={style.singleProduct__description}>{description}</p>
            <div className={style.singleProduct__buttonsLayout}>
                <ChangeAmount id={id} />
                <button
                    className={style.singleProduct__btn}
                    type="button"
                    onClick={() => {
                        if (cartItem) removeFromCart(id);
                        else addToCart(id, 1, product);
                    }}
                >
                    {cartItem ? 'Remove' : 'Add to bag'}
                </button>
                <button
                    className={style.singleProduct__btn}
                    type="button"
                    onClick={() => {
                        if (!cartItem) {
                            addToCart(id, 1, product);
                            navigate('/cart', { state: { open: true } });
                        } else {
                            setIsModalOpen(true);
                        }
                    }}
                >
                    Buy now
                </button>
            </div>
            <PaymentModal
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
        </article>
    );
}
