/* import currency from 'currency.js';

export function formatMoney(amount: number|string|null): string {
	if (!amount) return '';

	return new currency(amount).format();
}

export function getCurrencySymbol() {
	return new currency(0, {pattern: '!'}).format();
} */

import currency from 'currency.js';

export function formatMoney(amount: number | string | null): string {
    if (!amount) return '';

    const customCurrency = currency(amount, {symbol: '₦'}); // Set the currency symbol to '€'
    return customCurrency.format();
}

export function getCurrencySymbol(): string {
    return '₦'; // Always return '€' as the currency symbol
}
