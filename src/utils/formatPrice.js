const formatPrice = (number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).format(Math.round(number * 0.94));

export default formatPrice;
