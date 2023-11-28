import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Transactions from "../../features/transactions";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Transactions" }));
  }, []);

  return <Transactions />;
}

export default InternalPage;
