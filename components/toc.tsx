import { INDEX_TITLE } from "../lib/constants"
import TOCBody from "./toc-body"

type Props = {
  toc: string
}

export default function TOC({ toc }: Props) {
  return (
    <nav className="toc p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2 border-b border-neutral-200">{INDEX_TITLE}</h2>
      <TOCBody toc={toc} />
    </nav>
  )
}
