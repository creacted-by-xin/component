import { Form, Input, Select, InputNumber } from 'antd';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';
import { type ComponentSettingType } from '../../stores/component-config';
import { useEffect, useState, type CSSProperties } from 'react';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import StyleToObject from 'style-to-object';
import { LineHeightOutlined } from '@ant-design/icons';

export default function ComponentStyle() {
  const { curComponentId, curComponent, updateComponentStyles } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [css, setCss] = useState<string>(`.comp{\n\n}`)

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    const formValue = form.getFieldsValue();
    form.setFieldsValue({ ...formValue, ...curComponent?.style });
    setCss(toCssStr(curComponent?.style!))
  }, [curComponent]);

  // style{}对象，转css编码形式
  function toCssStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for(let key in css) {
      let value = css[key];
      if(!value) {
        continue;
      }
      if(['width', 'height'].includes(key) && !value.toString().endsWith('px')){
        value += 'px';
      };

      str += `\t${key}: ${value};\n`;
    };
    str += `}`;

    return str;
  }

  function toCssObj(value) {
    let css: Record<string, any> = {};

    const cssStr = value.replace(/\.comp\s*\{/, '').replace('}', '').replace(/\/\*[\s\S]*?\*\//g, '')

    try{
      StyleToObject(cssStr,(name, value)=> {
      css[name.replace(/-\w/,(item)=> item.toUpperCase().replace('-', ''))] = value;
      console.log('css1',css)
    })
    }catch(e) {}

      return css
  }

  function renderFormElement(setter: ComponentSettingType) {
    const { type, options, name } = setter;

    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input' ) {
      return <Input />
    } 
    else if (type === 'inputNumber') {
      return <InputNumber
      addonAfter={['width', 'height'].includes(name) ? 'px' : undefined}/>
    }

  };


  function formValueChange(changeValues: Record<string, any>) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
      const style = {
        ...toCssObj(css),
        ...form.getFieldsValue(),
      }
      setCss(toCssStr(style))
    }
  };

  const handleChange = (value)=>{
    setCss(value);
    const css = toCssObj(value);

    updateComponentStyles(curComponentId, {...css}, true)
    try{
      if(css.width?.includes('px')) {
      css.width = css.width.replace('px','');}else(css.width = '')
      if(css.height?.includes('px')) {
      css.height = css.height.replace('px','');}else(css.height = '')
    }catch(e) {};

    form.setFieldsValue({...form.getFieldsValue() , ...css});
  }

  return (
    <div  className='mt-4'>
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
      <div className='h-50  border border-[#ccc]'>
        <CssEditor value={css} onChange={handleChange}/>
      </div>
    </div>
  )
}
