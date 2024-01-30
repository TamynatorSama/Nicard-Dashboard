import { useDispatch } from "react-redux"
import { updateForm } from "../app/card_request/requestFormSlice"


const CustomInputField=({label = "National Identity Number",type="text",value="",name="",maxLength,pattern,inputMode,disabled=false, span = false ,max } )=>{

    const dispatch = useDispatch()

    const handleChange=(ev)=>{
        dispatch(updateForm({target:ev.target.name,value:ev.target.value}))
    }

    return <div className="inputBox relative w-full">
        <input onChange={handleChange} max={max}  placeholder="test" inputMode={inputMode} disabled={disabled} maxLength={maxLength} name={name} pattern={pattern} type={type} className="w-full" required value={value}/>
        <span>{label}</span>
    </div>
}
export default CustomInputField