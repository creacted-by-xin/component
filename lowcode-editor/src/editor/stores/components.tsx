import type { CSSProperties } from 'react';
import { create } from 'zustand';
import { type ComponentConfigMap } from '../interface';

export interface ComponentEventAction {
    type?: 'showMessage',
    message?: string
}

export type ComponentEventMap = Record<string, ComponentEventAction>;

//组件类型
export interface ComponentType {
    id: number,
    name: keyof ComponentConfigMap,
    desc: string,
    style?: CSSProperties,
    props: Record<string, any>,
    events?: ComponentEventMap,
    children?: ComponentType[],
    parentId?: number
};

// 仓库数据类型
interface State {
    components: ComponentType[],
    mode: 'edit' | 'preview',
    curComponentId?: number | null,
    curComponent?: ComponentType | null
};

// store仓库方法
interface Action {
    addComponent: (component: ComponentType, parentId: number) => void,
    deleteComponent: (componentId: number) => void,
    updateComponentStyles: (componentId: number, style: CSSProperties, replace?: boolean) => void,
    updateComponentProps: (componentId: number, props: any) => void,
    updateComponentEvents: (componentId: number, events: ComponentEventMap) => void,
    setCurComponentId: (componentId: number | null) => void,
    setMode: (mode: State['mode']) => void,
};

// 创建仓库啦～
export const useComponentsStore = create<State & Action>((set, get) => ({
    components: [{
        id: 1,
        name: 'Page',
        desc: '页面',
        props: {},} 
    ],
    mode: 'edit',
    curComponentId: null,
    curComponent: null,
    addComponent: (component: ComponentType, parentId: number) => {
        set((state) => {
            // 如果存在父组件，增加到父组件的children下
            // 如果没有，直接增加到根数组
            if (parentId) {
                // 找父组件
                const parentComponent = getComponentsById(parentId, state.components);

                if (!parentComponent) return state;

                if (parentComponent) {
                    // 如果父组件有其他children数组，push进去
                    // 如果没有，这增加数组
                    if (parentComponent.children) {
                        parentComponent.children.push(component);
                    } else {
                        parentComponent.children = [component];
                    }
                }

                component.parentId = parentComponent?.id;
                // 这样才是有效更新（引用地址变了）
                return ({ components: [...state.components] })
            };

            // 没有父组件，直接增加到根数组
            // 这样才是有效更新（引用地址变了）
            return ({ components: [...state.components, component] })
        })
    },
    deleteComponent: (componentId: number) => {
        // 如果没有组件ID，直接返回
        if (!componentId) return;

        //  只有子组件能删除（根组件不删）
        // 找到要删除的组件，看看它是否有父组件
        // 如果有，拿到父组件，从父组件filter掉
        const component = getComponentsById(componentId, get().components);
        if (!component?.parentId) return;
        if (component?.parentId) {
            const parentComponent = getComponentsById(component.parentId, get().components);
            if (parentComponent) {
                parentComponent.children = parentComponent.children?.filter(item => item.id !== +componentId)
            }

            // 这样才是有效更新（引用地址变了）
            set({ components: [...get().components] })
        };

    },
    updateComponentProps: (componentId: number, props: any) => (
        set((state) => {
            // 找到组件
            const component = getComponentsById(componentId, state.components);
            // 如果组件存在，合并属性
            if (component) {
                component.props = { ...component.props, ...props };
            };
            // 如果不存在，返回原状态
            return ({ components: [...state.components] })
        })
    ),
    updateComponentStyles: (componentId: number, style: CSSProperties, replace: boolean = false) => {
        set((state) => {
            // 找到组件
            const component = getComponentsById(componentId, state.components);
            // 如果组件存在，合并属性
            if (component) {
                component.style = replace? {...style }: { ...component.style, ...style };
            };
            // 如果不存在，返回原状态
            return ({ components: [...state.components] })
        })
    },
    updateComponentEvents: (componentId: number, events: ComponentEventMap) => {
        set((state) => {
            const component = getComponentsById(componentId, state.components);
            if (component) {
                component.events = events;
            }
            return ({ components: [...state.components] })
        })
    },
    setCurComponentId: (componentId: number | null) => set(state => ({
        curComponentId: componentId,
        curComponent: getComponentsById(componentId, state.components)
    })),
    setMode: (mode) => set({mode})
}));

//根据ID找到组件
export function getComponentsById(id: number | null, components: ComponentType[]): ComponentType | null {
    if (!id) return null;
    let result = null;

    for (const component of components) {
        if (component.id === id) return component;
        if (component.children && component.children.length > 0) {
            result = getComponentsById(id, component.children);
            if (result) return result;
        }
    }
    return result;
}
