import Link from "next/link"
import { ARROW_NEXT, ARROW_PREV, ELLIPSIS } from "../lib/constants"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import fa from './fa.module.css'

type Props = {
  role: string
  currentPage: number
  firstPage: number
  lastPage: number
  basePath?: string
}

export default function PaginationArrow({ role, currentPage, firstPage, lastPage, basePath }: Props) {
  const style = 'px-4 py-3 min-w-[3em] text-center'
  const hidden_style = `${style} invisible`

  let arrow = null
  let arrowPage = currentPage
  let arrowStyle = style
  if (role == ARROW_PREV) {
    arrow = <FaAngleLeft className={`text-xl ${fa['fa']}`} />
    arrowPage -= 1
    if (currentPage === firstPage) {
      arrowStyle = hidden_style
    }
  } else if (role === ARROW_NEXT) {
    arrow = <FaAngleRight className={`text-xl ${fa['fa']}`} />
    arrowPage += 1
    if (currentPage === lastPage) {
      arrowStyle = hidden_style
    }
  }

  const linkPath = (basePath || '') + `/page/${arrowPage}`
  const psuedoLinkPath = (basePath || '') + `/page/[page]`

  return (
    <Link as={linkPath} href={psuedoLinkPath} className={arrowStyle}>
      {arrow}
    </Link>
  )
}