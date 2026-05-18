import { useMemo } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import MaterialItem from "./MaterialItem";


export default function Materail() {
  const {componentConfig} = useComponentConfigStore();

  const components = useMemo(()=>{
    return Object.values(componentConfig).filter(item=> item.name !== 'Page');
  },[componentConfig]);

  return (
    <div>{
      components.map((component, index)=>{
        return <MaterialItem name={component.name} key={component.name + index}/>
      })
      }</div>
  )
}
