import { useEffect, useState } from 'react'
import { IContract } from '@/types/projects'
import Getter from './Getter'

interface Props {
	chain: number
	contract: IContract
}

export default function TabContractRead({ chain, contract }: Props) {
	const [getters, setGetters] = useState<any[]>([])

	useEffect(() => {
		if (contract?.abi) {
			try {
				const abi = JSON.parse(contract?.abi)
				let getters: any[] = []
				abi.forEach((f: any) => {
					if (f.type === "function") {
						if (f.stateMutability === "view") {
							if (f?.inputs?.length > 0) {
								getters.push({ chain, ...f })
							} else {
								getters.unshift({ chain, ...f })
							}
						}
					}
				})
				setGetters(getters)
				console.log('getters', getters)
			} catch (error) {
				console.log(error)
			}
		}
	}, [contract, chain])

	return (
		<div>
			{contract &&
				<dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{getters.map((g, i) => {
						return (
							<Getter key={contract.id + g.name + i} address={contract.address} getter={g} />
						)
					})}
				</dl>
			}
		</div>
	)
}