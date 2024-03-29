import React, { Component } from 'react'
import gotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import ItemList from '../itemList/itemList';
import {withRouter} from 'react-router-dom';



class BooksPage extends Component {
    gotService = new gotService()

    state = {
        error:false

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

} export default withRouter(BooksPage)