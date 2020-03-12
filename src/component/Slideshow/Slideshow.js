import React, { Component } from 'react';
import "./Slideshow.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const photos = [
    {
        name: 'Photo 1',
        url: require('../../asset/Slider/Slider1.jpg')
    },
    {
        name: 'Photo 2',
        url: require('../../asset/Slider/Slider2.jpg')
    },
    {
        name: 'Photo 3',
        url: require('../../asset/Slider/Slider3.jpg')
    },
    {
        name: 'Photo 4',
        url: require('../../asset/Slider/Slider4.jpg')
    }
]

export default class SlideShow extends Component {
    render() {
        return (
            <div className="carousel-container">
                <Carousel>
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