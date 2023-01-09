import React from 'react';
import { CartContextInterface, Product } from '../../types/contexts';
import useCartContext from '../../hooks/useCartContext';
import style from './SingleProduct.module.scss';
import formatPrice from '../../utils/formatPrice';
import ChangeAmount from '../ChangeAmount';

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
    const cartItem = cart.find((p) => p.id === id);
    return (
        <article className={style.singleProduct}>
            <h3 className={style.singleProduct__title}>
                {title}
                <span className={style.singleProduct__brand}>{brand}</span>
            </h3>

            <b className={style.singleProduct__price}>{formatPrice(price)}</b>
            <img className={style.singleProduct__thumbnail} src={thumbnail} alt={title} />
            <div className={style.singleProduct__images}>
                {images
                    .filter((_, i) => i > 0 && i < 4)
                    .map((img) => (
                        <img className={style.singleProduct__image} key={img} src={img} alt={title} />
                    ))}
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
            </div>
        </article>
    );
}
