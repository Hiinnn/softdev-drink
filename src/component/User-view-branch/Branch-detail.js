import React from 'react'
import styled from 'styled-components'
import { Carousel, Form } from 'react-bootstrap'

import Axios from 'axios'
import './Branch-detail.css'
import Select from 'react-select'
import TimePicker from 'react-time-picker'

// Component
import PartyList from '../Party/Party'
import BookingTime from '../Party/BookingTime'
import OrderTable from '../OrderTable/OrderTable'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import { NotifyAlert } from '../SweetAlert'

export default class BranchDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: localStorage.getItem('role'),
            redirect: null,
            editable: false,
            workingTime: '00:00-00:00',

            shopData: null,

            selectDay: new Date().getDay(),
            changedTime: false,
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
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        this.edit = this.edit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeOpenTime = this.changeOpenTime.bind(this)
        this.changeCloseTime = this.changeCloseTime.bind(this)
    }

    componentDidMount = () => {
        this.getShopData()
    }

    componentDidUpdate = () => {
        if (this.state.role !== null && this.state.shopData && !this.state.partyData) this.getPartyData()
    }

    getShopData = () => {
        const url = `${localStorage.getItem('url')}/manager/shop/${this.props.match.params.shopId}`
        const head = localStorage.getItem('role') === null ? null : { Authorization: `Bearer ${localStorage.getItem('access')}` }
        Axios.get(url, { headers: head })
            .then((res) => {
                this.setState({
                    shopData: res.data
                }, () => {
                    let newShopData = { ...this.state.shopData }
                    const officeday = { ...this.state.officeday }
                    const index = this.state.shopData.officeday.findIndex(element => element.weekday === new Date().getDay())

                    // Check shop is open today
                    const time = index === -1
                        ? "We're Closed Today"
                        : `  ${this.ISOtoNormal(this.state.shopData.officeday[index].open_time)} - ${this.ISOtoNormal(this.state.shopData.officeday[index].close_time)}`

                    // get shop office day to state
                    for (let i = 0; i < 7; i++) {
                        let index = this.state.shopData.officeday.findIndex(element => element.weekday === i)
                        if (index !== -1) {
                            officeday[i].open_time = this.ISOtoNormal(this.state.shopData.officeday[index].open_time);
                            officeday[i].close_time = this.ISOtoNormal(this.state.shopData.officeday[index].close_time);
                        }
                    }

                    // change phone format from +66 to 0
                    newShopData.phone_number = this.formatPhoneNumber(newShopData.phone_number);

                    this.setState({
                        workingTime: time,
                        officeday: officeday,
                        shopData: newShopData
                    })
                })
            })
            .catch((err) => {
            })
    }

    getPartyData() {
        const date = new Date()
        const url = `${localStorage.getItem('url')}/party/list/?date=${new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().slice(0, 10)}&shop_id=${this.state.shopData.shop_id}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                this.setState({ partyData: res.data })
            })
            .catch((err) => {
                this.setState({ partyData: '' })
            })
    }

    ISOtoNormal = (time) => {
        // change iso 8901 to normal format
        const newTime = time.slice(11, 19).split(':')
        return (`${(parseInt(newTime[0]) + 7) % 24}:${newTime[1]}`)
    }

    NormaltoISO = (time) => {
        // change normal format to iso 8901 (only hr, min dont care any)
        return `2020-01-01T${time}:00+07:00`
    }

    formatPhoneNumber = (phone_number) => {
        // formatting phone number
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
        // change state when enter data
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

    changeOpenTime = (...e) => {
        // e -> [index, value]
        const newOffice = this.state.officeday
        newOffice[e[0]].open_time = e[1]

        this.setState({
            changedTime: true,
            officeday: newOffice
        })
    }

    changeCloseTime = (e) => {
        // e -> [index, value]
        const newOffice = this.state.officeday
        newOffice[e[0]].close_time = e[1]

        this.setState({
            changedTime: true,
            officeday: newOffice
        })
    }

    edit = () => {
        // ! after edit shop data
        if (this.state.editable === true) {
            // loop send new time
            if (this.state.changedTime === true) {
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
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                NotifyAlert(() => { }, 'สำเร็จ!', 'แก้ไขข้อมูลสำเร็จ', 'success');
            })
            .catch((err) => {
            })
    }

    postChangeTime = (url, body, header) => {
        Axios.post(url, body, { headers: header })
            .then((res) => {
            })
            .catch((err) => {
            })
    }

    addPic = (...params) => {
        // params = [type, index, event]
        // add pic to shop
        const e = params[2];
        e.preventDefault()

        const url = `${localStorage.getItem('url')}/manager/picture/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        const file = e.target.files[0];
        const form = new FormData()

        form.append('type', params[0])
        form.append('picture', file)
        form.append('shop_id', this.state.shopData.shop_id)
        form.append('picture_id', params[1])

        NotifyAlert(() => { }, 'กำลังดำเนินการ', 'กำลังอัพเดตรูปโปรไฟล์ กรุณารอสักครู่', 'info', true);

        Axios.post(url, form, { headers: head })
            .then((res) => {
                this.setState({
                    changePic: true
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                NotifyAlert(() => { }, 'สำเร็จ!', 'อัพเดทรูปสำเร็จ โปรดรีเฟรชหน้าเว็บของท่าน', 'success');
            })
            .catch((err) => {
                NotifyAlert(() => { }, 'เกิดข้อผิดพลาด', 'กรุณกรอกข้อมูลให้ครบ', 'error', false)
            })


    }

    removePic = (...params) => {
        // params = [type, index, event]
        // del pic to shop
        const e = params[2];
        console.log(params[1]);

        e.preventDefault()

        const url = `${localStorage.getItem('url')}/manager/picture/${params[1]}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.delete(url, { headers: head })
            .then((res) => {
                this.setState({
                    changePic: true
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                NotifyAlert(() => { }, 'สำเร็จ!', 'ลบรูปสำเร็จ', 'success');
            })
            .catch((err) => {
                console.log(err.response);

            })
    }

    toggleLike() {
        // dont do anything when dont login
        if (!localStorage.getItem('role')) return

        const url = localStorage.getItem('url')
        const token = localStorage.getItem('access')
        const body = {
            shop_id: this.state.shopData.shop_id
        }
        const head = {
            Authorization: `Bearer ${token}`
        }

        if (!this.state.shopData.is_fav.is_fav) {
            Axios.post(`${url}/user/profile/favorite_shop/`, body, { headers: head })
                .then((response) => {
                })
                .catch((err) => {
                })
        }
        else {
            Axios.delete(`${url}/user/profile/favorite_shop/${this.state.shopData.is_fav.pk}`, { headers: head })
                .then((response) => {
                })
                .catch((err) => {
                })
        }
    }

    loading() {
        // loading alert
        Swal.fire({
            icon: 'info',
            title: 'Loading',
            showConfirmButton: false,
            timer: 700
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        if (this.state.shopData)
            return (
                <>
                    <div className="add-rm-container">
                        <img src={`${localStorage.getItem('url')}${this.state.shopData.picture_main.url}`}
                            alt="eiei"
                            style={{
                                width: '100%',
                                height: '600px',
                                top: '110',
                                display: 'flex',
                                objectFit: 'cover'
                            }} />
                        {
                            this.state.role === 'ow' &&
                            <>
                                <div className="main-add-rm"
                                    style={{ transform: 'translateX(-270%)', fontSize: '25px' }}>
                                    🞦<input type="file"
                                        style={{
                                            opacity: 0.0,
                                            position: 'absolute',
                                            top: 0, left: 0, bottom: 0, right: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        name='main_pic'
                                        accept={"image/*"}
                                        onChange={this.addPic.bind(this, 'ma', 1)} />
                                </div>
                                <div className="main-add-rm"
                                    style={{ transform: 'translateX(-150%)', fontSize: '25px' }}
                                    onClick={this.removePic.bind(this, 'ma', 1)}>
                                    🞮
                            </div>
                            </>
                        }
                    </div>

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
                                {
                                    localStorage.getItem('role') !== 'ow' &&
                                    localStorage.getItem('role') !== 'sm' &&
                                    <div className="fav-wrapper" style={{ cursor: 'pointer' }} onClick={this.toggleLike.bind(this)}>
                                        <img src={this.state.shopData.is_fav.is_fav ? require('../../asset/icon/heart2.png') : require('../../asset/icon/heart.png')} alt="fav-icon" width="30px" height="30px" />
                                    </div>
                                }
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

                                {
                                    // max seat
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
                                        {
                                            this.days.map((day, i) => {
                                                return (
                                                    <div style={{ color: 'black', marginBottom: 20 }}>
                                                        <div style={{ color: 'white', display: 'inline-block', width: 110 }}>{day}</div>
                                                        <TimePicker
                                                            disableClock
                                                            locale="sv-sv"
                                                            onChange={this.changeOpenTime.bind(this, i)}
                                                            value={this.state.officeday[i].open_time}
                                                        />
                                                        <div style={{ color: 'white', display: 'inline' }}> - </div>
                                                        <TimePicker
                                                            disableClock
                                                            locale="sv-sv"
                                                            onChange={this.changeOpenTime.bind(this, i)}
                                                            value={this.state.officeday[i].close_time}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
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
                                                <img src={`${localStorage.getItem('url')}${item.url}`}
                                                    className="sub-pic"
                                                    alt="" />
                                                {
                                                    this.state.role === 'ow' &&
                                                    <>
                                                        <div className="add-rm-pic"
                                                            style={{ fontSize: '30px' }}>
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
                                                                onChange={this.addPic.bind(this, 'sb', item.pk)}
                                                            />
                                                        </div>
                                                        <div className="add-rm-pic"
                                                            style={{ fontSize: '30px' }}
                                                            onClick={this.removePic.bind(this, 'sb', item.pk)}
                                                        >🞮
                                                        </div>
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
                                    let width, heigth;
                                    if (i < 2) {
                                        width = { width: '50%' };
                                        heigth = 160
                                    }
                                    else {
                                        width = { width: '33.3333%' };
                                        heigth = 100
                                    }

                                    return (
                                        <div className="add-rm-container" style={width} key={i}>
                                            <img src={`${localStorage.getItem('url')}${item.url}`}
                                                className="mini-pic"
                                                alt=""
                                                style={{ objectFit: 'cover', width: width, height: heigth }} />
                                            {
                                                this.state.role === 'ow' &&
                                                <>
                                                    <div className="add-rm-pic"
                                                        style={{ fontSize: '20px', width: '30px', height: '30px', transform: 'translate(-110%,-110%)' }}>
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
                                                            onChange={this.addPic.bind(this, 'mn', item.pk)}
                                                        />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })}
                            </div>

                            {/** Booking time tap */}
                            {
                                localStorage.getItem('role') === 'dk' &&
                                <BookingTime shopId={this.state.shopData.shop_id} disabledBt={this.state.role !== 'dk'} role={this.state.role} />
                            }

                            {/** Current Party in cafe */}
                            {
                                this.state.partyData &&
                                <div className='party-list-container' style={{ maxHeight: 500, marginBottom: 50 }}>
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
                            }
                        </div>
                    </BranchDetailContainer>
                </>
            )
        else
            return (<>{this.loading()}</>)
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
                .add-rm-pic:nth-child(odd):hover {
                    cursor: pointer;
                    color: red;
                }
                .add-rm-pic:nth-child(even) {
                    transform: translate(-200%,-100%);
                }
                .add-rm-pic:nth-child(even):hover {
                    cursor: pointer;
                    color: blue;
                }
                .add-rm-pic:hover {
                    cursor: pointer;
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
