import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';

const UserList = () => {
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const [loading,setLoading] = useState(true);
    
    // loading data from the server
    useEffect(() => {
        setLoading(true);
        fetch(`https://young-wildwood-48486.herokuapp.com/specificUser/${user?.email}`)
            .then(res => res.json())
            .then(data => {
            setLoading(false);
            setUsers(data);
            // console.log(data);
        })
    }, [users])

    // console.log(users);
    
    // handle click on the add user button
    const handleClick = () => {
        const formDiv = document.getElementById('input-form');
        formDiv.classList.toggle('hidden');
    }

     // capturing data from react hook form
    const { register, handleSubmit, } = useForm();

        // function that will be triggered with the submit button
    const onSubmit = (data, e) => {
        data.userEmail = user.email;
        console.log(data);
        // const formDiv = document.getElementById('input-form');
        // formDiv.classList.toggle('hidden');
        // sending data to the server
        fetch('https://young-wildwood-48486.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                setSuccess(false);
                res.json();
                setSuccess(true);
                console.log(res);
            })
        e.target.reset();
    };
    return (
        <>
            <Navigation/>
            <div className="md:w-3/4 h-[78vh] mx-auto flex flex-col justify-center item-center">
                {/* page header */}
                    {users.length === 0 &&
                        <h1 className="text-5xl text-center font-bold">No Contacts added Yet!</h1> 
                    }
                {/* data shown in the table */}
                <div className="py-10">

                    {users &&
                        users.map((user) => <div className="w-[20rem] px-5 py-5 border-2 rounded-lg shadow-lg">
                            <p><span className="font-bold">Name :</span> {user.name}</p>
                            <p><span className="font-bold">Email :</span> {user.email}</p>
                            <p><span className="font-bold">Name :</span> {user.number}</p>

                            <button className="bg-red-300 px-3 py-2 rounded-lg hover:bg-red-400">Delete</button>
                        </div>)
                    }
                </div>

                {/* end of data shown in the table */}

                <button onClick={handleClick} className="bg-emerald-400 mx-auto w-1/2 px-3 py-2 rounded-md shadow-md">Create Contact</button>
                {/* form div starts here */}
                <div id="input-form" className="transition ease-in-out delay-150 hidden">
                 <form
                    className="md:w-1/2 mx-auto"
                    onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        type="text"
                        placeholder=" Enter Contact Name"
                        {...register("name", { required: true})}
                    />
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        type="email"
                        placeholder=" Enter Contact email"
                        {...register("email", { required: true})}
                    />
                    <input
                        className="border-solid border-2 border-gray-300 py-2 my-3 rounded-md shadow-md focus:outline-1 w-full"
                        placeholder=" Enter Contact Number"
                        
                        {...register("number", { required: true, pattern: /[2-9]{1}\d{2}/ })}
                    />
                    <input
                        className="bg-emerald-400 px-3 py-2 rounded-md shadow-md"
                        type="submit"
                        value='Register' />
                        <button
                            className="bg-emerald-400 px-3 py-2 rounded-md shadow-md ml-3">
                            Already Registered ? Login Now
                        </button>
                    </form>
                    {/* successfull operation */}
            {
             success &&
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                        </div>
                        <div>
                        <p className="font-bold">Successfully created!</p>
                    </div>
                </div>
                </div>
            }
                </div>
            </div>
        </>

    );
};

export default UserList;