import classNames from "classnames";
import { type FC, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";

interface GarbageBinProps {
    className?: string
};

export const GarbageBin: FC<GarbageBinProps> = (props) => {
    const GarbageBinRef = useRef(null);

    const deleteItem = useTodoListStore(state => state.deleteItem);

    const [{isOver}, drop ] = useDrop({
        accept: 'item',
        drop(item: {id: number}){
            deleteItem(item.id)
        },
        collect(monitor){
            return {
                isOver: monitor.isOver()
            }
        }
    });

    useEffect(()=> {
        drop(GarbageBinRef)
    }, [])
 
    return <div className={classNames(props.className, 
    " h-50 border-2 border=black",
    isOver?" bg-red-300" : "bg-orange-300",
    "leading-50 text-center text-2xl",
    "cursor-move select-none")} ref={GarbageBinRef}>
        垃圾箱
    </div>
}