import React, { Component } from 'react';
import gotService from '../../services/gotService';
import ErrorMassage from '../errorMassage/errorMassage';
import Spinner from '../spinner';

import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new gotService()

    state = {
        char: {},
        loading: true,
        error: false

    }
    componentDidMount(){
        this.updateChar()
        this.timerId = setInterval(this.updateChar,1500)
        console.log('componentDidMount');
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
        console.log('componentWillUnmount');
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);

        console.log('upDate');
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,

        })

    }


    render() {

console.log('render');
        const { char, loading, error } = this.state;
        const errorMassage = error ? <ErrorMassage /> : null
        const spiner = loading ? <Spinner /> : null;

        const content = !(loading || error) ? <View char={char} /> : null


        return (
            <div className="random-block rounded">
                {errorMassage}
                {spiner}
                {content}
            </div>
        );


    }
}


const View = ({ char }) => {
    const { name, gender, born, died, culture } = char
    return (
        <>
            <h4>Random Character:{name} </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Cultutre</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>

    )
}