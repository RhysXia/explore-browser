import { useMemo } from 'react'
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import slice, { initialState } from './store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const createStore = (preloadedState: object) => {
  return configureStore({
    reducer: slice.reducer,
    preloadedState: {
      ...initialState,
      ...preloadedState,
    },
  })
}

export type AppStore = ReturnType<typeof createStore>


let store: AppStore | undefined

export const getReduxStore = (preloadedState: object = {}) => {
  let _store = store
  if(_store) {
    if (preloadedState && _store) {
      _store = createStore({
        ..._store.getState(),
        ...preloadedState,
      })
    }
  } else {
    _store = createStore(preloadedState)
  }

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store


  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState: object) => {
  const store = useMemo(() => getReduxStore(initialState), [initialState])
  return store
}


export type AppState = ReturnType<AppStore['getState']>

export const useAppDispatch = () => useDispatch<AppStore['dispatch']>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  unknown,
  AnyAction
>
