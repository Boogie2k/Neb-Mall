import {useCart} from '../../hooks/cart';
import {StarterWrapper} from 'boundless-checkout-react';
import {ICartItem} from 'boundless-api-client';
import {useRouter} from 'next/router';
import {apiClient} from '../../lib/api';
import {setCartTotal} from '../../redux/reducers/cart';
//import Loader from '../../components/Loader';
import logoImg from '../../assets/new-logo.png';/* logo image */
import Head from 'next/head';
import {useEffect, useRef, useState, useMemo} from 'react';


import {useAppDispatch} from '../../hooks/redux';
import {addPromise} from '../../redux/reducers/xhr';
import {calcTotal, calcTotalPrice} from '../../lib/calculator';
import checkStyles from '../../styles/Checkout.module.css';
import {usePaystackPayment} from 'react-paystack';
import Image from 'next/image';

export default function CheckoutPage() {
	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
   const [num, setNum] = useState('');
    const [city, setCity] = useState('');
  const [state, setState] = useState('');
   const [address, setAddress] = useState('');


	const dispatch = useAppDispatch();
	const {id: cartId} = useCart();
	const [items, setItems] = useState<ICartItem[]>([]);
	const [loading, setLoading] = useState(false);

	const getCartData = async (cartId: string) => {
		setLoading(true);

		const promise = apiClient.cart.getCartItems(cartId)
			.then(({cart, items}) => {
				setItems(items);
				dispatch(setCartTotal(cart.total));
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));

		dispatch(addPromise(promise));
	};

	const total = useMemo(() => calcTotal(items.map(el => ({
		qty: el.qty,
		price: calcTotalPrice(el.itemPrice.final_price!, el.qty)
	}))), [items]);

	useEffect(() => {
		dispatch(setCartTotal({
			qty: total.qty,
			total: total.price
		}));
	}, [total]); //eslint-disable-line

	useEffect(() => {
		if (cartId) getCartData(cartId);
	}, [cartId]); //eslint-disable-line


	//console.log(items)
	//console.log(total)
//items.map(item=>{
	
	//console.log(item.vwItem.product.sku)})


	const b = total.price;

 const newString = b.replace('₦', '');
	//const {id: cartId, cartInited} = useCart();
	const router = useRouter();
	//const checkoutStarter = useRef<StarterWrapper>();

//	const {total} = useCart();


	/* const checkoutRef = useCallback((node: HTMLDivElement) => {
		if (node && cartInited === TCartInited.yes && cartId) {
			checkoutStarter.current = startCheckout(node, {
				api: apiClient,
				cartId,
				onHide: (element: string) => {
					if (element === 'backToCart')
						router.push('/cart');
					else if (element === 'logo')
						router.push('/');
					else
						console.log('unknown element: ', element);
				},
				onThankYouPage: (data) => window.location.assign(`/thank-you/${data.orderId}`),
				basename: '/checkout',
				logoSrc: logoImg.src,
			});
		}
	}, [cartInited, cartId]);//eslint-disable-line
	useEffect(() => {
		return () => {
			if (checkoutStarter.current) {
				checkoutStarter.current.destroy();
			}
		};
	}, []);

	if (cartInited !== TCartInited.yes) {
		return <Loader />;
	} */

	


// console.log(+newString)


   const config = {
    reference: new Date().getTime().toString(),
    email: email,
    name: name,
    amount:+newString* 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    phoneNumber:num,
    publicKey: 'pk_test_d0725f67a2558608e3a5cb2d22d197d2eeb3cc5c',
  };
	
 const onSuccess = () => {

    
    // Implementation for whatever you want to do with reference and after success call.
   /*  alert(reference);
    console.log(reference); */
    alert('Order has been successful, You will receive an email few hours from now and your products will be delivered shortly ');
	router.push('/');
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

const initializePayment = usePaystackPayment(config);

 const concludeCheckout=()=>{
if(total){
    if(name&&email &&address&&num&&state&&city){
      initializePayment(onSuccess, onClose);}

    else {
   alert('please fill in all delivery and contact details')
    }}

	else{
		alert('Cart is empty');
	}
  };
	
	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
			</Head>
			 <div  style={{backgroundColor:'white'}}>
{/* 	<div style={{backgroundColor:'red'}} ref={checkoutRef}></div>  */}


<div className={checkStyles.contain}>
	
	<div className={checkStyles.checkoutNav}>
		<h4 onClick={()=>{router.push('/cart');}} className={checkStyles.checkoutBTC}>Back to Cart</h4> 
		<Image onClick={()=>{router.push('/');}} src={logoImg} alt='img' width={200} height={200}/>
	</div>
<div className={checkStyles.containRows}>
	
	<section>
<div  className={checkStyles.deliveryDetails}> 
	<h4 className={checkStyles.checkoutInputHeaders}> Contact Details</h4>

	<input   className={checkStyles.input} type='text' placeholder='Name'   value={name}
          onChange={(e) => {
            setName(e.target.value);
           }}/>
	<input  className={checkStyles.input} type="Email" placeholder='email'value={email}
          onChange={(e) => {
            setEmail(e.target.value);
           }}  />
	<input  value={num}
          onChange={(e) => {
            setNum(e.target.value);
           }} className={checkStyles.input} type='text' placeholder='Phone number'/>

</div>
<div className={checkStyles.deliveryDetails}> 
	<h4  className={checkStyles.checkoutInputHeaders}>Delievery Details</h4>

	<input className={checkStyles.input} type='text' placeholder='state' value={state}
          onChange={(e) => {
            setState(e.target.value);
           }}/>
	<input className={checkStyles.input} type='Email' placeholder='City ' value={city}
          onChange={(e) => {
            setCity(e.target.value);
           }}/>
	
	<input  className={checkStyles.input} type='text' placeholder='address' value={address}
          onChange={(e) => {
            setAddress(e.target.value);
           }}/>

</div>
</section>
<div className={checkStyles.orderDiv}>

<h4> Order</h4>
{  




items&& items.map(item=>{
	return(
		<div>
	<p className={checkStyles.productsNames}>  {item.vwItem.product.sku+ '  ' } <span style={{textAlign:'right'}}>{'₦'+ item.itemPrice.final_price}</span> </p>
</div>
);})}
<p style={{display:'flex', justifyContent:'space-between'}}> <span style={{fontWeight:'bold'}}>Total:</span> {total.price}</p>
</div>
</div>

<button onClick={concludeCheckout} className={checkStyles.checkoutBtn+ ' btn btn-action btn-lg btn-anim'}>Checkout</button>
</div>
			</div> 
		</>
	);
}