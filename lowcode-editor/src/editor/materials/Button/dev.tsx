import {Button as AndtButton} from "antd";
import {type  CommonComponentProps } from '../../interface';


export default function Button({id, type, text, style}: CommonComponentProps) {
  return (
    <AndtButton data-component-id={id} type={type} style={style}>
      {text}
    </AndtButton>
  )
}
