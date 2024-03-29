import {formatMoney,getCurrencySymbol} from '../../lib/formatter';
import Link from 'next/link';
import {useCart} from '../../hooks/cart';
import clsx from 'clsx';
import {ReactNode} from 'react';

export default function HeaderCart({className, icon}: {className?: string, icon?: ReactNode}) {
	const {total} = useCart();
	const isEmpty = !total || !total.qty;
	const isDoubleQty = (total?.qty && total?.qty > 9) ? true : false;
//console.log(total)

	const customSymbol = getCurrencySymbol(); // It will always be '€'
console.log(customSymbol); // This will display '€' as the currency symbol

const formattedAmount = formatMoney(1000); // Format 1000 with '€' symbol
console.log(formattedAmount); // This will display the formatted amount with '€' as the currency symbol
	return (
		<Link href={'/cart'}>
			<a className={clsx('cart-header', {
				'cart-header_empty': isEmpty,
				'cart-header_active': !isEmpty
			}, className)}>
				{icon ? icon : <span className={'cart-header__icon'} />}
				<b className={clsx('cart-header__qty', {
					'cart-header__qty_double': isDoubleQty
				})}>{total?.qty ?? 0}</b>
				<div className={'cart-header__total'}>{formatMoney(total?.total || 0)}</div>
			</a>
		</Link>
	);
}