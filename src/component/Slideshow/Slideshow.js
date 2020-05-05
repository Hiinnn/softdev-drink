import React, { Component } from 'react';
import "./Slideshow.css";
import { Carousel } from 'react-bootstrap';
import { shops } from '../../data/Slideshowdata.js';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class SlideShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopArray: ''
        }
    }

    componentDidMount() {
        this.getShopArray()
    }

    getShopArray() {
        const key = localStorage.getItem('searchKey')
        const url = localStorage.getItem('url')
        const token = localStorage.getItem('access')
        const head = localStorage.getItem('role') !== null ? { Authorization: `Bearer ${token}` } : ''

        Axios.get(`${url}/manager/shop/?search=`, { headers: head })
            .then((res) => {
                this.setState({ shopArray: res.data })
            })
            .catch((err) => {
                console.log('search slide err', err)
            })
    }

    render() {
        return (
            <div >
                <div id="main-slide">
                    <Carousel touch={true} interval={null}>
                        {
                            Object.keys(this.state.shopArray).map((index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 "
                                            src={`${localStorage.getItem('url')}${this.state.shopArray[index].picture}`}
                                            alt={index}
                                            style={{ objectPosition: '50% 30%' }}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="hot-cafe-pic-container">
                    {this.state.shopArray[0] && <Link to={`/shop/${this.state.shopArray[0].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[0].picture}`} /></Link>}
                    {this.state.shopArray[1] && <Link to={`/shop/${this.state.shopArray[1].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[1].picture}`} /></Link>}
                    {this.state.shopArray[2] && <Link to={`/shop/${this.state.shopArray[2].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[2].picture}`} /></Link>}
                    {this.state.shopArray[3] && <Link to={`/shop/${this.state.shopArray[3].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[3].picture}`} /></Link>}
                    {this.state.shopArray[4] && <Link to={`/shop/${this.state.shopArray[4].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[4].picture}`} /></Link>}
                </div>
            </div>
        )
    }
}