import { Form as AntdForm, Input, DatePicker } from 'antd';
import React, { useRef, useEffect, useMemo } from "react";
import { useMamerialDrop } from '../../hooks/useMamerialDrop';
import { useDrag } from 'react-dnd';
import { type CommonComponentProps } from "../../interface";

const Form = ({ id, name, children, style, onFinish }: CommonComponentProps) => {
    const ref = useRef(null);
    const [form] = AntdForm.useForm();

    const { canDrop, drop } = useMamerialDrop(id, ['FormItem']);

    const [, drag] = useDrag(() => ({
        type: 'Form',
        item: {
            type: 'Form',
            id,
            dragType: 'move'
        }
    }));

    useEffect(() => {
        drop(ref)
        drag(ref)
    }, []);

    const formItems = useMemo(() => {
        console.log('zengjiaz')
        return (
            React.Children?.map(children, (item: any) => {
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
            className={`border min-h-25 p-5 ${canDrop ? 'border-2 border-blue-700' : ''} `}
            style={style}>
            <AntdForm form={form}>
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