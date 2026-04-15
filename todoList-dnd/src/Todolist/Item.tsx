import classNames from "classnames";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useDrag, useDrop } from "react-dnd";
import { type ListItem } from "./Store";
import { useTodoListStore } from "./Store";

interface ItemProps {
    data: ListItem,
    index: number,
    swapList: Function,
}

function Item(props: ItemProps) {
    const { data, index, swapList } = props;
    const [editing, setEditing] = useState(false);
    const [editingContent, setEditingContent] = useState(data.content);
    const updateItem = useTodoListStore(state => state.updateItem);

    const ItemReg = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: {
            index: index,
            id: data.id,
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    const [, drop] = useDrop({
        accept: 'item',
        drop: (item: { index: number }) => {
            if (item.index !== index) {
            swapList(item.index, index);
        }
        }
    });

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        const status = e.target.checked ? 'done' : 'todo';
        updateItem({
            id: data.id,
            status: status,
            content: editingContent
        })
    };

    useEffect(() => {
        drag(ItemReg);
        drop(ItemReg);
    }, []);

    return <div className={classNames('h-25 border-2 p-10 mb-10',
        'flex justify-start items-center',
        ' text-xl tracking-wide',
        'cursor-move',
        isDragging ? ' bg-white border-dashed' : '',
        data.status === 'done' ? ' bg-gray-300 line-through' : ' bg-blue-300'
    )} ref={ItemReg} onDoubleClick={() => setEditing(true)}>
        <input type="checkbox" checked={data.status === 'done'} className=" w-20 h-20 mr-10" onChange={handleCheck} />
        <p>{editing ?
            <input value={editingContent} onChange={(e) => setEditingContent(e.target.value)}
                onBlur={() => {setEditing(false);
                    updateItem({
                    id: data.id,
                    status: 'todo',
                    content: editingContent
                })}} />
            : data.content}</p>
    </div>
};

export default Item;