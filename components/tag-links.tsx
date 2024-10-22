import TagLink from "./tag-link"

type Props = {
  tags: string[]
}

export default function TagLinks({ tags }: Props) {
  return (
    <div className="flex flex-wrap mb-8">
      {tags.map(tag => <TagLink tag={tag} />)}
    </div>
  )
}