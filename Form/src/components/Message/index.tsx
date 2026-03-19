import type React from "react";
import { useEffect, forwardRef, useMemo, type CSSProperties, type PropsWithChildren, type ReactNode, useImperativeHandle } from "react";
import { useTransition, animated } from "@react-spring/web";
import useStore from "./useStore";
import useTimer from "./useTimer";
import { createPortal } from "react-dom";
import type { useTimerProps } from "./useTimer";
import './index.css'

export type Position = 'top' | 'bottom';

// 传入的内容
export interface MessageProps {
    style?: CSSProperties,
    className?: string | string[],
    content: ReactNode
    duration?: number,
    id?: number,
    position?: string,
    onClose?: (id: number)=>void
};

export interface MessageRef {
    add: (MessageProps: MessageProps)=> number;
    update: (id:number, MessageProps: MessageProps)=> void;
    remove: (id: number) => void;
    clearAll: ()=> void;
}

const MessageItem:React.FC <PropsWithChildren<MessageProps>> = (props)=>{
    const {id, duration, onClose, children} = props;
    const {onMouseEnter, onMouseLeave} = useTimer({
        id: id!,
        duration: duration!,
        remove: onClose!
    })
    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>
}


export const MessageProvider= forwardRef<MessageRef,{position?: Position }>((props, ref) => {
    const position = props.position || 'top';
    const { messageList, add, update, remove, clearAll } = useStore(position);

    // useImperativeHandle(ref, () =>{
    //     return {
    //         add,
    //         update,
    //         remove,
    //         clearAll
    //     }
    // },[])


    if('current' in ref!) {
    ref.current = {
        add,
        update,
        remove,
        clearAll
    }
}

    const transitions = useTransition(messageList[position], {
        key: (item: MessageProps) => item.id,
        from: {
            opacity: 0,
            transform: 'scale(1.1)'
        },
        enter: {
            opacity: 1,
            transform: 'scale(1)'
        },
        leave: {
            opacity: 0
        },
        config: {
            duration: 500
        }
    })

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         add({
    //             content: '123'
    //         })
    //         console.log('add')
    //     }, 1000)

    //     return () => clearInterval(timer)
    // }, []);

    const messageWrapper = <div className="message-wrapper">
        <div className={`message-${position}`}>
            {
                transitions((style, item) =>
                    <MessageItem  onClose={remove} {...item}>
                        <animated.div key={item.id} className={`message-item`} style={{ ...style }}>
                            {item.content}
                        </animated.div>
                    </MessageItem>
                )
                // messageList.top.map((item, index) => {
                //     return(
                //         transitions((style) => (
                //         <animated.div key={index} style={{ ...style,width: 100, lineHeight: '30px', border: '1px solid #000', margin: '20px' }}>
                //             {item.content}
                //         </animated.div>))
                //     )

                // })
            }
        </div>
    </div>

    const el = useMemo(()=>{
        const el = document.createElement('div');
        el.className = 'wrapper';
        document.body.appendChild(el);
        return el
    },[])
    
    return createPortal(messageWrapper, el)
})