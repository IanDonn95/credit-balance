// formatters to render raw numbers using predefined patterns
export const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export const percentFormatter = Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
});