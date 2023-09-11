import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
import {IMenuItem} from '../@types/components';
import MainLayout from '../layouts/Main';

export default function ShippingPage({mainMenu, footerMenu}: IPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className={'container-xxl'}>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>About</h1>
				<div className='text-container'>
					<p>
					Welcome to NebTech, where our commitment to secure and convenient online shopping defines our mission. We understand the importance of trust and flexibility, and that's why we offer a pay-on-delivery service, putting you in control of your shopping experience. With a focus on security, we ensure you don't have to share your payment information online, providing peace of mind. Our process is simple: browse our diverse product selection, place your order, and pay only when your items arrive at your doorstep, allowing you to inspect and approve your purchase. We take pride in our reputation for reliability and trustworthiness, consistently delivering orders promptly and accurately. Our dedication to quality and transparency ensures that you receive high-quality products, and if you have any concerns, our responsive customer support team is ready to assist. We value your feedback and inquiries, and we're always here to help. Thank you for choosing NebTech as your trusted online shopping partner, and we look forward to serving you with the utmost satisfaction through our pay-on-delivery service.
					</p>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			...menus
		}
	};
};

interface IPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}