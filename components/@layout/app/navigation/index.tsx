import SidebarMobile from './sidebarMobile'
import SidebarDesktop from './sidebarDesktop'
import { useEffect, useState } from 'react'
import { FolderIcon, HomeIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { IMenuItem, IMenuSubItem } from '@/types/navigation'
import { useAppSelector } from '@/store/store'

const navigationPrimary: IMenuItem[] = [
	{ 
		id: '',
		name: 'Dashboard',
		icon: HomeIcon,
		current: true,
		href: '/app/dashboard',
		children: undefined
	}
]

const navigationSecondary: IMenuSubItem[] = [
	{ 
		id: '',
		name: 'General',
		href: '/app/settings', 
		address: '',
		current: false 
	}
]

interface Props {
	sidebarOpen: boolean
	onSidebarClose: () => void
}

export default function Navigation({ sidebarOpen, onSidebarClose }: Props) {
	const pathname = usePathname()
	const projectsList = useAppSelector((state) => state.projects)
	const [projects, setProjects] = useState<IMenuItem[]>(navigationPrimary)

	useEffect(() => {
		navigationPrimary.forEach(i => {
			i.current = pathname === i.href ? true : false
		})

		let navigation: IMenuItem[]  = projectsList.map(project => {
			return {
				id: project.id,
				href: project.id,
				name: project.name,
				icon: FolderIcon,
				current: false,
				children: project.contracts.map(contract => {
					return {
						id: contract.id,
						name: contract?.name ? contract.name : contract.address,
						address: contract.address,
						href: '/app/' + project.id + '/' + contract.id,
						current: pathname === '/app/' + project.id + '/' + contract.id ? true : false
					}
				})
			}
		})
		setProjects(navigation)

		navigationSecondary.forEach(s => {
			s.current = pathname === s.href ? true : false
		})
	}, [projectsList, pathname])

	return (
		<>
			<SidebarMobile
				navigationPrimary={navigationPrimary}
				navigation={projects}
				navigationSecondary={navigationSecondary}
				sidebarOpen={sidebarOpen}
				onSidebarClose={onSidebarClose}
			/>
			<SidebarDesktop
				navigationPrimary={navigationPrimary}
				navigation={projects}
				navigationSecondary={navigationSecondary}
			/>
		</>
	)
}