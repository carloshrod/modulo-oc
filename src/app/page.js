'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/orden-de-compra');
	}, []);

	return (
		<main style={{ padding: 16 }}>
			<h3>Home</h3>
		</main>
	);
}
