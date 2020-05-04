import React from 'react'
import styled from 'styled-components'
import { Carousel, Form } from 'react-bootstrap'

import Axios from 'axios'
import Select from 'react-select'
import TimePicker from 'react-time-picker'

// data
import shopData from '../../data/NEW/Shop'
import { orderData } from '../../data/NEW/Order'

// Component
import PartyList from '../Party/Party'
import BookingTime from '../Party/BookingTime'
import OrderTable from '../OrderTable/OrderTable'
import { Link, Redirect } from 'react-router-dom'

export default class BranchDetail extends React.Component {
    constructor(props) {
        super(props);
        let userRole = 'sm';   // dk, ow, sm
        this.orderData = orderData;

        // shopData.phone_number = this.formatPhoneNumber(shopData.phone_number)

        this.state = {
            role: localStorage.getItem('role'),
            redirect: null,
            editable: false,
            workingTime: '00:00-00:00',

            shopData: shopData,

            selectDay: new Date().getDay(),
            changedDay: false,
            officeday: [
                {
                    weekday: 0,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 1,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 2,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 3,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 4,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 5,
                    open_time: '00:00',
                    close_time: '00:00',
                },
                {
                    weekday: 6,
                    open_time: '00:00',
                    close_time: '00:00',
                },
            ],
        }

        this.edit = this.edit.bind(this)
        this.addPic = this.addPic.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeOpenTime = this.changeOpenTime.bind(this)
        this.changeCloseTime = this.changeCloseTime.bind(this)
    }

    componentDidMount = () => {
        this.getShopData()
        if (this.state.role !== null) this.getPartyData()
    }

    getShopData = () => {
        Axios.get(`${localStorage.getItem('url')}/manager/shop/${this.props.match.params.shopId}`)
            .then((res) => {
                this.setState({
                    shopData: res.data
                }, () => {
                    let newShopData = { ...this.state.shopData }
                    const officeday = { ...this.state.officeday }
                    const index = this.state.shopData.officeday.findIndex(element => element.weekday === new Date().getDay())
                    const time = index === -1
                        ? "We're Closed Today"
                        : `  ${this.ISOtoNormal(this.state.shopData.officeday[index].open_time)} - ${this.ISOtoNormal(this.state.shopData.officeday[index].close_time)}`

                    for (let i = 0; i < 7; i++) {
                        let index = this.state.shopData.officeday.findIndex(element => element.weekday === i)
                        if (index !== -1) {
                            officeday[i].open_time = this.ISOtoNormal(this.state.shopData.officeday[index].open_time);
                            officeday[i].close_time = this.ISOtoNormal(this.state.shopData.officeday[index].close_time);
                        }
                    }

                    newShopData.phone_number = this.formatPhoneNumber(newShopData.phone_number);

                    this.setState({
                        workingTime: time,
                        officeday: officeday,
                        shopData: newShopData
                    })
                })
            })
            .catch((err) => {
                console.log('branch err', err.response);
            })

    }

    ISOtoNormal = (time) => {
        const newTime = time.slice(11, 19).split(':')
        return (`${(parseInt(newTime[0]) + 7) % 24}:${newTime[1]}`)
    }

    NormaltoISO = (time) => {
        return `2020-01-01T${time}:00+07:00`
    }

    formatPhoneNumber = (phone_number) => {
        if (phone_number[0] === '+') {
            phone_number = phone_number.slice(3);
            return phone_number.replace(/(\d{2})(\d{3})(\d{4})/, "0$1-$2-$3");
        }

        if (phone_number.length < 10) {
            return phone_number;
        }
        return phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        const shop_data = { ...this.state.shopData };

        if (name === "phone_number") {
            if (value.length < 13) value = this.formatPhoneNumber(value);
            else return
        }

        shop_data[name] = value;

        this.setState({
            shopData: shop_data
        })
    }

    changeDay = (e) => {
        this.setState({ selectDay: e.value })
    }

    changeOpenTime = (e) => {
        const newOffice = this.state.officeday
        newOffice[this.state.selectDay].open_time = e

        this.setState({
            changedDay: true,
            officeay: newOffice
        })
    }

    changeCloseTime = (e) => {
        const newOffice = this.state.officeday
        newOffice[this.state.selectDay].close_time = e

        this.setState({
            changedDay: true,
            officeDay: newOffice
        })
    }

    postChangeTime = (url, body, header) => {
        Axios.post(url, body, { headers: header })
            .then((res) => {
            })
            .catch((err) => {
                console.log('change time err', err.response);
            })
    }

