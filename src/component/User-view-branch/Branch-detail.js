import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

import data from '../../data/OrderData';

import PartyList from '../Party/Party';
import BookingTime from '../Party/BookingTime';
import OrderTable from '../OrderTable/OrderTable';

const shopData = {
    name: 'Rimsaun',
    details: {
        description: 'Starbuck ที่พาซิโอ อ่อนนุชลาดกระบัง จอดรถสะดวกสบาย ที่นั่งสองชั้น บรรยากาศชิวๆยามเช้า',
        location: 'สุขุมวิท คลองตันเหนือ ,วัฒนา , กรุงเทพมหานคร',
        tel: '094-414-9266',
        time: 'ทุกวัน: 18:00-02:00',
        type: 'ผับ/เที่ยวกลางคืน , กึ่งผับ/ร้านเหล้า/บาร์',
        photos: {
            mainPic: '',
            subPic: [require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            ],
            miniPic: [require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            require('../../asset/Slider/Slider1.png'),
            ]
        }
    }
}

const partyData = [
    {
        name: 'Big\'s Party',
        member: [
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
        ]
    },
    {
        name: 'Zeer O\'s',
        member: [
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
        ]
    },
    {
        name: 'Wachira',
        member: [
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
            { profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
        ]
    },
]

export default class BranchDetail extends React.Component {
    constructor(props) {
        super(props);
        this.shopData = shopData;
        this.orderData = data;
        this.state = { editable: false }
    }

    edit = () => {
        this.setState(() => {
            return {
                editable: !this.state.editable
            }
        })
        console.log(this.state)
    }

    render() {
        return (
            <>
                <BranchDetailContainer>
                    {/* Left Column */}
                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginRight: '1%' }}>
                        {/* Branch name */}
                        <div className="name-wrapper" disabled={this.state.editable}>
                            <div className="branch-name">{this.shopData.name}</div>
                            <a className="fav-wrapper" href="" ><img src="https://image.flaticon.com/icons/svg/1076/1076984.svg" alt="fav-icon" width="30px" height="30px" /></a>
                        </div>
                        {/* Branch description */}
                        <div className="description" disabled={this.state.editable}>
                            {this.shopData.details.description}
                        </div>
                        {/* Branch detail (location, time, tel ...) */}
                        <div className="details" disabled={this.state.editable}>
                            {this.shopData.details.location}
                            <br />
                            เปิดให้บริการ{' ' + this.shopData.details.time}
                            <br />
                            โทร{' ' + this.shopData.details.tel}
                            <br />
                            ประเภท{' ' + this.shopData.details.type}
                        </div>
                        {
                            // Food and Drink menu
                            Object.keys(this.orderData).map((item) => {
                                return (
                                    <div key={this.orderData[item].type + " table"}>
                                        <OrderTable type={this.orderData[item].type} name={this.orderData[item].name} width={400} />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Right Column */}
                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginLeft: '1%' }}>
                        {/* Slidshow pic (subPic) */}
                        <Carousel>
                            {this.shopData.details.photos.subPic.map((url, i) => {
                                return (
                                    <Carousel.Item key={i}>
                                        <img src={url}
                                            className="sub-pic"
                                            alt="" />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>

                        {/* miniPic */}
                        <div className="mini-pic-wrapper">
                            {this.shopData.details.photos.miniPic.map((url, i) => {
                                return (
                                    <img src={url}
                                        className="mini-pic"
                                        key={i}
                                        alt="" />
                                )
                            })}
                        </div>

                        <BookingTime />
                        {Object.keys(partyData).map((i) => {
                            return (<PartyList partyData={partyData[i]} key={i}/>)
                        })}
                    </div>
                </BranchDetailContainer>
            </>
        )
    }
}

const BranchDetailContainer = styled.div`
                width: 1000px;
                
                display: flex;
                padding: 0px;
                margin-top: 20px;

                position: relative;
                left: 50%;
                transform: translateX(-50%);

                .col {
                    padding: 0px;
                    display: flex;
                    flex-direction: column;
                }
                
                .name-wrapper {
                    width: 100%;
                    height: 100px;

                    display: flex;

                    font-size: 30px;
                    padding-left: 20px;
                    
                    /* border: grey solid; */
                    border: red solid;
                    border-width: 0px 0px 2px 0px;
                    background-color: rgba(255,255,255,0.5);
                }

                .branch-name {
                    width: 410px;
                    
                    display: flex;
                    position: relative;
                    text-align: center;
                    flex-direction: column;
                    justify-content: center;
                }

                .fav-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;

                    display: flex;
                    align-items:center;
                    flex-direction: column;
                    justify-content: center;

                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);

                    background-color: black;
                }

                .description {
                    width: 100%;
                    height: 300px;
                    
                    display: flex;

                    font-size: 20px;
                    padding-top: 20px;
                    padding-left: 20px;
                    padding-right: 10px;
                    
                    border: red solid;
                    border-width: 0px 0px 2px 0px;
                    background-color: rgba(255,255,255,0.5);
                }

                .details {
                    width: 100%;
                    height: 150px;

                    display: flex;
                    flex-direction:column;
                    justify-content: center;

                    font-size: 20px;
                    padding-left: 20px;
                    margin-bottom: 20px;
                    
                    border: red solid;
                    border-width: 0px 0px 2px 0px;
                    background-color: rgba(255,255,255,0.5);
                }

                .sub-pic {
                    width: 100%;
                    height: 300px;

	                background-size: cover;
	                background-repeat: no-repeat;
                }

                .mini-pic-wrapper {
                    margin-top: 20px;
                    padding-bottom: 20px;

                    display: flex;
                    justify-content:center;
                    flex-wrap: wrap;
                    flex-direction: row;

                    border: red solid;
                    border-width: 0px 0px 2px 0px;
                }

                .mini-pic {
                    width: 50%;
                    padding: 2px;

	                background-size: cover;
	                background-repeat: no-repeat;
                }

                .mini-pic:nth-child(n+3) {
                    width: 33.3333%;
                
                }
            `