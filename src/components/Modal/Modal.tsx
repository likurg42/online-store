import React from 'react';
import cl from './Modal.module.scss';

export default function Modal() {
    return (
        <div className={cl.modal}>
            <form className={cl.modal__content}>
                <h2>Personal details </h2>
                <input type="text" placeholder="Name" />
                <input type="phone" placeholder="Phone number" />
                <input type="text" placeholder="Delivery address" />
                <input type="email" placeholder="E-mail" />
            </form>
        </div>
    );
}
