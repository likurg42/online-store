import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './PaymentModal.module.scss';
import visa from './assets/visa.png';
import ms from './assets/mastercard.png';
import unionpay from './assets/unionpay.png';
import useCartContext from '../../hooks/useCartContext';
import { CartContextInterface } from '../../types/contexts';

type FormFields = {
    email: HTMLInputElement;
    name: HTMLInputElement;
    phone: HTMLInputElement;
    address: HTMLInputElement;
};

// type PaymentFormFields = {
//     email: string;
//     name: string;
//     phone: string;
//     address: string;
// };

export default function PaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { clearCart } = useCartContext() as CartContextInterface;
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cardImage, setCardImage] = useState('');
    const [state, setState] = useState({
        email: '',
        name: '',
        address: '',
        phone: '',
        card: '',
        expirationDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({
        email: false,
        name: false,
        address: false,
        phone: false,
        card: false,
        expirationDate: false,
        cvv: false,
    });

    useEffect(() => {
        setOpenModal(open);
    }, [state, open]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (e) => {
        e.preventDefault();
        const { email, name, phone, address, expirationDate, card, cvv } = state;
        let isCheckSuccess = true;

        if (address.split(' ').length < 3 || address.split(' ').filter((n) => n.length < 5).length > 0) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                address: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                address: false,
            }));
        }

        if (name.split(' ').length < 2 || name.split(' ').filter((n) => n.length < 3).length > 0) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                name: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                name: false,
            }));
        }

        if (!phone.match(/^\+(\D*\d){9,}/)) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                phone: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                phone: false,
            }));
        }

        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                email: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                email: false,
            }));
        }

        if (parseInt(expirationDate.split('/')[0], 10) > 12 || parseInt(expirationDate.split('/')[1], 10) > 32) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                expirationDate: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                expirationDate: false,
            }));
        }
        if (card.length !== 16) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                card: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                card: false,
            }));
        }
        if (cvv.length > 3) {
            isCheckSuccess = false;

            setErrors((prev) => ({
                ...prev,
                cvv: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                cvv: false,
            }));
        }

        if (isCheckSuccess) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
                clearCart();
            }, 5000);
        }
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === 'phone') {
            const lastCharachter: string = value.split('').at(-1) || '';
            if (value.split('')[0] !== '+') newValue = state[name];
            if (value.split('').length > 1 && !lastCharachter.match(/^\d$/)) newValue = state[name];
            if (lastCharachter === '') newValue = value;
        }

        if (name === 'expirationDate') {
            const lastCharachter: string = value.split('').at(-1) || '';
            if (!lastCharachter.match(/^\d$/)) newValue = state[name];
            if (!value.includes('/') && value.length >= 2) {
                const valueTemp = newValue.split('');
                valueTemp.splice(2, 0, '/');
                newValue = valueTemp.join('');
            }
            if (value.includes('/') && value.length === 3) newValue = value.split('/').join('');
            if (value.length > 5) newValue = state[name];
            if (lastCharachter === '') newValue = value;
        }

        if (name === 'cvv') {
            const lastCharachter: string = value.split('').at(-1) || '';
            if (value.length > 3 || !lastCharachter.match(/[0-9]+/)) newValue = state[name];
            if (lastCharachter === '') newValue = value;
        }

        if (name === 'card') {
            const lastCharachter: string = value.split('').at(-1) || '';
            if (value.length > 16 || !lastCharachter.match(/[0-9]+/)) newValue = state[name];
            if (lastCharachter === '') {
                setCardImage('');
                newValue = value;
            }

            if (newValue.startsWith('2')) setCardImage(visa);
            if (newValue.startsWith('5')) setCardImage(ms);
            if (newValue.startsWith('6')) setCardImage(unionpay);
        }

        setState((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const modalClass = openModal ? `${cl.modal} ${cl['modal--open']}` : cl.modal;

    if (success) {
        return (
            <div className={modalClass}>
                <div className={`${cl.modal__content} ${cl['modal__content--success']}`}>
                    <h1>Thanks for your purchase</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={modalClass}>
            <form className={cl.modal__content} onSubmit={handleSubmit}>
                <button
                    className={cl.modal__closeButton}
                    type="button"
                    onClick={() => {
                        setOpenModal(false);
                        onClose();
                    }}
                >
                    Close
                </button>
                <h2 className={cl.modal__title}>Personal details </h2>
                <input
                    className={errors.name ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                    onChange={onChange}
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                />
                <span className={cl.modal__error}>{errors.name ? 'Invalid Name' : null}</span>

                <input
                    className={errors.phone ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                    name="phone"
                    type="text"
                    inputMode="decimal"
                    placeholder="Phone number"
                    required
                    onChange={onChange}
                    value={state.phone}
                />
                <span className={cl.modal__error}>{errors.phone ? 'Invalid Phone' : null}</span>

                <input
                    className={errors.address ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                    name="address"
                    type="text"
                    placeholder="Delivery address"
                    required
                    onChange={onChange}
                />
                <span className={cl.modal__error}>{errors.address ? 'Invalid Address' : null}</span>

                <input
                    className={errors.email ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                    name="email"
                    type="text"
                    placeholder="E-mail"
                    required
                    onChange={onChange}
                />
                <span className={cl.modal__error}>{errors.email ? 'Invalid Email' : null}</span>
                <span className={cl.modal__expDateLayout}>
                    <input
                        className={errors.card ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                        name="card"
                        type="text"
                        pattern="[0-9]+"
                        placeholder="Card"
                        required
                        onChange={onChange}
                        value={state.card}
                    />
                    <img
                        className={
                            cardImage !== '' ? cl.modal__card : [cl.modal__card, cl.modal__card_hidden].join(' ')
                        }
                        src={cardImage}
                        alt="card preview"
                    />
                </span>
                <span className={cl.modal__error}>{errors.card ? 'Invalid Card' : null}</span>
                <div className={cl.modal__splitLayout}>
                    <input
                        className={errors.cvv ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input}
                        name="cvv"
                        type="text"
                        placeholder="CVV"
                        pattern="[0-9]+"
                        required
                        onChange={onChange}
                        value={state.cvv}
                    />
                    <span className={cl.modal__error}>{errors.cvv ? 'Invalid CVV' : null}</span>

                    <input
                        className={
                            errors.expirationDate ? `${cl.modal__input} ${cl['modal__input--error']}` : cl.modal__input
                        }
                        name="expirationDate"
                        type="text"
                        placeholder="Expiration Date"
                        required
                        onChange={onChange}
                        value={state.expirationDate}
                    />

                    <span className={cl.modal__error}>{errors.expirationDate ? 'Invalid Date' : null}</span>
                </div>
                <button className={cl.modal__payButton} type="submit">
                    Pay
                </button>
            </form>
        </div>
    );
}
