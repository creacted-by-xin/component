import { Tree } from 'antd';
import { useComponentsStore } from '../../stores/components';
import type { DataNode } from 'antd/es/tree';

export default function Outline() {
  const { components, setCurComponentId, curComponentId} =useComponentsStore();

  function toTreeData(components): DataNode[] {
  return components.map((component) => ({
    title: component.desc,
    key: component.id,
    children: component.children ? toTreeData(component.children) : [],
  }));
}

  return (
    <div className='p-4'>
      <Tree
        showLine
        showIcon
        defaultExpandAll
        // fieldNames={{ title: 'desc', key: 'id' }}
        treeData={toTreeData(components)}
        selectedKeys={curComponentId ? [curComponentId] : []}
        onSelect={([selectedKeys]) => setCurComponentId(selectedKeys as number)} 
      />
    </div>
  )
}

