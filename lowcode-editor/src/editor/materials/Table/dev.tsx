import { Table as AntdTable } from 'antd';
import React, { useRef, useEffect, useMemo } from "react";
import { useMamerialDrop } from '../../hooks/useMamerialDrop';
import { useDrag } from 'react-dnd';
import { type CommonComponentProps } from "../../interface";

const Table = ({ id, name, children, style }: CommonComponentProps) => {
    const ref = useRef(null);

    const { canDrop, drop } = useMamerialDrop(id, ['TableColumn']);

    const [, drag] = useDrag(() => ({
        type: 'Container',
        item: {
            type: 'Container',
            id,
            dragType: 'move'
        }
    }));

    useEffect(() => {
        drop(ref)
        drag(ref)
    }, []);

    const columns = useMemo(() => {
        return React.Children?.map(children, (item: any) => ({
            title: <div data-component-id={item.props?.id}>{item.props?.title}</div>,
            dataIndex: item.props?.dataIndex,
            key: item,
        }))
    }, [children]);

    return (
        <div
            data-component-id={id}
            ref={ref}
            className={`border min-h-25 p-5 ${canDrop ? 'border-2 border-blue-700' : ''} `}
            style={style}>
            <AntdTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>)
};

export default Table;