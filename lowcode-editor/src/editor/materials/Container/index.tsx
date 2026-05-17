import { useRef, useEffect} from "react";
import {type CommonComponentProps } from "../../interface";
import {useMamerialDrop} from '../../hooks/useMamerialDrop';

export default function Container({id, name, children}: CommonComponentProps) {
  const ref = useRef(null);
  
    const{ canDrop, drop }=useMamerialDrop(id, ['Button', 'Container']);
  
    useEffect(()=> {
            drop(ref)
        },[]);
  return (
    // 业务数据id，用自定义ID
    <div  data-component-id={id} 
    ref={ref} 
    className=" border border-balck min-h-25 p-5"
    style={{ border: canDrop? '2px solid blue': ''}}
    >{children}</div>
  )
}
