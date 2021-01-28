import React, { useEffect, useContext, useState } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Col, Layout, Row} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';
import LanguageCode from "components/workspace/LanguageCode";
import { connect } from 'react-redux'; 
import { fetchWorkspace } from '../redux/workspace';
import SocketContext from '../components/SocketContext';

const {Content} = Layout;

function Workspace(props) {
    const {id} = useParams();

    const [code, setCode] = useState();

    const [joinedRoom, setJoinedRoom] = useState(false);

    const username = localStorage.getItem('user');

    const socket = useContext(SocketContext);

    const RunCode = (input) => {
        socket.emit('runCode',{
                roomId: id,
                Program: code,
                LanguageChoice: LanguageCode(props.workspace?.language),
                Input:input
            }
        );
    }

    useEffect(()=>{
        props.fetchWorkspace(id)
        socket.on('output',console.log);
    },[])

    useEffect(()=>{
        socket.on('server-hello', data => {
            setJoinedRoom(true);
            console.log(data);
        });
        
        socket.emit('join-room',id);

        socket.on('joined', data => {
            console.log(data);
        });

    }, []);

    return (
        <>
            {
                props.isLoggedIn?
                (
                    <Layout>
                        <HeaderComponent username={username} workspaceOwner={props.workspace?.owner.username} workspaceName={props.workspace?.name}/>
                        <Content>
                            <Row>
                                <Col span={19}>
                                    <WorkspaceContent 
                                        language={props.workspace?.language} 
                                        socket={socket} 
                                        roomId={id} 
                                        isOwner={props.workspace?.isOwner} 
                                        joinedRoom={joinedRoom}
                                        setCode={setCode}
                                    />
                                </Col>
                                <Col span={5}>
                                    <WorkspaceSidebar 
                                        language={props.workspace?.language} 
                                        sharing={props.workspace?.sharing}
                                        runCode={RunCode}    
                                    />
                                </Col>
                            </Row>
                        </Content>
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
    workspace: state.workspace.activeWorkspace,
    output: state.workspace.output
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
