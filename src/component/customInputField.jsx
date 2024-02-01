

const CustomInputField=({label = "National Identity Number",type="text",value="",name="",maxLength,pattern,inputMode,disabled=false, span = false ,max,onChange } )=>{

    // const dispatch = useDispatch()

    

    return <div className="inputBox relative w-full">
        <input onChange={onChange} max={max}  placeholder="test" inputMode={inputMode} disabled={disabled} maxLength={maxLength} name={name} pattern={pattern} type={type} className="w-full" required value={value}/>
        <span>{label}</span>
    </div>
}
export default CustomInputField