import React, {useState} from 'react';
import {Input, Avatar, Card, Collapse, Divider, Select, Switch, Button} from 'antd';
import styled from 'styled-components';
import languages from '../../languages';
import { workspace } from 'redux/workspace';

const {TextArea} = Input;
const {Panel} = Collapse;
const {Option} = Select;
const MemberCard = styled.div`
display:flex;
flex-direction:row;
height:3em;
width:18em;
align-items:center;
margin:1em 0;
padding:0 1em;
`

function WorkspaceSidebar(props) {

    function getLanguage(id){
        for(let i=0;i<languages.length;i++){
            if(id==languages[i].value){
                console.log(languages[i])
                return languages[i]
            }
        }
    }
    
    const [input, SetInput] = useState();
    return (
        <Card style={{minHeight: 'calc(100vh - 64px)'}}>
            <Divider>Language</Divider>
            <Select
                style={{width: "18em"}}
                placeholder="Select a Language"
                value={props.language}
            >
                {languages.map((language) => (
                    <Option value={language.value}>{language.name}</Option>
                ))}
            </Select>
            <Divider>Members</Divider>
            <div>
                {props.collaborators?.length!=0?props.collaborators?.map((d)=>{
                    return (
                        <MemberCard>
                            <Avatar
                                style={{
                                    color: '#f56a00',
                                    backgroundColor: '#fde3cf',
                                }}
                            >
                                {d.username[0].toUpperCase()}
                            </Avatar>
                            <h4 style={{marginLeft: "1em"}}>{d.username}</h4>
                        </MemberCard>
                    )
                }):<p>No collaborators</p>}
            </div>
            <Divider>Run</Divider>
            <h3>Input</h3>
            <TextArea id="input" 
                placeholder="Enter the input to be provided" 
                onChange={(e)=>SetInput(e.target.value)} 
                allowClear 
                rows={4} 
            />
            <div style={{display:'flex', flexDirection:'row-reverse', marginTop:'1em'}}>
                <Button type="primary" onClick={()=>props.runCode(input)} loading={props.isRunning}>Run</Button>
            </div>
        </Card>
    );
}

export default WorkspaceSidebar;
