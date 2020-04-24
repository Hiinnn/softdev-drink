import React from 'react';
import styled from 'styled-components';
import { Carousel, Form } from 'react-bootstrap';

import data from '../../data/OrderData';

import PartyList from '../Party/Party';
import BookingTime from '../Party/BookingTime';
import OrderTable from '../OrderTable/OrderTable';

const userData = {

}

const shopData = {
    name: 'Rimsaun',
    description: 'Starbuck ที่พาซิโอ อ่อนนุชลาดกระบัง จอดรถสะดวกสบาย ที่นั่งสองชั้น บรรยากาศชิวๆยามเช้า eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    location: 'สุขุมวิท คลองตันเหนือ ,วัฒนา , กรุงเทพมหานคร',
    tel: '094-414-9266',
    time: 'ทุกวัน: 18:00-02:00',
    type: 'ผับ/เที่ยวกลางคืน , กึ่งผับ/ร้านเหล้า/บาร์',
    picture: {
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
    },
    party: [
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
}

export default class BranchDetail extends React.Component {
    constructor(props) {
        super(props);
        this.userData = null;
        this.orderData = data;
        this.state = {
            editable: false,
            shopData: shopData
        }

        this.edit = this.edit.bind(this)
        this.addPic = this.addPic.bind(this)
    }

    edit = () => {
        if (this.state.editable === true) {
            //do smth
        }
        this.setState(() => {
            return { editable: !this.state.editable }
        })

    }

    addPic = () => {

    }

    removePic = () => {

    }

    render() {
        return (
            <>
                <BranchDetailContainer>
                    {/********************** Left Column ***********************/}

                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginRight: '1%' }}>

                        {/* Branch name */}
                        <div className="name-wrapper">
                            <div className="branch-name">
                                <input disabled={!this.state.editable} value={this.state.shopData.name} spellCheck="false" />
                            </div>
                            <a className="fav-wrapper" href="" ><img src="https://image.flaticon.com/icons/svg/1076/1076984.svg" alt="fav-icon" width="30px" height="30px" /></a>
                        </div>

                        {/* Branch description */}
                        <div className="description">
                            <textarea disabled={!this.state.editable} value={this.state.shopData.description} spellCheck="false" />
                        </div>

                        {/* Branch detail (location, time, tel, etc.) */}
                        <div className="details">
                            <input disabled={!this.state.editable} value={this.state.shopData.location} spellCheck="false" />
                            <input disabled={!this.state.editable} value={'เปิดให้บริการ ' + this.state.shopData.time} spellCheck="false" />
                            <input disabled={!this.state.editable} value={'โทร ' + this.state.shopData.tel} spellCheck="false" />
                        </div>

                        {/** Edit button */}
                        <button className="edit-bt" onClick={this.edit} enebled>
                            {this.state.editable === true ? 'Confirm' : 'Edit'}
                        </button>

                        {
                            // Food and Drink menu
                            Object.keys(this.orderData).map((item) => {
                                return (
                                    <div key={this.orderData[item].type + " table"}>
                                        <OrderTable
                                            type={this.orderData[item].type}
                                            name={this.orderData[item].name}
                                            width={400}
                                            disabledBt={this.userData !== null} // if role === owner or manager -> disable button
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/*********************** Right Column ***********************/}

                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginLeft: '1%' }}>

                        {/* Slidshow pic (subPic) */}

                        <div className="add-rm-container">
                            <Carousel>
                                {this.state.shopData.picture.subPic.map((url, i) => {
                                    return (
                                        <Carousel.Item key={i}>
                                            <img src={url}
                                                className="sub-pic"
                                                alt="" />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            {
                                this.userData === null &&
                                <>
                                    <a href="#" name="" className="add-rm-pic"><div style={{ fontSize: '30px' }}>🞦<input type="file" style={{ opacity: 0.0, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' }} /></div></a>
                                    <a href="#" name="" className="add-rm-pic"><div style={{ fontSize: '30px' }}>🞮</div></a>
                                </>
                            }
                        </div>



                        {/* miniPic */}
                        <div className="mini-pic-wrapper">
                            {this.state.shopData.picture.miniPic.map((url, i) => {
                                let width;
                                if (i < 2) width = { width: '50%' };
                                else width = { width: '33.3333%' };

                                return (
                                    <div className="add-rm-container" style={width} key={i}>
                                        <img src={url}
                                            className="mini-pic"
                                            alt=""
                                            // style={{cursor: 'pointer'}}
                                            draggable={false} />
                                        {
                                            this.userData === null &&
                                            <>
                                                <a href="#" name="" className="add-rm-pic add-rm-pic-sm"><div>🞦</div></a>
                                                <a href="#" name="" className="add-rm-pic add-rm-pic-sm"><div>🞮</div></a>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        {/** Booking time tap */}
                        <BookingTime disabledBt={true && this.userData === null} /> {/** disable button when role is owner or manager */}

                        {/** Current Party in cafe */}
                        {Object.keys(this.state.shopData.party).map((i) => {
                            /** disable button when role is owner or manager */
                            return (<PartyList
                                key={i}
                                partyData={this.state.shopData.party[i]}
                                disabledBt={true && this.userData === null} />)
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
                    
                    color: white;
                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                }

                .branch-name {
                    width: 410px;
                    margin-right: 20px;
                    
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
                    overflow: auto;
                    min-height: 220px;
                    
                    display: flex;
                    position: relative;
                    text-align: center;
                    flex-direction: column;
                    justify-content: flex-start;

                    font-size: 20px;
                    padding-top: 10px;
                    padding-left: 20px;
                    
                    color: white;
                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                }

                .details {
                    width: 100%;
                    height: auto;
                    min-height: 150px;

                    display: flex;
                    flex-direction:column;
                    justify-content: center;

                    font-size: 20px;
                    padding-top: 10px;
                    padding-left: 20px;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    
                    color: white;
                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                }

                .sub-pic {
                    width: 100%;
                    height: 300px;

	                background-size: cover;
	                background-repeat: no-repeat;
                }

                .mini-pic-wrapper {
                    width: 100%;
                    margin-top: 20px;
                    padding-bottom: 20px;

                    display: flex;
                    justify-content:center;
                    flex-wrap: wrap;
                    flex-direction: row;

                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                }

                .mini-pic {
                    width: 100%;
                    padding: 2px;

	                background-size: cover;
	                background-repeat: no-repeat;
                }

                .edit-bt {
                    width: 80px;
                    height: 30px;
                    margin-bottom: 20px;

                    display: flex;
                    margin-left: auto;
                    align-items: center;
                    flex-direction: column;
                    justify-content:center;

                    color: white;
                    outline: none;
                    border-radius: 5px;
                    border: gold solid 1px;
                    background-color: black;
                }

                .edit-bt:hover{
                    cursor: pointer;
                    box-shadow: 
                        0 0 5px wheat,
                        0 0 10px wheat,
                        0 0 20px wheat,
                        0 0 21px wheat;
                }

                .add-rm-container {
                    width: auto;
                    position: relative;
                    background: transparent;
                }

                .add-rm-pic {
                    width: 40px; 
                    height: 40px;
                    margin: 0px;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    top: 100%;
                    left: 100%;
                    z-index: 2;
                    position: absolute;

                    text-decoration: none;
                    color: rgba(0,0,0,0.9);
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: rgba(255,255,255,0.9);
                }

                .add-rm-pic-sm {
                    width: 20px;
                    height: 30px;
                }

                .add-rm-pic:nth-child(odd) {
                    transform: translate(-100%,-100%);
                }

                .add-rm-pic:nth-child(odd) div:hover {
                    color: red;
                }

                .add-rm-pic:nth-child(even) {
                    transform: translate(-200%,-100%);
                }

                .add-rm-pic:nth-child(even) div:hover {
                    color: blue;
                }

                .add-rm-pic:hover {
                    color: black;
                }

                .branch-name input:disabled,
                .description textarea:disabled,
                .details input:disabled {
                    color: white;
                    resize: none;
                    border: 0 transparent;
                    background-color: transparent;
                }

                .branch-name input:enabled,
                .description textarea:enabled,
                .details input:enabled {
                    /* border: none; */
                    resize: none;
                    outline: none;
                    text-overflow: inherit;
                }

                .description textarea {
                    min-height: 200px;
                }

                .details input:nth-child(1) {
                    border-radius: 5px 5px 0px 0px;
                }

                .details input:nth-child(2) {
                    border-radius: 0px;
                }

                .details input:nth-child(3) {
                    border-radius: 0px 0px 5px 5px;
                }
            `