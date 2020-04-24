import React from 'react';
import styled from 'styled-components';
import { Carousel, Form } from 'react-bootstrap';

import { orderData } from '../../data/NEW/Order';

import PartyList from '../Party/Party';
import BookingTime from '../Party/BookingTime';
import OrderTable from '../OrderTable/OrderTable';

const shopData = {
    "shop_id": 1,
    "shop_name": "Chill Bar BKK",
    "max_seat": 50,
    "created": "2020-04-23T13:52:24.817347Z",
    "address": "ไม่บอกหรออยู่บนโลกนี้แน่นอนนอนนอนอ",
    "phone_number": "+66882673235",
    "detail": "Starbuck ที่พาซิโอ อ่อนนุชลาดกระบัง จอดรถสะดวกสบาย ที่นั่งสองชั้น บรรยากาศชิวๆยามเช้า eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "updated": "2020-04-23T13:52:24.817347Z",
    "officeday": [],
    "picture_main": require('../../asset/MainBackground/bgor.jpeg'),
    "picture_sub": [
        {
            "pk": 1,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
        {
            "pk": 2,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
    ],
    "picture_mini": [
        {
            "pk": 1,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
        {
            "pk": 2,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
        {
            "pk": 3,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
        {
            "pk": 4,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
        {
            "pk": 5,
            "url": require('../../asset/MainBackground/bgor.jpeg'),
        },
    ],
    "party": [
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
        this.userRole = 'sm';   // dk, ow, sm
        this.orderData = orderData;

        shopData.phone_number = this.formatPhoneNumber(shopData.phone_number)

        this.state = {
            editable: false,
            shopData: shopData
        }

        this.edit = this.edit.bind(this)
        this.addPic = this.addPic.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    formatPhoneNumber = (phone_number) => {
        if (phone_number[0] === '+') {
            phone_number = phone_number.slice(3);
            return phone_number.replace(/(\d{2})(\d{3})(\d{4})/, "0$1-$2-$3");
        }

        return phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        const shop_data = { ...this.state.shopData };

        if (name === "phone_number") {
            value = value.slice(4);
            value = this.formatPhoneNumber(value);
        }

        shop_data[name] = value;

        this.setState({
            shopData: shop_data
        })
    }

    edit = () => {

        if (this.state.editable === true) {
            //do smth

        }

        this.setState(() => {
            return { editable: !this.state.editable }
        })

    }

    addPic = (e) => {
        const reader = new FileReader();
        reader.onloadend = reader.result;
        reader.readAsText(e.target.file);
        console.log(reader);
    }

    removePic = () => {

    }

    render() {
        return (
            <>
                <img src={this.state.shopData.picture_main}
                    alt="eiei"
                    style={{
                        width: '100%',
                        height: '600px',
                        top: '110',
                        display: 'flex',
                        objectFit: 'cover'
                    }} />
                <BranchDetailContainer>
                    {/********************** Left Column ***********************/}

                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginRight: '1%' }}>

                        {/* Branch name */}
                        <div className="name-wrapper">
                            <div className="branch-name">
                                <input name="shop_name"
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.shop_name}
                                    spellCheck="false"
                                    onChange={this.handleChange} />
                            </div>
                            <a className="fav-wrapper" href="" ><img src="https://image.flaticon.com/icons/svg/1076/1076984.svg" alt="fav-icon" width="30px" height="30px" /></a>
                        </div>

                        {/* Branch description */}
                        <div className="description">
                            <textarea name="detail"
                                disabled={!this.state.editable}
                                value={this.state.shopData.detail}
                                spellCheck="false"
                                onChange={this.handleChange} />
                        </div>

                        {/* Branch detail (location, time, tel, etc.) */}
                        <div className="details">
                            <div className="form-group form-inline">
                                <label style={{ marginBottom: 0 }} >Address :&nbsp;&nbsp;</label>
                                <input name="address"
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.address}
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    style={{ width: '79.5%', }} />
                            </div>

                            <div className="form-group form-inline">
                                <label style={{ marginBottom: 0 }} >Open :&nbsp;&nbsp;</label>
                                <input name=""
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.time || 'kuyyyyyy'}
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    style={{ width: '84.5%', }} />
                            </div>

                            <div className="form-group form-inline">
                                <label style={{ marginBottom: 0 }} >โทร :&nbsp;&nbsp;</label>
                                <input name="phone_number"
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.phone_number}
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    style={{ width: '88.5%', }} />
                            </div>
                        </div>

                        {/** Edit button */}
                        {
                            (this.userRole === 'sm' || this.userRole === 'ow') &&
                            <button className="edit-bt" onClick={this.edit}>
                                {this.state.editable === true ? 'Confirm' : 'Edit'}
                            </button>
                        }


                        {/* Food and Drink menu */}
                        <OrderTable
                            type={'food'}
                            width={400}
                            role={this.userRole}
                            edit={this.state.editable}
                            disabledBt={this.userRole === 'dk'} // if role === owner or manager -> disable button
                        />
                        <OrderTable
                            type={'drink'}
                            width={400}
                            role={this.userRole}
                            edit={this.state.editable}
                            disabledBt={this.userRole === 'dk'} // if role === owner or manager -> disable button
                        />

                    </div>

                    {/*********************** Right Column ***********************/}

                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginLeft: '1%' }}>

                        {/* Slidshow pic (subPic) */}
                        <div className="add-rm-container">
                            <Carousel>
                                {this.state.shopData.picture_sub.map((item, i) => {
                                    console.log('url', item.url);

                                    return (
                                        <Carousel.Item key={item + i}>
                                            <img src={item.url}
                                                className="sub-pic"
                                                alt="" />
                                            {
                                                this.userRole === 'sm' &&
                                                <>
                                                    <a href="#" name="" className="add-rm-pic">
                                                        <div style={{ fontSize: '30px' }}>
                                                            🞦<input type="file"
                                                                style={{
                                                                    opacity: 0.0,
                                                                    position: 'absolute',
                                                                    top: 0, left: 0, bottom: 0, right: 0,
                                                                    width: '100%',
                                                                    height: '100%'
                                                                }}
                                                                accept={"image/*"}
                                                                onChange={this.addPic} />
                                                        </div>
                                                    </a>
                                                    <a href="#" name="" className="add-rm-pic">
                                                        <div style={{ fontSize: '30px' }}>🞮
                                                        </div>
                                                    </a>
                                                </>
                                            }
                                        </Carousel.Item>

                                    )

                                })}
                            </Carousel>
                        </div>



                        {/* miniPic */}
                        {/* <div className="mini-pic-wrapper">
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
                                            this.userData === 'sm' &&
                                            <>
                                                <a href="#" name="" className="add-rm-pic add-rm-pic-sm"><div>🞦<input type="file" style={{ opacity: 0.0, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' }} /></div></a>
                                                <a href="#" name="" className="add-rm-pic add-rm-pic-sm"><div>🞮</div></a>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div> */}

                        {/** Booking time tap */}
                        {/* <BookingTime disabledBt={this.userRole !== 'dk'} /> * disable button when role is owner or manager */}

                        {/** Current Party in cafe */}
                        {/* {Object.keys(this.state.shopData.party).map((i) => { */}
                        {/* /** disable button when role is owner or manager */}
                        {/* return (<PartyList
                                key={i}
                                partyData={this.state.shopData.party[i]}
                                disabledBt={this.userRole !== 'dk'} />)
                        })} */}
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
                    padding-left: 5px;
                    
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

                    background-color: white;
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
                    padding-left: 5px;
                    
                    color: white;
                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                    transition:  cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.3s;
                }

                .details {
                    width: 100%;
                    height: auto;
                    min-height: 150px;

                    display: flex;
                    flex-direction:column;
                    justify-content: center;

                    font-size: 20px;
                    padding-top: 20px;
                    padding-left: 5px;
                    margin-bottom: 20px;
                    padding-bottom: 0px;
                    
                    color: white;
                    border: #7a7a7a solid;
                    border-width: 0px 0px 1px 0px;
                }

                .branch-name input,
                .description textarea,
                .details div input {
                    transition:  cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.3s;
                }

                .sub-pic {
                    width: 100%;
                    height: 300px;
                    
                    display: flex;
                    object-fit: cover
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