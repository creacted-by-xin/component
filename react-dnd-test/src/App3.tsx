import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { App2Data } from "./constant";
import './App3.css';
import { useResize } from "@react-spring/web";

interface cardType {
    id: number,
    content: string
};

interface CardProps {
    data: cardType,
    index: number,
    swapIndex: Function
};

interface DragData {
    index: number
}

function Card(props: CardProps) {
    const cardRef = useRef(null);

    const { data, index, swapIndex } = props;

    const [{ isDragging }, dragRef] = useDrag({
        type: 'card',
        item: {
            index: index
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'card',
        // drop: (item: DragData)=> {
        //     swapIndex( index, item.index)
        // },
        hover: (item: DragData) => {
            if (index != item.index) {
                swapIndex(index, item.index);
                item.index = index
            }
        }
    });

    useEffect(() => {
        dragRef(cardRef);
        dropRef(cardRef);
    }, [])

    return <div ref={cardRef} className={isDragging ? "isDragging card" : "card"}>{data.content}</div>
};

function App() {
    const [cardList, setCardList] = useState<cardType[]>(App2Data);

    function swapIndex(index1: number, index2: number) {
        const tmp = cardList[index1];
        cardList[index1] = cardList[index2];
        cardList[index2] = tmp;

        setCardList([...cardList]);
    }

    return <div className="card-list">
        {
            cardList.map((item: cardType, index) => {
                return <Card data={item} key={`card_${item.id}`} index={index} swapIndex={swapIndex}></Card>
            })
        }
    </div>
};

export default App;