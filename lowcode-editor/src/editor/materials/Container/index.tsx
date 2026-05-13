import { useRef, useEffect, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import {type CommonComponentProps } from "../../interface";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { message } from "antd";


export default function Container({id, name, children}: CommonComponentProps) {
  const ref = useRef(null);
    const { addComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();
  
    const [{ canDrop },drop] = useDrop(()=>({
      accept:['Button', 'Container'],
      drop: (item: { type: string}, monitor)=>{
        const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            };

        const props = componentConfig[item.type].defaultProps;
        
        addComponent({
          id: new Date().getTime(),
          name: item.type,
          props
        }, id);
      },
      collect:(monitor)=> ({
        canDrop: monitor.canDrop()
      })
    }));
  
    useEffect(()=> {
            drop(ref)
        },[]);
  return (
    <div ref={ref} 
    className=" border border-balck min-h-25 p-5"
    style={{ border: canDrop? '2px solid blue': ''}}
    >{children}</div>
  )
}
