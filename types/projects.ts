export interface IProject {
  id: string
  name: string
  chain: number
  contracts: IContract[]
}

export interface IContract {
  id: string
  address: string
  name: string
  abi: string
  code: string
}

export interface IProjectContract {
  projectId: string
  contract: IContract
}

export interface IEvent {
  contractId: string
  address: string
  event: any
}

export interface ITransaction {
  contractId: string
  address: string
  tx: any
}