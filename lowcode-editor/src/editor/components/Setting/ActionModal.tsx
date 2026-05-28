import { Modal, Segmented } from 'antd';
import { useState } from 'react';
import JumpLink from './actions/JumpLink';
import ShowMessage from './actions/ShowMessage';
import CustomJS from './actions/CustomJS';
import { type JumpLinkConfig } from './actions/JumpLink';
import { type ShowMessageConfig } from './actions/ShowMessage';
import { type CustomJSConfig } from './actions/CustomJS';

export type ConfigType = JumpLinkConfig | ShowMessageConfig | CustomJSConfig;

interface ActionModalProps {
    curModal: string,
    visible: boolean,
    handleOk?: (config?: ConfigType) => void,
    handleCancel?: () => void,
};

export default function ActionModal({ curModal, visible, handleOk, handleCancel }: ActionModalProps) {
    const [key, setKey] = useState(curModal ||'访问链接');
    const [curConfig, setCurConfig] = useState<JumpLinkConfig | ShowMessageConfig | CustomJSConfig | null>(null);

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
                handleOk?.(curConfig?? undefined);
                reset();
            }}
            // 提交本次配置
            onCancel={()=>{handleCancel?.(); reset()}}
        >
            <div className='h-80'>
                <Segmented value={key} onChange={setKey} options={['访问链接', '消息提示', '自定义 JS']} block />
                {key === '访问链接' && <JumpLink onChange={(config) => { setCurConfig(config) }} />}
                {key === '消息提示' && <ShowMessage  onChange={(config) => { setCurConfig(config) }} />}
                {key === '自定义 JS' && <CustomJS onChange={(config) => { setCurConfig(config) }} />}
            </div>
        </Modal>
    )
}
