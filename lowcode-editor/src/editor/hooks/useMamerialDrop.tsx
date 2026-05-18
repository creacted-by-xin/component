import { useDrop } from "react-dnd";
import  { useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";

export function useMamerialDrop(parentId: number, accept: string[]) {
    const {addComponent} = useComponentsStore();
    const {componentConfig} = useComponentConfigStore();

    const [{ canDrop },drop] = useDrop(()=>({
        accept: accept,
        drop: (item: { type: string}, monitor)=>{
          const didDrop = monitor.didDrop()
                if (didDrop) {
                  return;
                };
                
          const config = componentConfig[item.type];

          addComponent({
            id: new Date().getTime(),
            name: item.type,
            desc: config.desc,
            props: config.defaultProps
          }, parentId);
        },
        collect:(monitor)=> ({
          canDrop: monitor.canDrop()
        })
      }));

    return { canDrop, drop }
}