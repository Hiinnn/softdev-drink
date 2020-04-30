import React, { Component } from 'react';
import './Recommended.css';

import { shopArray } from '../../data/NEW/ShopArray';

export default class Recommended extends Component {
    constructor(props) {
        super(props)
        this.shopArray = shopArray
    }

    render() {
        return (
            <div className="recommended-container">
                <div className="rec-header"> Recommended </div>
                {
                    this.shopArray.map((cafe, i) => {
                        return (
                            (i % 2) === 0 ?
                                /* Picture Left */
                                <div className="rec-cafe-container" key={i}>
                                    <div className="rec-pic-container" style={{ marginRight: "2%" }}>
                                        <div className="main-rec-pic"> <img src={cafe.picture_main} alt="" /> </div>
                                        <div className="sub-rec-pic">
                                            {
                                                cafe.picture_sub.map((obj,i) => {
                                                    return (
                                                        <img src={obj.url} alt="" key={i}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="rec-detail-container">
                                        <div className="rec-cafe-name">{cafe.shop_name}</div>
                                        <div className="rec-cafe-describe">{cafe.detail}</div>
                                        <div className="rec-learn-more">LEARN MORE</div>
                                    </div>
                                </div>

                                :

                                /* Picture Right */
                                <div className="rec-cafe-container" key={i}>
                                    <div className="rec-detail-container">
                                        <div className="rec-cafe-name">{cafe.shop_name}</div>
                                        <div className="rec-cafe-describe">{cafe.detail}</div>
                                        <div className="rec-learn-more">LEARN MORE</div>
                                    </div>
                                    <div className="rec-pic-container" style={{ marginLeft: "2%" }}>
                                        <div className="main-rec-pic"> <img src={cafe.picture_main} alt="" /> </div>
                                        <div className="sub-rec-pic">
                                            {
                                                cafe.picture_sub.map((obj,i) => {
                                                    return (
                                                        <img src={obj.url} alt="" key={i}/>
                                                    )
                                                })
                                            }
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