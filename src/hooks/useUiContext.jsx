import { useContext } from 'react';
import { UiContext } from '@/context/ui/UiContext';

const useUiContext = () => useContext(UiContext);

export default useUiContext;
