import tocStyle from './toc.module.css'

type Props = {
  toc: string
}

const TOCBody = ({ toc }: Props) => {
  return (
    <div
      className={`overflow-y-hidden hover:overflow-y-auto max-h-[50vh] ${tocStyle['toc']}`}
      dangerouslySetInnerHTML={{ __html: toc }}
    />
  )
}

export default TOCBody
