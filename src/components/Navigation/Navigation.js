import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
    // grab everything we need

    // console.log(mobileBtn);

    // add event listeners
    const { user,logout } = useAuth();
    const handleClick = () => {
            const menu = document.getElementById('responsive-menu');
           menu.classList.toggle("hidden");
    }


    return (
        <div>
                {/* <!-- navbar goes here --> */}
                <nav className="bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">

                    <div className="flex space-x-4">
                        {/* <!-- logo --> */}
                        <div>
                        <Link to="/home" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span className="font-bold">Contacts Management</span>
                        </Link>
                        </div>

                        {/* <!-- primary nav --> */}
                        <div className="hidden md:flex items-center space-x-1">
                        <Link to='/userlist' className="py-5 px-3 text-gray-700 hover:text-gray-900">User List</Link>
                        <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</a>
                        </div>
                    </div>

                    {/* <!-- secondary nav --> */}
                    <div className="hidden md:flex items-center space-x-1">
                        {
                                user?.email ?
                                <button
                                    onClick = {logout}   
                                    className="py-2 px-3 bg-red-400 hover:bg-red-300 text-red-900 hover:text-red-800 rounded transition duration-300">
                                    Logout
                                </button> : <Link to="/login" className="py-5 px-3">Login</Link>
                        }
                        {
                                !user?.email && <Link to="/register" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Register</Link>
                        }    
                     

                    </div>

                    {/* <!-- mobile button goes here --> */}
                    <div className="md:hidden flex items-center">
                        <button
                        className="mobile-menu-button"
                        onClick={handleClick}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>

                    </div>
                </div>

                {/* <!-- mobile menu --> */}
                <div id='responsive-menu' className="mobile-menu hidden md:hidden">
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
                </div>
                </nav>
        </div>
    );
};

export default Navigation;