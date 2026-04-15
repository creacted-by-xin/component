import classNames from "classnames";
import { type FC } from "react";
import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";
import { useTodoListStore } from "./Store";
import { type ListItem } from "./Store";
import { useTransition, animated } from "@react-spring/web";

interface ListProps {
    className?: string
};

export const List: FC<ListProps> = (props) => {
    const ListRef = useRef(null);
    const list = useTodoListStore(state => state.list);
    const addItem = useTodoListStore(state => state.addItem);

    const [{ }, drop] = useDrop({
        accept: ['new-item'],
        drop() {
            addItem({
                id: Math.random(),
                status: 'todo',
                content: '待办事项'
            })
        },
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            }
        }
    });

    useEffect(() => {
        drop(ListRef)
    }, [])

    function swapList(target1: number, target2: number) {
        const newList = [...list];

        const tmp = newList[target1];
        newList[target1] = newList[target2];
        newList[target2] = tmp;

        useTodoListStore.setState({ list: newList })
    };

    const sortedList =[...list].sort((a, b) => {
            if (a.status === 'todo' && b.status === 'done') return -1;
            if (a.status === 'done' && b.status === 'todo') return 1;
            return 0;
        });

    const transitions = useTransition(sortedList, {
        key: (item: ListItem) => item.id,
        // initial: false,
        from: { transform: "translateX(100%)", opacity: 0 },
        enter: { transform: "translateX(0)", opacity: 1 },
        leave: { transform: "translateX(-100%)", opacity: 0 },
    });

    const cs = classNames(props.className, " h-full  border-black");

    return <div className={cs} ref={ListRef}>
        {sortedList.length ? transitions((style, item, _, index) => {
            return <animated.div style={style}>
                {/* <Gap/> */}
                <Item data={item} index={index} swapList={swapList} />
            </animated.div>
        }) : '暂无待办事项'}
        {/* <Gap/> */}
    </div>
};



