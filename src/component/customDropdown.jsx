import { useRef } from "react";
import "../App.css";
import { EpArrowDownBold } from "./icons";

const CustomDropDown = ({icon,title,items=[],onChange}) => {
  
  const dateRef = useRef()

  const showDatePicker=()=>{
    // dateRef.current.showPicker();
  }

  const onClickFilter=(value)=>{
    // alert(value)
  }
  

  return (
    <label onClick={showDatePicker}  for={title} class="drop group py-[0.2rem] px-3 border[#e3e3e3] border-2 rounded-lg flex items-center gap-3 relative select-none">
      <input id={title} type="checkbox" className="hidden" name="dropdown"/>
      {icon}
      <p className="font-semibold text-[0.9rem] mt-[0.15rem] text-[#666666] mr-2">{title}</p>
      <div className="arrow">
      <EpArrowDownBold />
      </div>
      
      {items.length === 0?<input ref={dateRef} type="date" className="hidden datepicker-input "/>:<div className="down z-30 absolute w-full bg-white hidden flex-col gap-3 rounded-lg shadow-md text-[0.8rem] text-stone-700 font-semibold left-0 p-[0.55rem] cursor-pointer">
      {
        items.map(val=>{
          return <p key={val} onClick={()=>onClickFilter(val)} >{val}</p>
        })
      }
      </div>}
    </label>
  );
};
export default CustomDropDown;
