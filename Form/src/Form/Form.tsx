import { useState, useRef, type CSSProperties, type ReactElement, type FormEvent, type ReactNode, forwardRef, useImperativeHandle } from "react";
import FormContext from "./FormContext";
import classNames from "classnames";
import Messaage from './index';
import { Button, message, Space } from 'antd';

interface FormProps {
    className?: string,
    style?: CSSProperties,
    initialValues?: Record<string, any>,
    onFinish?: (values: Record<string, any>) => void,
    onFinishFailed?: (errors: string) => void,
    children?: ReactNode
};

export interface FormRefType {
    getReset: ()=>void
}

const Form = forwardRef<FormRefType, FormProps>((props, ref) => {
    const { className, style, initialValues, onFinish, onFinishFailed, children } = props;
    const [values, setValues] = useState<Record<string, any>>(initialValues || {});
    const errors = useRef<Record<string, any>>({});
    const validatorMap = useRef(new Map<string, Function>());
    const [reset, setReset] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const error = (error: string) => {
    messageApi.open({
      type: 'error',
      content: error,
      duration: 2,
    });
  };

    useImperativeHandle(ref,()=>{
        return {
            getReset(){
                setValues(initialValues || {})
                setReset(true);
            }
            }
        }
    ,[initialValues])

    // 单个值变化时
    const onValueChange = (key: string, value: any) => {
        setValues(prevValues=>({...prevValues,[key]: value}));
        setReset(false);
    };


    // 提交时，走一遍所有校验器内的校验函数
    // 函数返回的错误保存在errors对象内部
    // 根据errors的非null，执行成功失败函数
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        for (let [key, cbfunction] of validatorMap.current) {
            if (typeof cbfunction === 'function') {
                errors.current[key] = cbfunction()
            }
        };

        // 去除null值
        const errorsList = Object.values(errors.current).filter(Boolean);

        // 根据错误长度，执行函数
        if (errorsList.length) {
            onFinishFailed?.(errorsList[0]);
            error(errorsList[0])
        } else {
            onFinish?.(values)
        }
    };

    const validateRegister = (name: string, cbFunction: Function) => {
        validatorMap.current.set(name, cbFunction)
    };

    const cl = classNames('ant-form', className)

    return (
        <>
        {contextHolder}
        <FormContext.Provider
            value={{
                values: values,
                setValues: (values) => setValues(values),
                onValueChange,
                validateRegister,
                reset
            }}>
                <form className={cl} style={style} onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider></>
    )
});

export default Form;