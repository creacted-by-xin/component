import { useEffect, useState, type ReactElement } from "react";
import { useContext } from "react";
import FormContext from "./FormContext";
import Schema from "async-validator";

interface ItemProps {
    label?: string,
    name?: string,
    rules?: Record<string, any>[]
    children?: ReactElement
}

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

    useEffect(()=>{validateRegister?.(name,handleValidate)},[value]);

};

export default Item