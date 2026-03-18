import { useState, useRef, type CSSProperties, type ReactElement, type FormEvent, type ReactNode, forwardRef } from "react";
import FormContext from "./FormContext";
import classNames from "classnames";

interface FormProps {
    className?: string,
    style?: CSSProperties,
    initialValues?: Record<string, any>,
    onFinish?: (values: Record<string, any>) => void,
    onFinishFailed?: (errors: string) => void,
    children?: ReactNode
}

const Form = (props: FormProps) => {
    const { className, style, initialValues, onFinish, onFinishFailed, children } = props;
    const [values, setValues] = useState<Record<string, any>>(initialValues || {});
    const errors = useRef<Record<string, any>>({});
    const validatorMap = useRef(new Map<string, Function>());

    // 单个值变化时
    const onValueChange = (key: string, value: any) => {
        console.log('values',values)
        setValues(prevValues=>({...prevValues,[key]: value}))
        
    }

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
        console.log('errors',errors)

        // 去除null值
        const errorsList = Object.values(errors.current).filter(Boolean);

        // 根据错误长度，执行函数
        if (errorsList.length) {
            onFinishFailed?.(errorsList[0])
        } else {
            onFinish?.(values)
        }
    };

    const validateRegister = (name: string, cbFunction: Function) => {
        validatorMap.current.set(name, cbFunction)
    };

    const cl = classNames('ant-form', className)

    return (
        <FormContext.Provider
            value={{
                values: values,
                setValues: (values) => setValues(values),
                onValueChange,
                validateRegister
            }}>
                <form className={cl} style={style} onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    )
};

export default Form;