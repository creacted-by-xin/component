import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";

interface ComponentConfigType {
    name: string,
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
        Container: {
            name: 'Container',
            defaultProps: {},
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {},
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