    edit = () => {
        if (this.state.editable === true) {
            // loop send new time
            if (this.state.changedDay === true) {
                const url = `${localStorage.getItem('url')}/booking/create/`
                const header = { Authorization: `Bearer ${localStorage.getItem('access')}` }
                let body;
                for (let i = 0; i < 7; i++) {
                    body = {
                        shop_id: this.state.shopData.shop_id,
                        weekday: this.state.officeday[i].weekday,
                        open_time: this.NormaltoISO(this.state.officeday[i].open_time),
                        close_time: this.NormaltoISO(this.state.officeday[i].close_time)
                    }

                    let open = this.state.officeday[i].open_time.split(':')
                    let close = this.state.officeday[i].close_time.split(':')

                    open = parseFloat(open[0].concat('.', open[1]))
                    close = parseFloat(close[0].concat('.', close[1]))

                    if (close - open >= 0.3) this.postChangeTime(url, body, header)
                }
            }

            // update shop
            this.patchEditShop(
                this.state.shopData.shop_id,
                this.state.shopData.shop_name,
                this.state.shopData.detail,
                this.state.shopData.address,
                this.state.shopData.phone_number,
                this.state.shopData.max_seat,
            )
        }

        this.setState(() => {
            return { editable: !this.state.editable }
        })

    }

    patchEditShop(id, name, detail, address, phone, seat) {
        const url = `${localStorage.getItem('url')}/manager/profile/my_profile/`
        const data = {
            shop_id: id,
            new_shop_name: name,
            new_detail: detail,
            new_address: address,
            new_phone_number: phone.split('-').join('').replace(/^0/, '+66'),
            new_max_seat: seat,
        }
        const header = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.patch(url, data, { headers: header })
            .then((res) => {
                this.getShopData()
            })
            .catch((err) => {
                console.log('pathc err', err.response);
            })
    }

