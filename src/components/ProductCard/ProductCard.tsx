import React from 'react';
import PropTypes from 'prop-types';
import cn from './ProductCard.module.scss';
import formatPrice from '../../utils/formatPrice';
import { ProductCardProps } from '../../types/components';

function ProductCard({ description, price, thumbnail, category, id }: ProductCardProps) {
    console.log(`${id} text`);
    console.log('second test');
    return (
        <p className={cn.card}>
            <img className={cn.card__thumbnail} src={thumbnail} alt="title" />
            <span className={cn.card__category}>{category}</span>
            <span className={cn.card__description}>{description.substring(0, 150)}...</span>
            <span className={cn.card__footer}>
                <span className={cn.card__price}>{formatPrice(price)}</span>
                <button className={cn.card__btn} type="button">
                    Add to bag
                </button>
            </span>
        </p>
    );
}
ProductCard.propTypes = {
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default ProductCard;
