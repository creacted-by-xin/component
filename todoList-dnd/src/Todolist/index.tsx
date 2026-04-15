import type { FC } from "react";
import { List } from "./List";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import './index.css';

interface TodolistProps {

};

export const Todolist: FC<TodolistProps> = ()=> {
    return <div className=" border-2 border-solid 
    w-250 h-150 m-auto mt-10 p-10
    flex justify-between items-start">
        <div className=" flex-2 h-full mr-10 overflow-y-auto overflow-x-hidden">
            <List></List>
        </div>
        <div className="flex-1 h-full flex flex-col justify-start gap-10">
            <NewItem></NewItem>
            <GarbageBin ></GarbageBin>
        </div>
    </div>
}