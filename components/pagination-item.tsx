import Link from "next/link"
import { ELLIPSIS } from "../lib/constants"

type Props = {
  key: number
  page: number
  current_page: number
}

export default function PaginationItem({ page, current_page }: Props) {
  const style = 'px-4 py-3 min-w-[3em] text-center'
  const current_page_style = style + ' text-white bg-base-color'

  if (page === ELLIPSIS) {
    return <span className={style}>⋯</span>
  }

  if (page === current_page) {
    return <span className={current_page_style}>{page}</span>
  }

  return (
    <Link as={`/page/${page}`} href="/page/[page]" className={style}>
      {page}
    </Link>
  )
}