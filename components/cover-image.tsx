import cn from 'classnames'
import Image from 'next/image'
import { url } from '../utils/config'
import { ASSETS_PREFIX } from '../lib/constants'

type Props = {
  slug: string
  title: string
  src: string
}

export default function CoverImage({ slug, title, src }: Props) {
  const srcUrlBase = src.startsWith(ASSETS_PREFIX) ? src : `${ASSETS_PREFIX}/${slug}/${src}`
  return (
    <Image
      src={url(srcUrlBase)}
      alt={`Cover Image for ${title}`}
      className={cn('w-full', slug === undefined ? 'shadow-sm' : '')} // display shadow if used in post
      width={1300}
      height={630}
    />
  )
}
