import React, { useEffect, useContext, useState } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Col, Layout, Row, Drawer, Alert} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';
import LanguageCode from "components/workspace/LanguageCode";
import { connect } from 'react-redux'; 
import { fetchWorkspace } from '../redux/workspace';
import SocketContext from '../components/SocketContext';
import debounce from 'lodash.debounce';

const {Content} = Layout;

function Workspace(props) {
    const {id} = useParams();

    const [code, setCode] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [output, setOutput] = useState(); 
    const [joinedRoom, setJoinedRoom] = useState(false);

    const username = localStorage.getItem('user');

    const socket = useContext(SocketContext);

    const RunCode = debounce((input) => {
        setIsRunning(true);
        socket.emit('runCode',{
                roomId: id,
                Program: code,
                LanguageChoice: LanguageCode(props.workspace?.language),
                Input:input
            }
        );
    }, 100)

    useEffect(()=>{
        props.fetchWorkspace(id)
        socket.on('output',(data)=>{
            console.log(data);
            console.log(data.Errors);
            setIsRunning(false);
            setOutput(data);
            setShowOutput(true);
        });
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
                                        isRunning={isRunning} 
                                    />
                                </Col>
                            </Row>
                        </Content>
                        <Drawer
                            title="Output"
                            placement="bottom"
                            closable={true}
                            onClose={()=>setShowOutput(false)}
                            visible={showOutput}
                            >
                            {output?.Warnings && <Alert
                                message="Warning"
                                description={output?.Warnings}
                                type="warning"
                                showIcon
                                />
                            }
                            {output?.Errors && <Alert
                                message="Error"
                                description={output?.Errors}
                                type="error"
                                showIcon
                                />
                            }
                            {output?.Result && <Alert
                                message="Output"
                                description={output?.Result}
                                type="success"
                                showIcon
                                />
                            }
                        </Drawer>
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
