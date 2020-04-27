import React, { Component } from 'react';
import "./Slideshow.css";
import { Carousel } from 'react-bootstrap';
import { photos } from '../../data/Slideshowdata.js';

export default class SlideShow extends Component {
    render() {
        return (
            <div >
                <div id="main-slide">
                    <Carousel touch={true} fade={true} interval={null}>
                        {
                            photos.map((photo, i) => {
                                return (
                                    <Carousel.Item key={photo + i}>
                                        <a href="">
                                            <img
                                                className="d-block w-100 h-50"
                                                src={photo.url}
                                                alt={photo.name}
                                            />
                                        </a>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="hot-cafe-pic-container">
                    <a href="" style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={require('../../asset/Slider/Slider1.png')} /></a>
                    <a href="" style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={require('../../asset/Slider/Slider1.png')} /></a>
                    <a href="" style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={require('../../asset/Slider/Slider1.png')} /></a>
                    <a href="" style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={require('../../asset/Slider/Slider1.png')} /></a>
                    <a href="" style={{ display: 'inline-block', margin: '20px', height: '120px' }}><img alt="" width="200px" height="100%" src={require('../../asset/Slider/Slider1.png')} /></a>
                </div>
            </div>
        )
    }
}