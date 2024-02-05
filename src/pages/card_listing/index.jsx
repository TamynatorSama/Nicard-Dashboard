
import CardRequestListingCard from "./components/card_request_listing_card";
import CustomDropDown from "../../component/customDropdown";
import { CardRequestStatusList } from "../../utils/requestStatus";
import {
  IconamoonSearch,
  IonHome,
  MaterialSymbolsDiscoverTuneRounded,
} from "../../component/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardList, profileData } from "../../app/appSlice";
import PaginationController from "./components/pagination_controller";
import { changeListPerPage } from "../../app/card_listing/pagination";
import { updateRequestStatus, updateRequestType, updateSearch } from "../../app/card_listing/listingFilterSlice";
import emptyPng from "../../assets/Empty-cuate.svg";

const CardListingPage = () => {

  const paginatorData = useSelector(state => state.listingPaginator)
  const profile = useSelector(profileData)
  const filter = useSelector(state => state.listFilter)
  const dispatch = useDispatch()

  const tableNav = useRef();
  const bankCardListing = useSelector(cardList)

  const changeReuqestType = (value) => {
    dispatch(updateRequestType(value))
  }


  const changePerPage = (value) => {
    dispatch(changeListPerPage(value))
  }
  const updateSearchText = (ev) => {
    if (ev.target.name === 'search') {
      dispatch(updateSearch(ev.target.value))
    }
  }


  const updateShowableList = () => {
    return bankCardListing.filter(ev => ev.id.toLowerCase().includes(filter.searchText.toLowerCase()) || ev.user_info[0].nin.includes(filter.searchText) || ev.user_info[0].first_name.toLowerCase().includes(filter.searchText.toLowerCase()) || ev.user_info[0].last_name.toLowerCase().includes(filter.searchText.toLowerCase())).filter(ev => {
      if (filter.request_status == 10) {
        return ev
      }
      if (ev.request_status[0].id == filter.request_status) {
        return ev
      }
    }).filter(ev => {
      if (filter.request_type.toLowerCase().includes("all")) {
        return ev
      }
      if (ev.request_type[0].request_type_slug.toLowerCase().includes(filter.request_type.toLowerCase().split(" ")[0])) {
        return ev
      }
    })
  }



  const changeTableState = (index, statusId) => {
    let navItems = tableNav.current.children;

    let myNavElement;

    for (const element of navItems) {
      if (element.children[1]) {
        myNavElement = element.children[1];
        element.removeChild(element.children[1]);
      }
    }
    navItems.item(index).appendChild(myNavElement);
    dispatch(updateRequestStatus(statusId))
  };


  let filteredList = updateShowableList()
  const indexOfLastRequest = paginatorData.currentPage * paginatorData.perPage
  const indexOfFirstRequest = indexOfLastRequest - paginatorData.perPage
  const paginatedList = filteredList.slice(indexOfFirstRequest, indexOfLastRequest)
  return <div className="display-area w-full h-full px-[3vw] flex flex-col">
    <div className="bread-crumps-grp mt-4 flex items-center gap-2 ">
      <IonHome />
      <p className="text-stone-400 text-[0.73rem] mt-[0.15rem] font-semibold">
        Home Page &nbsp;&nbsp;/ &nbsp;&nbsp;..&nbsp;&nbsp; /&nbsp;&nbsp;
        Dashboard &nbsp;&nbsp;/&nbsp;&nbsp; ..&nbsp;&nbsp; /&nbsp;&nbsp;{" "}
        <span className="text-[#2baf50]">Card Request Listing</span>{" "}
      </p>
    </div>
    <div className="title-grp">
      <h1 className="mt-3 text-4xl font-medium">{new Array().first(profile.institution?.bank_data??[])?.bank_name ?? new Array().first(profile.institution?.institution_data??[])?.institution_name}</h1>
      <p className="text-stone-400 text-[0.9rem] font-semibold">
        Card Request Listing
      </p>
    </div>
    <div
      id="filter-grp"
      className=" w-full p-2 bg-[#f9f9f9] my-5 rounded-2xl flex justify-between items-center"
    >
      <div
        id="search-grp"
        className="flex bg-white items-center gap-3 p-[0.40rem] rounded-xl"
      >
        <IconamoonSearch />
        <div id="input-grp">
          <input
            className="outline-none border-none bg-transparent text-[1.1em]"
            type="text"
            onChange={updateSearchText}
            value={filter.searchText}
            name="search"
            placeholder="search ..."
          />
        </div>
      </div>
      <div id="other-filter-grp" className="flex gap-5">
        {/* <CustomDropDown icon={<UiwDate />} title="Date" /> */}

        {/* <CustomDropDown
          icon={<FluentTag28Regular />}
          title="Status"
          items={[
            "NIMC Validation",
            "Bank Validation",
            "Approved",
            "Processing",
            "Done",
            "Ready for Pickup",
          ]}
        /> */}
        <CustomDropDown
          onChange={changeReuqestType}
          icon={<MaterialSymbolsDiscoverTuneRounded />}
          title={filter.request_type}
          items={[
            "All Request",
            "Request Card",
            "Renew Card",
            "Replace Card",
            "Block Card",
          ]}
        />
      </div>
    </div>

    <div
      id="tab-grp"
      ref={tableNav}
      className="flex gap-8 border-b-2 border-[#f8f8f8] select-none"
    >
      {[{
        id: "10",
        request_status_slug: "All Status",
        step: 100
      }, ...CardRequestStatusList].map((val, index) => {
        return (
          <div
            key={val.id}
            className="cursor-pointer"
            onClick={() => changeTableState(index, val.id)}
          >
            <div className="">
              <p className="text-[0.7rem] text-center  font-semibold">{val.request_status_slug}</p>
            </div>
            {index === 0 ? (
              <div className="w-full h-1 bg-[#208a3d] rounded-lg mt-2 transition-all duration-700 navigator"></div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
    <div className="paginationController my-2 flex justify-between">
      <div id="page-info-grp">
        <p className="text-stone-400 text-[0.8rem] font-medium">
          showing {indexOfFirstRequest} - {indexOfLastRequest > filteredList.length ? filteredList.length : indexOfLastRequest} of results
        </p>
      </div>
      <PaginationController listsPerPage={paginatorData.perPage} totalLists={filteredList.length} totalItems={filteredList.length} />
      <div id="perpage-modifier" className="flex items-center gap-4">
        <p className="text-stone-400 text-[0.8rem] font-medium">
          Request per page
        </p>
        <CustomDropDown title={paginatorData.perPage} items={["5", "10", "15"]} onChange={changePerPage} />
      </div>
    </div>
    <div className="flex gap-4 rounded-xl p-2 bg-[#f9f9f9]">
      {/* header */}
      <p

        className="w-11/12 text-[0.76rem] font-medium text-stone-500"

      >
        Contact Info
      </p>
      <p className="text-[0.76rem] text-stone-500 w-1/2">NIN</p>
      <p className="text-[0.76rem] text-stone-500 w-4/5">Request Date</p>
      <p className="text-[0.76rem] text-stone-500 w-full">Request Status</p>
      <p className="text-[0.76rem] text-stone-500 w-2/5">Request Type</p>
      <p className="text-[0.76rem] text-stone-500 w-1/2">
        Actions
      </p>

      {/* end of header */}
    </div>
    <div className="flex flex-col gap-6 mt-4 h-full overflow-scroll pb-5 no-bars">
      {bankCardListing.length ===0?<div className="h-[90%] flex items-center justify-center flex-col">
            <img
              src={emptyPng}
              alt=""
              className=" w-[25em] h-[80%] opacity-90"
            />
            <h1 className="text-xl font-semibold text-center text-stone-700 max-w-[15em]">
              No Card Request has been made to this account
            </h1>
          </div>: paginatedList.map(e => {
        return <CardRequestListingCard key={e.id} listData={e} />
      })}

    </div>

  </div>
}
export default CardListingPage