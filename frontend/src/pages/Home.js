import React from 'react';
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';
import { connect } from 'react-redux';

function Home(props) {
    
    return  (
        <> 
        {
            props.isLoggedIn?
            (
                <Layout>
                    <HeaderComponent username="Anudeep"/>
                    <HomeContent/>
                </Layout>
            ):
            (
                <Redirect to="/login"/>
            )
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.userLogin.loggedIn
})

export default connect(mapStateToProps,null)(Home);
