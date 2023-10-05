type Props = {
  children?: React.ReactNode
}

export default function ArticleContainer({ children }: Props) {
  return <article className="w-full md:max-w-3xl md:mx-auto lg:w-3/4 mb-16">{children}</article>
}
