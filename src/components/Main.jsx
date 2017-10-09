import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';

import {userQ} from '../firebase';


class Main extends Component {

    constructor(){
        super();
        this.state = {
            id:'',
            userQuestionText:'',
            //userTime:'',
            userAnswer:''
        }

        this.addQuestionToBase = this.addQuestionToBase.bind(this);
    }

    addQuestionToBase(event){
        event.preventDefault();

        const time = Date.parse(new Date());
        //this.setState({userTime:time});

        const {userQuestionText,userAnswer,lastQuestionKey} = this.state;
        const {id} = this.props;

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

        userQ.orderByKey().limitToLast(1).on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                console.log('childSnapshot', childSnapshot)

                const lastQuestionKey = childSnapshot.key;
                const lastQuestionData = childSnapshot.val();

                this.setState({lastQuestionKey,lastQuestionData})

            });
        });
    }

    render() {

        const lastQ = {...this.state.lastQuestionData};
        
        const isSameUser = (  this.props.id !== lastQ.id ) ? true : false;

        return (
            <div>
                <div className="main-form">
                    <form onSubmit={this.addQuestionToBase}>
                        {
                            typeof lastQ !== 'undefined' &&
                            <div>
                                <b>{lastQ.userQuestionText}</b>
                            </div>
                        }

                        { isSameUser ? (
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

function mapStateToProps(state) {
    const {id} = state.user_question;
    return {
        id
    }
}

export default connect(mapStateToProps,{addQuestion})(Main);