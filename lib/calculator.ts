/* import currency from 'currency.js';


export const calcTotal = (items: ICalcTotalItem[]) => {
	let totalQty = 0;
	let totalPrice = currency(0);

	for (const {qty, price} of items) {
		totalQty += qty;
		totalPrice = currency(totalPrice).add(price);
	}
	return {
		qty: totalQty,
		price: totalPrice.format()
	};
};

export const calcFinalPrice = (basicPrice: string|number, discountAmount:number|string|null = null, discountPercent:number|string|null = null) => {
	let finalPrice = currency(basicPrice);

	if (discountPercent) {
		const multiply = currency(1).subtract(currency(discountPercent,{fromCents: true}));
		finalPrice = finalPrice.multiply(multiply);
	}

	if (discountAmount) {
		finalPrice = finalPrice.subtract(discountAmount);
	}

	return finalPrice;
};

export const calcTotalPrice = (finalPrice: number|string, qty: number) => {
	return currency(finalPrice).multiply(qty * 1).format();
};

interface ICalcTotalItem {
	qty: number;
	price: string|number;
} */

import currency from 'currency.js';

export const calcTotal = (items: ICalcTotalItem[]) => {
    let totalQty = 0;
    let totalPrice = currency(0, {symbol: '₦'}); // Set the currency symbol to '₦'

    for (const {qty, price} of items) {
        totalQty += qty;
        totalPrice = totalPrice.add(price);
    }
    
    return {
        qty: totalQty,
        price: totalPrice.format()
    };
};

export const calcFinalPrice = (basicPrice: string | number, discountAmount: number | string | null = null, discountPercent: number | string | null = null) => {
    let finalPrice = currency(basicPrice, {symbol: '₦'}); // Set the currency symbol to '₦'

    if (discountPercent) {
        const multiply = currency(1).subtract(currency(discountPercent, {fromCents: true}));
        finalPrice = finalPrice.multiply(multiply);
    }

    if (discountAmount) {
        finalPrice = finalPrice.subtract(discountAmount);
    }

    return finalPrice;
};

export const calcTotalPrice = (finalPrice: number | string, qty: number) => {
    return currency(finalPrice, {symbol: '₦'}).multiply(qty * 1).format(); // Set the currency symbol to '₦'
};

interface ICalcTotalItem {
    qty: number;
    price: string | number;
}
