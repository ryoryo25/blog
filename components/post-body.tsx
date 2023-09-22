type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  console.log(content)
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostBody
