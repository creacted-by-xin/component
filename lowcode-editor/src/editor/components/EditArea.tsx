import React, { useEffect } from "react";
import { useComponentsStore, type ComponentType } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";

export default function EditArea() {
  const { components, addComponent, deleteComponent, updateComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    addComponent({
      id: 222,
      name: 'Container',
      props: {},
      children: [],
    }, 1);

    addComponent({
      id: 333,
      name: 'Container',
      props: {
         text: '无敌'
      },
      children: [],
    }, 222);

    setTimeout(()=> {
      deleteComponent(333)
    }, 3000);

    setTimeout(()=> {
      updateComponent(222, {title: '666'})
    }, 5000)
  }, []);

  function renderConponents(components: ComponentType[]): React.ReactNode{
    return components.map((component: ComponentType)=>{
      // 拿到对应的配置对象
      const config = componentConfig?.[component.name];

      // 配置对象是否配置了该组件
      // 没配置
      if(!config?.component) return null;

      // 配置了
      return React.createElement(config.component, 
        {
          key: component.id,
          ...config.defaultProps,
          ...component.props
        },
        renderConponents(component.children || []))
    })
  };

  return (
    <div>
      <pre>
        {
          // JSON.stringify() 的作用：把 JavaScript 对象 / 数组，变成字符串。
          // React 不能直接把对象渲染到页面，所以必须先用 JSON.stringify 转成字符串，才能显示在页面上。
          JSON.stringify(components, null, 2)
        }
      </pre>
      {renderConponents(components)}
    </div>
  )
}
