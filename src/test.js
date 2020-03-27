import React from 'react';

export default class TEST extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            eiei: 'eiei'
        }
    }

    // onClick() {
    //     this.setState(state => ({
    //         count: state.count + 1
    //     }));
    // }

    onClick = () => {
        this.setState(() => {
            this.state.count +=1
        })
    }

    render(){
        return(
            <div onClick={() => this.onClick()}>
                Times {this.state.count}
            </div>
        )
    }
}