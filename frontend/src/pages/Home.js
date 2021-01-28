import React,{useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'
import {Layout, Modal, Button, Select, Avatar,Alert} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';
import { connect } from 'react-redux';
import {createWorkspace, fetchWorkspaces} from '../redux/workspace';
import languages from '../languages';
import styled from 'styled-components';
import axios from 'axios';
import debounce from 'lodash.debounce';

const {Option} = Select.Option; 

const MemberCard = styled.div`
display:flex;
flex-direction:row;
height:3em;
width:18em;
align-items:center;
margin:1em 0;
padding:0 1em;
`
function parseUser(data){
    return data.map((d)=>{
        return {
            value: d._id,
            text: d.username
        }
    });
}

function Home(props) {
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const [workspace, setWorkspace] = useState({});
    const [user, setUser] = useState([]);

    const configureWorkspace = (id) => {
        for(let i=0;i<props.workspaces.length;i++){
            if(id==props.workspaces[i]._id){
                setWorkspace(props.workspaces[i]);
            }
        }
        setVisible(true);
    }

    React.useEffect(()=>{
        console.log(user);
    },[user])

    function searchUser(text){
        axios.get(`/api/usr/search?s=${text}`).then(response=>{
            let data = response.data;
            if(data.status){
                let parsedData = parseUser(data.data);
                //if(parsedData!=user) 
                    setUser(parsedData);
            }
        })
    }

    const debouncedSearchUser = debounce(searchUser, 1200);

    const handleOk = () => {

    }

    const handleCancel = () => {
        setVisible(false);
    }

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
                        <HomeContent handleCreate={props.createWorkspace} workspaces={props.workspaces} configureWorkspace={configureWorkspace}/>
                        <Modal
                            visible={visible}
                            title="Configure"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                    Update
                                </Button>,
                            ]}
                            >
                            <h3>Language</h3>
                            <Select
                                style={{width: "18em"}}
                                placeholder="Select a Language"
                                value={workspace?.language}
                            >
                                {languages.map((language) => (
                                    <Select.Option value={language.value}>{language.name}</Select.Option>
                                ))}
                            </Select>
                            <h3>Collabarators</h3>
                            <Select showSearch style={{width: "18em"}} onSearch={debouncedSearchUser} onChange={console.log}>
                                {user.map(d => (
                                    <Option value={d.value}>{d.text}</Option>
                                ))}
                            </Select>
                            {workspace.collaborators?.length?
                            workspace.collaborators.map((c)=>
                                <MemberCard>
                                    <Avatar
                                        style={{
                                            color: '#f56a00',
                                            backgroundColor: '#fde3cf',
                                        }}
                                    >
                                        {c.username[0].toUpperCase()}
                                    </Avatar>
                                    <h4 style={{marginLeft: "1em"}}>{c.username}</h4>
                                </MemberCard>   
                            ):(
                                <Alert message="No collaborators" type="info" showIcon style={{marginTop:'1em'}}/>
                            )}
                        </Modal>
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
