import React from 'react';
import {Avatar, Card, Collapse, Divider, Select, Switch} from 'antd';
import styled from 'styled-components';
import languages from '../../languages';

const {Panel} = Collapse;
const {Option} = Select;
const MemberCard = styled.div`
background-color:#383838;
display:flex;
flex-direction:row;
height:3em;
width:18em;
align-items:center;
margin:1em 0;
padding:0 1em;
`

function WorkspaceSidebar(props) {

    return (
        <Card style={{minHeight: 'calc(100vh - 64px)'}}>
            <Divider>Language</Divider>
            <Select
                style={{width: "18em"}}
                placeholder="Select a Language"
                defaultValue={props.language.value}
            >
                {languages.map((language) => (
                    <Option value={language.value}>{language.name}</Option>
                ))}
            </Select>
            <Divider>Sharing</Divider>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <p>Public:</p>
                <Switch defaultChecked={false}/>
            </div>
            <div>
                <p>Add Members:</p>
                <Select showSearch style={{width: "18em"}}></Select>
            </div>
            <Divider>Members</Divider>
            <div>
                <MemberCard>
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        A
                    </Avatar>
                    <h4 style={{marginLeft: "1em"}}>Anudeep</h4>
                </MemberCard>
                <MemberCard>
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        K
                    </Avatar>
                    <h4 style={{marginLeft: "1em"}}>Keerthi</h4>
                </MemberCard>
                <MemberCard>
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        L
                    </Avatar>
                    <h4 style={{marginLeft: "1em"}}>Lokesh</h4>
                </MemberCard>
            </div>
        </Card>
    );
}

export default WorkspaceSidebar;
