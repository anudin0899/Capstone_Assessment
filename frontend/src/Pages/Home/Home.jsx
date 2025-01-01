import React from 'react'
import Style from "./index.module.css"
import Header from '../../Components/Header/Header';


const Home = () => {

    return (
        <div className={Style.page_wrapper}>
            <Header />
            <div className={Style.main}>
                <h1>Welcome</h1>
            </div>
        </div>
    )
}

export default Home