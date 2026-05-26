import { Input, Select } from 'antd';
import { useState } from 'react';
import { useComponentsStore } from '../../../stores/components';

export interface ShowMessageConfig {
    type: 'showMessage',
    config: {
        type: 'success' | 'error' ,
        text: string
    }
};

export interface ShowMessageProps {
    defaultValue?: ShowMessageConfig['config'],
    onChange?: (config: ShowMessageConfig) => void
};

export default function ShowMessage(props: ShowMessageProps) {
    const { defaultValue, onChange } = props;
    const { curComponentId } = useComponentsStore();

    const [type, setType] = useState<'success' | 'error' >(defaultValue?.type || 'success');
    const [text, setText] = useState<string>(defaultValue?.text || '');

    function messageTypeChange(value: 'success' | 'error') {
        if (!curComponentId) return;

        setType(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type: value,
                text
            }
        })
    };

    function messageTextChange(value: string) {
        if (!curComponentId) return;

        setText(value);
        onChange?.({
            type: 'showMessage',
            config: {
                type,
                text: value
            }
        })
    }

    return <div className='mt-4'>
        <div className='flex items-center '>
            <div>类型：</div>
            <Select
            className='w-22'
                value={type}
                options={[
                    { label: '成功', value: 'success' },
                    { label: '失败', value: 'error' }
                ]}
                onChange={value => messageTypeChange(value)}
            />
        </div>
        <div  className='flex items-center mt-4'>
            <div  className="shrink-0 whitespace-nowrap" >文本：</div>
            <Input
                value={text}
                onChange={e => messageTextChange(e.target.value)}
            />
        </div>
    </div>
}