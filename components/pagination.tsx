import Link from "next/link"
import PaginationItem from "./pagination-item"
import { ELLIPSIS, DISPLAY_ITEMS, ARROW_PREV, ARROW_NEXT } from "../lib/constants"
import PaginationArrow from "./pagination-arrow"

type Props = {
  pages: number[]
  current_page: number
}

export default function Pagination({ pages, current_page }: Props) {
  const first_page = 1
  const last_page = pages.slice(-1)[0]

  let display_pages = null
  if (pages.length <= DISPLAY_ITEMS + 4) {
    display_pages = pages
  }else if (current_page < first_page + DISPLAY_ITEMS) {
    // + 2 means first_page & ellipsis
    display_pages = [...pages.slice(0, DISPLAY_ITEMS + 2), ELLIPSIS, last_page]
  } else if (current_page > last_page - DISPLAY_ITEMS) {
    // + 2 means ellipsis & last_page
    display_pages = [first_page, ELLIPSIS, ...pages.slice(-(DISPLAY_ITEMS + 2))]
  } else {
    display_pages = [first_page, ELLIPSIS,
                     ...takeAround(pages, current_page - 1, Math.floor(DISPLAY_ITEMS / 2)),
                    ELLIPSIS, last_page]
  }

  return (
    <div className="pagination flex items-center justify-around">
      <PaginationArrow
        role={ARROW_PREV}
        current_page={current_page}
        first_page={first_page}
        last_page={last_page}
      />
      <div className="md:hidden whitespace-nowrap">{`${current_page} / ${pages.length}`}</div>
      <div className="hidden md:flex items-center justify-center">
        {display_pages.map((page) => <PaginationItem page={page} current_page={current_page} />)}
      </div>
      <PaginationArrow
        role={ARROW_NEXT}
        current_page={current_page}
        first_page={first_page}
        last_page={last_page}
      />
    </div>
  )
}

function takeAround<T>(list: T[], center: number, range: number): T[] {
  const len = list.length
  const lower = center - range < 0 ? 0 : center - range
  const upper = center + range >= len ? len - 1 : center + range
  return list.slice(lower, upper + 1)
}