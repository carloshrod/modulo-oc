import { useContext } from 'react';
import { OcContext } from '@/context/OC/OcContext';

const useOcContext = () => useContext(OcContext);

export default useOcContext;
