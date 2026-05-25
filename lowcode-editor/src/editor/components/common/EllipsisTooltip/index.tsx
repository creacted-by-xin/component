import { Tooltip } from 'antd';
import { useRef, useState, type ReactNode } from 'react';

interface EllipsisTooltipProps {
  children: ReactNode;
  title: ReactNode;
  className?: string;
}

export default function EllipsisTooltip({
  children,
  title,
  className = ''
}: EllipsisTooltipProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);

  const handleMouseEnter = () => {
    const element = textRef.current;
    if (!element) return;

    setOverflow(element.scrollWidth > element.clientWidth);
  };

  return (
    <Tooltip title={overflow ?
      <div className='max-w-64 break-all whitespace-normal'>
        {title}
      </div> : undefined}>
      <span
        ref={textRef}
        onMouseEnter={handleMouseEnter}
        className={`block min-w-0 truncate ${className}`}
      >
        {children}
      </span>
    </Tooltip>
  );
}