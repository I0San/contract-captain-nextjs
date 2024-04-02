import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IActionAddTransaction {
	contractId: string
	address: string
	tx: any
}

export interface TransactionsSliceState {
	contractId: string
	address: string
	transactions: any[]
}

const initialState: TransactionsSliceState[] = [
	// { contractId: 'nanoid', address: 'address', transactions: [] }
]

export const transactionsSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (state, action: PayloadAction<IActionAddTransaction>) => {
			const { contractId, address, tx } = action.payload
			const contractIndex = state.findIndex(c => c.contractId === contractId)
			if (contractIndex === -1) {
				state.push({ contractId, address, transactions: [tx] })
			} else {
				state[contractIndex].transactions.push(tx)
			}
		}
	}
})

export const { addTransaction } = transactionsSlice.actions
export const transactionsReducer = transactionsSlice.reducer