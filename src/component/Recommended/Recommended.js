import React, { Component } from 'react';
import './Recommended.css';
import { RecommendCafe } from '../../data/RecommendData';

export default class Recommended extends Component {
    render() {
        return (
            <div className="recommended-container">
                <div className="rec-header"> Recommended </div>
                {
                    RecommendCafe.map((cafe,i) => {
                        return(
                            (i%2) === 0 ?
                            <div className="rec-cafe-container" key={i}>
                                <div className="rec-pic-container" style={{marginRight: "2%"}}>
                                    <div className="main-rec-pic"> <img src={cafe.url[0]} alt=""/> </div>
                                    <div className="sub-rec-pic"> 
                                        <img src={cafe.url[1]} alt=""/> 
                                        <img src={cafe.url[2]} alt=""/> 
                                        <img src={cafe.url[3]} alt=""/> 
                                    </div>
                                </div>
                                <div className="rec-detail-container">
                                    <div className="rec-cafe-name">{cafe.name}</div>
                                    <div className="rec-cafe-describe">{cafe.decribe}</div>
                                    <div className="rec-learn-more">LEARN MORE</div>
                                </div>
                            </div>

                            :

                            <div className="rec-cafe-container" key={i}>
                                <div className="rec-detail-container">
                                    <div className="rec-cafe-name">{cafe.name}</div>
                                    <div className="rec-cafe-describe">{cafe.decribe}</div>
                                    <div className="rec-learn-more">LEARN MORE</div>
                                </div>
                                <div className="rec-pic-container" style={{marginLeft: "2%"}}>
                                    <div className="main-rec-pic"> <img src={cafe.url[0]} alt=""/> </div>
                                    <div className="sub-rec-pic"> 
                                        <img src={cafe.url[1]} alt=""/> 
                                        <img src={cafe.url[2]} alt=""/> 
                                        <img src={cafe.url[3]} alt=""/> 
                                    </div>
                                </div>
                            </div>
                            
                            
                        )
                    })
                }
            </div>
        );
    }
}