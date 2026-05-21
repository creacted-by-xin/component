import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";
import {type ComponentConfigMap } from "../interface";


// export interface ComponentSettingType {
    // // 字段名
    // name: string,
    // // 前面的文字标签
    // label: string,
    // // 属性类型
    // type: string,
    // // 属性值
    // [key: string]: any
// };


// interface ComponentConfigType {
//     name: string,
//     desc: string,
//     // 组件默认属性
//     defaultProps: Record<string, any>,
//     // 组件可设置属性
//     setter?: ComponentSettingType[],
//     styleSetter?: ComponentSettingType[],
//     // 对应哪个组件
//     component: any
// };

// 仓库类型
interface StateType {
    componentsConfig:  any
};

// 仓库方法类型
interface ActionType {
    // registerComponent: < T extends keyof ComponentConfigMap>(name: T, componentConfig: ComponentConfigMap[T]) => void
};

const componentsConfig: ComponentConfigMap= {
        Page: {
            name: 'Page',
            desc: '页面',
            type: 'page',
            component: Page,
            stylesSetters: []
        },
        Container: {
            name: 'Container',
            desc: '容器',
            type: 'container',
            stylesSetters: [
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
            component: Container
        },
        Button: {
            name: 'Button',
            desc: '按钮',
            type: 'button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            proptiesSetters: [
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
            stylesSetters: [
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
    };

export const useComponentConfigStore = create<StateType & ActionType>((set) => ({
    componentsConfig: componentsConfig,
    // registerComponent: (name, componentConfig) => set((state) => {
    //     return {
    //         ...state,
    //         // 覆盖原配置对象  {componentsConfig: {}}
    //         componentsConfig: {
    //             ...state.componentsConfig,
    //             [name]: componentConfig
    //         }
    //     }
    // })
}))