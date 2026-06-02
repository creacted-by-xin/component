import { Collapse, type CollapseProps, Button, Empty } from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import { useState } from 'react';
import ActionModal from './ActionModal';
import { type ConfigType } from './ActionModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EllipsisTooltip from '../common/EllipsisTooltip';
import type { ComponentEvent } from '../../interface';

export default function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 当前事件
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [editingIndex, setEditingIndex] = useState<number>();
  const [editingConfig, setEditingConfig] = useState<ConfigType>();

  function handleAdd(event: ComponentEvent) {
    setModalVisible(true);
    setCurEvent(event);
    // 不传编辑index，表示新增状态
    setEditingIndex(undefined);
  };

  function handleEdit(event: ComponentEvent, action: ConfigType, index: number) {
    setModalVisible(true);
    setCurEvent(event);
    setEditingIndex(index);
    setEditingConfig(action);
  };

  function handleDelete(event: ComponentEvent, index: number) {
    if (!curComponent) return;

    const actions = curComponent.props[event.name]?.actions;
    actions.splice(index, 1);

    updateComponentProps(curComponentId!, {
      [event.name]: {
        actions: actions
      }
    });
  };



  if (!curComponent) return null;
  const items: CollapseProps['items'] = componentsConfig?.[curComponent.name]?.events?.map((event: ComponentEvent) => ({
    key: event.name,
    label: <div className='flex justify-between items-center'>
      <div>{event.label}</div>
      <Button type='primary' onClick={e => {
        e.stopPropagation();
        handleAdd(event)
      }}>添加动作</Button>
    </div>,
    children:
      (curComponent?.props?.[event.name]?.actions?.length === (0 || null || undefined)) ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无动作' />
        :
        <div>
          {
            curComponent?.props?.[event.name]?.actions?.map((action: ConfigType, index: number) => {

              return (<div className='group flex justify-between items-center mb-2 p-2 border rounded-xl'>
                <div className='flex flex-col font-bold'>
                  <div className='flex flex-1'>
                    <span className='shrink-0'>类型：</span>
                    <EllipsisTooltip
                      title={action.type === 'jumpLink' ? '跳转链接' : (action.type === 'showMessage' ? (action.config?.type === 'success' ? '成功提示' : '错误提示') : (action.type === 'customJS' ? '自定义 JS' : `${action.config?.componentId}组件方法`))}
                      className='f text-blue-400'
                    >
                      {action.type === 'jumpLink' ? '跳转链接' : (action.type === 'showMessage' ? (action.config?.type === 'success' ? '成功提示' : '错误提示') : (action.type === 'customJS' ? '自定义 JS' : `${action.config?.componentId}组件方法`))}
                    </EllipsisTooltip>
                  </div>
                  <div className='flex flex-1'>
                    <span className='shrink-0'>
                      {action.type === 'jumpLink' ? '链接：' : (action.type === 'showMessage' ? '内容：' : (action.type === 'customJS' ? '代码：' : '方法：'))}
                    </span>

                    <EllipsisTooltip
                      title={action.type === 'jumpLink' ? action.url : (action.type === 'showMessage' ? `${action.config?.text}` : (action.type === 'componentMethod' ? `${action.config?.componentId}` : action.code))}
                      className='text-orange-400'
                    >
                      {action.type === 'jumpLink' ? action.url : (action.type === 'showMessage' ? `${action.config?.text}` : (action.type === 'componentMethod' ? `${action.config?.method === 'open' ? '打开弹窗' : '关闭弹窗'}` : action.code))}
                    </EllipsisTooltip>
                  </div>

                </div>
                <div className='flex gap-1.5 text-gray-400 cursor-pointer'>
                  <EditOutlined className='hover:text-red-400 '
                    onClick={() => handleEdit(event, action, index)}
                  />
                  <DeleteOutlined className='hover:text-red-400 '
                    onClick={() => handleDelete(event, index)} />
                </div>
              </div>)
            })
          }
        </div>
  }
  ));

  // 处理弹窗提交事件，区分 新增/编辑
  const handleModalOk = (config?: ConfigType) => {
    if (!curComponent || !curEvent || !config) return null;

    // 拿到该事件的所有actions
    const oldActions = curComponent.props[curEvent.name]?.actions || [];
    const newActions = [...oldActions]

    // 若是编辑状态
    if (editingIndex !== undefined) {
      newActions[editingIndex] = config
    } else {
      newActions.push(config)
    }

    //更新
    updateComponentProps(curComponentId!, {
      ...curComponent.props,
      [curEvent.name]: {
        actions: newActions
      }
    });

    // 关闭弹窗
    setModalVisible(false);
    setEditingIndex(undefined);
    setEditingConfig(undefined);
  };

  function handleCancel() {
    setModalVisible(false);
    setEditingIndex(undefined);
    setEditingConfig(undefined);
  };
  
  return (
    <div className="mt-2 px--2 ">
      {componentsConfig?.[curComponent.name]?.events?.length ? 
        <>
          <Collapse items={items} defaultActiveKey={componentsConfig?.[curComponent.name]?.events?.map((item: ComponentEvent) => item.name)} />
          <ActionModal
            visible={modalVisible}
            value={editingConfig}
            mode={editingIndex !== undefined ? 'edit' : 'add'}
            handleOk={handleModalOk}
            handleCancel={handleCancel}
          /> 
        </>:<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无事件配置' /> 
      }

    </div>
  )
}
