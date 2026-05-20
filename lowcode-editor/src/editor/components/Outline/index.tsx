import { Tree } from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useEffect } from 'react';

export default function Outline() {
  const { components, setCurComponentId, curComponentId} =useComponentsStore();
  
  return (
    <div className='p-4'>
      <Tree
        showLine
        showIcon
        defaultExpandAll
        fieldNames={{ title: 'desc', key: 'id' }}
        treeData={components}
        selectedKeys={[curComponentId!]}
        onSelect={([selectedKeys]) => setCurComponentId(selectedKeys as number)} 
      />
    </div>
  )
}

