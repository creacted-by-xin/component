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

    return (
        <div
            data-component-id={id}
            ref={ref}
            className={`w-full p-5 border min-h-25  ${canDrop ? 'border-2 border-blue-700' : ''} `}
            style={style}>
            <AntdForm form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                {
                    formItems.map((item: any) => {
                        return (
                            <AntdForm.Item
                                data-component-id={item.id}
                                key={item.name}
                                name={item.name}
                                label={item.label}
                            >
                                <Input style={{pointerEvents: 'none'}}/>
                            </AntdForm.Item>
                        )
                    })
                }
            </AntdForm>
        </div>)
};

export default Form;