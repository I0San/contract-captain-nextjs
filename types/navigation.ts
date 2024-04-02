export interface IMenuItem {
  id: string
	name: string
	href: string
  icon: any
	children: IMenuSubItem[] | undefined
	current: boolean
}

export interface IMenuSubItem {
  id: string
	name: string
	href: string
  address: string
	current: any
}