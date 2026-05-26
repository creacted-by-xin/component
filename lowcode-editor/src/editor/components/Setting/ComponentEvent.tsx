import { Collapse, type CollapseProps, Button, Empty, message, Tooltip } from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import { useState } from 'react';
import ActionModal from './ActionModal';
import { type JumpLinkConfig } from './action/JumpLink';
import { type ShowMessageConfig } from './action/ShowMessage';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EllipsisTooltip from '../common/EllipsisTooltip';
import type { ComponentEvent } from '../../interface';

export default function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [curEvent, setCurEvent] = useState(null);

  function handleDelete(event: ComponentEvent, index) {
    if (!curComponent) return;

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(curComponentId, {
      [event.name]: {
        actions: actions
      }
    });
  };

  if (!curComponent) return null;
  const items: CollapseProps['items'] = componentsConfig?.[curComponent.name]?.events?.map(event => ({
    key: event.name,
    label: <div className='flex justify-between items-center'>
      <div>{event.label}</div>
      <Button type='primary' onClick={(e) => {
        e.stopPropagation();
        setModalVisible(true);
        setCurEvent(event)
      }}>添加动作</Button>
    </div>,
    children:
      (curComponent?.props?.[event.name]?.actions?.length === (0 || null || undefined)) ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无动作' />
        :
        <div>
          {
            curComponent?.props?.[event.name]?.actions?.map((action: JumpLinkConfig | ShowMessageConfig, index: number) => {

              return (<div className='group flex justify-between items-center mb-2 p-2 border rounded-xl'>
                <div className='flex flex-col font-bold'>
                  <div className=''>消息类型：<span className='f text-blue-400'>
                    {action.type === 'jumpLink' ? '跳转链接' : action.config?.type === 'success' ? '成功提示' : '错误提示'}
                  </span></div>
                  <div className='flex flex-1'>
                    <span className='shrink-0'>
                      {action.type === 'jumpLink' ? '链接：' : '内容：'}
                    </span>

                    <EllipsisTooltip
                      title={action.type === 'jumpLink' ? action.url : `文本-${action.config?.text}`}
                      className='text-orange-400'
                    >
                      {action.type === 'jumpLink' ? action.url : `文本-${action.config?.text}`}
                    </EllipsisTooltip>
                  </div>

                </div>
                <div className='flex gap-1 text-gray-400'>
                  <EditOutlined className=' **:group-hover:text-red-400 cursor-pointer' />
                  <DeleteOutlined className=' **:group-hover:text-red-400 cursor-pointer ' 
                    onClick={() => handleDelete(event, index)} />
                </div>
              </div>)
            })
          }
        </div>
  }
  ));
  
  const hendleModalOk = (config?: JumpLinkConfig | ShowMessageConfig) => {
    if (!curComponent || !curEvent || !config) return null;

    setModalVisible(false);

    updateComponentProps(curComponentId, {
      ...curComponent.props,
      [curEvent.name]: {
        actions: [
          ...curComponent.props[curEvent.name]?.actions || [],
          config
        ]
      }
    })
  };

  return (
    <div className="mt-2 px--2 ">
      <Collapse items={items} defaultActiveKey={componentsConfig?.[curComponent.name]?.events?.map(item => item.name)} />
      <ActionModal
        visible={modalVisible}
        handleOk={hendleModalOk}
        handleCancel={() => setModalVisible(false)}
      />
    </div>
  )
}
