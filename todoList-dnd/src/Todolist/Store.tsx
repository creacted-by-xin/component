import { create } from 'zustand'; 
import { persist } from 'zustand/middleware';

export interface ListItem {
    id: number,
    status: 'todo' | 'done',
    content: string
};

interface StoreType {
    list: ListItem[],
    addItem: (item: ListItem)=> void,
    deleteItem: (id: number)=> void,
    updateItem: (updateItem: ListItem)=> void,
}


export const useTodoListStore = create (persist<StoreType>(((set)=> ({
    list: [],
    addItem: (item: ListItem)=> set((state)=> ({list: [...state.list, item]})),
    deleteItem: (id: number)=> set(state => ({list: state.list.filter(item=>item.id!==id)})),
    updateItem: (updateItem: ListItem)=> set(state => ({list: state.list.map(item=> {
        if(item.id === updateItem.id){
            return updateItem
        }
        return item
    })}))
})),{
    name: 'todolist'
}))


