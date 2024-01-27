import { useDispatch } from "react-redux"
import { updateForm } from "../app/card_request/requestFormSlice"


const CustomInputField=({label = "National Identity Number",type="text",value="",name="",maxLength,pattern,inputMode,disabled=false} )=>{

    const dispatch = useDispatch()

    const handleChange=(ev)=>{
        dispatch(updateForm({target:ev.target.name,value:ev.target.value}))
    }

    return <div className="inputBox relative">
        <input onChange={handleChange} placeholder="test" inputMode={inputMode} disabled={disabled} maxLength={maxLength} name={name} pattern={pattern} type={type} required className="min-w-[20rem]" value={value}/>
        <span>{label}</span>
    </div>
}
export default CustomInputField