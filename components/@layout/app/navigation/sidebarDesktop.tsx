import Link from 'next/link'
import MenuItems from './menuItems'
import { IMenuItem, IMenuSubItem } from '@/types/navigation'
import Image from 'next/image'

interface Props {
	navigationPrimary: IMenuItem[]
	navigation: IMenuItem[]
	navigationSecondary: IMenuSubItem[]
}

export default function SidebarDesktop({ navigationPrimary, navigation, navigationSecondary }: Props) {
	return (
		<div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">

			<div className="flex min-h-0 flex-1 flex-col bg-gray-800">

				<div className="flex h-16 flex-shrink-0 items-center px-4">
					<Link href="/">
						<Image width={32} height={32} className="h-8 w-8" src="/img/logo-indigo.png" alt="Contract Captain" />
					</Link>
					<span className="ml-4 font-bold text-lg text-white">Contract Captain</span>
				</div>

				<MenuItems navigationPrimary={navigationPrimary} navigation={navigation} navigationSecondary={navigationSecondary} />

				<div className="flex flex-shrink-0 bg-gray-700 p-4">
					<div className="group block w-full flex-shrink-0">
						<div className="flex items-center">
							<div className="ml-3">
								<p className="text-sm font-medium text-white">Contract Captain</p>
								<p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
									<a href="https://github.com/I0San/contract-captain" target="_blank" rel="noreferrer" >Repository on GitHub</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}