import { Input } from 'antd';
import { useEffect, useState } from 'react';

export interface JumpLinkConfig {
  type: 'jumpLink',
  url: string
};

export interface JumpLinkProps {
  value?: string,
  onChange?: (config: JumpLinkConfig) => void
};

export default function JumpLink({ value = '', onChange }: JumpLinkProps) {
  const [url, setUrl] = useState( '');

  useEffect(()=>{
    setUrl(value || '')
  }, [value, onChange]);

  return (
    <div className='flex items-center gap-1 mt-4'>
      <div className="shrink-0 whitespace-nowrap" >链接地址：</div>
      <Input value={url || ''}
        onChange={(e) => {
          setUrl(e.target.value);

          onChange?.({
            type: 'jumpLink',
            url: e.target.value
          });
        }}
      />
    </div>
  )
}