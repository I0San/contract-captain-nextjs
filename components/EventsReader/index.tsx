'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import Event from './Event'


export default function EventsReader() {
	const projects = useAppSelector((state) => state.projects)
	const [events, setEvents] = useState<any[]>([])

	useEffect(() => {
		let _events: any[] = []
		projects?.forEach(project => {
			project.contracts?.forEach(contract => {
				if (contract.abi) {
					try {
						const abi = JSON.parse(contract?.abi)
						abi.forEach((f: any) => {
							if (f.type === "event") {
								_events.push({ chainId: project.chain, contract: contract, event: f })
							}
						})
					} catch (error) {
						console.log(error)
					}
				}
			})
		})
		setEvents(_events)
	}, [projects])

	return (
		<>
			{events.length > 0 &&
				<>
					{events?.map((e, i) => {
						if (e.chainId && e.contract && e.event) {
							return (<Event key={i} chainId={e.chainId} contract={e.contract} event={e.event} />)
						}
					})}
				</>
			}
		</>
	)
}