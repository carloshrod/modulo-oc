import { useContext } from 'react';
import { GlobalContext } from '@/context/global/GlobalContext';

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
