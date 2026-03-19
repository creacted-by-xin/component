import { useEffect, useRef } from "react";

export interface useTimerProps {
    id: number,
    duration?: number,
    remove: (id: number)=>void
}

export default function useTimer (props: useTimerProps){
    const {id, duration =2000, remove} = props;
    const timerRef = useRef<number | null>(null);
    // 重新计时
    function startTimer(){
        timerRef.current = setTimeout(()=>{
            remove(id);
        },duration)
    };

    // 清除计时器
    function removeTimer(){
        if(timerRef.current){
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    // 进入清除剩余倒计时
    function onMouseEnter(){
        removeTimer();
    };
    // 离开重新计时2s
    function onMouseLeave(){
        startTimer();
    };

    useEffect(()=>{
        startTimer()
        return()=>removeTimer()
    },[])

    return{onMouseEnter, onMouseLeave}
}