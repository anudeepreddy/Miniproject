import React, { useEffect } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Col, Layout, Row} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import {fetchWorkspace} from '../redux/workspace';

const {Content} = Layout;

function Workspace(props) {
    const {id} = useParams();

    useEffect(()=>{
        props.fetchWorkspace(id)
    },[])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const socket = socketIOClient('',{
            extraHeaders: {
              'x-auth-token': token
            },
            transportOptions: {
              polling: {
                extraHeaders: {
                  'x-auth-token': token
                }
              }
            },
          }
        );

        socket.on('server-hello', data => {
            console.log(data);
        });
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
                        <HeaderComponent username={"Anudeep"} workspaceName={props.workspace?.name}/>
                        <Content>
                            <Row>
                                <Col span={19}>
                                    <WorkspaceContent language={props.workspace?.language}/>
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
    workspace: state.workspace.activeWorkspace
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
