import { createContext, useReducer } from 'react';
import { siteInitialState, siteStateReducerFunction } from '@/lib/reducer/SiteStateReducer';

export const StoreContext = createContext(null);

export function StoreProvider({ data, children }) {
  const [siteState, siteStateDispatch] = useReducer(siteStateReducerFunction, siteInitialState(data));
  return (
    <StoreContext.Provider
      value={{
        data,
        siteState,
        siteStateDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
