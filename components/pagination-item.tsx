import Link from "next/link"
import { ELLIPSIS } from "../lib/constants"

type Props = {
  key: number
  page: number
  currentPage: number
  basePath?: string
}

export default function PaginationItem({ page, currentPage, basePath }: Props) {
  const style = 'px-4 py-3 min-w-[3em] text-center'
  const currentPageStyle = style + ' text-white bg-base-color'

  if (page === ELLIPSIS) {
    return <span className={style}>⋯</span>
  }

  if (page === currentPage) {
    return <span className={currentPageStyle}>{page}</span>
  }

  const linkPath = (basePath || '') + `/page/${page}`
  const psuedoLinkPath = (basePath || '') + `/page/[page]`

  return (
    <Link as={linkPath} href={psuedoLinkPath} className={style}>
      {page}
    </Link>
  )
}