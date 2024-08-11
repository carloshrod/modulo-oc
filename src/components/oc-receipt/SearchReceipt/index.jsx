import { Button } from 'antd';
import { IoAdd } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import LayoutIcon from '../LayoutIcon';
import useOcContext from '@/hooks/useOcContext';
import styles from './SearchReceipt.module.css';
import InfoReceiptOC from '../InfoReceiptOC';
import { useRouter, usePathname } from 'next/navigation';
import SearchInput from '@/components/forms/SearchInput';

const SearchReceipt = ({ handleShow }) => {
	const { purchaseOrder, getPurchaseOrder } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	const handleGoBack = () => {
		getPurchaseOrder(undefined);
		handleShow();
	};

	return (
		<section className={styles.mainContainer}>
			<div className={styles.toolbar}>
				<SearchInput />
				<Button
					type='primary'
					ghost
					icon={<BiArrowBack size={20} />}
					iconPosition='start'
					size='large'
					onClick={handleGoBack}
				>
					Volver a tabla
				</Button>
			</div>
			{purchaseOrder?.oc_number ? (
				<InfoReceiptOC purchaseOrder={purchaseOrder} />
			) : (
				<section className={styles.receiptOcContainer}>
					<div>
						<LayoutIcon />
						<p>
							Busca una OC para ver el Detalle de Recepción o recibe una OC:
						</p>
						<Button
							type='primary'
							size='large'
							icon={<IoAdd size={30} />}
							onClick={() => router.push(`${pathname}/recibir-oc`)}
						>
							Recibir OC
						</Button>
					</div>
				</section>
			)}
		</section>
	);
};

export default SearchReceipt;
