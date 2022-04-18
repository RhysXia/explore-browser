import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSlice, { initialState as rootInitialState, State as RootState } from './rootSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { isServer } from '../../utils/env';

export type InitialState = { root: RootState };

export type PreloadState = {
  [key in keyof InitialState]?: Partial<InitialState[key]>;
};

const createStore = (preloadedState: PreloadState) => {
  const initialState: InitialState = {
    root: rootInitialState,
  };

  return configureStore({
    reducer: {
      root: rootSlice.reducer,
    },
    preloadedState: shadowMerge(initialState, preloadedState),
  });
};

export type AppStore = ReturnType<typeof createStore>;

let store: AppStore | undefined;

export const getReduxStore = (preloadedState?: PreloadState) => {
  let _store = store;
  if (_store) {
    if (preloadedState) {
      _store = createStore({
        ..._store.getState(),
        ...preloadedState,
      });
    }
  } else {
    _store = createStore(preloadedState || {});
  }

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store

  // For SSG and SSR always create a new store
  if (isServer) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useReduxStore = (preloadedState?: PreloadState) => {
  if (store) {
    return store;
  }
  return getReduxStore(preloadedState);
};

export type AppState = ReturnType<AppStore['getState']>;

export const useAppDispatch = () => useDispatch<AppStore['dispatch']>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppThunk<R = void> = ThunkAction<R, AppState, unknown, AnyAction>;

const shadowMerge = (initialState: InitialState, preloadState: PreloadState) => {
  const result = {} as InitialState;

  (Object.keys(initialState) as Array<keyof InitialState>).forEach((key) => {
    result[key] = {
      ...initialState[key],
      ...(preloadState[key] || {}),
    };
  });

  return result;
};
