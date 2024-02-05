import { useEffect, useRef } from "react";
import {
  EpArrowDownBold,
  IconamoonSearch,
  IonHome,
  TypcnUserAdd,
} from "../../component/icons";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../app/appSlice";
import { accessLoaderState, accessUserList, getUserListingSlice } from "../../app/access_control/userList";
import { ThreeDots } from "react-loader-spinner";
import { updateState } from "../../app/access_control/createNewUserSlice";
import useAuth from "../../utils/hooks/useAuth";

const AccessControlPage = () => {
  const tableNav = useRef();
  // const checkRef = useRef()

  const profile = useSelector(profileData)
  const dispatch = useDispatch()
  const authState = useAuth()
  const listData = useSelector(accessUserList)
  const loadignState = useSelector(accessLoaderState)
  // const setDropdownState=(ev)=>{
  //   checkRef.current.checked = false
  // }

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

  useEffect(() => {
    const payload = Object.values(authState.roles).includes(7100 || 7000) ?{
      url: 'getNimcUsers',
      param: new Array().first(profile.institution?.institution_data??[])?.id
    } :{param: new Array().first(profile.institution?.bank_data??[])?.id ?? "",url:"getBankUsers"
  }
    dispatch(getUserListingSlice(payload
      ))
  }, [profile?.institution, dispatch])

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
      <div className="flex justify-between items-center mb-5">
        <h1 className="mt-3 text-4xl font-medium">User Access</h1>
        <button onClick={()=>dispatch(updateState({
          key:"isModalOpen",
          value: true
        }))} className="active:bg-[#329f51] flex gap-2 py-2 items-center px-5 rounded-md bg-[#2baf50]">
          <TypcnUserAdd />
          <p className="text-white text-sm font-semibold">Add User</p>
        </button>
      </div>
      <div className="w-full h-full bg-white rounded-t-2xl rounded-r-2xl  py-3 flex flex-col overflow-y-scroll no-bars">
        {/* <div className="h-full flex flex-col overflow-scroll">
          <div className="h-screen bg-red-500"></div>
        </div> */}
        <div id="tab-grp" ref={tableNav} className="flex gap-8 select-none mx-4">
          {["All", "Admins", "Users"].map((val, index) => {
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
            // ref={checkRef}
            />
            <p className="font-semibold text-[0.9rem] mt-[0.15rem] text-[#666666] mr-2">
              Roles
            </p>
            <div className="arrow">
              <EpArrowDownBold />
            </div>

            {
              <div className="down z-30 absolute w-full bg-white hidden flex-col gap-3 rounded-lg shadow-md text-[0.8rem] text-stone-700 font-semibold left-0 p-[0.55rem] cursor-pointer">
                {["All", "Admins", "User"].map((val) => {
                  return <p key={val}>{val}</p>
                })}
              </div>
            }
          </label>
        </div>
        <div className="thead flex mt-5 justify-between border-b-2 border-stone-100 px-4 pb-2">

          <div className="w-1/6">
            <input type="checkbox" name="all" id="" className="" />
          </div>
          <h1 className="text-sm font-medium text-stone-700 w-full">Account</h1>
          <h1 className="text-sm font-medium text-stone-700 w-full">Branch</h1>
          <h1 className="text-sm font-medium text-stone-700 w-full">Date created</h1>
          <h1 className="text-sm font-medium text-stone-700 w-1/2">Role</h1>
          <div className="w-1/2"></div>

        </div>
        <div className="list-grp w-full h-full overflow-y-scroll no-bars">
          {loadignState === 'loading' && listData.length ===0 ? <div className="flex h-full justify-center items-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div> : <div className="h-full">
            {
              listData.map(data => {
                return <div key={data.user_info[0].email} className="thead flex pt-5 justify-between border-b-2 border-stone-100 px-4 pb-2">

                  <div className="w-1/6">
                    <input type="checkbox" name="all" id="" className="" />
                  </div>
                  <div className="text-sm font-medium text-stone-700 w-full">
                    <h1 className="text-[0.8rem] font-medium w-full text-stone-800 te">
                      {data.user_info[0].first_name + " " + data.user_info[0].last_name}
                    </h1>
                    <p className="text-[0.7em] text-stone-500 w-full">{data.user_info[0].email}</p>

                  </div>
                  <h1 className="text-sm font-medium text-stone-700 w-full">{data.branch_name}</h1>
                  <h1 className="text-sm font-medium text-stone-700 w-full">{new Date(data.user_info[0].created_at).toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</h1>
                  <h1 className="text-sm font-medium text-stone-700 w-1/2">{Object.keys(data.user_info[0].roles)[0].split("_")[1]}</h1>
                  <div className="w-1/2"></div>

                </div>
              })
            }
          </div>}
        </div>
      </div>
    </section>
  );
};
export default AccessControlPage;
