import { Form, Input, Select, InputNumber } from 'antd';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';
import { type ComponentSettingType } from '../../stores/component-config';
import { useEffect } from 'react';
import CssEditor from './CssEditor';

export default function ComponentStyle() {
const { curComponentId, curComponent, updateComponentStyles } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [form] = Form.useForm();

  useEffect(()=> {
    const formValue = form.getFieldsValue();
    form.setFieldsValue({...formValue, ...curComponent?.props})
  },[curComponent]);

  function renderFormElement(setter: ComponentSettingType) {
    const { type, options } = setter;

    if( type === 'select' ) {
      return <Select options={options}/>
    }else if( type === 'input' ) {
      return <Input/>
    }else if( type === 'inputNumber' ) {
      return <InputNumber/>
    }

  };

  function formValueChange(changeValues: Record<string, any>) {
    if( curComponentId ) {
      updateComponentStyles(curComponentId, changeValues);
    }
  };

  return (
    <div className='p-4'>
      <Form 
        form={form}
        onValuesChange={formValueChange}
        name="componentStyle"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        {/* 样式属性 */}
        {
          componentConfig[curComponent?.name!]?.styleSetter?.map(setter => (
            <Form.Item key={setter.name} name={setter.name} label={setter.label}>
              {renderFormElement(setter)}
            </Form.Item>
          ))
        }

      </Form>
      <CssEditor />
    </div>
  )
}
