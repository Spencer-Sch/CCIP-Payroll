/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
// import { showNotification } from "../common/headerSlice";
import moment from "moment";
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

function Transactions() {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params: string) => {
    const filteredTransactions = RECENT_TRANSACTIONS.filter(t => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value: string) => {
    const filteredTransactions = RECENT_TRANSACTIONS.filter(t => {
      return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase());
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="Recent Transactions"
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
                <th>Email Id</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
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
                    <td>{l.email}</td>
                    <td>{l.location}</td>
                    <td>${l.amount}</td>
                    <td>{moment(l.date).format("D MMM")}</td>
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

export default Transactions;
