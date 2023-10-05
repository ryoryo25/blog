type Props = {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
