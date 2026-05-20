import { Form, Input, Select } from 'antd';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';
import { type ComponentSettingType } from '../../stores/component-config';
import { useEffect } from 'react';

export default function ComponentAttr() {
  const { curComponentId, curComponent, components, updateComponentProps } = useComponentsStore();
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
    };

    if( type === 'input' ) {
      return <Input/>
    };
  };

  function formValueChange(changeValues: Record<string, any>) {
    if( curComponentId ) {
      updateComponentProps(curComponentId, changeValues);
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
        <Form.Item label="组件ID" >
          <Input value={curComponent?.id} disabled />
        </Form.Item>

        <Form.Item label="组件名称">
          <Input value={curComponent?.name} disabled />
        </Form.Item>

        <Form.Item label="组件描述">
          <Input value={curComponent?.desc} disabled />
        </Form.Item>

        {/* 组件属性 */}
        {
          componentConfig[curComponent?.name!]?.setter?.map(setter => (
            <Form.Item key={setter.name} name={setter.name} label={setter.label}>
              {renderFormElement(setter)}
            </Form.Item>
          ))
        }

      </Form>
    </div>
  )
}
