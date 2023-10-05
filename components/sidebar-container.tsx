type Props = {
  children?: React.ReactNode
}

export default function SidebarContainer({ children }: Props) {
  return (
    <aside className="sidebar hidden lg:block lg:w-1/5 ml-16">
      <div className="sticky top-36">
        {children}
      </div>
    </aside>
  )
}
