import { Input, Select } from 'antd';
import { useState, useEffect } from 'react';

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

export default function ComponentMethod({value, onChange}: ComponentMethodProps) {

    return <div className='mt-4'>
       123123
    </div>
}