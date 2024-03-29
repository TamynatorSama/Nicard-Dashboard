import { useRef } from "react";
import "../App.css";
import { EpArrowDownBold } from "./icons";
import React, { useState } from 'react';

const CustomDropDown = ({icon,title,items=[],onChange,optional_id,isAction = false,disabled=false}) => {
  
  const dateRef = useRef()

  const showDatePicker=()=>{
    // dateRef.current.showPicker();
  }
  const onClickFilter=(value)=>{
    if(isAction){
      // testRef.current.disabled = false
      // console.log(action)
    }
    if(onChange){
      onChange(value)
    }
  }
  

  return (
    <label tabIndex="1" onClick={showDatePicker}  for={optional_id??title} className="drop group py-[0.2rem] z-30 px-3 border[#e3e3e3] border-2 rounded-lg flex items-center justify-between gap-3 relative select-none bg-white">
       {<input id={optional_id??title} disabled={disabled} type="checkbox" className="hidden" name="dropdown"/>}
      {icon}
      <p className="font-semibold text-[0.9rem] mt-[0.15rem] text-[#666666] mr-2">{title}</p>
      <div className="arrow">
      <EpArrowDownBold />
      </div>
      
      {items.length === 0?<input ref={dateRef} type="date" className="hidden datepicker-input "/>:<div className="down z-30 absolute w-full bg-white hidden flex-col gap-3 rounded-lg shadow-md text-[0.8rem] text-stone-700 font-semibold left-0 p-[0.55rem] cursor-pointer max-h-28 overflow-y-scroll">
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
