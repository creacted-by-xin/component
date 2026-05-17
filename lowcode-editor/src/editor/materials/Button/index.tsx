import {Button as AndtButton} from "antd";
import {type  CommonComponentProps } from '../../interface';


export default function Button({id, type, text}: CommonComponentProps) {
  return (
    <AndtButton data-component-id={id} type={type}>{text}</AndtButton>
    // <div>{type}+{text}</div>
  )
}
