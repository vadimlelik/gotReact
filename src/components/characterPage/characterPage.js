import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails,{Field} from '../charDetails';
import ErrorMessage from '../error';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';





export default class CharacterPage extends Component {
    gotService = new gotService()

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
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

        if (this.state.error) {
            return <ErrorMessage />
        }
        const itemList = (
            <ItemList
                getData={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({ name, born }) => `${name} (${born}) `}
            />
        )
        const charDetails = (

            <CharDetails
                charId={this.state.selectedChar}
            >
                <Field field='gender'label='Gender'/>
                <Field field='born'label='Born'/>
                <Field field='died'label='Died'/>
                <Field field='culture'label='Culture'/>
            </CharDetails>

        )



        return (

            <RowBlock
                left={itemList}
                rirgh={charDetails}
            />
        )
    }
}