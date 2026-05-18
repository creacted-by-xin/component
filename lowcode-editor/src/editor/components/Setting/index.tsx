import { useState } from "react";
import { useComponentsStore } from "../../stores/components";
import { Segmented } from 'antd';
import ComponentAttr from "./ComponentAttr";
import ComponentStyle from "./ComponentStyle";
import ComponentEvent from "./ComponentEvent";

export default function Setting() {
  const { components } = useComponentsStore();
  const [ key, setKey ] = useState('属性')
  return (
    <div className="setting-scroll h-full overflow-auto">
      <Segmented value={key} onChange={setKey}
      options={['属性', '样式', '事件']} block />
      { key==='属性' && <ComponentAttr/>}
      { key==='样式' && <ComponentStyle/>}
      { key==='事件' && <ComponentEvent/>}
    </div>
  )
}
