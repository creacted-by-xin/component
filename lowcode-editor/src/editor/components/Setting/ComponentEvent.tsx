import { Collapse, type  CollapseProps, Button} from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import { useState} from 'react';
import ActionModal from './ActionModal';
import { type JumpLinkConfig } from './action/JumpLink';
import { type ShowMessageConfig } from './action/ShowMessage';

export default function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [curEvent, setCurEvent] = useState(null);

  if(!curComponent) return null;
  const items: CollapseProps['items'] = componentsConfig?.[curComponent.name]?.events?.map(event=>({
    key: event.name,
    label: <div className='flex justify-between items-center'>
      <div>{event.label}</div>
      <Button type='primary' onClick={()=>{
        setModalVisible(true);
        setCurEvent(event)
        }}>添加动作</Button>
    </div>,
  }));

  const hendleModalOk = (config?: JumpLinkConfig | ShowMessageConfig)=>{
    if(!curComponent || !curEvent || !config) return null;

    setModalVisible(false);

    updateComponentProps(curComponentId, {
      ...curComponent.props,
      [curEvent.name]: {
          ...curComponent.props[curEvent.name]?.action || [],
          ...config
      }
    })
  };



  return (
    <div className="mt-2 px-2.5 ">
      <Collapse items={items} />
      <ActionModal 
      visible={modalVisible} 
      handleOk={hendleModalOk} 
      handleCancel={()=> setModalVisible(false)}
      />
    </div>
  )
}
