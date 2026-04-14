import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { type ListItem } from "./Store";

interface ItemProps {
    data: ListItem
}

function Item(props: ItemProps) {
    const { data } = props;

    const ItemReg = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: {
            id: data.id
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    useEffect(() => {
        drag(ItemReg);
    }, []);

    return <div className={ classNames('h-25 border-2 bg-blue-300 p-10',
        'flex justify-start items-center',
        ' text-xl tracking-wide',
        'cursor-move',
        isDragging ? ' bg-white border-dashed': ''
    )} ref={ItemReg}>
        <input type="checkbox" className=" w-20 h-20 mr-10"/>
        <p>{data.content}</p>
    </div>
};

export default Item;