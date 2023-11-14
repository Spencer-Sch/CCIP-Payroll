import React, { ReactNode } from "react";

interface CleanLayoutProps {
  children: ReactNode;
}

export default function CleanLayout({ children }: CleanLayoutProps) {
  return (
    <>
      <main className="relative flex flex-col justify-center flex-1">{children}</main>
    </>
  );
}
