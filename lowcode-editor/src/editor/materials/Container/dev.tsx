import { useRef, useEffect } from "react";
import { type CommonComponentProps } from "../../interface";
import { useMamerialDrop } from '../../hooks/useMamerialDrop';
import { useDrag } from 'react-dnd';

export default function Container({ id, name, children, style }: CommonComponentProps) {
  const ref = useRef(null);

  const { canDrop, drop } = useMamerialDrop(id, ['Button', 'Container', 'Modal', 'Table', 'Form']);

  const [, drag] = useDrag(() => ({
    type: 'Container',
    item: {
      type: 'Container',
      id,
      dragType: 'move'
    }
  }));

  useEffect(() => {
    drop(ref)
    drag(ref)
  }, []);
  
  return (
    // 业务数据id，用自定义ID
    <div data-component-id={id}
      ref={ref}
      className={`border min-h-25 p-5 ${canDrop ? 'border-2 border-blue-700' : ''} `}
      style={style}
    >{children}</div>
  )
}
