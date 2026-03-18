import { createContext } from "react";

export interface FromContextProps {
    // 汇总表单键值对
    values?: Record<string, any>,
    // 更新--汇总表单键值对
    setValues?: (values:Record<string, any>)=> void,
    // 单个表单键值对修改时，更新
    onValueChange?: (key: string, value: any)=> void,
    // 校验注册器
    validateRegister?: (name: string, cb: Function)=> void,
    reset?: boolean
};

export default createContext<FromContextProps>({})