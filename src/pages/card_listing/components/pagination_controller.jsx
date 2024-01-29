import { useDispatch } from "react-redux";
import { EpArrowLeft } from "../../../component/icons";
import { changeCurrentPage } from "../../../app/card_listing/pagination";

const PaginationController = ({ listsPerPage, totalLists }) => {
  const paginationNumber = [];
  for (let i = 1; i <= Math.ceil(totalLists / listsPerPage); i++) {
    paginationNumber.push(i);
  }

  const dispatch = useDispatch()

  const changePage=(page)=>{
    dispatch(changeCurrentPage(page))
  }


  return (
    <div id="paginator" className="flex items-center gap-6">
      <div onClick={()=>changePage()}>
      <EpArrowLeft />
      </div>
      <div className="numbers flex gap-4 select-none">
        {paginationNumber.map((val) => {
          return (
            <p onClick={()=>changePage(val)} key={val} className="font-semibold text-[0.8rem] cursor-pointer">
              {val}
            </p>
          );
        })}
      </div>
      <div className="rotate rotate-180">
        <EpArrowLeft />
      </div>
    </div>
  );
};

export default PaginationController;
