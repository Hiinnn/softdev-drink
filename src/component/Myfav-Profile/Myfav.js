import React, { Component } from 'react';
import './Myfav.css';
import { CafeName } from '../../data/MyfavData';

export default class Myfav extends Component {

    handleClick = () => {
        alert('Save')
    };

    learnClick = () => {
        alert('Learn more')
    };

    heartClick = () => {
        alert('Add to my favourite')
    };

    render() {
        return (
            <div className="myfav-container" >

                <div className="textheader" style={{ marginLeft: "4%" }}> My Favourite </div>

                <img src={require('../../asset/Profile/line.png')} width="91%" height="100" style={{ marginLeft: "4%" }}></img>

                {
                    CafeName.map((cafe, i) => {
                        return (
                            <div key={i}>
                                <div className="picandcafename-container">

                                    <img className="cafename-pic-container" src={cafe.url} width="320" height="220" align="left"></img>

                                    <div className="cafename-container">
                                        <label className="textheader" style={{ marginLeft: 20 }} > {cafe.name} </label>
                                        <div className="heart" onClick={this.heartClick} style={{ marginLeft: 350 }}></div>
                                        <br /><br />
                                        <div className="learn-button" onClick={this.learnClick} style={{ marginLeft: 20 }}> LEARN MORE </div>
                                        <label className="text" style={{ marginLeft: 20 }} > open-close <label style={{ marginLeft: 30 }}>{cafe.openclose}</label></label>
                                        <label className="text" style={{ marginLeft: 20 }} > location <label style={{ marginLeft: 56 }}>{cafe.location}</label></label>
                                        <label className="text" style={{ marginLeft: 20 }} > type <label style={{ marginLeft: 85 }}>{cafe.type}</label></label>
                                        <label className="text" style={{ marginLeft: 20 }} > contact <label style={{ marginLeft: 62 }}>{cafe.contact}</label></label>
                                    </div>

                                </div>

                                <img src={require('../../asset/Profile/line.png')} width="91%" height="100" style={{ marginLeft: "4%" }}></img>

                            </div>

                        )
                    })
                }


                {/* Loop */}

                {/*<div className="picandcafename-container">

                    <img className="cafename-pic-container" src={require('../../asset/Profile/1.jpg')} width="320" height="220" align="left"></img>

                    <div className="cafename-container">
                        <label className="textheader" style={{ marginLeft: 20 }} > Cafe's Name </label>
                        <div className="heart" onClick={this.heartClick} style={{ marginLeft: 350 }}></div>
                        <br /><br />
                        <div className="learn-button" onClick={this.learnClick} style={{ marginLeft: 20 }}> LEARN MORE </div>
                        <label className="text" style={{ marginLeft: 20 }} > open close </label>
                        <label className="text" style={{ marginLeft: 20 }} > location </label>
                        <label className="text" style={{ marginLeft: 20 }} > type </label>
                        <label className="text" style={{ marginLeft: 20 }} > contact </label>
                    </div>
                </div>

                <br />

                <img src={require('../../asset/Profile/line.png')} width="91%" height="100" style={{ marginLeft: "4%" }}></img>
                */}

                {/*end loop*/}

                <div className="three-button" onClick={this.handleClick}> Save My Favourite </div>

                <br /><br />

            </div>
        );
    }
}
