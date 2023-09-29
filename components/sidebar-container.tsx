type Props = {
  children?: React.ReactNode
}

const SidebarContainer = ({ children }: Props) => {
  return (
    <aside className="sidebar hidden lg:block lg:w-1/5 ml-16">
      <div className="sticky top-36">
        {children}
      </div>
    </aside>
  )
}

export default SidebarContainer
