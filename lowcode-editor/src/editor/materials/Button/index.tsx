import { type ButtonType} from 'antd/es/button';
import {Button as AndtButton} from "antd";

interface Button {
   type: ButtonType
   text: string 
}

export default function Button({type, text}: Button) {
  return (
    <AndtButton type={type}>{text}</AndtButton>
    // <div>{type}+{text}</div>
  )
}
