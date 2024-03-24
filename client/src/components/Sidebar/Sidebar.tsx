interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children, className = "" }: SidebarProps): JSX.Element => {
  return (
    <aside
      // className={`h-[calc(100vh-100px)] bg-[#1e1e1e] border-[#393939]  py-4  ${className}`}
      className={`h-[calc(100vh-100px)] bg-[#1e1e1e] border-[#393939] border-r py-4 px-6 flex flex-col gap-3 ${className}`}
    >
      {children}
    </aside>
  );
};

export { Sidebar };
