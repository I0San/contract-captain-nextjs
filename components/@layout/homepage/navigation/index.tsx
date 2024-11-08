'use client'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/utils/common'
import Link from 'next/link'
import Image from 'next/image'
// import { ConnectKitButton } from 'connectkit'

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'App', href: '/app/dashboard', current: false }
]

export default function Navigation() {
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="border-b border-gray-700">
							<div className="flex h-16 items-center justify-between px-4 sm:px-0">
								
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<Image width={32} height={32} src="/img/logo-indigo.png" alt="Contract Captain" />
									</div>
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline space-x-4">
											{navigation.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? 'bg-gray-900 text-white'
															: 'text-gray-300 hover:bg-gray-700 hover:text-white',
														'px-3 py-2 rounded-md text-sm font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</Link>
											))}
											<a href="https://github.com/I0San/contract-captain"
												className={classNames(
													'text-gray-300 hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium'
												)}
												aria-current={undefined}
												target='_blank'
												rel="noreferrer"
											>
												GitHub
											</a>
										</div>
									</div>
								</div>

								<div className="hidden md:block">
									<div className="ml-4 flex items-center md:ml-6">
										{/* <ConnectKitButton /> */}
									</div>
								</div>

								<div className="-mr-2 flex md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>

							</div>
						</div>
					</div>

					<Disclosure.Panel className="border-b border-gray-700 md:hidden">
						<div className="space-y-1 px-2 py-3 sm:px-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
							<Disclosure.Button
								as="a"
								href="https://github.com/I0San/contract-captain"
								className={classNames(
									'text-gray-300 hover:bg-gray-700 hover:text-white',
									'block px-3 py-2 rounded-md text-base font-medium'
								)}
								aria-current={undefined}
								target='_blank'
								rel="noreferrer"
							>
								GitHub
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}