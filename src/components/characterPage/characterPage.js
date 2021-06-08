import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';
import gotService from '../../services/gotService';

export default class CharacterPage extends Component {
    gotService = new gotService()

    state = {
        selectedChar: 130,
        error: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Row>
            <Col md='6'>
                <ItemList
                getData = {this.gotService.getAllCharacters}
                onCharSelected={this.onCharSelected}
                renderItem ={(item)=>item.name}
                />
            </Col>
            <Col md='6'>
                <CharDetails
                charId = {this.state.selectedChar}
                />
            </Col>
        </Row>
            
        )
    }
}