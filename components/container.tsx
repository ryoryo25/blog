type Props = {
  children?: React.ReactNode
}

export default function Container({ children }: Props) {
  return <div className="container mx-auto max-w-5xl px-8">{children}</div>
}
