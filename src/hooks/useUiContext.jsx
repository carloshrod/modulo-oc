import { useContext } from 'react';
import { UiContext } from '@/context/UiContext';

const useUiContext = () => useContext(UiContext);

export default useUiContext;
