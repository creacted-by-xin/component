import { useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface MaterialItemProps {
    label: string,
    name: string
};

export default function MaterialItem({label, name}: MaterialItemProps) {
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
        font-size-10
         inline-block
         border
         border-dashed
         rounded-sm
         border-black
         py-2
         px-2.5
         cursor-move
         bg-white
         select-none
         hover:bg-[#ccc]
        ">{label}</div>
  )
}
