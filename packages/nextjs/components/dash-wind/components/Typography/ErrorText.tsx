import { ReactNode } from "react";

interface props {
  styleClass: string;
  children: ReactNode;
}

function ErrorText({ styleClass, children }: props) {
  return <p className={`text-center  text-error ${styleClass}`}>{children}</p>;
}

export default ErrorText;
