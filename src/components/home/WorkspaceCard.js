import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import LanguageIcon from './LanguageIcon';

const CardBody = styled.div`
  position: absolute;
  bottom: 2em;
  left:2em;
`;

function WorkspaceCard(props) {
  const { name,lang } = props;
  return (
    <Card style={{ height: '200px', width: '300px' }}>
      <CardBody>
        <LanguageIcon lang={lang}/>
        <h4>{name}</h4>
      </CardBody>
    </Card>
  );
}

export default WorkspaceCard;
