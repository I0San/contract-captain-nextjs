interface Props {
  htmlFor: string
  title: string
}

export default function Label({ htmlFor, title }: Props) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{title}</label>
  )
}