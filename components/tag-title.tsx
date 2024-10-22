type Props = {
  tag: string
}

export default function TagTitle({ tag }: Props) {
  return (
    <div className="flex justify-center mb-14">
      <h2 className="text-3xl font-bold">{`『${tag}』タグの付いた記事一覧`}</h2>
    </div>
  )
}