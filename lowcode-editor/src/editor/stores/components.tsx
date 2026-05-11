import { create } from 'zustand';

interface ComponentType {
    id: number,
    name: string,
    props: any,
    children?: ComponentType[],
    parentId?: number
};

interface State {
    components: ComponentType[]
};

const useComponentsStores = create((set, get) => {
    componets: [{
        id: 1,
        name: 'page',
        props: {},
        desc: 
    }]
})

function getComponentsById(id: number | null, components: ComponentType[]): ComponentType | null {
    if (!id) return null;

    for (const component of components) {
        if (component.id === id) return component;
        if (component.children && component.children.length > 0) {
            const result = getComponentsById(id, component.children);
            return result;
        }
    }
}