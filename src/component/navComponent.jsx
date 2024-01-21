
// import CustomDropDown from "./customDropdown";
import Logo from "../assets/logo.svg";
const NavComponent = () => {
  return (
    <nav className="flex px-20 items-center pt-10 gap-5 ">
      <div className="logo-grp flex items-center gap-14 w-full">
        <div className="flex items-center gap-5">
        <img src={Logo} className="h-full" alt="Nicard logo" />
          <div><h1 className="font-bold text-2xl text-nowrap">Unity Bank</h1>
          <p className="text-stone-400 text-sm font-semibold">Lagos,Nigeria</p></div>
        </div>
        <div className="input-grp flex border-2 border-stone-200 p-2 rounded-lg w-full max-w-[30em]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="stroke-stone-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            class="w-full outline-none ml-4 font-medium"
            type="text"
            name="search"
            placeholder="Search by nin"
          />
        </div>
      </div>

      
     {/* <CustomDropDown /> */}
    </nav>
  );
};
export default NavComponent;
