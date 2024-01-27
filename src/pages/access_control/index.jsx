import { useRef } from "react";
import {
  EpArrowDownBold,
  IconamoonSearch,
  IonHome,
  TypcnUserAdd,
} from "../../component/icons";

const AccessControlPage = () => {
  const tableNav = useRef();
  const checkRef = useRef()

  const setDropdownState=(ev)=>{
    checkRef.current.checked = false
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

  return (
    <section className="display-area w-full h-full px-10 flex flex-col bg-[#f6f7fb]">
      <div className="bread-crumps-grp mt-4 flex items-center gap-2 ">
        <IonHome />
        <p className="text-stone-400 text-[0.73rem] mt-[0.15rem] font-semibold">
          Home Page &nbsp;&nbsp;/ &nbsp;&nbsp;..&nbsp;&nbsp; /&nbsp;&nbsp;
          Dashboard &nbsp;&nbsp;/&nbsp;&nbsp; ..&nbsp;&nbsp; /&nbsp;&nbsp;{" "}
          <span className="text-[#2baf50]">Access Control</span>{" "}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="mt-3 text-4xl font-medium">User Access</h1>
        <button className="flex gap-2 py-2 items-center px-5 rounded-md bg-[#2baf50]">
          <TypcnUserAdd />
          <p className="text-white text-sm font-semibold">Add User</p>
        </button>
      </div>
      <div className="w-full h-full bg-white rounded-t-2xl rounded-r-2xl mt-5 py-3 ">
        <div id="tab-grp" ref={tableNav} className="flex gap-8 select-none mx-4">
          {["All", "Admins", "Sub Admins"].map((val, index) => {
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
        <div className="flex items-center mt-5 gap-4 mx-4" >
          <div
            id="search-grp"
            className="flex bg-[#f9f9f9] items-center gap-3 py-[0.40rem] px-2 rounded-xl w-fit"
          >
            <IconamoonSearch />
            <div id="input-grp">
              <input
                className="outline-none border-none bg-transparent text-[1.1em] mr-1"
                type="text"
                name="search"
                placeholder="search ..."
              />
            </div>
          </div>
          <label
            for="roles"
            // onMouseLeave={setDropdownState}
            class="drop py-[0.2rem] px-3 max-h-5em border[#e3e3e3] border-2 rounded-lg flex items-center gap-3 relative select-none"
          >
            <input
              id="roles"
              type="checkbox"
              className="hidden"
              name="dropdown"
              ref={checkRef}
            />
            <p className="font-semibold text-[0.9rem] mt-[0.15rem] text-[#666666] mr-2">
              Roles
            </p>
            <div className="arrow">
              <EpArrowDownBold />
            </div>

            {
              <div className="down z-30 absolute w-full bg-white hidden flex-col gap-3 rounded-lg shadow-md text-[0.8rem] text-stone-700 font-semibold left-0 p-[0.55rem] cursor-pointer">
                {["All", "Admins", "Sub Admins"].map((val) => {
                  return <p key={val}>{val}</p>
                })}
              </div>
            }
          </label>
        </div>
        <div className="thead flex mt-5 justify-between border-b-2 border-stone-100 px-4 pb-2">

            <div className="w-1/6">
            <input type="checkbox" name="all" id="" className=""/>
            </div>
            <h1 className="text-sm font-medium text-stone-700 w-full">Account</h1>
            <h1 className="text-sm font-medium text-stone-700 w-full">Branch</h1>
            <h1 className="text-sm font-medium text-stone-700 w-full">Date created</h1>
            <h1 className="text-sm font-medium text-stone-700 w-1/2">Role</h1>
            <div className="w-1/2"></div>

        </div>
      </div>
    </section>
  );
};
export default AccessControlPage;
