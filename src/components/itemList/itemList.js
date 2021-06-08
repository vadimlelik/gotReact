import React, {Component} from 'react';
import './itemList.css';
import ErrorMessage from '../error';
import Spinner from '../spinner/';


export default class ItemList extends Component {



    state = {
        itemList: null,
        error: false,
        selectedChar:null,

    }



    onItemSelected = (id)=>{
        this.setState({
            selectedChar:id
        })
    }

    componentDidMount() {

        const {getData} = this.props
        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }
    renderItem(arr) {
        return arr.map((item) => {
            const {id} = item
            const label =  this.props.renderItem(item)
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }


    render() {
        const {itemList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItem(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}