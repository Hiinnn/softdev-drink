import React, { Component } from 'react';
import "./Slideshow.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export default class SlideShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopArray: ''
        }

        this.arr = [0, 1, 2, 3, 4]
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
        // get shopArray
        const url = localStorage.getItem('url')
        const token = localStorage.getItem('access')
        const head = localStorage.getItem('role') !== null ? { Authorization: `Bearer ${token}` } : ''

        Axios.get(`${url}/manager/shop/?search=`, { headers: head })
            .then((res) => {
                this.setState({ shopArray: res.data })
            })
            .catch((err) => {
                this.getShopArray()
                Promise.reject(err)
            })
    }

    render() {
        return (
            <div >
                {/* Slideshow */}
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
                {/* Sub picture bottom of Slideshow */}
                <div className="hot-cafe-pic-container">
                    {
                        this.arr.map((i) => {
                            return (
                                this.state.shopArray[i] &&
                                <Link to={`/shop/${this.state.shopArray[i].shop_id}`} style={{ display: 'inline-block', margin: '20px', height: '120px' }} key={i}>
                                    <img alt="" width="200px" height="100%" src={`${localStorage.getItem('url')}${this.state.shopArray[i].picture}`} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}