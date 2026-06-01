import React, {useRef} from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { type ComponentType } from "../../stores/components";
import { message } from "antd";
import { type ConfigType } from "../Setting/ActionModal";
import { type ComponentEvent } from "../../interface";


export default function Preview() {
  const { components } = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();
  const componentRefs = useRef<Record<string, any>>({});

  function handleEvent(component: ComponentType) {
    const props: Record<string, any> = {};

    // 拿到组件的配置对象onClick、onMouseEnter等事件
    componentsConfig[component.name].events?.forEach((event: ComponentEvent) => {
      // 拿到组件配置的事件对应的配置对象
      const eventConfig = component.props[event.name];
      // 如果配置了事件
      if (eventConfig) {
        // 根据事件类型，生成对应的事件处理函数
        // props[onClick]函数
        props[event.name] = () => {
          (eventConfig.actions?.forEach((action:ConfigType) => {
            switch (action.type) {
              case 'jumpLink':
                if (action.url) {
                  window.location.href = action.url;
                }
                break;
              case 'showMessage':
                if (action.config) {
                  if (action.config.type === 'success') {
                    message.success(`成功：${action.config.text || '请输入成功提示文本'}`);
                  } else if (action.config.type === 'error') {
                    message.error(`错误：${action.config.text || '请输入错误提示文本'}`);
                  }
                }
                break;
                case 'customJS':
                  const func = new Function('context', action.code);
                  func({
                    name: component.name,
                    porps: component.name,
                    showMessage(content: string) {
                       message.success(content)
                    }
                  });
                break;
                case 'componentMethod':
                  // 拿到组件实例，调用对应方法
                  const componentMethods = componentRefs.current[action.config.componentId];
                   
                  if(componentMethods) {
                    componentMethods[action.config.method]?.();
                  };
                  break;
            }
          })
          )
        }
      }
    });
    // 返回处理后的事件props
    return props;
  };


  function renderCommponents(components: ComponentType[]): React.ReactNode {
    return components.map((component: ComponentType) => {
      // 拿到对应的配置对象
      const config = componentsConfig?.[component.name];

      // 配置对象是否配置了该组件
      // 没配置
      if (!config?.prod) return null;
      // 配置了
      return React.createElement(config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          style: component.style,
          ref: (ref: Record<string, any>) => {componentRefs.current[component.id] = ref;},
          ...config.defaultProps,
          // 事件处理函数
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
