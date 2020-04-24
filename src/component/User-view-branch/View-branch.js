import React from 'react';
import OrderData from '../../data/OrderData';
import BranchDetail from './Branch-detail';
import './View-branch.css';

export default class ViewBranch extends React.Component {
    constructor(props){
        super(props);
        this.data = OrderData;
    }

    render(){
        return(
            <>
                <BranchDetail/>
            </>
        )
    }
}

