import { parseISO, format } from 'date-fns'
import Dates from '../interfaces/dates'

type Props = {
  dates: Dates
}

const DateFormatter = ({ dates }: Props) => {
  const postDate = parseISO(dates.postDate)
  const postDateHTML = <time dateTime={dates.postDate}>{format(postDate, 'LLLL	d, yyyy')}</time>

  if (dates.updateDate === '') {
    return postDateHTML
  } else {
    const updateDate = parseISO(dates.updateDate)
    return (
      <>
        {postDateHTML}<br/>
        <time dateTime={dates.updateDate}>{format(updateDate, 'LLLL	d, yyyy')}</time>
      </>
      )
  }
}

export default DateFormatter
