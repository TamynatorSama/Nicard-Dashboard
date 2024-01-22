import '../App.css'
import NavComponent from "../component/navComponent"

const Dashboard = () => {
    return <main className="w-full flex flex-row">
        <NavComponent />
        <div className="logo-grp flex flex-col items-left w-full ">
            <h1 className='text-4xl mt-6 ml-4'>Dashboard</h1>
            <div className='bg-gray-200 w-1/3 ml-4 mt-4 rounded-lg'>
                <div className="input-grp flex border-2 border-stone-200 p-2 rounded-lg w-full max-w-[30em]">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="stroke-stone-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-search"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>

                    <input
                        class="w-full outline-none ml-4 font-medium bg-transparent"
                        type="text"
                        name="search"
                        placeholder="Search by nin"
                    />
                </div>
            </div>
            <h1 className="text-2xl pl-10 font-bold mt-4 ">Card Requests</h1>
            <div className="w-full overflow-x-scroll no-bars ml-10 mt-4">
                <div className='grid grid-cols-7'>
                    <p>S/N</p>
                    <p>Contact Info</p>
                    <p>NIN</p>
                    <p>Request</p>
                    <p>Actions</p>
                </div>
            </div>
        </div>
    </main>
}

export default Dashboard