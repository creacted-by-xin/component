import InternalForm from "./Form";
import Item from "./Item";

type InternalFormType = typeof InternalForm;
interface FromProps extends InternalFormType{
    Item: typeof Item;
};

const Form = InternalForm as FromProps;

Form.Item = Item;

export default Form;