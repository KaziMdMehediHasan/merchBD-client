import React from 'react';
import Navigation from '../Navigation/Navigation';

const Homepage = () => {
    return (
        <div>
            <Navigation />
            <h1 className="text-4xl text-center font-bold">Contact List Creation and Maintain Website</h1>
            <p className="text-center py-5">This site is all about a simple contact creation and modification.Authenticated user can add their favourite contacts and make changes according to their preferences.</p>
        </div>
    );
};

export default Homepage;