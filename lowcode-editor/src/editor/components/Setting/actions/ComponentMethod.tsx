import { Input, Select, TreeSelect } from 'antd';
import { useState, useEffect, use } from 'react';
import { useComponentConfigStore } from '../../../stores/component-config';
import { useComponentsStore, type ComponentType } from '../../../stores/components';

// 类型
export interface ComponentMethodConfig {
    type: 'componentMethod',
    config: {
        componentId: number,
        method: string
    }
};

export interface ComponentMethodProps {
    value?: ComponentMethodConfig['config'],
    onChange?: (config: ComponentMethodConfig) => void
};

export default function ComponentMethod({ value, onChange }: ComponentMethodProps) {

    const { components, curComponent } = useComponentsStore();
    const { componentsConfig } = useComponentConfigStore();
    const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
    const [methods, setMethods] = useState<string | null>('');

    useEffect(() => {
        setSelectedComponentId(value?.componentId || null)
        setMethods(value?.method || '')
    }, [value])

    return <div className='mt-4 whitespace-nowrap'>
        <div className='flex justify-center items-center gap-2.5 mb-4' >
            <div>组件：</div>
            <TreeSelect
                className='flex-1'
                placeholder='请选择组件'
                treeData={components}
                fieldNames={{
                    label: 'name',
                    value: 'id',
                }}
                value={selectedComponentId!}
                onChange={(e) => {
                    console.log('selectedComponentId', e)
                    setSelectedComponentId(e)
                    setMethods('');
                    onChange?.({
                        type: 'componentMethod',
                        config: {
                            componentId: e,
                            method: methods,
                        }
                    });
                }}
            />
        </div>
        <div className='flex justify-center items-center gap-2.5'>
            <div>方法：</div>
            <Select
                className='flex-1'
                placeholder='请选择组件'
                options={componentsConfig?.Modal?.methods?.map((method) => ({
                    label: method.label,
                    value: method.name,
                }))}
                value={methods}
                onChange={(e) => {
                    setMethods(e);
                    console.log('selectedMethod', {
                        type: 'componentMethod',
                        config: {
                            componentId: selectedComponentId,
                            method: e,
                        }
                    })
                    onChange?.({
                        type: 'componentMethod',
                        config: {
                            componentId: selectedComponentId,
                            method: e,
                        }
                    });
                }}
            />
        </div>
    </div>
}



