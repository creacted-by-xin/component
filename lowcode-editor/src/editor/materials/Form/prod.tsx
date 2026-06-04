import { Form as AntdForm, Input, DatePicker } from 'antd';
import React, { useMemo, type ForwardRefRenderFunction, useImperativeHandle } from "react";
import { type CommonComponentProps } from "../../interface";
import dayjs from 'dayjs';

interface ForRef {
    submit: ()=> void,
    reset: ()=> void
};

const Form: ForwardRefRenderFunction<ForRef, CommonComponentProps> = ({ id, name, children, style, onFinish }, ref) => {
    const [form] = AntdForm.useForm();

    useImperativeHandle(ref,() => {
        return {
            submit: ()=> {form.submit(); console.log('123')},
            reset: ()=> form.resetFields(),
        }
    })

    const formItems = useMemo(() => {
        console.log('zengjiaz')
        return (
            React.Children?.map(children, (item: any) => {
                console.log({
                    label: item.props?.label,
                    name: item.props?.name,
                    type: item.props?.type,
                    id: item.props?.id
                })
                return ({
                    label: item.props?.label,
                    name: item.props?.name,
                    type: item.props?.type,
                    id: item.props?.id
                })
            })
        )
    }, [children]);

    const save = (values: any) => {
         Object.keys(values).forEach(key => {
            if (dayjs.isDayjs(values[key])) {
                values[key] = values[key].format('YYYY-MM-DD')
            }
        })

        onFinish(values);
    };

    return (
        <div
            data-component-id={id}
            ref={ref}
            className={`border min-h-25 p-5 } `}
            style={style}>
            <AntdForm form={form} onFinish={save}>
                {
                    formItems.map((item: any) => {
                        return (
                            <AntdForm.Item
                                data-component-id={item.id}
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                rules={item.rules === 'required' ? [{ required: true, message: `${item.label}不能为空` }] : []}
                            >
                                {item.type === 'input' && <Input />}
                                {item.type === 'date' && <DatePicker />}
                            </AntdForm.Item>
                        )
                    })
                }
            </AntdForm>
        </div>)
};

export default Form;