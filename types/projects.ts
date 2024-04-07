import { Address } from "viem"

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

export interface IContractTransaction {
  contractId: string
  address: string
  transactions: ITransaction[]
}

export interface ITransaction {
  blockNumber: BigInt
  timestamp: BigInt
  txHash: string
  from: Address
  to: Address | null
  gasPrice?: BigInt
  value?: BigInt
}