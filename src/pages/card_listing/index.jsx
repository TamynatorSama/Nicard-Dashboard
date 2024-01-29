
import CardRequestListingCard from "./components/card_request_listing_card";
import CustomDropDown from "../../component/customDropdown";
import {
  FluentTag28Regular,
  IconamoonSearch,
  IonHome,
  MaterialSymbolsDiscoverTuneRounded,
} from "../../component/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardList } from "../../app/appSlice";
import PaginationController from "./components/pagination_controller";
import { changeListPerPage } from "../../app/card_listing/pagination";

const CardListingPage = ()=>{

    const paginatorData = useSelector(state=>state.listingPaginator)
    const dispatch = useDispatch()

    const tableNav = useRef();
    const bankCardListing = useSelector(cardList)

  const contactStyle = {
    "grid-column": "1/3",
  };
  const actionStyle = {
    "grid-column": "5/7",
  };

  const changePerPage=(value)=>{
    console.log("asdasd")
      dispatch(changeListPerPage(value))
  }

  const changeTableState = (index) => {
    let navItems = tableNav.current.children;

    let myNavElement;

    for (const element of navItems) {
      if (element.children[1]) {
        myNavElement = element.children[1];
        element.removeChild(element.children[1]);
      }
    }
    navItems.item(index).appendChild(myNavElement);
  };

  const indexOfLastRequest = paginatorData.currentPage* paginatorData.perPage
  const indexOfFirstRequest = indexOfLastRequest - paginatorData.perPage
  const paginatedList = bankCardListing.slice(indexOfFirstRequest,indexOfLastRequest)

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
      <h1 className="mt-3 text-4xl font-medium">Unity Bank</h1>
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
            name="search"
            placeholder="search ..."
          />
        </div>
      </div>
      <div id="other-filter-grp" className="flex gap-5">
        {/* <CustomDropDown icon={<UiwDate />} title="Date" /> */}

        <CustomDropDown
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
        />
        <CustomDropDown
          icon={<MaterialSymbolsDiscoverTuneRounded />}
          title="Request Types"
          items={[
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
      {[
        "All Requests",
        "Pending NIMC Validation",
        "Pending Bank Validation",
        "Approved",
        "Processing",
        "Done",
        "Ready for Pickup",
      ].map((val, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => changeTableState(index)}
          >
            <div>
              <p className="text-[0.7rem] font-semibold">{val}</p>
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
          showing {indexOfFirstRequest} - {indexOfLastRequest > bankCardListing.length?bankCardListing.length:indexOfLastRequest } of results
        </p>
      </div>
      <PaginationController listsPerPage={paginatorData.perPage} totalLists={bankCardListing.length} />
      <div id="perpage-modifier" className="flex items-center gap-4">
      <p className="text-stone-400 text-[0.8rem] font-medium">
          Request per page
        </p>
        <CustomDropDown title={paginatorData.perPage} items={["5","10","15"]} onChange={changePerPage}/>
      </div>
    </div>
    <div className="flex gap-4 rounded-xl p-2 bg-[#f9f9f9]">
          {/* header */}
          <p
          
            className="w-11/12 text-[0.76rem] font-medium text-stone-500"
            style={contactStyle}
          >
            Contact Info
          </p>
          <p className="text-[0.76rem] text-stone-500 w-1/2">NIN</p>
          <p className="text-[0.76rem] text-stone-500 w-4/5">Request Date</p>
          <p className="text-[0.76rem] text-stone-500 w-full" style={actionStyle}>Request Status</p>
          <p className="text-[0.76rem] text-stone-500 w-2/5">Request Type</p>
          <p className="text-[0.76rem] text-stone-500 w-1/2">
            Actions
          </p>

          {/* end of header */}
        </div>
        <div className="flex flex-col gap-6 mt-4 h-full overflow-scroll pb-5 no-bars">
          {paginatedList.map(e=>{
            return <CardRequestListingCard key={e.id}  listData={e}/>
          })}
          {/* <CardRequestListingCard  status="done"/>
          <CardRequestListingCard />
          <CardRequestListingCard />
          <CardRequestListingCard />
          <CardRequestListingCard status="approved"/>
          <CardRequestListingCard />
          <CardRequestListingCard status="ready"/> */}
        </div>

  </div>
}
export default CardListingPage