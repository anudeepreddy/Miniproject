import React,{useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';
import { connect } from 'react-redux';
import {createWorkspace, fetchWorkspaces} from '../redux/workspace';

function Home(props) {
    
    useEffect(()=>{
        props.fetchWorkspaces();
    },[])

    return  (
        <> 
            {
                props.isLoggedIn?
                (
                    <Layout>
                        <HeaderComponent username="Anudeep"/>
                        <HomeContent handleCreate={props.createWorkspace} workspaces={props.workspaces}/>
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
    isLoggedIn: state.userLogin.loggedIn,
    workspaces: state.workspace.workspaces
})

const mapDispatchToProps = (dispatch) => ({
    createWorkspace: (data) => dispatch(createWorkspace(data)),
    fetchWorkspaces: () => dispatch(fetchWorkspaces())
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
