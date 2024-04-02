
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import { persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { projectsReducer } from './features/projects/projectsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { eventsReducer } from "./features/events/eventsSlice"
import { transactionsReducer } from "./features/transactions/transactionsSlice"

const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null)
		},
		setItem(_key: string, value: number) {
			return Promise.resolve(value)
		},
		removeItem() {
			return Promise.resolve()
		},
	}
}

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage()

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['events', 'transactions']
}

const rootReducer = combineReducers({
	projects: projectsReducer,
	events: eventsReducer,
	transactions: transactionsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector