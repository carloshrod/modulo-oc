import { useContext } from 'react';
import { PurchaseOrderContext } from '@/context/purchase-order/PurchaseOrderContext';

const usePurchaseOrderContext = () => useContext(PurchaseOrderContext);

export default usePurchaseOrderContext;
