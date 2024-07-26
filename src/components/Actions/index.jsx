import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import useGlobalContext from '@/hooks/useGlobalContext';

export const Actions = ({ record }) => {
	const { showDrawer } = useGlobalContext();

	const notDisabled =
		record.oc_status === 'Rechazada' || record.oc_status === 'Borrador';

	return (
		<Space size='small'>
			<Tooltip title='Ver OC'>
				<Button
					type='text'
					icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
					onClick={() => showDrawer(record.oc_name)}
				/>
			</Tooltip>
			<Tooltip title={notDisabled ? 'Editar OC' : ''}>
				<Button
					type='text'
					icon={
						<TbPencilMinus
							size={20}
							color={notDisabled ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					disabled={!notDisabled}
				/>
			</Tooltip>
			<Tooltip title={notDisabled ? 'Eliminar OC' : ''}>
				<Button
					type='text'
					icon={
						<AiOutlineDelete
							size={20}
							color={notDisabled ? '#E53535' : '#FCBABA'}
						/>
					}
					disabled={!notDisabled}
				/>
			</Tooltip>
		</Space>
	);
};
