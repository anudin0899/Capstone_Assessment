import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Home from '../Pages/Home/Home';
import SignIn from '../Components/SignIn/SignIn';
import SignUp from '../Components/SignUp/SignUp';

const Routing = () => {
    // const auth = useSelector(state => state.auth);

    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default Routing;
