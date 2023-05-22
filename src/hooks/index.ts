
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch
} from 'react-redux';

import type { RootState, RippleDispatch } from '../store';

// TODO_YJS: export * from './useCollab';
export * from './useCollection';
export * from './useCondition';
export * from './useFieldComponent';
export * from './useNextPage';
export * from './usePageContext';
export * from './usePreviousPage';
export * from './useRipple';
export * from './useRippleContext';
export * from './useRippleField';
export * from './useRippleForm';

export const useRippleDispatch: () => RippleDispatch = useReduxDispatch;
export const useRippleSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
