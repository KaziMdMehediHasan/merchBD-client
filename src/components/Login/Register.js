import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';

const Register = () => {
    // capture the location from where user has come to the registration page
    const location = useLocation();
    // using the history we will redirect the users to the route he came from
    const history = useHistory();

    // capturing data from react hook form
    const { register, handleSubmit } = useForm();

    // destructuring the functions from context
    const { registerUser, isLoading, user, authError } = useAuth();
    
    // function that will be triggered with the submit button
    const onSubmit = (data,e) => {
        const email = data.email;
        const name = data.name;
        const password1 = data.password1;
        const password2 = data.password2;
        // checking password
        password1 === password2 ? console.log(data) : alert('MisMatch Password');
        // console.log(password1, password2)
        registerUser(email, password1,location,history);
        e.target.reset();
    };
    
    return (
        <>
        <Navigation/>
          <div className="md:w-3/4 h-[78vh] mx-auto flex flex-col justify-center item-center">
          
                <h1 className="text-5xl my-5 text-center font-bold">Register as a New User</h1>
                {
                    !isLoading &&                 <form
                    className="md:w-1/2 mx-auto"
                    onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        type="text"
                        placeholder=" Enter Your Name"
                        {...register("name", { required: true})}
                    />
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        type="email"
                        placeholder=" Enter Your Password"
                        {...register("email", { required: true})}
                    />
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        placeholder=" Confirm Your Password (at least 8 characters)"
                        type="password"
                        {...register("password1", { required: true,minLength:8})}
                    />
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        placeholder=" Enter Your Email (at least 8 characters)"
                        type="password"
                        {...register("password2", { required: true,minLength:8})}
                    />
                    <input
                        className="bg-emerald-400 px-3 py-2 rounded-md shadow-md"
                        type="submit"
                        value='Register' />
                    <NavLink to="/login">
                        <button
                            className="bg-emerald-400 px-3 py-2 rounded-md shadow-md ml-3">
                            Already Registered ? Login Now
                        </button>
                    </NavLink>
                </form>
                }

                {/* loader  */}
            {
                isLoading &&
                <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            }
            {/* show successful message */}
            {
             user?.email &&
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                        </div>
                    <div>
                        <p className="font-bold">Registered Successfully!</p>
                    </div>
                </div>
                </div>
            }
            {/* show error message */}
            {authError && 
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Registration Failed!
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{authError}</p>
                </div>
                </div>}
            </div>  
        </>
    );
};

export default Register;