import { Table as AntdTable } from 'antd';
import React, { useEffect, useMemo, useState } from "react";
import { type CommonComponentProps } from "../../interface";
import { set } from 'lodash-es';
import axios from 'axios';
import dayjs from 'dayjs';

const Table = ({ url, children }: CommonComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Record<string, any>[]>([{
        name: '小红',
        sex: '女',
        age: 20
    }]);

    const getDate = async () => {
        if(url) {
            setLoading(true);

            const { data } = await axios.get(url);
            setData(data);

            setLoading(false);
        }
    };

    useEffect(() => {
        getDate();
    }, []);

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