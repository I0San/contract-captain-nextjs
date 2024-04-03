import { IEvent } from "@/types/projects"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface EventsSliceState {
	contractId: string
	address: string
	events: IEvent[]
}

const initialState: EventsSliceState[] = [
	// { contractId: 'nanoid', address: 'address', events: [] }
]

export const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<IEvent>) => {
			const { contractId, address, event } = action.payload
			const contractIndex = state.findIndex(c => c.contractId === contractId)
			if (contractIndex === -1) {
				state.push({ contractId, address, events: [event] })
				// state = [...state, { contract, events: [event] }]
			} else {
				state[contractIndex].events.push(event)
				//state[contractIndex].events = [event, ...state.list[contractIndex].events]
			}
		}
	}
})

export const { addEvent } = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer