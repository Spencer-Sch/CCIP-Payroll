import { useEffect } from "react";
import Link from "next/link";
import { setPageTitle } from "../../features/common/headerSlice";
import TemplatePointers from "../../features/user/components/TemplatePointers";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
          <TemplatePointers />
          <Link href="/app/dashboard">
            <button className="btn bg-base-100 btn-outline">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
