import React, { useEffect, useContext, useState } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Col, Layout, Row} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';
import { connect } from 'react-redux'; 
import {fetchWorkspace,runCode} from '../redux/workspace';
import SocketContext from '../components/SocketContext';

const {Content} = Layout;

function Workspace(props) {
    const {id} = useParams();

    const [joinedRoom, setJoinedRoom] = useState(false);

    const username = localStorage.getItem('user');

    const socket = useContext(SocketContext);

    useEffect(()=>{
        props.fetchWorkspace(id)
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
                                    <WorkspaceContent language={props.workspace?.language} socket={socket} roomId={id} isOwner={props.workspace.isOwner} joinedRoom={joinedRoom}
                                    handleRun={props.runCode} output={props.output}/>
                                </Col>
                                <Col span={5}>
                                    <WorkspaceSidebar language={{name: "C++", value: "cpp"}} sharing={props.workspace?.sharing}/>
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
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id)),
    runCode: (data) => dispatch(runCode(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
