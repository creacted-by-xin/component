import {Button as AndtButton} from "antd";
import {type  CommonComponentProps } from '../../interface';
import {useDrag} from 'react-dnd';
import { useRef, useEffect } from "react";


export default function Button({id, type, text, style}: CommonComponentProps) {
  const dragRef =useRef(null);
  const [, drag] = useDrag(() => ({
    type: 'Button',
    item: {
      type: 'Button',
      id,
      dragType: 'move' 
    }
  }));

  useEffect(()=> {
          drag(dragRef)
      },[]);

  return (
    <AndtButton ref={dragRef} data-component-id={id} type={type} style={style}>
      {text}
    </AndtButton>
  )
}
