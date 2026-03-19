import { useState } from "react";
import type { MessageProps, Position } from "."

type MessageList = {
    top: MessageProps[],
    bottom: MessageProps[]
}

const initialState = {
    top: [],
    bottom: []
};

// 获取ID的函数
// 第一个参数是使用自定义ID，第二个参数是避免生成已有的ID
let count = 0;
function getId(messageProps: MessageProps, messageList: MessageList) {
    if (messageProps.id) {
        return messageProps.id
    };
    // 为空不用执行
    count++;
    if (messageList) {
        const isIdExist = (count: number) => {
            // 二维数组使用some
            return Object.values(messageList).some(subArr => subArr.some(item => item.id === count))
        };
        while (isIdExist(count)) {
            count++;
        }
    }
    return count
};

// 获取position的函数
function getMessagePosition(messageList: MessageList, id: number) {
    for (const [position, list] of Object.entries(messageList)) {
        if (list.find((item) => item.id === id)) {
            return position as Position;
        }
    }
}

// 获取[position，index]的函数
function findMessage(messageList: MessageList, id: number) {
    const position = getMessagePosition(messageList, id);
    const index = position ? messageList[position as Position].findIndex((message) => message.id === id) : -1;

    return [position, index] as [Position, number]
}
export default function useStore(defaultPosition: Position) {
    // 为什么用{initialState}
    const [messageList, setMessageList] = useState<MessageList>(initialState);

    return {
        messageList,
        add: (messageProps: MessageProps) => {
            // 如果已存在，则直接返回id值
            if (messageProps.id !== undefined) {
                return messageProps?.id;
            };
            let id :number = -1;
            // 防止产生闭包陷阱
            setMessageList(prev => {
                // 基于最新的pre计算id
                id = getId(messageProps, prev);
                const position = messageProps.position || defaultPosition;

                let message = [];
                if (position === 'top') {
                    message = [{ ...messageProps, id }, ...(prev[position as Position])]
                } else {
                    message = [...(prev[position as Position]), { ...messageProps, id }]
                };
                return { ...prev, [position]: message }
            })
            return id ;
        },

        update: (id: number, messageProps: MessageProps) => {
            if (!id) return;
            const updateMessageList = { ...messageList };
            const [position, index] = findMessage(messageList, id);
            if (position && index !== -1) {
                updateMessageList[position][index] = messageProps;
                setMessageList(updateMessageList);
            }
        },

        remove: (id: number) => {
            setMessageList(prev => {
                const position = getMessagePosition(prev, id);
                if (!position) return prev;
                return { ...prev, [position]: prev[position].filter(item => item.id !== id) }
            })
        },

        clearAll: () => {
            setMessageList(initialState);
        }
    }
}