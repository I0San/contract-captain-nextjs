import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { IProject, IProjectContract } from "@/types/projects"

const initialState: IProject[] = [
	{ id: 'IoSanX696IQBDnOmIs', name: 'Default', chain: 1, contracts: [] }
]

export const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		addProject: {
			reducer: (state, action: PayloadAction<any>) => {
				state.push(action.payload)
			},
			prepare: (val) => {
				const id = nanoid()
				return { payload: { id, ...val } }
			}
		},
		updateProjectName: (state, action: PayloadAction<any>) => {
			const { id, name } = action.payload
			const projectIndex = state.findIndex(p => p.id === id)
			state[projectIndex].name = name
		},
		updateProjectNetwork: (state, action: PayloadAction<any>) => {
			const { id, network } = action.payload
			const projectIndex = state.findIndex(p => p.id === id)
			state[projectIndex].chain = network
		},
		deleteProject: (state, action: PayloadAction<any>) => {
			const { id } = action.payload
			return state.filter(p => p.id !== id)
		},
		addContract: (state, action: PayloadAction<IProjectContract>) => {
			const { projectId, contract } = action.payload
			const projectIndex = state.findIndex(p => p.id === projectId)
			state[projectIndex].contracts.push(contract)
		},
		deleteContract: (state, action: PayloadAction<any>) => {
			const { projectId, contractId } = action.payload
			const projectIndex = state.findIndex(p => p.id === projectId)
			state[projectIndex].contracts = state[projectIndex].contracts.filter(c => c.id !== contractId)
		},
		updateContractName: (state, action: PayloadAction<any>) => {
			const { projectId, contractId, name } = action.payload
			const projectIndex = state.findIndex(p => p.id === projectId)
			const contractIndex = state[projectIndex].contracts.findIndex(c => c.id === contractId)
			state[projectIndex].contracts[contractIndex].name = name
		}
	}
})

export const { addProject, updateProjectName, updateProjectNetwork, deleteProject, addContract, deleteContract, updateContractName } = projectsSlice.actions
export const projectsReducer = projectsSlice.reducer