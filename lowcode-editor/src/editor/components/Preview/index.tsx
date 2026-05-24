import React from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import {type ComponentType } from "../../stores/components";
import { message } from "antd";

export default function Preview() {
  const { components} = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();

  function handleEvent(component: ComponentType) {
    const props: Record<string, any> = {};

    componentsConfig[component.name].events?.forEach( event => {
      const eventConfig = component.props[event.name];
      console.log('eventConfig---', eventConfig);

      if(eventConfig) {
        const { type } = eventConfig;


        props[event.name] = ()=> {
          if(type === 'jumpLink' && eventConfig.url) {
            console.log('111')
            window.location.href = eventConfig.url
          } else if(type === 'showMessage' && eventConfig.config) {
            if(eventConfig.config.type === 'success') {
              message.success(`成功：${eventConfig.config.text || '请输入成功提示文本'}`);
            } else if(eventConfig.config.type === 'error') {
              message.error(`错误：${eventConfig.config.text || '请输入错误提示文本'}`);
            } 
          }
        }
      }
    });
    console.log('拿到props---', props);
    return props;
  };

  function renderCommponents(components: ComponentType[]): React.ReactNode{
    return components.map((component: ComponentType)=>{
      // 拿到对应的配置对象
      const config = componentsConfig?.[component.name];

      // 配置对象是否配置了该组件
      // 没配置
      if(!config?.prod) return null;
      // 配置了
      return React.createElement(config.prod, 
        {
          key: component.id,
          id: component.id,
          name: component.name,
          style: component.style,
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component)
        },
        renderCommponents(component.children || []))
    })
  };

  return (
    <div>
      {renderCommponents(components)}
    </div>
  )
}
