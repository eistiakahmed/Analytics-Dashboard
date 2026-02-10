import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
// import type { RootState, AppDispatch } from './store';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
