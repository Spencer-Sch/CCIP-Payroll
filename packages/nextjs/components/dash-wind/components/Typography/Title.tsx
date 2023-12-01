import React from "react";
import { ReactNode } from "react";

interface props {
  className: string;
  children: ReactNode;
}

function Title({ className, children }: props) {
  return <p className={`text-2xl font-bold  ${className}`}>{children}</p>;
}

export default Title;
