import React from 'react';
import {Layout} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';
import { connect } from 'react-redux';

function Home(props) {
    console.log(props.isLoggedIn);
    if(props.isLoggedIn)
    return (
        <Layout>
            <HeaderComponent username="Anudeep"/>
            <HomeContent/>
        </Layout>
    );
    else
    return (
        <div style={{textAlign: 'center'}}>
        <h1>Login to Continue</h1>
        <a  href="/login">Login Here!</a> 
       </div>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.userLogin.loggedIn
})

export default connect(mapStateToProps,null)(Home);
