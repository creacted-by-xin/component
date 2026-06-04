import { Select, TreeSelect } from 'antd';
import { useState, useEffect } from 'react';
import { useComponentConfigStore } from '../../../stores/component-config';
import { getComponentsById, useComponentsStore, type ComponentType } from '../../../stores/components';

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

    const { components, curComponentId } = useComponentsStore();
    const { componentsConfig } = useComponentConfigStore();
    const [curId, setCurId] = useState<number | null>(null);
    const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>();
    const [methods, setMethods] = useState<string | null>('');

    useEffect(() => {
        setCurId(value?.componentId || null)
        setMethods(value?.method || '')

        setSelectedComponent(getComponentsById(value?.componentId, components));
    }, [value])

    const componentChange = (e) => {
        if(!curComponentId) return;

        setCurId(e)
        setSelectedComponent(getComponentsById(e, components));
    };

    const methodChange = (e) => {
        
        setMethods(e);
        onChange?.({
            type: 'componentMethod',
            config: {
                componentId: selectedComponent?.id,
                method: e,
            }
        });
    };

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
                value={curId!}
                onChange={componentChange}
            />
        </div>
        {componentsConfig[selectedComponent?.name || ''] && (
            <div className='flex justify-center items-center gap-2.5'>
                <div>方法：</div>
                <Select
                    className='flex-1'
                    placeholder='请选择组件'
                    options={componentsConfig[selectedComponent?.name || '']?.methods?.map((method) => ({
                        label: method.label,
                        value: method.name,
                    }))}
                    value={methods}
                    onChange={methodChange}
                />
            </div>
        )}
    </div>
}



