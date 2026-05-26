import { Modal, Segmented } from 'antd';
import { useState } from 'react';
import JumpLink from './action/JumpLink';
import ShowMessage from './action/ShowMessage';
import { type JumpLinkConfig } from './action/JumpLink';
import { type ShowMessageConfig } from './action/ShowMessage';

interface ActionModalProps {
    visible: boolean,
    handleOk?: (config: JumpLinkConfig | ShowMessageConfig) => void,
    handleCancel?: () => void,
};

export default function ActionModal({ visible, handleOk, handleCancel }: ActionModalProps) {
    const [key, setKey] = useState('访问链接');
    const [curConfig, setCurConfig] = useState<JumpLinkConfig | ShowMessageConfig | null>(null);
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState<ShowMessageConfig['config']>({
        type: 'success',
        text: ''
    });

    const reset = () => {
        setCurConfig(null);

        setUrl('');
        setMessage({
            type: 'success',
            text: ''
        });
    };

    return (
        <Modal
            title="配置事件"
            open={visible}
            okText="增加"
            cancelText="取消"
            onOk={() => {
                handleOk(curConfig);
                reset();
            }}
            // 提交本次配置
            onCancel={()=>{handleCancel(); reset()}}
        >
            <div className='h-80'>
                <Segmented value={key} onChange={setKey} options={['访问链接', '消息提示', '自定义 JS']} block />
                {key === '访问链接' && <JumpLink defaultValue={url} onChange={(config) => { setCurConfig(config) }} />}
                {key === '消息提示' && <ShowMessage defaultValue={message} onChange={(config) => { setCurConfig(config) }} />}
                {key === '自定义 JS' && <p>自定义JS配置内容</p>}
            </div>
        </Modal>
    )
}