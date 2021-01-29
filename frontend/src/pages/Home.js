import React,{useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'
import {Layout, Modal, Button, Select, Avatar, Alert, Spin, message} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';
import { connect } from 'react-redux';
import {createWorkspace, fetchWorkspaces} from '../redux/workspace';
import languages from '../languages';
import styled from 'styled-components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { CloseOutlined } from '@ant-design/icons'
const {Option} = Select; 

const MemberCard = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
height:3em;
width:18em;
align-items:center;
margin:1em 0;
padding:0 1em;
background: #f0f0f0;
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
    const [fetching, setFetching] = useState(false);
    const [workspace, setWorkspace] = useState({});
    const [user, setUser] = useState([]);
    const [userValue, setUserValue] = useState();

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

    let lastFetchId = 0;

    function searchUser(text){
        setFetching(true);
        lastFetchId += 1;
        const fetchId = lastFetchId;
        axios.get(`/api/usr/search?s=${text}`).then(response=>{
            let data = response.data;
            if(data.status){
                setFetching(false);
                let parsedData = parseUser(data.data);
                if(fetchId!==lastFetchId)
                    return;
                    setUser(parsedData);
            }
        })
    }

    function removeUser(id){
        let users = workspace.collaborators.filter((d)=>{
            return d._id!=id;
        });
        setWorkspace({...workspace,collaborators: users});
    }

    function changeLanguage(value){
        setWorkspace({...workspace, language: value})
    }

    function onChangeUser(value){
        console.log(value);
        let u;
        for(let i=0;i<user.length;i++){
            if(value==user[i].value){
                u = {
                    _id: user[i].value,
                    username: user[i].text
                };
                break;
            }
        }
        if(u)
        setWorkspace({...workspace,collaborators:[u, ...workspace.collaborators]});
    }

    useEffect(()=>{
        console.log(workspace)
    },[workspace])

    const handleOk = () => {
        setLoading(true);
        axios.put(`/api/workspace/${workspace._id}`,workspace).then(response=>{
            let data = response.data;
            if(data.status){
                message.success("Workspace updated successfully");
            } else{
                message.error("Oops! something went wrong");
            }
            setLoading(false);
            handleCancel();
            props.fetchWorkspaces();
        })
    }

    const deleteWorkspace = (id) => {
        axios.delete(`/api/workspace/${id}`).then(response=>{
            let data = response.data;
            if(data.status){
                message.success("Workspace deleted Successfully");
            } else {
                message.error("Oops! something went wrong")
            }
            props.fetchWorkspaces();
        })
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
                        <HomeContent handleCreate={props.createWorkspace} workspaces={props.workspaces} configureWorkspace={configureWorkspace} deleteWorkspace={deleteWorkspace}/>
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
                                onChange={changeLanguage}
                            >
                                {languages.map((language) => (
                                    <Select.Option value={language.value}>{language.name}</Select.Option>
                                ))}
                            </Select>
                            <h3>Collabarators</h3>
                            <Select 
                            showSearch 
                            style={{width: "18em"}} 
                            onSearch={searchUser} 
                            onChange={onChangeUser}
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            defaultActiveFirstOption={false}
                            placeholder="Search For Users"
                            value={userValue}
                            filterOption={false}
                            >
                                {user.map(d => (
                                            <Option value={d.value}>{d.text}</Option>
                                        )
                                    )
                                }
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
                                    <h4>{c.username}</h4>
                                    <Button danger type="dashed" shape="circle" icon={<CloseOutlined />} onClick={()=>removeUser(c._id)}/>
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
