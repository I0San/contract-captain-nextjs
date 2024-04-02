interface Props {
  msg: string
}

export default function ValidationError({ msg }: Props) {
  return (
    <p className="mt-2 text-sm text-red-600">{msg}</p>
  )
}