interface Props {
  title?: string
  children: React.ReactNode
}

export default function StackedListBasicItem({ title, children }: Props) {
  return (
    <li className="flex items-center justify-between py-4">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>
      {children}
    </li>
  )
}