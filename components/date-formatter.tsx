import { parseISO, format } from 'date-fns'
import Dates from '../interfaces/dates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRotate } from '@fortawesome/free-solid-svg-icons'

type Props = {
  dates: Dates
}

function formatDate(date: string): string {
  const dateFormat = 'yyyy-MM-dd'
  return format(parseISO(date), dateFormat)
}

function getPostDateHTML(dates: Dates): JSX.Element {
  const postDate = formatDate(dates.postDate)
  const postIcon = (<FontAwesomeIcon icon={faPenToSquare} />)

  if (dates.updateDate === '') {
    return <>{postIcon} <time dateTime={dates.postDate}>{postDate}</time></>
  } else {
    return <>{postIcon} {postDate}</>
  }
}

function getUpdateDateHTML(dates: Dates): JSX.Element {
  if (dates.updateDate === '') {
    return <></>
  } else {
    const updateDate = formatDate(dates.updateDate)
    const updateIcon = (<FontAwesomeIcon icon={faRotate} />)
    return <>{updateIcon} <time dateTime={dates.updateDate}>{updateDate}</time></>
  }
}

const DateFormatter = ({ dates }: Props) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">{getPostDateHTML(dates)}</div>
      <div>{getUpdateDateHTML(dates)}</div>
    </div>)
}

export default DateFormatter
