import React, { useEffect, useState, type ChangeEvent, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { useContext } from "react";
import FormContext from "./FormContext";
import Schema from "async-validator";

interface ItemProps {
    className?: string,
    style?: CSSProperties,
    label?: string,
    name?: string,
    rules?: Record<string, any>[]
    children?: ReactNode
};

const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>)=>{
    const{target} = e;
    if(target.type === 'checkbox') {
        return target.checked;
    } else if (target.type === 'radio'){
        return target.value;
    }

    return target.value

};

const Item = (props: ItemProps)=>{
    const {label, name, rules, style, children} = props;

    if(!name){return children};

    const [value, setValue] = useState<string | number | boolean>();
    const [error, setError] = useState('');

    const {values, setValues, onValueChange, validateRegister} = useContext(FormContext);

    // value同步values
    useEffect(()=>{
        if(value!== values?.[name]){
            setValue(values?.[name]);
        }
    },[values, values?.[name]]);

    // 创建校验器
    const handleValidate = (value: any)=>{
        let errorMsg = null;
        if(name === 'agree'){
                    if(value === 'false'){
                        console.log('agree',value)
                        errorMsg = '请阅读协议！';
                        setError(errorMsg)
                    }
                }
        if(Array.isArray(rules) && rules.length){
            const validator= new Schema({
                [name]:rules.map(rule=>{
                    return {
                            ...rule
                    }
                })
            });

            validator.validate({[name]: value}, (errors)=>{
                if(errors  && name!== 'agree'){
                    if(errors.length){
                        setError(errors[0].message!);
                        errorMsg = errors[0].message;
                    }
                }else{
                    setError('')
                    errorMsg= null
                }
            })
        }
        return errorMsg;
    }

    useEffect(()=>{
        validateRegister?.(name, ()=>handleValidate(value))
    },
    [value, name, validateRegister]);

    if (!children){return };


    const childrenShow = React.Children.toArray(children).length > 1 ? 
    children : React.cloneElement(children as any, {
        onChange: (e: ChangeEvent<HTMLInputElement>)=>{
            const value = getValueFromEvent(e);
            console.log('value',value)
            
            onValueChange?.(name, value);
            setValue(value);
            handleValidate(value);
        }
    });

    return (
        <div style={style}>
            {label && <span style={{position:'relative', 
                marginRight: '6px',
                display:'inline-block',
                width:'60px'}}>{label}:
                <label style={{position:'absolute'}}></label>
                </span>}
            {childrenShow}
             {label && error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )

};

export default Item