import React from 'react';
import { Link } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import { BreadcrumbsProps } from '../../types/components';

export default function Breadcrumbs({ title }: BreadcrumbsProps) {
    return (
        <div className={style.breadcrumbs}>
            <Link className={style.breadcrumbs__link} to="/">
                Catalog
            </Link>
            <span className={style.breadcrumbs__current}>{title}</span>
        </div>
    );
}
