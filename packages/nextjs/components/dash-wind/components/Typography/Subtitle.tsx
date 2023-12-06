import { ReactNode } from "react";

interface props {
  styleClass?: string;
  children: ReactNode;
}
function Subtitle({ styleClass, children }: props) {
  return <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>;
}

export default Subtitle;
