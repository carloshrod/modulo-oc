import { useContext } from 'react';
import { PurchaseOrderContext } from '@/context/PurchaseOrderContext';

const usePurchaseOrderContext = () => useContext(PurchaseOrderContext);

export default usePurchaseOrderContext;
