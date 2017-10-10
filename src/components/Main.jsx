import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';

import Fade from './Animations/Fade';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {userQ} from '../firebase';

class Main extends Component {

    constructor(){
        super();
        this.state = {
            id:'',
            userQuestionText:'',
            userAnswer:'',

            loading:true
        }

        this.addQuestionToBase = this.addQuestionToBase.bind(this);
    }

    addQuestionToBase(event){
        event.preventDefault();

        const time = Date.parse(new Date());

        const {userQuestionText,userAnswer,lastQuestionKey} = this.state;
        const {id} = this.props;

        try{
            userQ.child(lastQuestionKey).once('value').then(function(snapshot){
                if (snapshot.val().userAnswer === "") {
                    userQ.child(lastQuestionKey).update({userAnswer});
                }
            })
        }catch(err){
            console.log('Error in addQuestionToBase() ->',err);
        }

        let userQuestionWithQuestionMark = this.checkIfQuestionMark(userQuestionText)

        const questionObj = {
            id,
            userQuestionText:userQuestionWithQuestionMark,
            userTime:time,
            userAnswer:''
        }

        userQ.push(questionObj);
        this.props.addQuestion(questionObj);

        event.target.reset();
    }
    
    checkIfQuestionMark(letter){
        return letter.trim().endsWith('?') ? letter : `${letter.trim()} ?`;
    }

    componentDidMount() {

        userQ.orderByKey().limitToLast(1).on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                console.log('childSnapshot', childSnapshot)

                const lastQuestionKey = childSnapshot.key;
                const lastQuestionData = childSnapshot.val();

                this.setState({lastQuestionKey,lastQuestionData})

            });

            this.setState({loading:false})
        });
    }

    render() {

        const lastQ = {...this.state.lastQuestionData};
        
        const isSameUser = (  this.props.id !== lastQ.id ) ? true : false;

        return (
            <div>
                <Fade in={!this.state.loading}>
                    {
                        !this.state.loading ? (
                            <div className="main-form">
                                <form onSubmit={this.addQuestionToBase}>
                                    {
                                        typeof lastQ !== 'undefined' &&
                                        <div className="questionText">
                                            <b>{lastQ.userQuestionText}</b>
                                        </div>
                                    }

                                    <Fade in={!isSameUser}>
                                        { isSameUser ? (
                                            <div className="questionForm" >
                                                <TextField
                                                    onChange={event =>{ this.setState({userAnswer:event.target.value}) }}
                                                    required
                                                    floatingLabelText="Ваш ответ на предыдуший вопрос"
                                                    fullWidth={true}
                                                    multiLine={true}
                                                    className="main-form-input"
                                                />
                                                <br />
                                                <div>
                                                    <TextField
                                                        onChange={event =>{ this.setState({userQuestionText:event.target.value}) }}
                                                        required
                                                        floatingLabelText="Ваш новый вопрос"
                                                        fullWidth={true}
                                                        multiLine={true}
                                                        className="main-form-input"
                                                    />
                                                </div>
                                                <br />
                                                <RaisedButton
                                                    label="Задать вопрос"
                                                    type="submit"
                                                    primary={true}
                                                    fullWidth={true}
                                                ></RaisedButton>
                                            </div>
                                            ) : (
                                                <div className="answered" >
                                                    <p>Вы уже ответели на вопрос</p>
                                                    <p>Дождитесь, пока кто-нибуть ответить на ваш вопрос</p>
                                                </div>
                                            )
                                        }
                                    </Fade>
                                </form>
                            </div>
                        ) : (
                            <RefreshIndicator
                                size={50}
                                left={0}
                                top={0}
                                loadingColor="#FF9800"
                                style={{
                                    position:'relative'
                                }}
                                status="loading"
                            />
                        )
                    }
                </Fade>
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