import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
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
            dev: PageDev,
            prod: PageProd,
            stylesSetters: []
        },
        Container: {
            name: 'Container',
            desc: '容器',
            type: 'container',
            dev: ContainerDev,
            prod: ContainerProd,
            stylesSetters: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                }
            ],
        },
        Button: {
            name: 'Button',
            desc: '按钮',
            type: 'button',
            dev: ButtonDev,
            prod: ButtonProd,
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
            events: [
                {
                    name: 'onClick',
                    label: '点击事件',
                },
                {
                    name: 'onDoubleClick',
                    label: '双击事件',
                }
            ]
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