import PaginationArrow from "./pagination-arrow"
import PaginationItem from "./pagination-item"
import { ELLIPSIS, DISPLAY_ITEMS, ARROW_PREV, ARROW_NEXT } from "../lib/constants"

type Props = {
  pages: number[]
  currentPage: number
  basePath?: string
}

export default function Pagination({ pages, currentPage, basePath }: Props) {
  const firstPage = 1
  const lastPage = pages.slice(-1)[0]

  let displayPages = null
  if (pages.length <= DISPLAY_ITEMS + 4) {
    displayPages = pages
  }else if (currentPage < firstPage + DISPLAY_ITEMS) {
    // + 2 means firstPage & ellipsis
    displayPages = [...pages.slice(0, DISPLAY_ITEMS + 2), ELLIPSIS, lastPage]
  } else if (currentPage > lastPage - DISPLAY_ITEMS) {
    // + 2 means ellipsis & lastPage
    displayPages = [firstPage, ELLIPSIS, ...pages.slice(-(DISPLAY_ITEMS + 2))]
  } else {
    displayPages = [firstPage, ELLIPSIS,
                     ...takeAround(pages, currentPage - 1, Math.floor(DISPLAY_ITEMS / 2)),
                    ELLIPSIS, lastPage]
  }

  return (
    <div className="pagination flex items-center justify-around">
      <PaginationArrow
        role={ARROW_PREV}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
        basePath={basePath}
      />
      <div className="md:hidden whitespace-nowrap">{`${currentPage} / ${pages.length}`}</div>
      <div className="hidden md:flex items-center justify-center">
        {displayPages.map((page, i) => (
          <PaginationItem
            key={i}
            page={page}
            currentPage={currentPage}
            basePath={basePath}
          />
        ))}
      </div>
      <PaginationArrow
        role={ARROW_NEXT}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
        basePath={basePath}
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