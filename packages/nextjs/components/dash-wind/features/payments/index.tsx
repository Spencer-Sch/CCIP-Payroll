/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { RECENT_PAYMENTS } from "../../utils/dummyData";
// import { showNotification } from "../common/headerSlice";
// import moment from "moment";
// import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface TopSideButtonsProps {
  applySearch: (value: string) => void;
  applyFilter: (params: string) => void;
  removeFilter: () => void;
}

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }: TopSideButtonsProps) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params: string) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = useCallback(() => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  }, [removeFilter]);

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [applySearch, removeAppliedFilter, searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      {filterParam != "" && (
        <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Payments() {
  const [payments, setPayments] = useState(RECENT_PAYMENTS);

  const getPaymentStatus = (status: string) => {
    if (status === "Paid") return <div className="badge badge-success">{status}</div>;
    if (status === "Pending") return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  const removeFilter = () => {
    setPayments(RECENT_PAYMENTS);
  };

  const applyFilter = (params: string) => {
    const filteredPayments = RECENT_PAYMENTS.filter(p => {
      return p.status.toLowerCase() == params.toLowerCase();
    });
    setPayments(filteredPayments);
  };

  // Search according to name
  const applySearch = (value: string) => {
    const filteredPayments = RECENT_PAYMENTS.filter(p => {
      return p.name.toLowerCase().includes(value.toLowerCase()) || p.name.toLowerCase().includes(value.toLowerCase());
    });
    setPayments(filteredPayments);
  };

  return (
    <>
      <TitleCard
        title="Payment History"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>To Wallet</th>
                <th>Invoice No</th>
                <th>Invoice Generated On</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice Paid On</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.wallet}</td>
                    <th>{l.invoiceNo}</th>
                    <th>{l.generatedOn}</th>
                    <td>${l.amount}</td>
                    <td>{getPaymentStatus(l.status)}</td>
                    <td>{l.paidOn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Payments;