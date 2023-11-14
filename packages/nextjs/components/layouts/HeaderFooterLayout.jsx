import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";

export default function HeaderFooterLayout({ children }) {
  return (
    <>
      <Header />
      <main className="relative flex flex-col justify-center flex-1">{children}</main>
      <Footer />
    </>
  );
}
