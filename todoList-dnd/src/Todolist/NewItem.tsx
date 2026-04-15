import classNames from "classnames";
import { type FC, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

interface NewItemProps {
    className?: string
};

export const NewItem: FC<NewItemProps> = (props) => {
    const NewItemReg = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'new-item',
        item: {},
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    useEffect(() => {
        drag(NewItemReg);
    }, []);

    return (<div className={classNames(props.className,
        " h-25 border-2 border=black",
        "text-center leading-25 text-2xl",
        isDragging? "" : "bg-green-300",
        "cursor-move select-none")} ref={NewItemReg}>
        新的待办事项
    </div>)
};