import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import UiProvider from '@/context/ui/UiContext';
import PurchaseOrderProvider from '@/context/purchase-order/PurchaseOrderContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<UiProvider>
				<PurchaseOrderProvider>
					<body className={inter.className}>
						<AntdRegistry>{children}</AntdRegistry>
					</body>
				</PurchaseOrderProvider>
			</UiProvider>
		</html>
	);
}
