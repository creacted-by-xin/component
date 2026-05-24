import {type CommonComponentProps } from "../../interface";

export default function Container({id, name, children, style}: CommonComponentProps) {

  return (
    // 业务数据id，用自定义ID
    <div  
    className={` p-5 `}
    style={style}
    >{children}</div>
  )
}
