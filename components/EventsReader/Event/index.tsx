"use client"
import { Address } from 'viem'
import { IContract } from '@/types/projects'
import { useWatchContractEvent, useAccount } from 'wagmi'
import { useAppDispatch } from '@/store/store'
import { addTransaction } from '@/store/features/transactions/transactionsSlice'
import { addEvent } from '@/store/features/events/eventsSlice'

interface Props {
	chainId: any
	contract: IContract
	event: any
}

export default function Event({ chainId, contract, event }: Props) {
	const dispatch = useAppDispatch()
	const { chain } = useAccount()

	useWatchContractEvent({
		address: contract?.address as Address,
		abi: contract?.abi as any,
		eventName: event?.name,
		chainId: chainId,
		onLogs(logs) {
      console.log('New logs!', logs)
    },
		// async onLogs(logs) {
		// 	try {
		// 		let _eventData: any = {}
		// 		event?.inputs.forEach((i: any, x: any) => { _eventData[i.name] = logs[x] })
		// 		_eventData['event'] = logs[logs.length - 1]
		// 		let _block = await _eventData['event'].getBlock()
		// 		_eventData['timestamp'] = _block.timestamp * 1000
		// 		_eventData['network'] = chain?.name
		// 		_eventData['chainId'] = chain?.id
		// 		let _tx = await _eventData['event'].getTransaction()
		// 		_tx['timestamp'] = _block.timestamp * 1000
		// 		_tx['network'] = chain?.name
		// 		_tx['chainId'] = chain?.id
		// 		dispatch(addEvent({ contractId: contract?.id, address: contract?.address, event: _eventData }))
		// 		// dispatch(addTransaction({ contractId: contract?.id, address: contract?.address, tx: _tx }))
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// }
	})
	return <></>
}