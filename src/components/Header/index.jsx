import { Layout } from 'antd';
import { BiSolidChart, BiSolidUser } from 'react-icons/bi';
import { PiBuildingsFill } from 'react-icons/pi';
import styles from './Header.module.css';

const { Header } = Layout;

const CustomHeader = () => {
	const obra = 'XXX Calle Santa Julia';

	return (
		<Header style={{ backgroundColor: 'transparent', padding: '0px 16px' }}>
			<div className={styles.header}>
				<h3>
					Orden de compra <span>{obra}</span>
				</h3>
				<section className={styles.info}>
					<BiSolidChart size={16} />
					<span>
						<PiBuildingsFill size={16} />
						Contructora Ejemplo
					</span>
					<span>
						<BiSolidUser size={16} />
						Nombre Apellido
					</span>
					<span>12 Ene 2023 17:38</span>
				</section>
			</div>
		</Header>
	);
};

export default CustomHeader;
