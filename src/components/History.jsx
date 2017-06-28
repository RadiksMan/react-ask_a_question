import React, { Component } from 'react';

import { connect } from 'react-redux';

import {userQ} from '../firebase';

import moment from 'moment';
import 'moment/locale/ru';


class History extends Component {

    constructor(){
        super();
        this.state = {
            questionArray:[]
        }
    }

    componentDidMount(){

        moment.locale('ru');

        userQ.on('value', snap => {
            let questionArray = [];
            snap.forEach(item =>{
                const{ id, userAnswer:answer, userTime:time, userQuestionText:question } = item.val();
                questionArray.push({id,question,answer,time});
            })
            this.setState({questionArray});
        })
    }

    render() {
        const allQuestion = [...this.state.questionArray];
        const userId = this.props.id || '';


        return (
            <div className="history">
                <div className="history-table">
                    {
                        allQuestion.map( (question,index) => {
                            return <Question key={index} question={question} index={index} isMine={ (userId == question.id) ? true : false } />
                        })
                    }
                </div>
            </div>
        );
    }
}

const Question = ({question,index,isMine}) => {
    return (
        <div className="history-row">
            <div className="item-number">
                {
                    parseInt(index,10) < 9 ? `0${index+1}.` : `${index+1}.`
                }
            </div>
            <div className="item-desc">
                <div className="item-question">
                    {question.question}
                </div>
                <div className="item-answer">
                    {question.answer}
                </div>
            </div>
            <div className="item-time">
                {
                    (question.time > 0) ? convertTime(question.time) : ''
                }
            </div>
        </div>
    )
}

function convertTime(time) {
    let newDate = moment( new Date(time) ).fromNow();
    return newDate;
}

function mapStateToProps(state) {

    const {id} = state.user_question;
    return {
        id
    }

}

export default connect(mapStateToProps,null)(History);