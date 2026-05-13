import type { PropsWithChildren } from "react";

export default function Container({children}: PropsWithChildren) {
  return (
    <div className=" border border-balck min-h-25 p-5"
    >{children}</div>
  )
}
