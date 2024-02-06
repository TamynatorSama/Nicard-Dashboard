import { useDispatch, useSelector } from 'react-redux'
import NewLogo from '../../../assets/newLogo.png'
import { modalInfo, updateListModalState } from '../../../app/card_listing/listingFilterSlice'
import { useRef } from 'react'

const ViewInfoModal = () => {
    const dispatch = useDispatch()
    const modalInformation = useSelector(modalInfo)
    const printRef = useRef()
    const textFunction=()=>{
        var prtContent = printRef.current;
var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
WinPrint.close();
    }
    return <div ref={printRef} id="myModal" className=" absolute w-full h-full bg-[rgba(0,0,0,0.4)] z-50 backdrop-blur-sm flex items-center justify-center">
        <div className="p-4 bg-white w-full max-w-[27rem] rounded-md">
            <div className="flex items-center gap-4 justify-start mb-5">
                <img src={NewLogo} alt="Nicard Logo" className="w-[2em]" />
                <h1 className="hidden lg:block text-xl font-semibold">eIDCard</h1>
            </div>
            <div className='mt-3'>
                <p className='text-stone-400 text-[0.7rem]'>Full Name</p>
                <h3 className='text-base text-stone-600 font-medium'>{`${modalInformation.first_name}, ${modalInformation.last_name} ${modalInformation.middle_name}`}</h3>
            </div>
            <div className='mt-3'>
                <p className='text-stone-400 text-[0.7rem]'>Nin</p>
                <h3 className='text-base text-stone-600 font-medium'>{modalInformation.nin}</h3>
            </div>
            <div className="mt-3 flex justify-between items-center gap-3">
                <div className='w-full'>
                    <p className='text-stone-400 text-[0.7rem]'>Request Type</p>
                    <h3 className='text-base text-stone-600 font-medium'>{modalInformation.request_type}</h3>
                </div>
                <div className='w-full text-nowrap'>
                    <p className='text-stone-400 text-[0.7rem]'>Request Status</p>
                    <h3 className='text-base text-stone-600 font-medium'>{modalInformation.request_status}</h3>
                </div>
            </div>
            <div className="mt-3 flex justify-between items-center gap-3">
                <div className='w-full'>
                    <p className='text-stone-400 text-[0.7rem]'>Bank</p>
                    <h3 className='text-base text-stone-600 font-medium'>Stanbic IBTC Bank</h3>
                </div>
                <div className='w-full'>
                    <p className='text-stone-400 text-[0.7rem]'>Last branch Interacted With</p>
                    <h3 className='text-base text-stone-600 font-medium'>STANBIC MADINA</h3>
                </div>
            </div>
            <div className="mt-3 flex justify-between items-center gap-3">
                <div className='w-full'>
                    <p className='text-stone-400 text-[0.7rem]'>Card Type</p>
                    <h3 className='text-base text-stone-600 font-medium'>Debit</h3>
                </div>
                <div className='w-full'>
                    <p className='text-stone-400 text-[0.7rem]'>Account Number</p>
                    <h3 className='text-base text-stone-600 font-medium'>2144374418</h3>
                </div>
            </div>
            <div className='mt-2 mb-7'>
                <p className='text-stone-400 text-[0.7rem]'>Reference Number</p>
                <h3 className='text-base text-stone-600 font-medium'>{modalInformation.ref_id}</h3>
            </div>
            <button 
            onClick={()=>dispatch(updateListModalState(false))}
          className="active:scale-95 active:bg-white outline-white disabled:bg-[#2baf50c7] w-full grid place-content-center border-2 border-[#2baf50] text-stone-700 font-bold py-2 px-5 rounded-md mt-4"
        >
            Close
          {/* {createState.isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg> : "Create User"} */}
        </button>
            <button 
            onClick={textFunction}
          className="btn-custom outline-white disabled:bg-[#2baf50c7] w-full grid place-content-center bg-[#2baf50] text-white font-bold py-2 px-5 rounded-md mt-2"
        >
            Print
          {/* {createState.isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg> : "Create User"} */}
        </button>
        </div>
    </div>
}

export default ViewInfoModal