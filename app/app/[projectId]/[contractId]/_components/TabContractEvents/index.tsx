import { IContract } from '@/types/projects'
import { GridEvents } from './dataTable'

interface Props {
	contract: IContract
}

export default function TabContractEvents({ contract }: Props) {
	return (
		<GridEvents contract={contract} />
	)
}