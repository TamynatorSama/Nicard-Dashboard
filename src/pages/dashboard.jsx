import '../App.css'
import NavComponent from "../component/navComponent"

const Dashboard = ()=>{
    return <main className="w-full ">
        <NavComponent />
        <h1 className="text-2xl px-20  font-bold mt-10">Card Requests</h1>
        <div className="w-full overflow-x-scroll no-bars pl-20 md:px-20 mt-10">
        <div className='grid grid-cols-7'>
            <p>S/N</p>
            <p>Contact Info</p>
            <p>NIN</p>
            <p>Request</p>
            <p>Actions</p>
        </div>
        </div>
    </main>
}

export default Dashboard