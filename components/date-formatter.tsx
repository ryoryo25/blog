import { parseISO, format } from 'date-fns'
import Dates from '../interfaces/dates'

type Props = {
  dates: Dates
}

function formatDate(date: string): string {
  const dateFormat = 'yyyy-MM-dd'
  return format(parseISO(date), dateFormat)
}

const DateFormatter = ({ dates }: Props) => {
  const postDate = formatDate(dates.postDate)

  if (dates.updateDate === '') {
    return (<p><b>Posted:</b> <time dateTime={dates.postDate}>{postDate}</time></p>)
  } else {
    const updateDate = formatDate(dates.updateDate)
    return (
      <>
        <p><b>Last Modified:</b> <time dateTime={dates.updateDate}>{updateDate}</time></p>
        <p><b>Posted:</b> {postDate}</p>
      </>
      )
  }
}

export default DateFormatter
