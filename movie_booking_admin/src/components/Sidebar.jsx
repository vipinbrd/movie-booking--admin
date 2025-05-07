import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
   const navigate=useNavigate();

    function logoutHandler(){
        localStorage.removeItem("userInfo")
        navigate("/login")
    
    }
    return (
        <div className="flex">
            <div className="w-64 bg-gray-800 text-white min-h-screen p-5">
                <h2 className="text-2xl font-bold text-center text-white mb-8">Admin Panel</h2>
                <ul>
                    <li className="mb-4">
                        <Link to="/manage-category" className="text-lg hover:text-gray-400">Manage Categories</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/manage-movie" className="text-lg hover:text-gray-400">Manage Movies</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/manage-showtime" className="text-lg hover:text-gray-400">Manage Showtimes</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/manage-booking" className="text-lg hover:text-gray-400">Manage Bookings</Link>
                    </li>
                    <li className="mb-4">
                       <button onClick={logoutHandler} className="text-lg text-[red] hover:text-gray-400">Logout</button>
                    </li>
                </ul>
            </div>

       
        </div>
    );
}
