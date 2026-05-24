import {type CommonComponentProps } from "../../interface";

export default function Page({id, style, name, children}: CommonComponentProps) {

  return (
    <div className=" p-5"
    style={{...style}}
    >{children}</div>
  )
}
