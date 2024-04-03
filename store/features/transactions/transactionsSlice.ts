import { ITransaction } from "@/types/projects"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface TransactionsSliceState {
	contractId: string
	address: string
	transactions: ITransaction[]
}

const initialState: TransactionsSliceState[] = [
	// { contractId: 'nanoid', address: 'address', transactions: [] }
]

export const transactionsSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (state, action: PayloadAction<ITransaction>) => {
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