    getPartyData() {
        const date = new Date()
        const url = `${localStorage.getItem('url')}/party/list/?date=${date.getFullYear()}-${(date.getMonth() + 1) % 12}-${date.getDate()}&shop_id=${this.state.shopData.shop_id}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                this.setState({ partyData: res.data })
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    addPic = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        const shop_data = { ...this.state.shopData };

        shopData.picture_sub[e.target.name] = file

        // upload file to server
        //  then
        //  get shop_data again and refresh pages
    }

    removePic = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        const shop_data = { ...this.state.shopData };

        shopData.picture_sub[e.target.name] = file


        // delete file from server
        //  then
        //  get shop_data again and refresh pages
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        // console.log(this.stae)

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

                            <a className="fav-wrapper" href="" >
                                <img src="https://image.flaticon.com/icons/svg/1076/1076984.svg" alt="fav-icon" width="30px" height="30px" />
                            </a>
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
                            {/* Address */}
                            <div className="form-group form-inline">
                                <label style={{ marginBottom: 0 }} >Address :&nbsp;&nbsp;</label>
                                <input name="address"
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.address}
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    style={{ width: '79.5%', }} />
                            </div>

                            {   // Open
                                !this.state.editable &&
                                <div className="form-group form-inline">
                                    <label style={{ marginBottom: 0 }} >{this.state.workingTime !== 'We\'re Closed Today' && 'Open :  '}</label>
                                    <input name=""
                                        disabled={!this.state.editable}
                                        value={this.state.workingTime}
                                        spellCheck="false"
                                        onChange={this.handleChange}
                                        style={{}} />
                                </div>
                            }

                            {/* Tel. */}
                            <div className="form-group form-inline">
                                <label style={{ marginBottom: 0 }} >Tel. :&nbsp;&nbsp;</label>
                                <input name="phone_number"
                                    disabled={!this.state.editable}
                                    value={this.state.shopData.phone_number}
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    style={{ width: '88.5%', }} />
                            </div>

                            {   // max seat
                                this.state.editable &&
                                <div className="form-group form-inline">
                                    <label style={{ marginBottom: 0 }} >Max seat :&nbsp;&nbsp;</label>
                                    <input name="max_seat"
                                        disabled={!this.state.editable}
                                        value={this.state.shopData.max_seat}
                                        spellCheck="false"
                                        onChange={this.handleChange}
                                        style={{ width: '77.5%', }} />
                                </div>
                            }

                            {
                                // Edit officeday
                                this.state.editable &&
                                <>
                                    <div style={{ color: 'black', marginBottom: 20 }}>
                                        <Select onChange={e => this.changeDay(e)}
                                            options={[
                                                { value: 0, label: 'Monday' },
                                                { value: 1, label: 'Tuesday' },
                                                { value: 2, label: 'Wednesday' },
                                                { value: 3, label: 'Thursday' },
                                                { value: 4, label: 'Friday' },
                                                { value: 5, label: 'Saturday' },
                                                { value: 6, label: 'Sunday' }]} />
                                        <TimePicker
                                            disableClock
                                            locale="sv-sv"
                                            onChange={this.changeOpenTime}
                                            value={this.state.officeday[this.state.selectDay].open_time}
                                        />
                                        -
                                        <TimePicker
                                            disableClock
                                            locale="sv-sv"
                                            onChange={this.changeCloseTime}
                                            value={this.state.officeday[this.state.selectDay].close_time}
                                        />
                                    </div>
                                </>
                            }
                        </div>

                        {/** Edit button */}
                        {
                            this.state.role === 'ow' &&
                            <button className="edit-bt" onClick={this.edit}>
                                {this.state.editable === true ? 'Confirm' : 'Edit'}
                            </button>

                            ||

                            this.state.role === 'sm' &&
                            <button className="edit-bt" onClick={() => this.setState({ redirect: `/manager/check/${this.state.shopData.shop_id}` })}>
                                Table
                            </button>
                        }


                        {/* Food and Drink menu */}
                        <OrderTable
                            type={'food'}
                            width={400}
                            role={this.state.role}
                            edit={this.state.editable}
                            shopId={this.state.shopData.shop_id}
                            disabledBt={this.state.role === 'dk'} // if role === owner or manager -> disable button
                        />
                        <OrderTable
                            type={'drink'}
                            width={400}
                            role={this.state.role}
                            edit={this.state.editable}
                            shopId={this.state.shopData.shop_id}
                            disabledBt={this.state.role === 'dk'} // if role === owner or manager -> disable button
                        />

                    </div>

                    {/*********************** Right Column ***********************/}

                    <div className="col" style={{ backgroundColor: 'transparent', width: '49%', marginLeft: '1%' }}>

                        {/* Slidshow pic (subPic) */}
                        <div className="add-rm-container">
                            <Carousel>
                                {this.state.shopData.picture_sub.map((item, i) => {
                                    return (
                                        <Carousel.Item key={item + i}>
                                            <img src={item.url}
                                                className="sub-pic"
                                                alt="" />
                                            {
                                                this.state.role === 'sm' &&
                                                <>
                                                    <a href="#" name="" className="add-rm-pic">
                                                        <div style={{ fontSize: '30px' }}>
                                                            🞦<input type="file"
                                                                style={{
                                                                    opacity: 0.0,
                                                                    position: 'absolute',
                                                                    top: 0, left: 0, bottom: 0, right: 0,
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    zIndex: 100,
                                                                }}
                                                                name={i}
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
                        <div className="mini-pic-wrapper">
                            {this.state.shopData.picture_mini.map((item, i) => {
                                let width;
                                if (i < 2) width = { width: '50%' };
                                else width = { width: '33.3333%' };

                                return (
                                    <div className="add-rm-container" style={width} key={i}>
                                        <img src={item.url}
                                            className="mini-pic"
                                            alt="" />
                                        {
                                            this.state.role === 'sm' &&
                                            <>
                                                <a href="#"
                                                    className="add-rm-pic"
                                                    style={{ width: '30px', height: '30px' }}>
                                                    <div style={{ fontSize: '20px' }}>
                                                        🞦<input type="file"
                                                            style={{
                                                                opacity: 0.0,
                                                                position: 'absolute',
                                                                top: 0, left: 0, bottom: 0, right: 0,
                                                                width: '100%',
                                                                height: '100%'
                                                            }}
                                                            name={i}
                                                            accept={"image/*"}
                                                            onChange={this.addPic} />
                                                    </div>
                                                </a>
                                                <a href="#"
                                                    className="add-rm-pic"
                                                    style={{ width: '30px', height: '30px' }}>
                                                    <div style={{ fontSize: '20px' }}
                                                        onChange={this.removePic}>
                                                        🞮
                                                    </div>
                                                </a>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        {/** Booking time tap */}
                        <BookingTime shopId={this.state.shopData.shop_id} disabledBt={this.state.role !== 'dk'} role={this.state.role} /> {/* disable button when role is owner or manager */}

                        {/** Current Party in cafe */}
                        {
                            this.state.partyData &&
                            this.state.role !== null &&
                            this.state.partyData.map((obj, i) => {
                                return (<PartyList
                                    key={i}
                                    partyData={obj}
                                    disabledBt={this.state.role !== 'dk'} />)   //disable button when role is owner or manage
                            })
                        }
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
                    z-index: 10;
                    position: absolute;

                    text-decoration: none;
                    color: rgba(0,0,0,0.9);
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: rgba(255,255,255,0.9);
                }
                
                .add-rm-container .carousel-control-next {
                    z-index: 5;
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

                .css-2b097c-container {
                    width: 135px;
                    margin-right: 10px;
                    display: inline-block;
                }   

                .react-time-picker{
                    width: 120px;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-radius: 5px;
                    display: inline-block;
                    background-color: white;
                }
            `