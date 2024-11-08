import { IContractTransaction, ITransaction } from "@/types/projects"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IAddTransaction {
	contractId: string
	address: string
	tx: ITransaction
}

const initialState: IContractTransaction[] = [
	// { contractId: 'nanoid', address: 'address', transactions: [] }
]

export const transactionsSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (state, action: PayloadAction<IAddTransaction>) => {
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