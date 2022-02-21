import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store as s } from './store';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = s;
