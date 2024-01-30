import { useDispatch, useSelector } from "react-redux";
import { EpArrowLeft } from "../../../component/icons";
import { changeCurrentPage } from "../../../app/card_listing/pagination";

const PaginationController = ({ listsPerPage, totalLists,totalItems }) => {
  const paginatorData = useSelector(state=>state.listingPaginator)
  const paginationNumber = [];
  for (let i = 1; i <= Math.ceil(totalLists / listsPerPage); i++) {
    paginationNumber.push(i);
  }

  const indexOfLastRequest = paginatorData.currentPage* paginatorData.perPage

  const dispatch = useDispatch()
  
  const changePage=(page)=>{
    dispatch(changeCurrentPage(page))
    
  }

  if(paginationNumber.length === 0)
  return <div></div>
  else 
  return (
    <div id="paginator" className="flex items-center gap-6">
      <div className={` ${paginatorData.currentPage<=1?"opacity-50":"opacity-100"}`}  onClick={()=>{
        if(paginatorData.currentPage<=1) return
        changePage(paginatorData.currentPage-1)
      }} >
      <EpArrowLeft />
      </div>
      <div className="numbers flex gap-4 select-none">
        {paginationNumber.map((val) => {
          return (
            <p onClick={()=>changePage(val)} key={val} className={`font-semibold text-[0.8rem] ${paginatorData.currentPage==val?"text-stone-900":"text-stone-500"} cursor-pointer`}>
              {val}
            </p>
          );
        })}
      </div>
      <div onClick={()=>{
        if(indexOfLastRequest>=totalItems) return
        changePage(paginatorData.currentPage+1)
      }} className={`rotate rotate-180 ${indexOfLastRequest>=totalItems?"opacity-50":"opacity-100"}`}>
        <EpArrowLeft />
      </div>
    </div>
  );
};

export default PaginationController;
