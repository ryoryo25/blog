import TagLink from "./tag-link"

type Props = {
  tags: string[]
  noLink?: boolean
}

export default function TagLinks({ tags, noLink }: Props) {
  return (
    <div className="flex flex-wrap mb-8">
      {tags.map(tag => <TagLink tag={tag} noLink={noLink} />)}
    </div>
  )
}