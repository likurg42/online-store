const formatPrice = (value: number): string =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).format(Math.round(value * 0.94));

export default formatPrice;
