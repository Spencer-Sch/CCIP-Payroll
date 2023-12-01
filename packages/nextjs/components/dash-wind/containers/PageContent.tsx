import { ReactNode, Suspense } from "react";
import { useEffect, useRef } from "react";
import Header from "./Header";
import SuspenseContent from "./SuspenseContent";
import { MyState, useMySelector } from "~~/components/dash-wind/app/store";

interface props {
  children: ReactNode;
}

function PageContent({ children }: props) {
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const { pageTitle } = useMySelector((state: MyState) => state.header);

  // Scroll back to top on new page load
  useEffect(() => {
    if (mainContentRef.current !== null) {
      mainContentRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pageTitle]);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200" ref={mainContentRef}>
        <Suspense fallback={<SuspenseContent />}>{children}</Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
