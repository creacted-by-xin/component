import React, { useEffect, useState, type ChangeEvent, type ReactElement } from "react";
import { useContext } from "react";
import FormContext from "./FormContext";
import Schema from "async-validator";

interface ItemProps {
    label?: string,
    name?: string,
    rules?: Record<string, any>[]
    children?: ReactElement
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
    const {label, name, rules, children} = props;

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
        if(Array.isArray(rules) && rules.length){
            const validator= new Schema({
                [name]:rules.map(rule=>{
                    return {type: 'string',
                            ...rule
                    }
                })
            });

            validator.validate({[name]: value}, (errors)=>{
                if(errors){
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

    useEffect(()=>{validateRegister?.(name,handleValidate)},[value, name, validateRegister]);

    if (!children){return };

    const childrenShow = React.Children.toArray(children).length > 1 ? 
    children : React.cloneElement(children as ReactElement<React.JSX.IntrinsicElements['input']> , {
        onChange: (e: ChangeEvent<HTMLInputElement>)=>{
            const value = getValueFromEvent(e);
            setValue(value);
            onValueChange?.(name, value);

            handleValidate(value);
        }
    });

    return (
        <div>
            {label && <label>{label}</label>}
            {childrenShow}
             {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )

};

export default Item