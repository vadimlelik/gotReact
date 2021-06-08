import React, { Component } from 'react'
import gotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import ItemList from '../itemList/itemList';



export default class BooksPage extends Component {
    gotService = new gotService()

    state = {
        selectedBook:null,
        error:false

    }

    onItemSelected(id){
        this.setState({
            selectedBook:id
        })
    }
    componentDidCatch(){
        this.setState({
            error:true
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMassage/>
        }

        return (
            <ItemList
            onItemSelected={(itemId)=>{
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name})=>name }
            />
        )
    }

}