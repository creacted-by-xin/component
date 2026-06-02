import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ModalDev from "../materials/Modal/dev";
import ModalProd from "../materials/Modal/prod";
import TableDev from "../materials/Table/dev";
import TableProd from "../materials/Table/prod";
import TableColumnDev from "../materials/TableColumn/dev";
import TableColumnProd from "../materials/TableColumn/prod";
import FormDev from "../materials/Form/dev";
import FormProd from "../materials/Form/prod";
import FormItemDev from "../materials/FormItem/dev";
import FormItemProd from "../materials/FormItem/prod";
import { type ComponentConfigMap } from "../interface";
import type FormItemLabel from "antd/es/form/FormItemLabel";

// 组件渲染库仓库
interface StateType {
    componentsConfig: ComponentConfigMap
};

// 仓库方法类型
interface ActionType {
    // registerComponent: < T extends keyof ComponentConfigMap>(name: T, componentConfig: ComponentConfigMap[T]) => void
};

const componentsConfig: ComponentConfigMap = {
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
    Modal: {
        name: 'Modal',
        desc: '弹窗',
        type: 'modal',
        dev: ModalDev,
        prod: ModalProd,
        defaultProps: {
            title: '弹窗'
        },
        proptiesSetters: [
            {
                name: 'title',
                label: '弹窗',
                type: 'input',
            }
        ],
        stylesSetters: [],
        events: [
            {
                name: 'onOk',
                label: '确认事件',
            },
            {
                name: 'onCancel',
                label: '取消事件',
            }
        ],
        methods: [
            {
                name: 'open',
                label: '打开弹窗'
            },
            {
                name: 'close',
                label: '关闭弹窗'
            },
        ]
    },
    Table: {
        name: 'Table',
        desc: '表格',
        type: 'table',
        dev: TableDev,
        prod: TableProd,
        stylesSetters: [],
        proptiesSetters: [
            {
                name: 'url',
                label: 'url',
                type: 'input',
            }
        ],
    },
    TableColumn: {
        name: 'TableColumn',
        desc: '表格列',
        type: 'tableColumn',
        dev: TableColumnDev,
        prod: TableColumnProd,
        defaultProps: {
            dataIndex: `col_${new Date().getTime()}`,
            title: '列名'
        },
        proptiesSetters: [
            {
                name: 'type',
                label: '类型',
                type: 'select',
                options: [
                    { label: '文本', value: 'text' },
                    { label: '日期', value: 'date' }
                ]
            },
            {
                name: 'title',
                label: '标题',
                type: 'input'
            },
            {
                name: 'dataIndex',
                label: '字段',
                type: 'input',
            },
        ],
    },
    Form: {
        name: 'Form',
        desc: '表单',
        type: 'form',
        dev: FormDev,
        prod: FormProd,
        stylesSetters: [],
        proptiesSetters: [
            {
                name: 'title',
                label: '标题',
                type: 'input'
            }
        ],
        events: [
            {
                name: 'onFinish',
                label: '提交事件',
            }
        ],
         methods: [
            {
                name: 'submit',
                label: '提交表单'
            },
            {
                name: 'reset',
                label: '重置表单项'
            }
        ]
    },
    FormItem: {
        name: 'FormItem',
        desc: '表单项',
        type: 'formItem',
        dev: FormItemDev,
        prod: FormItemProd,
        defaultProps: {
            dataIndex: `item_${new Date().getTime()}`,
            label: '名字',
        },
        stylesSetters: [],
        proptiesSetters: [
            {
                name: 'type',
                label: '类型',
                type: 'select',
                options: [
                    { label: '输入框', value: 'input' },
                    { label: '日期', value: 'date' },
                ]
            },
            {
                name: 'label',
                label: '标题',
                type: 'input',
            },
            {
                name: 'name',
                label: '字段',
                type: 'input',
            },
            {
                name: 'rules',
                label: '校验',
                type: 'select',
                options: [
                    {
                        label: '必填',
                        value: 'required',
                    },
                ],
            }
        ],
       
    }
};

export const useComponentConfigStore = create<StateType & ActionType>(() => ({
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