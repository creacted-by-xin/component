import { useDrop } from "react-dnd";
import { useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";
import { getComponentsById } from '../stores/components';

export function useMamerialDrop(parentId: number, accept: string[]) {
  const { components, addComponent, deleteComponent } = useComponentsStore();
  const { componentsConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: accept,
    drop: (item: { type: string, id: number, dragType: string }, monitor) => {

      const didDrop = monitor.didDrop()
      if (didDrop) {
        return;
      };

      if (item.dragType === 'move') {
        const component = getComponentsById(item.id, components);
        deleteComponent(item.id);
        addComponent(component!, parentId);
      } else {
        const config = componentsConfig?.[item.type];

        addComponent({
          id: new Date().getTime(),
          name: item.type,
          desc: config?.desc,
          props: config?.defaultProps
        }, parentId);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  }));

  return { canDrop, drop }
}