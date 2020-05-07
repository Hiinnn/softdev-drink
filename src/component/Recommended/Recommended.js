import React from 'react';
import './Recommended.css';

import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Recommended extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopArray: null,
        }
    }

    componentDidMount() {
        this.getShopArray()
    }

    componentDidUpdate() {
        // reload data when error
        if (!this.state.shopArray)
            this.getShopArray()
    }

    getShopArray() {
        const url = localStorage.getItem('url')
        const token = localStorage.getItem('access')
        const head = localStorage.getItem('role') !== null ? { Authorization: `Bearer ${token}` } : ''

        Axios.get(`${url}/manager/shop/?search=`, { headers: head })
            .then((res) => {
                this.setState({ shopArray: res.data })
            })
            .catch((err) => {
                Promise.reject(err)
            })
    }

    render() {
        if (this.state.shopArray)
            return (
                <div className="recommended-container">
                    <div className="rec-header"> Recommended </div>
                    {
                        Object.keys(this.state.shopArray).map((index) => {
                            const cafe = this.state.shopArray[index]
                            return (
                                (index % 2) === 0 ?
                                    /*** Picture on Left ***/
                                    <div className="rec-cafe-container" key={`id ${cafe.shop_id + index}`}>
                                        {/* shop picture */}
                                        <div className="rec-pic-container" style={{ marginRight: "2%" }}>
                                            <div className="main-rec-pic"> <img src={`${localStorage.getItem('url')}${cafe.picture}`} alt="" /> </div>
                                            <div className="sub-rec-pic">
                                                {
                                                    cafe.picture_sub.map((item, i) => {
                                                        return (
                                                            <img src={`${localStorage.getItem('url')}${item.url}`}
                                                                alt="" key={i}
                                                                style={{ objectFit: 'cover' }}
                                                                height='100%'
                                                                width='100%'
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        {/* shop detail */}
                                        <div className="rec-detail-container">
                                            <div className="rec-cafe-name">{cafe.shop_name}</div>
                                            <div className="rec-cafe-describe">{cafe.detail}</div>
                                            <Link to={`/shop/${cafe.shop_id}`} style={{ textDecoration: 'none' }}> <div className="rec-learn-more">LEARN MORE</div></Link>
                                        </div>
                                    </div>
                                    :
                                    /*** Picture on Right ***/
                                    <div className="rec-cafe-container" key={`id ${cafe.shop_id + index}`}>
                                        {/* Shop detail */}
                                        <div className="rec-detail-container">
                                            <div className="rec-cafe-name">{cafe.shop_name}</div>
                                            <div className="rec-cafe-describe">{cafe.detail}</div>
                                            <Link to={`/shop/${cafe.shop_id}`} style={{ textDecoration: 'none' }}> <div className="rec-learn-more">LEARN MORE</div></Link>
                                        </div>
                                        {/* Shop picture */}
                                        <div className="rec-pic-container" style={{ marginLeft: "2%" }}>
                                            <div className="main-rec-pic"> <img src={`${localStorage.getItem('url')}${cafe.picture}`} alt="" /> </div>
                                            <div className="sub-rec-pic">
                                                {
                                                    cafe.picture_sub.map((item, i) => {
                                                        return (
                                                            <img src={`${localStorage.getItem('url')}${item.url}`}
                                                                alt="" key={i}
                                                                style={{ objectFit: 'cover' }}
                                                                height='100'
                                                            />
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
        return (<></>)
    }
}