import Link from "next/link"

type Props = {
  pages: number[]
  current_page: number
}

export default function Pagination({ pages, current_page }: Props) {
  return (
    <div className="flex items-center justify-center">
      {pages.map((page) => (
        <Link
          as={`/page/${page}`}
          href="/page/[page]"
          className={`p-4 ${page === current_page ? 'text-white bg-black' : ''}`}
        >
          {page}
        </Link>
      ))}
    </div>
  )
}