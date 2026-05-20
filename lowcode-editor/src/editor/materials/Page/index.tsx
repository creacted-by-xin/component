import { useRef, useEffect} from "react";
import {type CommonComponentProps } from "../../interface";
import {useMamerialDrop} from '../../hooks/useMamerialDrop';

export default function Page({id, style, name, children}: CommonComponentProps) {
  const ref = useRef(null);
 
  const{ canDrop, drop }=useMamerialDrop(id, ['Button', 'Container']);

  useEffect(()=> {
          drop(ref)
      },[]);

  return (
    <div  data-component-id={id} ref={ref} className=" p-5 h-full box-border"
    style={{...style, border: canDrop? '2px solid blue': ''}}
    >{children}</div>
  )
}
