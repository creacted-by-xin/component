import type { PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren {
    id: number,
    name: string,
    style?: React.CSSProperties,
    [key: string]: any
};



/* 
当类型特别多时，不把所有类型都堆在一个文件里
而是每个组件维护自己的config
最后统一注册到组件配置映射表里
这样每次新增组件时，只需要新增对应配置类型、默认配置和渲染器，不需要大量改代码
 */
// 
// 基础配置（必配）
export interface setterConfig {
    // 字段名
    name: string,
    // 前面的文字标签
    label: string,
    // 属性类型
    type: string,
    // 属性值
    [key: string]: any
};
export interface ComponentEvent {
        name: string,
        label: string
};

interface BaseConfigType {
    name: string,
    desc: string,
    dev: any,
    prod: any
    defaultProps?:  Record<string, any>,
    stylesSetters?: setterConfig[],
    events?: ComponentEvent[]
};

// 公共配置
// 属性设置配置项（可选）
type WidthSetterConfig = {
  name: 'width';
  label: string;
  type: 'inputNumber';
};

type HeightSetterConfig = {
  name: 'height';
  label: string;
  type: 'inputNumber';
};

type OnClickEventConfig = {
  name: 'onClick';
  label: string;
};

type OnDoubleEventConfig = {
  name: 'onDoubleClick';
  label: string;
};

// 组件配置
interface PageConfig extends BaseConfigType {
    type: 'page',
};

interface ContainerConfig extends BaseConfigType {
    // 私有属性
    type: 'container',
    stylesSetters: [WidthSetterConfig, HeightSetterConfig, ...setterConfig[]],
    proptiesSetters?: setterConfig[],
};

interface ButtonConfig extends BaseConfigType {
    // 私有属性
    type: 'button',
    stylesSetters?: setterConfig[],
    proptiesSetters?: setterConfig[],
    events: [OnClickEventConfig, OnDoubleEventConfig, ...ComponentEvent[]]
};

// 类型匹配
export type ComponentConfigMap = {
  Page: PageConfig;
  Container: ContainerConfig;
  Button: ButtonConfig;
};
