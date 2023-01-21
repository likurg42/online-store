import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import formatPrice from '../../utils/formatPrice';
import { ProductCardProps } from '../../types/components';
import useCartContext from '../../hooks/useCartContext';
import { CartContextInterface, Product } from '../../types/contexts';

function ProductCard({
    title,
    stock,
    description,
    price,
    thumbnail,
    category,
    id,
    layout,
    rating,
    brand,
    images,
}: ProductCardProps) {
    const { cart, addToCart, removeFromCart } = useCartContext() as CartContextInterface;
    const layoutType = layout === 'list' ? styles['card--vertical'] : '';

    const product: Product = {
        title,
        stock,
        price,
        thumbnail,
        id,
        description,
        rating,
        brand,
        images,
        category,
    };

    const cartItem = cart.find((item) => item.id === id);

    return (
        <Link className={styles.card__link} to={`/product/${id}`}>
            <p className={`${styles.card} ${layoutType}`} data-id={id}>
                <img className={styles.card__thumbnail} src={thumbnail} alt="title" />
                <span className={styles.card__info}>
                    <span className={styles.card__category}>{category}</span>
                    <span className={styles.card__description}>{description.substring(0, 150)}...</span>
                </span>
                <span className={styles.card__footer}>
                    <span className={styles.card__price}>{formatPrice(price)}</span>
                    <button
                        className={styles.card__btn}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (cartItem) {
                                removeFromCart(id);
                            } else {
                                addToCart(id, 1, product);
                            }
                        }}
                    >
                        {cartItem ? 'Remove' : 'Add to bag'}
                    </button>
                </span>
            </p>
        </Link>
    );
}

export default ProductCard;
