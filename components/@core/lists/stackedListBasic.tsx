interface Props {
  children: React.ReactNode
}

export default function StackedListBasic({ children }: Props) {
  return (
    <ul className="divide-y divide-gray-200">
      {children}
    </ul>
  )
}