import { useContext } from "react";
import { ConfigContext } from "./configProvider";
export function useMessage (){

    const { messageRef } = useContext(ConfigContext)
    return messageRef?.current!;
}