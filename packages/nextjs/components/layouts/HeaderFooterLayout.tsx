import React, { ReactNode } from "react";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";

interface HeaderFooterLayoutProps {
  children: ReactNode;
}

export default function HeaderFooterLayout({ children }: HeaderFooterLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative flex flex-col justify-center flex-1">{children}</main>
      <Footer />
    </>
  );
}
