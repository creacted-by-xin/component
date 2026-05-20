import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";


export interface ComponentSettingType {
    // 字段名
    name: string,
    // 前面的文字标签
    label: string,
    // 属性类型
    type: string,
    // 属性值
    [key: string]: any
};

interface ComponentConfigType {
    name: string,
    desc: string,
    // 组件默认属性
    defaultProps: Record<string, any>,
    // 组件可设置属性
    setter?: ComponentSettingType[],
    styleSetter?: ComponentSettingType[],
    // 对应哪个组件
    component: any
};

interface State {
    componentConfig: { [key: string]: ComponentConfigType }
};

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfigType) => void
};

export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Page: {
            name: 'Page',
            desc: '页面',
            defaultProps: {},
            styleSetter: [
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                },
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                }
            ],
            component: Page
        },
        Container: {
            name: 'Container',
            desc: '容器',
            defaultProps: {},
            component: Container
        },
        Button: {
            name: 'Button',
            desc: '按钮',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            setter: [
                {
                    name: 'type',
                    label: '按钮类型',
                    type: 'select',
                    options: [
                        { label: '主按钮', value: 'primary' },
                        { label: '次按钮', value: 'default' },
                    ],
                },
                {
                    name: 'text',
                    label: '文本',
                    type: 'input',
                }
            ],
            styleSetter: [
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                },
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                }
            ],
            component: Button
        },
    },
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}))