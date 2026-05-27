import { Input } from 'antd';
import { useComponentsStore } from '../../../stores/components';
import { useState } from 'react';

export interface JumpLinkConfig {
  type: 'jumpLink',
  url: string
};

export interface JumpLinkProps {
  value?: string,
  onChange?: (config: JumpLinkConfig) => void
};

export default function JumpLink(props: JumpLinkProps) {
  const { value = '', onChange } = props;
  // const { curComponentId } = useComponentsStore();
  const [values, setvalue] = useState(value || '');

  // function urlChange(value: string) {
  //   if (!curComponentId) return;

  //   setvalue(value);

  //   // 本次
  //   onChange?.({
  //     type: 'jumpLink',
  //     url: value
  //   });
  // }

  return (
    <div className='flex items-center gap-1 mt-4'>
      <div className="shrink-0 whitespace-nowrap" >链接地址：</div>
      <Input value={values || ''}
        onChange={(e) => {
          setvalue(e.target.value);

          onChange?.({
            type: 'jumpLink',
            url: e.target.value
          });
        }}
      />
    </div>
  )
}