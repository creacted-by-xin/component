import { useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface MaterialItemProps {
    name: string
};

export default function MaterialItem({name}: MaterialItemProps) {
    const ref = useRef(null);
    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    });

    useEffect(()=> {
        drag(ref)
    },[]);

  return (
    <div ref={ref} className=" 
         inline-block
         border
         border-dashed
         border-black
         m-2.5
         py-2
         px-2.5
         cursor-move
         bg-white
         select-none
         hover:bg-[#ccc]
        ">{name}</div>
  )
}
