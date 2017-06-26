import React, { Component } from 'react';

import { bake_cookie, read_cookie } from 'sfcookies';
import shortid  from 'shortid';


class Main extends Component {

    constructor(){
        super();
        this.state = {
            id:''
        }
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
                Main
            </div>
        )
    }
}

export default Main;