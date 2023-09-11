import MainLayout from '../layouts/Main';
import {IMenuItem} from '../@types/components';
import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';

export default function ShippingPage({mainMenu, footerMenu}: IShippingPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className={'container-xxl'}>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Shipping</h1>
				<div className='text-container'>
					<p>
						

At NebTech, we are committed to providing you with a seamless shopping experience, 
especially when it comes to the delivery of your orders. Our pay-on-delivery service ensures that you can shop with confidence and pay only when you receive your items. Here's what you need to know about our shipping policy:
					</p>
					<h1>Delivery Process</h1>
					<p>
						When you place an order with us, our team works diligently to process and prepare your items for shipment. We aim to dispatch your order as quickly as possible.
					</p>
					<p>
					Our trusted delivery partners will then pick up your package and deliver it to your doorstep. You can expect a hassle-free delivery experience, and our delivery personnel will be happy to assist you.
					</p>
					<h1>Payment Options</h1>
					<p>
					With our pay-on-delivery option, you have the flexibility to pay for your order when it arrives at your location. We accept cash payments for your convenience. Please have the exact amount ready to ensure a smooth transaction.
					</p>
					<p>
					We do not require any prepayment or credit card information when you place your order, making it a secure and convenient payment method.
					</p>
					<h1>Shipping Fee</h1>
					<p>
					NebTech offers competitive shipping rates to make your shopping experience even more budget-friendly. You can find detailed information about shipping fees during the checkout process.
					</p>
					<h1>Delivery Timeframes</h1>
					<p>
						We understand that timely delivery is essential. Our team works diligently to ensure your order reaches you within the estimated delivery timeframe. Delivery times may vary depending on your location and the availability of the items you've ordered.
					</p>
					<p>
						You can track the status of your order using our online tracking system. We'll provide you with the necessary information to keep you informed about your delivery.
					</p>
					<h1>Returns and Exchanges</h1>
					<p>
						In the rare event that you encounter any issues with your order, our customer support team is here to assist you. We have a hassle-free return and exchange policy in place to ensure your satisfaction.
					</p>
					<h1>Contact Us</h1>
					<p>
						If you have any questions or need further assistance regarding our shipping policy or any other aspect of your shopping experience, please don't hesitate to contact our customer support team. We are here to help you.
					</p>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IShippingPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			...menus
		}
	};
};

interface IShippingPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}