export interface IAddContractData {
	projectId: string
	contract: {
		id: string
		address: string
		name: string
		abi: string
		code: string
	}
}