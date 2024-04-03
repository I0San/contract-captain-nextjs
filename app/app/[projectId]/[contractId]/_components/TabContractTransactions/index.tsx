import React from 'react'
import { IContract } from '@/types/projects'
import GridTransactions from './dataTable'

interface Props {
	contract: IContract
}

export default function TabContractTransactions({ contract }: Props) {
	return (
		<GridTransactions contract={contract} />
	)
}