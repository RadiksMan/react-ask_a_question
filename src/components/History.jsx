import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import {userQ} from '../firebase';

import moment from 'moment';
import 'moment/locale/ru';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


class History extends Component {

    constructor(){
        super();
        this.state = {
            questionArray:[]
        }

        this.tableRowRef = '';
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

    scrollToBottomTable(){

        let tableBodyNode = ReactDOM.findDOMNode(this.refs["table-body"]).parentNode.parentNode;
        setTimeout(()=>{
            let childrenHeight = tableBodyNode.children[0].offsetHeight,
                scrollStep = childrenHeight / 15,
                scrollInterval = setInterval(function(){
                    if ( tableBodyNode.scrollTop <= childrenHeight ) {
                        tableBodyNode.scrollTop+=scrollStep
                    } else clearInterval(scrollInterval)
                },15); 
        },100)
    }

    render() {
        const allQuestion = [...this.state.questionArray];
        const userId = this.props.id || '';

        const tableConfig = {
            fixedHeader: true,
            height: '30vh',
            showRowHover: true
        }

        return (
            <div className="history">
                <div className="history-table">
                    <Table {...tableConfig}>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip="Номер (№)" width="10%" style={{textAlign: 'center'}}>
                                    Номер
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Вопрос и ответ" width="70%" style={{textAlign: 'center'}}>
                                    Вопрос и ответ
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Время" width="20%" style={{textAlign: 'center'}}>
                                    Время
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody 
                            displayRowCheckbox={false} 
                            showRowHover={true}
                            stripedRows={true}
                            ref="table-body"
                        >
                            {
                                allQuestion.map( (question,index) => {

                                    if(index === allQuestion.length - 1){
                                        this.scrollToBottomTable();
                                    }

                                    return <Question 
                                            key={index} 
                                            question={question} 
                                            index={index} 
                                            isMine={ (userId === question.id) ? true : false } 
                                            />
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

const Question = ({question,index,isMine}) => {
    return (
        <TableRow className="history-row">
            <TableRowColumn className="item-number" width="10%" style={{textAlign: 'center'}}>
                {
                    parseInt(index,10) < 9 ? `0${index+1}.` : `${index+1}.`
                }
            </TableRowColumn>
            <TableRowColumn className="item-desc" width="70%">
                <div className="item-question">
                    <small>Вопрос: </small>{question.question}
                </div>
                <div className="item-answer">
                    <small>Ответ: </small>{question.answer}
                </div>
            </TableRowColumn>
            <TableRowColumn className="item-time" width="20%" style={{textAlign: 'center'}}>
                {
                    (question.time > 0) ? convertTime(question.time) : ''
                }
            </TableRowColumn>
        </TableRow>
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