import Link from "next/link"
import { ARROW_NEXT, ARROW_PREV, ELLIPSIS } from "../lib/constants"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import fa from './fa.module.css'

type Props = {
  role: string
  current_page: number
  first_page: number
  last_page: number
}

export default function PaginationArrow({ role, current_page, first_page, last_page }: Props) {
  const style = 'px-4 py-3 min-w-[3em] text-center'
  const hidden_style = `${style} invisible`

  let arrow = null
  let arrow_page = current_page
  let arrow_style = style
  if (role == ARROW_PREV) {
    arrow = <FaAngleLeft className={`text-xl ${fa['fa']}`} />
    arrow_page -= 1
    if (current_page === first_page) {
      arrow_style = hidden_style
    }
  } else if (role === ARROW_NEXT) {
    arrow = <FaAngleRight className={`text-xl ${fa['fa']}`} />
    arrow_page += 1
    if (current_page === last_page) {
      arrow_style = hidden_style
    }
  }
  return (
    <Link as={`/page/${arrow_page}`} href="/page/[page]" className={arrow_style}>
      {arrow}
    </Link>
  )
}