import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

interface ComponentConfigType {
    name: string,
    desc: string,
    defaultProps: Record<string, any>,
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