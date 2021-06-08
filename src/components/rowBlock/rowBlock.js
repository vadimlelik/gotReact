
import React from 'react';
import { Col, Row } from 'reactstrap';

const RowBlock = ({ left, rirgh }) => {
    return (
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {rirgh}
            </Col>
        </Row>)

}
export default RowBlock;
