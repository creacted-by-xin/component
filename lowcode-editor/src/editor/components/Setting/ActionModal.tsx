import { Modal, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import JumpLink from './actions/JumpLink';
import ShowMessage from './actions/ShowMessage';
import ComponentMethod from './actions/ComponentMethod';
import CustomJS from './actions/CustomJS';
import { type JumpLinkConfig } from './actions/JumpLink';
import { type ShowMessageConfig } from './actions/ShowMessage';
import { type CustomJSConfig } from './actions/CustomJS';
import { type ComponentMethodConfig } from './actions/ComponentMethod';

export type ConfigType = JumpLinkConfig | ShowMessageConfig | CustomJSConfig | ComponentMethodConfig;

interface ActionModalProps {
    visible: boolean,
    value?: ConfigType,
    mode: 'add' | 'edit',
    handleOk: (config?: ConfigType) => void,
    handleCancel: () => void
};

const typeToLabel = {
    jumpLink: '访问链接',
    showMessage: '消息提示',
    componentMethod: '组件方法',
    customJS: '自定义 JS'
} as const;

export default function ActionModal({ visible, value, mode, handleOk, handleCancel }: ActionModalProps) {
    const [key, setKey] = useState('访问链接');
    const [curConfig, setCurConfig] = useState<ConfigType | null>(null);

    useEffect(() => {
        if (!visible) return;

        if (value) {
            setKey(typeToLabel[value.type]);
            setCurConfig(value)
        } else {
            setKey('访问链接');
            setCurConfig({
                type: 'jumpLink',
                url: '',
            });
        }
    }, [visible, value])

    const reset = () => {
        setCurConfig(null);
        setKey('访问链接');
    };

    return (
        <Modal
            title={mode === 'edit' ? '编辑事件' : '配置事件'}
            open={visible}
            destroyOnHidden
            okText={mode === 'edit' ? '保存' : '添加'}
            cancelText="取消"
            onOk={() => {
                handleOk?.(curConfig ?? undefined);
                reset();
            }}
            // 提交本次配置
            onCancel={() => { handleCancel?.(); reset() }}
        >
            <div className='h-80'>
                <Segmented value={key} onChange={setKey} options={['访问链接', '消息提示', '组件方法', '自定义 JS']} block />
                {key === '访问链接' &&
                    <JumpLink
                        key='jumpLink'
                        value={curConfig?.type === 'jumpLink' ? curConfig.url : ''}
                        onChange={(config) => { setCurConfig(config) }} />}
                {key === '消息提示' &&
                    <ShowMessage
                        key='showMessage'
                        value={curConfig?.type === 'showMessage' ? curConfig.config : undefined}
                        onChange={(config) => { setCurConfig(config) }} />}
                {key === '组件方法' &&
                    <ComponentMethod
                        key='componentMethod'
                        value={curConfig?.type === 'componentMethod' ? curConfig.config : undefined}
                        onChange={(config) => { setCurConfig(config) }} />}
                {key === '自定义 JS' &&
                    <CustomJS
                        key='customJS'
                        value={curConfig?.type === 'customJS' ? curConfig.code : undefined}
                        onChange={(config) => { setCurConfig(config) }} />}
            </div>
        </Modal>
    )
}
