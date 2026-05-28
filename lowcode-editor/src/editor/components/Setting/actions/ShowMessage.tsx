import { Input, Select } from 'antd';
import { useState } from 'react';

export interface ShowMessageConfig {
    type: 'showMessage',
    config: {
        type: 'success' | 'error',
        text: string
    }
};

export interface ShowMessageProps {
    value?: ShowMessageConfig['config'],
    onChange?: (config: ShowMessageConfig) => void
};

export default function ShowMessage(props: ShowMessageProps) {
    const { value = { type: 'success', text: '' }, onChange } = props;
    // const { curComponentId } = useComponentsStore();

    const [type, setType] = useState<'success' | 'error'>(value?.type || 'success');
    const [text, setText] = useState<string>(value?.text || '');

    // function messageTypeChange(value: 'success' | 'error') {
    //     if (!curComponentId) return;

    //     setType(value);

    //     onChange?.({
    //         type: 'showMessage',
    //         config: {
    //             type: value,
    //             text
    //         }
    //     })
    // };

    // function messageTextChange(value: string) {
    //     if (!curComponentId) return;

    //     setText(value);
    //     onChange?.({
    //         type: 'showMessage',
    //         config: {
    //             type,
    //             text: value
    //         }
    //     })
    // }

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
                onChange={(type: 'success' | 'error') => {
                    setType(type)
                    onChange?.({
                        type: 'showMessage',
                        config: {
                            type,
                            text: value.text
                        }
                    });
                }}
            />
        </div>
        <div className='flex items-center mt-4'>
            <div className="shrink-0 whitespace-nowrap" >文本：</div>
            <Input
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    onChange?.({
                        type: 'showMessage',
                        config: {
                            type: value.type,
                            text: e.target.value
                        }
                    });
                }}
            />
        </div>
    </div>
}