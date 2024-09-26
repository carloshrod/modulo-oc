import { Empty } from 'antd';

const CustomEmpty = ({ itemName = 'datos' }) => {
	return (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={<p>{`No hay ${itemName} para mostrar`}</p>}
		/>
	);
};

export default CustomEmpty;
