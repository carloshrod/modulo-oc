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
} from '@/context/ui/users';
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
			<h4>Iniciar sesión como:</h4>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 130 }}
				onClick={() => setLoggedUser(noApprover)}
			>
				No Aprobador
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 130 }}
				onClick={() => setLoggedUser(approver1)}
			>
				Aprobador 1
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 130 }}
				onClick={() => setLoggedUser(approver2)}
			>
				Aprobador 2
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 130 }}
				onClick={() => setLoggedUser(approver3)}
			>
				Aprobador 3
			</Button>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ width: 130 }}
				onClick={() => setLoggedUser(approver4)}
			>
				Aprobador 4
			</Button>
		</main>
	);
}
