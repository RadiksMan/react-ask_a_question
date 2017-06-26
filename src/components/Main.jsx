import React, { Component } from 'react';

import { bake_cookie, read_cookie } from 'sfcookies';
import shortid  from 'shortid';


class Main extends Component {

    constructor(){
        super();
        this.state = {
            id:'',
            userAnswer:''
        }
    }

    addQuestion(){

    }


    componentDidMount() {
        let userID = null;

        if ( read_cookie('asck-a-question-id').length > 0 ) {
            userID = read_cookie('asck-a-question-id');

        }else{
            userID = shortid.generate();
            bake_cookie('asck-a-question-id', userID)
        }

        this.setState({id:userID})

    }

    render() {
        console.log('his.state',this.state)
        return (
            <div>
                <div className="main-form">
                    <input
                        type="text"
                        placeholder="Ваш вопрос"
                        className="main-form-input"
                        onChange={event =>{ this.setState({userQuestionText:event.target.value}) }}
                    />
                    <button
                        className="main-form-btn"
                        onClick={() => this.addQuestion() }
                    >
                        Задать вопрос
                    </button>
                </div>
            </div>
        )
    }
}

export default Main;