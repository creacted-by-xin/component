import { Modal, Segmented } from 'antd';
import { useState } from 'react';
import JumpLink from './action/JumpLink';
import ShowMessage from './action/ShowMessage';
import { type JumpLinkConfig } from './action/JumpLink';
import { type ShowMessageConfig } from './action/ShowMessage';

interface ActionModalProps {
    curModal: string,
    visible: boolean,
    handleOk?: (config?: JumpLinkConfig | ShowMessageConfig) => void,
    handleCancel?: () => void,
};

export default function ActionModal({ curModal, visible, handleOk, handleCancel }: ActionModalProps) {
    const [key, setKey] = useState(curModal ||'访问链接');
    const [curConfig, setCurConfig] = useState<JumpLinkConfig | ShowMessageConfig | null>(null);

    const reset = () => {
        setCurConfig(null);
        setKey('访问链接');
       
    };

    return (
        <Modal
            title="配置事件"
            open={visible}
            destroyOnHidden
            okText="增加"
            cancelText="取消"
            onOk={() => {
                handleOk?.(curConfig ?? undefined);
                reset();
            }}
            // 提交本次配置
            onCancel={()=>{handleCancel?.(); reset()}}
        >
            <div className='h-80'>
                <Segmented value={key} onChange={setKey} options={['访问链接', '消息提示', '自定义 JS']} block />
                {key === '访问链接' && <JumpLink onChange={(config) => { setCurConfig(config) }} />}
                {key === '消息提示' && <ShowMessage  onChange={(config) => { setCurConfig(config) }} />}
                {key === '自定义 JS' && <p>自定义JS配置内容</p>}
            </div>
        </Modal>
    )
}
