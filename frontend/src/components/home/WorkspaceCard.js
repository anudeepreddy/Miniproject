import React from 'react';
import {Button, Card, Dropdown, Menu} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import LanguageIcon from './LanguageIcon';

const CardBody = styled.div`
  position: absolute;
  bottom: 2em;
  left: 2em;
`;

const Options = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const optionsMenu = (
    <Menu>
        <Button type="primary" danger>Delete</Button>
    </Menu>
)

function WorkspaceCard(props) {
    const {name, lang} = props;
    return (
        <Card style={{height: '10em', width: '20em'}}>
            <Options>
                <Dropdown overlay={optionsMenu} trigger={['click']} style={{height: "5em", width: "7em"}}>
                    <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        Options <DownOutlined/>
                    </a>
                </Dropdown>
            </Options>
            <CardBody>
                <LanguageIcon lang={lang}/>
                <h4>{name}</h4>
            </CardBody>
        </Card>
    );
}

export default WorkspaceCard;
