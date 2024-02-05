export default Object.defineProperty(Array.prototype,'first',{
    value:(array)=>{
        const [firstElement] = array;
        return firstElement
    }
})