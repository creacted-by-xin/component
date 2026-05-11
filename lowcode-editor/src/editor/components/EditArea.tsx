import { useEffect } from "react";
import { useComponentsStore } from "../stores/components"

export default function EditArea() {
  const { components, addComponent, deleteComponent, updateComponent } = useComponentsStore();

  useEffect(() => {
    addComponent({
      id: 222,
      name: 'Container',
      props: {},
      children: [],
    }, 1);

    addComponent({
      id: 333,
      name: 'Container',
      props: {},
      children: [],
    }, 222);

    setTimeout(()=> {
      deleteComponent(333)
    }, 3000);

    setTimeout(()=> {
      updateComponent(222, {title: '666'})
    }, 5000)
  }, []);

  return (
    <div>
      <pre>
        {
          // JSON.stringify() 的作用：把 JavaScript 对象 / 数组，变成字符串。
          // React 不能直接把对象渲染到页面，所以必须先用 JSON.stringify 转成字符串，才能显示在页面上。
          JSON.stringify(components, null, 2)
        }
      </pre>
    </div>
  )
}
