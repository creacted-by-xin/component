import { Segmented } from 'antd';
import { useState } from 'react';
import Source from '../Source';
import Outline from '../Outline';
import Materail from '../Material';

export default function MaterialWrapper() {

  const [ key, setKey ] = useState('物料');
  return (
    <div className="setting-scroll h-full overflow-auto">
      <Segmented value={key} onChange={setKey}
      options={['物料', '大纲', '码源']} block />
      { key==='物料' && <Materail/>}
      { key==='大纲' && <Outline/>}
      { key==='码源' && <Source/>}
    </div>
  )
}
