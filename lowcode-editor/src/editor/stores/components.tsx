import { create } from 'zustand';

//组件类型
export interface ComponentType {
    id: number,
    name: string,
    props: any,
    children?: ComponentType[],
    parentId?: number
};

// 仓库数据类型
interface State {
    components: ComponentType[]
};

// store仓库方法
interface Action {
    addComponent: (component: ComponentType, parentId: number) => void,
    deleteComponent: (componentId: number) => void,
    updateComponent: (componentId: number, props: any) => void,
};

// 创建仓库啦～
export const useComponentsStore = create<State & Action>((set, get) => ({
    components: [{
        id: 1,
        name: 'Page',
        props: {},
        children: []
    }],
    addComponent: (component: ComponentType, parentId: number) => {
        set((state) => {
            // 如果存在父组件，增加到父组件的children下
            // 如果没有，直接增加到根数组
            if (parentId) {
                // 找父组件
                const parentComponent = getComponentsById(parentId, state.components);
                console.log('parentId',parentId)
                console.log('parentComponent',parentComponent)
                console.log('state.components',state.components)


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
        if (component.parentId) {
            const parentComponent = getComponentsById(component.parentId, get().components);
            if (parentComponent) {
                parentComponent.children = parentComponent.children.filter(item => item.id !== +componentId)
            }

            // 这样才是有效更新（引用地址变了）
            set({ components: [...get().components] })
        };

    },
    updateComponent: (componentId: number, props: any) => {
        // 找到组件，合并新旧属性
        const component = getComponentsById(componentId, get().components);

        if (component) {
            component.props = { ...component.props, ...props };
        };

        // 这样才是有效更新（引用地址变了）
        set({ components: [...get().components] });
    }
}));

//根据ID找到组件
function getComponentsById(id: number | null, components: ComponentType[]): ComponentType | null {
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