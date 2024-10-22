import Link from "next/link"

type Props = {
  tag: string
  noLink?: boolean
}

export default function TagLink({ tag, noLink }: Props) {
  const className = 'text-neutral-600 bg-neutral-200 py-1 px-2 mr-2 my-1 rounded-sm'

  if (noLink) {
    return (
      <div className={className}>
        {tag}
      </div>
    )
  }

  return (
    <Link
      as={`/tag/${tag}`}
      href="/tag/[tag]"
      className={className}
    >
      {tag}
    </Link>
  )
}