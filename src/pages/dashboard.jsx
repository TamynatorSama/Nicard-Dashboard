import '../App.css'
import NavComponent from "../component/navComponent"

const Dashboard = () => {
    return <main className="w-full ">
        <NavComponent />
        <div className='flex'>
            <div className='ml-24 mt-8 '>
                <h1 className='text-2xl pt-4 pb-4 pl-6 pr-6 bg-green-500 rounded-md text-white mb-4'>Dashboard</h1>
                <h1 className='text-2xl text-gray-500 block'>Request Card</h1>
            </div>

            <div className='bg-gray-200'>
                <h1 className="text-2xl px-20  font-bold mt-10 ">Card Requests</h1>
                <div className="w-full overflow-x-scroll no-bars pl-20 md:px-20 mt-10">
                    <div className='grid grid-cols-7'>
                        <p>S/N</p>
                        <p>Contact Info</p>
                        <p>NIN</p>
                        <p>Request</p>
                        <p>Actions</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
}

export default Dashboard