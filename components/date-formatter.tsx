import { parseISO, format } from 'date-fns'
import Dates from '../interfaces/dates'
import { FaPenToSquare, FaRotate } from 'react-icons/fa6'
import fa from './fa.module.css'

type Props = {
  dates: Dates
}

function formatDate(date: string): string {
  const dateFormat = 'yyyy-MM-dd'
  if (date === null) {
    date = new Date().toISOString()
  }
  return format(parseISO(date), dateFormat)
}

function getPostDateHTML(dates: Dates): JSX.Element {
  const postDate = formatDate(dates.postDate)
  const postIcon = (<FaPenToSquare className={fa['fa']} />)

  if (dates.updateDate === null) {
    return <>{postIcon} <time dateTime={dates.postDate}>{postDate}</time></>
  } else {
    return <>{postIcon} {postDate}</>
  }
}

function getUpdateDateHTML(dates: Dates): JSX.Element {
  if (dates.updateDate === null) {
    return <></>
  } else {
    const updateDate = formatDate(dates.updateDate)
    const updateIcon = (<FaRotate className={fa['fa']} />)
    return <>{updateIcon} <time dateTime={dates.updateDate}>{updateDate}</time></>
  }
}

export default function DateFormatter({ dates }: Props) {
  return (
    <div className="flex items-center">
      <div className="mr-3">{getPostDateHTML(dates)}</div>
      <div>{getUpdateDateHTML(dates)}</div>
    </div>)
}
