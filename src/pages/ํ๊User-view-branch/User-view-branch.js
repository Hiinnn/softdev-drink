import React from 'react'
import ViewBranch from '../../component/User-view-branch/View-branch'
import Navbar from '../../component/Nav-bar/Nav-bar';

export default class UserViewBranch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Navbar/>
                <ViewBranch/>
            </>
        )
    }
}

{/* <div style={{display:'flex'}}>
    <OrderTable type={this.data["Food"].type}
        name={this.data["Food"].name}
        showPrice={true} />

    <OrderTable type={this.data["Drink"].type}
        name={this.data["Drink"].name}
        showPrice={true} />
</div> */}