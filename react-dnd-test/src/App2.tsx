import { useEffect, useState, useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { data as cardData } from './constant';
import './App2.css';

interface CardItem {
    id: number;
    content: string
};

interface CardProps {
    data: CardItem,
    index: number,
    swapIndex: Function
};

interface DragData {
    id: number,
    index: number
}

function Card(props: CardProps) {
    const ref = useRef(null);

    const { data, index, swapIndex } = props;

    const [{ dragging }, drag] = useDrag({
        type: 'card',
        item: {
            id: data.id,
            index: index
        },
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        }
    });

    const [, drop] = useDrop({
        accept: 'card',
        // drop(item: DragData) {
        //     swapIndex(index, item.index)
        // }
        hover(item: DragData) {
            if(item.id === index) return;
            swapIndex(index, item.index)
            item.index = index
        }
    });

    useEffect(()=>{
        drag(ref);
        drop(ref)
    }, []);

    return <div ref={ref} className={dragging ? 'card dragging' :'card'}> {data.content}</div>
}

function App2() {
    const [cardList, setCardList] = useState<CardItem[]>(cardData);

    const onSwapIndex = useCallback((index1: number, index2: number)=> {
        const tmp = cardList[index1];
        cardList[index1] = cardList[index2];
        cardList[index2] = tmp;

        setCardList([...cardList]);
    }, []);

    return (
        <div className='card-list'>
            {
                cardList.map((item: CardItem, index)=>(
                    <Card data={item} key={ 'card_' + item.id} index={index} swapIndex={onSwapIndex}></Card>
                ))
            }
        </div>
    );
};

export default App2;