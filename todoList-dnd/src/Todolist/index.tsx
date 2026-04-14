import type { FC } from "react";
import { List } from "./List";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import './index.css';

interface TodolistProps {

};

export const Todolist: FC<TodolistProps> = ( props)=> {
    return <div className=" border-2 border-solid 
    w-250 h-150 m-auto mt-10 p-10
    flex justify-between items-start">
        <div className=" flex-2 h-full bg-blue-400 mr-10">
            <List></List>
        </div>
        <div className="flex-2 h-full bg-blue-400">
            <NewItem></NewItem>
            <GarbageBin></GarbageBin>
        </div>
    </div>
}