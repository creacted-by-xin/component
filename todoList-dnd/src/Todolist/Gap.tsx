import classNames from "classnames";
import {  useEffect, useRef } from "react";
import {  useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";

function Gap() {
     const GapRef = useRef(null);
     
     const addItem = useTodoListStore(state => state.addItem);
    
        const [{isOver}, drop ] = useDrop({
            accept: ['new-item'],
            drop(item){
                addItem({
                    id: Math.random(),
                    status: 'todo',
                    content: '待办事项'
                })
            },
            collect(monitor){
                return {
                    isOver: monitor.isOver()
                }
            }
        });
    
        useEffect(()=> {
            drop(GapRef)
        }, [])
     
        return <div className={classNames(
        " h-2.5 ",
        isOver? "bg-red-300": ''
        )} ref={GapRef}></div>
};

export default Gap;