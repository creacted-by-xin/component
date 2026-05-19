import { useEffect, useState, useMemo } from "react"
import { createPortal } from "react-dom";
import { getComponentsById, useComponentsStore } from "../../stores/components";
import { Space, Popconfirm, Dropdown } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

interface HoverMaskProps {
    portalWrapperClassName: string,
    containerClassName: string,
    componentId: number
}

function HoverMask({ portalWrapperClassName, containerClassName, componentId }: HoverMaskProps) {
    const { components, curComponent, curComponentId, deleteComponent, setCurComponentId } = useComponentsStore();

    const [position, setPosition] = useState<Record<string, number>>({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    });

    useEffect(() => {
        updatePositon();
    }, [componentId, components]);

    useEffect(()=>{
        window.addEventListener('resize', updatePositon);
        window.addEventListener('scroll', updatePositon);

        return ()=>{
            window.removeEventListener('resize', updatePositon);
            window.removeEventListener('scroll', updatePositon);
        }
    },[])

    function updatePositon() {
        if (!componentId) return;

        const containner = document.querySelector(`.${containerClassName}`);
        if (!containner) return;

        const component = document.querySelector(`[data-component-id="${componentId}"]`);
        if (!component) return;

        const { top, left, width, height } = component.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = containner.getBoundingClientRect();

        // labelTop 和高亮框一样，齐平。
        // labelLeft 是高亮框的 left，加上高亮框宽度。
        let labelTop = top - containerTop + containner.scrollTop;
        let labelLeft = left - containerLeft + containner.scrollLeft + width;

        if (labelTop <= 0) {
            labelTop += 20;
        };

        if (labelLeft <= 150) {
            if (labelLeft <= 125) {
                if (labelLeft <= 90) {
                    labelLeft += 20;
                };
                labelLeft += 20;
            };
            labelLeft += 30;
        };

        setPosition({
            left: left - containerLeft + containner.scrollLeft,
            top: top - containerTop + containner.scrollTop,
            width,
            height,
            labelTop,
            labelLeft
        })
    };

    const el = useMemo(() => {
        const el = document.querySelector(`.${portalWrapperClassName}`);
        return el!;
    }, []);

    if (!el) return null;

    const curSelectedComponent = useMemo(() => {
        return getComponentsById(componentId, components);
    }, [componentId]);

    const handleDelete = () => {
        deleteComponent(componentId!);
        setCurComponentId(null)
    };

    const parentComponents = useMemo(() => {
        const parentComponents = [];
        let component = curComponent;

        while (component?.parentId) {
            component = getComponentsById(component?.parentId, components);
            parentComponents?.push(component);
        };
        
        return parentComponents;
    }, [curComponent]);

    return createPortal(<><div
        style={{
            position: 'absolute',
            left: position.left,
            top: position.top,
            width: position.width,
            height: position.height,
            pointerEvents: "none",
            zIndex: 12,
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            border: "1px dashed blue",
            borderRadius: 4,
            boxSizing: 'border-box',
        }}
    ></div>
        <div
            style={{
                position: 'absolute',
                left: position.labelLeft,
                top: position.labelTop,
                zIndex: 13,
                fontSize: "14px",
                transform: 'translate(-100%, -100%)'
            }}
        >
            <Space>
                {parentComponents.length &&
                    <Dropdown
                        menu={{
                            items: parentComponents.map(item => ({
                                key: item?.id,
                                label: item?.name,
                                type: 'item'
                            })),
                            onClick: ({ key }) => {
                                setCurComponentId(+key);
                            }
                        }}>
                        <div style={{
                            padding: '0 8px',
                            backgroundColor: 'blue',
                            borderRadius: 4,
                            color: '#fff',
                            cursor: "pointer",
                            whiteSpace: 'nowrap'
                        }}>
                            父容器
                        </div>
                    </Dropdown>
                }
                <div
                    style={{
                        padding: '0 8px',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        color: '#fff',
                        cursor: "pointer",
                        whiteSpace: 'nowrap'
                    }}>
                    {curSelectedComponent?.desc}
                </div>
                {curComponentId !== 1 && (
                    <div style={{
                        padding: '0 8px',
                        backgroundColor: 'blue',
                        borderRadius: 4
                    }}>

                        <Popconfirm
                            title="确认删除"
                            onConfirm={handleDelete}
                            okText="确认"
                            cancelText="取消"
                        >
                            <DeleteOutlined style={{ color: '#fff' }} />
                        </Popconfirm>
                    </div>
                )}

            </Space>

        </div>
    </>, el)
};

export default HoverMask;