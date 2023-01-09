import React from 'react';
import styles from './ProductCard.module.scss';
import formatPrice from '../../utils/formatPrice';
import { ProductCardProps } from '../../types/components';

function ProductCard({ description, price, thumbnail, category, id, layout }: ProductCardProps) {
    const layoutType = layout === 'list' ? styles['card--vertical'] : '';
    return (
        <p className={`${styles.card} ${layoutType}`} data-id={id}>
            <img className={styles.card__thumbnail} src={thumbnail} alt="title" />
            <span className={styles.card__info}>
                <span className={styles.card__category}>{category}</span>
                <span className={styles.card__description}>{description.substring(0, 150)}...</span>
            </span>
            <span className={styles.card__footer}>
                <span className={styles.card__price}>{formatPrice(price)}</span>
                <button className={styles.card__btn} type="button">
                    Add to bag
                </button>
            </span>
        </p>
    );
}

export default ProductCard;
