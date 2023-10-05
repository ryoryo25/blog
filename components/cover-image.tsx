import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { url } from '../utils/config'

type Props = {
  title: string
  src: string
  slug?: string
}

export default function CoverImage({ title, src, slug }: Props) {
  return (
    <Image
      src={url(src)}
      alt={`Cover Image for ${title}`}
      className={cn('w-full', slug === undefined ? 'shadow-sm' : '')} // display shadow if used in post
      width={1300}
      height={630}
    />
  )
}
