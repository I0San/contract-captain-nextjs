
import React, { useState, KeyboardEvent } from 'react'
import { Tooltip } from 'react-tooltip'
import { classNames } from '@/utils/common'
import { shortenAddress } from '@/utils/common'
import { CheckIcon, DocumentTextIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
import { updateContractName, deleteContract, } from '@/store/features/projects/projectsSlice'
import { IMenuItem, IMenuSubItem } from '@/types/navigation'
import { isAddress } from 'viem'

interface Props {
	item: IMenuItem
	subItem: IMenuSubItem
}

export default function MenuSubItem({ item, subItem }: Props) {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [mouseOver, setMouseOver] = useState(false)
	const [edit, setEdit] = useState(false)
	const [isDelete, setDelete] = useState(false)
	const [value, setValue] = useState(subItem?.name)

	function saveItem() {
		dispatch(updateContractName({
			projectId: item.id,
			contractId: subItem.id,
			name: value
		}))
		setEdit(false)
	}

	function deleteItem() {
		setDelete(false)
		dispatch(deleteContract({
			projectId: item.id,
			contractId: subItem.id
		}), router.push('/app/dashboard'))
	}

	const handleEnterEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		setEdit(true)
	}

	const handleCancelEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		setEdit(false)
		setValue(subItem.name)
	}

	const handleSave = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		saveItem()
	}

	const handleEnterDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		setDelete(true)
	}

	const handleCancelDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		setDelete(false)
	}

	const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault()
		deleteItem()
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (edit) {
				saveItem()
			} else if (isDelete) {
				deleteItem()
			}
		} else if (event.key === 'Escape') {
			if (edit) {
				setEdit(false)
				setValue(subItem.name)
			} else if (isDelete) {
				setDelete(false)
			}
		}
	}

	return (
		<>
			{!edit && !isDelete ?
				<>
					<Link
						key={subItem.id}
						href={subItem.href}
						className={classNames(
							subItem.current ? 'text-gray-300 bg-gray-700' : 'text-gray-500 ',
							'group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium hover:bg-gray-700 hover:text-white'
						)}
						onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}
						data-tooltip-id="address-tooltip"
						data-tooltip-content={shortenAddress(subItem.address, 6)}
					>
						<div className="flex">
							<DocumentTextIcon className="w-6 h-4 mr-2" />
							{isAddress('0x' + subItem.name) ? shortenAddress(subItem.name, 6) : subItem.name}
						</div>
						{mouseOver &&
							<div className="flex">
								<PencilSquareIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleEnterEdit(e)} />
								<TrashIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleEnterDelete(e)} />
							</div>
						}
					</Link>
					<Tooltip id="address-tooltip" />
				</>
				:
				edit
					?
					<div className="group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium bg-gray-700">
						<input
							className="w-full mr-2 bg-gray-700 border border-solid border-indigo-500 outline-none text-white font-normal"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onFocus={(e) => e.target.select()}
							onKeyDown={handleKeyDown}
							autoFocus
						></input>
						<div className="flex">
							<CheckIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleSave(e)} />
							<XMarkIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleCancelEdit(e)} />
						</div>
					</div>
					:
					<div className="group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium bg-gray-700">
						<div className="w-full mr-2 bg-gray-700 text-white font-normal">
							Delete: {isAddress('0x' + subItem.name) ? shortenAddress(subItem.name, 6) : subItem.name}?
						</div>
						<div className="flex">
							<CheckIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleDelete(e)} />
							<XMarkIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={(e) => handleCancelDelete(e)} />
						</div>
					</div>
			}
		</>
	)
}