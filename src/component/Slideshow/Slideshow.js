import React, { Component } from 'react';
import "./Slideshow.css";
import { Carousel } from 'react-bootstrap';
import { photos } from '../../data/Slideshowdata.js';

export default class SlideShow extends Component {
    render() {
        return (
            <div id="main-slide">
                <Carousel touch={true} fade={true} interval={null}>
                    {
                        photos.map((photo) => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 h-50"
                                        src={photo.url}
                                        alt={photo.name}
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>
        )
    }
}