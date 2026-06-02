import { Table as AntdTable } from 'antd';
import React, { useMemo, useState } from "react";

import { type CommonComponentProps } from "../../interface";

const Table = ({ url, children }: CommonComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Record<string, any>[]>([{
        name: '小红',
        sex: '女',
        age: 20
    }]);

    const columns = useMemo(() => {
        return React.Children?.map(children, (item: any) => {
            if (item.props?.type === 'date') {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                    render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : null,
                }
            } else {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                }
            }
        })
    }, [children]);

    return (
        <div >
            <AntdTable
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={loading}
                rowKey="id"
            />
        </div>)
};

export default Table;