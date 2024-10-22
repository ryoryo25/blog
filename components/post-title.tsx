import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export default function PostTitle({ children }: Props) {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-4 text-left">
      {children}
    </h1>
  )
}
