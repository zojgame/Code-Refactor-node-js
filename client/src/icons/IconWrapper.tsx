interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  hoverTitle?: string;
}

const IconWrapper = ({ children, className, hoverTitle }: IconWrapperProps) => {
  return (
    <div className={`flex gap-3 ${className ?? ""}`} title={hoverTitle}>
      {children}
    </div>
  );
};

export { IconWrapper };
