import { useMemo } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import MaterialItem from "./MaterialItem";

export default function Materail() {
  const {componentsConfig} = useComponentConfigStore();

  const components = useMemo(()=>{
    return Object.values(componentsConfig).filter((item)=> item.name !== 'Page');
  },[componentsConfig]);

  return (
    <div className='p-4 flex gap-3 flex-wrap'>{
      components.map((component: Record<string, any>, index: number)=>{
        return <MaterialItem label={component.desc}name={component.name} key={component.name + index}/>
      })
      }</div>
  )
}
