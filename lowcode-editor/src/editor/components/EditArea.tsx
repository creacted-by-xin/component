import React, { useState, type MouseEventHandler } from "react";
import { useComponentsStore, type ComponentType } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";
import HoverMask from "./HoverMask";
import SelectedMask from "./SelectedMask"


export default function EditArea() {
  const { components, curComponentId, setCurComponentId} = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();

  // useEffect(() => {
  //   addComponent({
  //     id: 444,
  //     name: 'Container',
  //     desc: '容器',
  //     props: {},
  //     children: [],
  //   }, 1);

  //   addComponent({
  //     id: 555,
  //     name: 'Button',
  //     desc: '按钮',
  //     props: {
  //        text: '无敌'
  //     },
  //     children: [],
  //   }, 444);
  // }, []);

  function renderCommponents(components: ComponentType[]): React.ReactNode{
    return components.map((component: ComponentType)=>{
      // 拿到对应的配置对象
      const config = componentsConfig?.[component.name];

      // 配置对象是否配置了该组件
      // 没配置
      if(!config?.component) return null;
      // 配置了
      return React.createElement(config.component, 
        {
          key: component.id,
          id: component.id,
          name: component.name,
          style: component.style,
          ...config.defaultProps,
          ...component.props
        },
        renderCommponents(component.children || []))
    })
  };

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleMouseOver: MouseEventHandler = (e)=> {
    const path = e.nativeEvent.composedPath();

    for(let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if(componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  const handleClick: MouseEventHandler = (e)=> {
    const path = e.nativeEvent.composedPath();

    for(let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if(componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div className="h-full editor-area" onMouseOver={handleMouseOver} 
    onMouseLeave={()=>{setHoverComponentId(undefined)}}
    onClick={handleClick}>
      {/* <pre>
        {
          // JSON.stringify() 的作用：把 JavaScript 对象 / 数组，变成字符串。
          // React 不能直接把对象渲染到页面，所以必须先用 JSON.stringify 转成字符串，才能显示在页面上。
          JSON.stringify(components, null, 2)
        }
      </pre> */}
      {renderCommponents(components)}
      {(hoverComponentId && hoverComponentId!==curComponentId)&& <HoverMask
      portalWrapperClassName='portal-wrapper'
      containerClassName='editor-area'
      componentId = {hoverComponentId!}
      /> }
      {curComponentId&& <SelectedMask
      portalWrapperClassName='portal-wrapper'
      containerClassName='editor-area'
      componentId = {curComponentId!}
      /> }
      <div className="portal-wrapper"></div>
    </div>
  )
}
