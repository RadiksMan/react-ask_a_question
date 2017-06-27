import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion, declareUserID} from '../actions';

import { bake_cookie, read_cookie } from 'sfcookies';
import shortid  from 'shortid';

import {userQ} from '../firebase';


class Main extends Component {

    constructor(){
        super();
        this.state = {
            id:'',
            userQuestionText:'',
            userTime:'',
            userAnswer:''
        }

        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion(event){
        event.preventDefault();

        const time = Date.parse(new Date());
        this.setState({userTime:time});

        const {id,userQuestionText,userTime,userAnswer,lastQuestionKey} = this.state;

        try{
            userQ.child(lastQuestionKey).once('value').then(function(snapshot){
                if (snapshot.val().userAnswer === "") {
                    userQ.child(lastQuestionKey).update({userAnswer});
                }
            })
        }catch(err){
            console.log(err);
        }

        const questionObj = {
            id,
            userQuestionText,
            userTime:time,
            userAnswer:''
        }

        userQ.push(questionObj);
        this.props.addQuestion(questionObj);

        event.target.reset();
    }


    componentDidMount() {
        let userID = null;

        if ( read_cookie('asck-a-question-id').length > 0 ) {
            userID = read_cookie('asck-a-question-id');

        }else{
            userID = shortid.generate();
            bake_cookie('asck-a-question-id', userID)
        }

        this.setState({id:userID});
        this.props.declareUserID(userID);


        userQ.orderByKey().limitToLast(1).on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const lastQuestionKey = childSnapshot.key;
                const lastQuestionData = childSnapshot.val();

                this.setState({lastQuestionKey,lastQuestionData})

            });
        });
    }

    render() {

        const lastQ = {...this.state.lastQuestionData};

        const isSameUser = (  this.state.id === lastQ.id ) ? true : false;

        return (
            <div>
                <div className="main-form">
                    <form onSubmit={this.addQuestion}>
                        {
                            typeof lastQ !== 'undefined' &&
                            <div>
                                <b>{lastQ.userQuestionText}</b>
                            </div>
                        }

                        { !isSameUser ? (
                            <div>
                                 <input
                                    type="text"
                                    placeholder="Ваш ответ на предыдуший вопрос"
                                    className="main-form-input"
                                    required
                                    onChange={event =>{ this.setState({userAnswer:event.target.value}) }}
                                />
                                <hr/>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Ваш вопрос"
                                        className="main-form-input"
                                        required
                                        onChange={event =>{ this.setState({userQuestionText:event.target.value}) }}
                                    />
                                </div>
                                <button
                                        className="main-form-btn"
                                        type="submit"
                                    >
                                    Задать вопрос
                                </button>
                            </div>
                        ) : (
                            <div>Вы уже ответели на вопрос</div>
                        )

                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null,{addQuestion,declareUserID})(Main);