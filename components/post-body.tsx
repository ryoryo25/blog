import markdownStyles from './markdown-styles.module.css'
import 'zenn-content-css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  console.log(content)
  return (
    <div
      // className={markdownStyles['markdown']}
      className="znc"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostBody
