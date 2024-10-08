'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import {
	approver1,
	approver2,
	approver3,
	approver4,
	noApprover,
} from '@/context/users';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';

export default function Home() {
	const router = useRouter();
	const { loggedUser, setLoggedUser } = usePurchaseOrderContext();

	useEffect(() => {
		localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
	}, [loggedUser]);

	useEffect(() => {
		if (loggedUser?.id) {
			router.push('/orden-de-compra');
		}
	}, [loggedUser?.id]);

	return (
		<main
			style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}
		>
			<h3>Home</h3>
			<h3>Iniciar sesión como:</h3>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 300, fontWeight: 700 }}
				onClick={() => setLoggedUser(noApprover)}
			>
				Administrador - No Aprobador
			</Button>
			<h4 style={{ color: '#1677FF' }}>
				Usuarios aprobadores de la obra con ID 1 - OBRA SIN PERIODO TERMINO:
			</h4>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 300, fontWeight: 700 }}
				onClick={() => setLoggedUser(approver1)}
			>
				Usuario Obra - Aprobador 1
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 300, fontWeight: 700 }}
				onClick={() => setLoggedUser(approver2)}
			>
				Usuario Bodeguero - Aprobador 2
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 300, fontWeight: 700 }}
				onClick={() => setLoggedUser(approver3)}
			>
				Usuario Obra - Aprobador 3
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 300, fontWeight: 700 }}
				onClick={() => setLoggedUser(approver4)}
			>
				Administrador - Aprobador 4
			</Button>
		</main>
	);
}
