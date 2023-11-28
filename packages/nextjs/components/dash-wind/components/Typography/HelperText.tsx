import { ReactNode } from "react";

interface props {
  className: string;
  children: ReactNode;
}

function HelperText({ className, children }: props) {
  return <div className={`text-slate-400 ${className}`}>{children}</div>;
}

export default HelperText;
