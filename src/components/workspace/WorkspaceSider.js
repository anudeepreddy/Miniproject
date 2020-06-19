import React from 'react';
import {Layout} from 'antd';
import { Select } from 'antd';
import { Card } from 'antd';

const {Sider}=Layout;
const { Option } = Select;
function EditorSider() {
   return (
    <Sider >
    <div style={{marginBottom:"150px",marginTop:"10px"}}>
    <Select
    showSearch
    style={{ width: 200, color:""}}
    placeholder="Programming Language"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
    <Option value="plain-text" >Plain Text</Option>
    <Option value="c">C</Option>
    <Option value="c++">C++</Option>
    <Option value="java">Java</Option>
    <Option value="python">Python</Option>
  </Select>
  </div>
  <Card title="Collaborators" style={{ width: 200 }}>
      <p>Collaborator 1</p>
      <p>Collaborator 2</p>
      <p>Collaborator 3</p>
    </Card>
  </Sider>
   )

}

export default EditorSider;