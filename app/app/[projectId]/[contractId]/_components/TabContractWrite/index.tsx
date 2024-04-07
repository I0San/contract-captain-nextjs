import React, { useEffect, useState } from 'react'
import Setter from './Setter'
import { IContract } from '@/types/projects'

interface Props {
	chain: any
	contract: IContract
}

export default function TabContractWrite({ chain, contract }: Props) {
	const [setters, setSetters] = useState<any[]>([])

	useEffect(() => {
		if (contract?.abi) {
			try {
				const abi = JSON.parse(contract?.abi)
				let setters: any[] = []
				abi.forEach((f: any) => {
					if (f.type === "function") {
						if (f.stateMutability === "view") {
						} else {
							if (f?.inputs?.length > 0) {
								setters.push({ chain, ...f })
							} else {
								setters.unshift({ chain, ...f })
							}
						}
					}
				})
				setSetters(setters)
				// console.log('setters', setters)
			} catch (error) {
				console.log(error)
			}
		}
	}, [contract, chain])

	return (
		<div>
			{contract &&
				<dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{setters.map((s, i) =>
						<Setter 
							key={contract.id + s.name + i} 
							address={contract.address} 
							contractId={contract.id}
							setter={s} />
					)}
				</dl>
			}
		</div>
	)
}