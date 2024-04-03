import { ChangeEvent, useEffect, useState } from 'react'
import { useModal } from 'connectkit'
// import { toast } from 'react-hot-toast'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useSwitchChain, useAccount } from 'wagmi'

interface Props {
	address: string
	setter: any
}

export default function Setter({ address, setter }: Props) {
	const modal = useModal()
	const { isConnected, chain } = useAccount()
	const { switchChain } = useSwitchChain()
	const [view, setView] = useState({})
	const [inputs, setInputs] = useState<any[]>([])
	const [args, setArgs] = useState<any[]>([])
	const [mustSwitchNetwork, setMustSwitchNetwork] = useState(false)

	useEffect(() => {
		if (!chain || !setter) { return }
		if (chain?.id === parseInt(setter?.chain)) {
			setMustSwitchNetwork(false)
		}
	}, [chain, setter])

	// TODO - Rewrite this with Wagmi 2.x
	// const { config } = usePrepareContractWrite({
	// 	...view,
	// 	chainId: setter?.chain ? parseInt(setter.chain) : 1,
	// 	onError(error: any) {
	// 		if (error?.name === 'ChainMismatchError') {
	// 			setMustSwitchNetwork(true)
	// 		} else {
	// 			// console.log(setter.name + '::onError', error)
	// 			toast(error?.reason.replace('execution reverted: ', '') || error?.reason, toastError)
	// 		}
	// 	}
	// })

	// TODO - Rewrite this with Wagmi 2.x
	const data: any[] | string = []
	// const { write, data } = useContractWrite({
	// 	...config,
	// 	onSuccess(data: any) {
	// 		console.log(setter.name + '::onSuccess', data)
	// 		toast(setter.name + ' success!', toastSuccess)
	// 	},
	// 	onError(error: any) {
	// 		console.log(setter.name + '::onError', error)
	// 		toast(error?.message, toastError)
	// 	}
	// })

	useEffect(() => {
		if (!address || !setter) return
		if (setter?.inputs?.length === 0) {
			setView({
				address: address,
				abi: [setter],
				functionName: setter.name,
				args: [],
				enabled: true,
				// chainId: setter.chain
			})
		} else {
			let _inputs: any[] = []
			let _args: any[] = []
			setter.inputs.forEach((i: any) => {
				_inputs.push(i)
				_args.push('')
			})
			setInputs(_inputs)
			setArgs(_args)
		}
	}, [address, setter])

	const handleInput = (e: ChangeEvent<HTMLInputElement>, x: number, type: string) => {
		console.log(type)
		let temp = args
		if (type === 'tuple[]') {
			try {
				// let str = '[ {"id": 1, "amount": 1 }, { "id": 13, "amount": 1 } ]'
				let arr = JSON.parse(e.target.value)
				temp[x] = arr
			} catch (error) { }
		} else if (type === 'uint256') {
			temp[x] = BigInt(e.target.value)
		} else {
			temp[x] = e.target.value
		}
		setArgs(temp)
	}

	const handleWrite = () => {
		if (!isConnected) {
			modal.setOpen(true)
		} else if (mustSwitchNetwork) {
			switchChain({ chainId: parseInt(setter.chain)})
		} else {
			setView({
				address: address,
				abi: [setter],
				functionName: setter.name,
				args: args,
				enabled: true,
				// chainId: setter.chain
			})
			// write?.() // TODO - Rewrite with Wagmi 2.x
		}
	}

	const getLabel = () => {
		return (
			<>
				{setter?.name}
				{setter?.outputs?.length === 0 && <small> ()</small>}
				{setter?.outputs?.length === 1 && <small> ({setter?.outputs[0]?.type})</small>}
				{setter?.outputs?.length > 1 && <small> (...)</small>}
			</>
		)
	}

	return (
		<div className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow flex flex-col justify-between text-sm">
			<dt className="truncate text-sm font-medium text-gray-500 px-4 pt-5 sm:px-6 sm:pt-6">
				{getLabel()}
			</dt>
			{inputs?.length === 0
				?
				<dd>
					<button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 mt-4" onClick={handleWrite}>
						{!isConnected ? 'Connect wallet' : mustSwitchNetwork ? 'Switch network' : 'Write'}
					</button>
				</dd>
				:
				<dd className="mt-1 flex flex-col">
					<div className="px-4 sm:px-6 pb-2 text-md font-semibold tracking-tight text-gray-900 break-words">
						<p>{data?.toString() || ' '}</p>
					</div>
					<Disclosure>
						{({ open }) => (
							<div className="w-full bg-gray-50 pt-4">
								<Disclosure.Button className={`${!open && 'pb-4'} flex w-full px-4 sm:px-6 justify-between text-left text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer`}>
									<span>Inputs</span>
									<ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-indigo-600`} />
								</Disclosure.Button>
								<Disclosure.Panel className="pt-4 text-sm text-gray-500">
									{inputs.map((i, x) => {
										return (
											<div key={x} className="relative rounded-md border bg-white border-gray-300 px-4 sm:px-6 py-2 mx-4 mb-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
												<label htmlFor="name" className="absolute -top-2 left-2 -mt-px inline-block bg-white rounded-md px-1 text-xs font-medium text-gray-900">
													{i.name}
												</label>
												<input
													type="text"
													name="name"
													id="name"
													className="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
													placeholder={i.type === 'tuple[]' ? '[{"property": value}, {...}]' : i.type}
													onChange={(e) => handleInput(e, x, i.type)}
												/>
											</div>
										)
									})}
									<button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 mt-1" onClick={handleWrite}>
										{!isConnected ? 'Connect wallet' : mustSwitchNetwork ? 'Switch network' : 'Write'}
									</button>
								</Disclosure.Panel>
							</div>
						)}
					</Disclosure>
				</dd>
			}
		</div>
	)
}