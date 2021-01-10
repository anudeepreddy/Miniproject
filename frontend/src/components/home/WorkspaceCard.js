import React from 'react';
import {Button, Card, Dropdown, Menu} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import LanguageIcon from './LanguageIcon';
import { Link } from 'react-router-dom';

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

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 16em;
`

const Col = styled.div`
    display: Block
`

const optionsMenu = (
    <Menu>
        <Button type="primary" danger>Delete</Button>
    </Menu>
)

function WorkspaceCard(props) {
    const {name, lang, id} = props;
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
                <Row>
                    <Col>
                        <LanguageIcon lang={lang}/>
                        <h4>{name}</h4>
                    </Col>
                    <Link to={`/a/workspace/${id}`}>
                        <i class="fas fa-3x fa-arrow-circle-right"></i>
                    </Link>                        
                </Row>
            </CardBody>
        </Card>
    );
}

export default WorkspaceCard;
