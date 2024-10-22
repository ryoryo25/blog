import Link from "next/link"

type Props = {
  tag: string
}

export default function TagLink({ tag }: Props) {
  return (
    <Link
      as={`/tag/${tag}`}
      href="/tag/[tag]"
      className="text-neutral-600 bg-neutral-300 py-1 px-2 m-1 rounded-sm"
    >
      {tag}
    </Link>
  )
}