import {Button as AndtButton} from "antd";
import {type  CommonComponentProps } from '../../interface';


export default function Button({id, name, type, text, style, ...props}: CommonComponentProps) {
  return (
    <AndtButton type={type} style={style} {...props}>
      {text}
    </AndtButton>
  )
}
