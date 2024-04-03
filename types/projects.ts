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