import React from 'react';
import styled from 'styled-components';
import shopData from '../../data/NEW/Shop';
import Axios from 'axios';
import TimePicerk from 'react-time-picker'
import TimePicker from 'react-time-picker/dist/TimePicker';

export default class BookingTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            working: true,
            timeArray: [],
            dateArray: this.createDayArray(),


            partySize: 0,
            partyName: '',
            partyType: '',
            partyDate: '',
            selectTime: '',
        }
        this.createDayArray()

        this.submit = this.submit.bind(this);
        this.handlePartyType = this.handlePartyType.bind(this);
        this.handlePartyName = this.handlePartyName.bind(this);
        this.createBranchTime = this.createBranchTime.bind(this);
    }

    createDayArray() {
        let today = new Date()
        const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        today = today.getDate()

        let arr = new Array()

        for (let i = 0; i < 7; i++) {
            arr.push((today + i) % lastDate)
        }

        return arr
    }

    componentDidMount() {
        let today = new Date();
        today = `${today.getFullYear()}-${(today.getUTCMonth() + 1) % 12}-${today.getDate()}`;

        this.getBookingData(today, this.props.shopId)
    }

    getBookingData(date, shopId) {
        if (this.props.role !== null) {
            Axios.get(`${localStorage.getItem('url')}/booking/seat/get/?date=${date}&shop_id=${shopId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                })
                .then((res) => {
                    this.setState({
                        working: true,
                        timeArray: this.createBranchTime(res.data),
                    })
                })
                .catch((err) => {
                    console.log('booking err', err)
                })
        }
    }

    createBranchTime(data) {
        const timeArr = [];
        Object.keys(data).map((key) => {
            if (key.match(/^time/) && data[key] > 0) {
                let temp = key.slice(4);
                let date = new Date()
                const dateHr = date.getHours()
                const dateMin = date.getMinutes()
                const tempHr = temp.slice(0, 2)
                const tempMin = temp.slice(2)

                if (parseFloat(`${dateHr}.${dateMin}`) < parseFloat(`${tempHr}.${tempMin}`)) {
                    temp = `${tempHr}:${tempMin}`
                    timeArr.push(temp)
                }
            }
        })
        return timeArr;
    }

    changePartySize = (op) => {
        // check that party is empty or max
        if ((this.state.partySize === 0 && op === "-") || this.props.role !== 'dk') return;

        // add or sub
        let temp = op === "+" ? 1 : -1;
        this.setState(() => {
            return {
                partySize: this.state.partySize + temp
            }
        })
    }

    handlePartyName = (e) => {
        e.preventDefault();
        this.setState({ partyName: e.target.value })
    }

    handlePartyType = (e) => {
        this.setState({ partyType: e.target.value })
    }

    submit = (e) => {
        const date = new Date();

        if (this.state.partyName === '') {
            this.setState({ partyName: 'Please enter party name.' })
            return
        }

        if (this.state.partySize === 0) {
            this.setState({ partyName: 'Party can\'t be empty.' })
            return
        }

        if (this.state.selectTime === '') {
            this.setState({ partyName: 'Select time.' })
            return
        }

        if (this.state.partyType === '') {
            this.setState({ partyName: 'Select party type.' })
            return
        }

        const startHr = this.state.selectTime.slice(0, 2)
        const startMin = this.state.selectTime.slice(3)
        const endHr = parseInt(startMin) === 30 ? `${(parseInt(startHr) + 1) % 24}` : startHr
        const endMin = parseInt(startMin) === 30 ? '00' : '30'

        const day = this.state.partyDate < 10 ? `0${this.state.partyDate}` : this.state.partyDate
        let month = this.state.partyDate >= date.getDate() ? (date.getMonth() + 1) % 12 : (date.getMonth() + 2) % 12
        month = month < 10 ? `0${month}` : month

        const start = `${date.getFullYear()}-${month}-${day}T${startHr}:${startMin}:00+07:00`
        const end = `${date.getFullYear()}-${month}-${day}T${endHr}:${endMin}:00+07:00`

        console.log(`${date.getFullYear()}-${month}-${day}T${startHr}:${startMin}:00+07:00`);


        this.postCreateParty(
            this.props.shopId,
            this.state.partyName,
            this.state.partySize,
            start,
            end,
            this.state.partyType === 'public' ? 1 : 0
        )
    }

    postCreateParty = (id, name, size, start, end, type) => {
        const url = `${localStorage.getItem('url')}/booking/book/`
        const body = {
            shop_id: id,
            party_name: name,
            member_max: size,
            start_datetime: start,
            end_datetime: end,
            is_join: type,
        }
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.post(url, body, { headers: head })
            .then((res) => {
                console.log('book', res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    render() {
        let sm = this.props.sm === true ? '-sm' : '';

        return (
            <BookingContainer>
                {/** Header */}
                <div className={"header" + sm}> Booking </div>

                {/** Select party size */}
                <div className={"party-size-container" + sm}>
                    <a className={"size-button-wrapper" + sm} onClick={() => this.changePartySize('-')}>
                        <img className={"size-button" + sm} src="https://image.flaticon.com/icons/svg/271/271220.svg" />
                    </a>

                    <div className={"party-size" + sm}>{this.state.partySize} คน</div>

                    <a className={"size-button-wrapper" + sm} onClick={() => this.changePartySize('+')}>
                        <img className={"size-button" + sm} src="https://image.flaticon.com/icons/svg/271/271228.svg" />
                    </a>
                </div>

                {/** Select time */}
                <div className="form-inline" id={'form' + sm}>
                    <select className="custom-select my-1 mr-sm-2 form-control-lg"
                        id="inlineFormCustomSelectPref"
                        value={this.state.selectTime}
                        disabled={!this.state.working || this.props.role !== 'dk'}
                        onChange={(e) => this.setState({ selectTime: e.target.value })}
                        style={{ textAlign: "center", textAalignLast: "center" }}>
                        <option value='choose'>Time</option>
                        {
                            this.state.timeArray.map((num, i) => {
                                return (
                                    <option value={num} key={i} style={{ textAlign: "center" }}>{
                                        num
                                    }</option>
                                )
                            })
                        }
                    </select>
                </div>

                {/* Date */}
                <div className="form-inline" id={'form' + sm}>
                    <select className="custom-select my-1 mr-sm-2 form-control-lg"
                        id="inlineFormCustomSelectPref"
                        value={this.state.partyDate}
                        disabled={!this.state.working || this.props.role !== 'dk'}
                        onChange={(e) => this.setState({ partyDate: e.target.value })}
                        style={{ textAlign: "center", textAalignLast: "center" }}>
                        <option value='choose'>Date</option>
                        {
                            this.state.dateArray.map((num, i) => {
                                return (
                                    <option value={num} key={i} style={{ textAlign: "center" }}>{
                                        num
                                    }</option>
                                )
                            })
                        }
                    </select>
                </div>


                {/** Privacy radio check */}
                <FormColumn>
                    <div className="form-check" id="check">
                        <label className="form-check-label" htmlFor="exampleRadios2">Private</label>
                        <input className="form-check-input"
                            type="radio"
                            name="privacy"
                            value="private"
                            disabled={this.props.role !== 'dk'}
                            onChange={this.handlePartyType} />
                    </div>

                    <div className="form-check" id="check">
                        <label className="form-check-label" htmlFor="exampleRadios2" >Public</label>
                        <input className="form-check-input"
                            type="radio"
                            name="privacy"
                            value="public"
                            disabled={this.props.role !== 'dk'}
                            onChange={this.handlePartyType} />
                    </div>
                </FormColumn>

                {/** Party name*/}
                <input className={"party-name" + sm}
                    type="text"
                    placeholder="Party name"
                    value={this.state.partyName || ""}
                    onChange={this.handlePartyName}
                    disabled={this.props.role !== 'dk'} />

                {/** Drink button*/}
                <div className={`drink-bt + ${sm} + ${(this.props.disabledBt === true || this.props.role !== 'dk') ? " disabled-bt" : ""}`} onClick={this.submit} >Drink!</div>
            </BookingContainer>
        )
    }
}


const FormColumn = styled.div`
                    width: 100px;
                    display: flex;
                    flex-direction: column;

                    #check {
                        display: flex;
                        justify-content: left;
                    }
                    `

const BookingContainer = styled.form`
                display:flex;
                flex-wrap: wrap;
                flex-direction: row;

                color:white;
                width: 100%;
                padding: 15px;
                padding-left: 20px;
                padding-bottom: 25px;
                border-bottom: solid #7a7a7a 1px;

                /*********************** Normal ***********************/
                .header {
                    flex: 1 100%;
                    font-size: 20px;
                }

                .party-size-container {
                    display: flex;
                    align-items: center;
                    
                    margin-right: 20px;
                }

                .party-size {
                    display: flex;
                    width: 70px;
                    height: 35px;
                    margin-left: 5px;
                    margin-right: 5px;
                    
                    text-align: center;
                    flex-direction: column;
                    justify-content: center;

                    color: black;
                    border-radius: 5px 5px 5px 5px;
                    background-color: white;
                }

                .size-button-wrapper {
                    width: 30px;
                    height: 30px;

                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    border-radius: 100%;
                    background-color: white;

                }

                .size-button {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    cursor: pointer;
                }

                .party-name {
                    width: 370px;
                    height: 30px;
                    margin-top: 5px;
                    padding-left: 10px;

                    display: flex;

                    border: 1px #7a7a7a;
                    background-color: white;   
                }

                .party-name::placeholder {  
                    color: gray;
                }

                .drink-bt {
                    width: 60px;
                    height: 30px;
                    margin-top: 5px;
                    margin-left: 25px;
                    
                    display:flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    color: white;
                    border-radius: 5px;
                    border: gold solid 1px;
                    background-color: black;
                }

                .drink-bt:hover {
                    cursor: pointer;
                    box-shadow: 
                        0 0 5px wheat,
                        0 0 10px wheat,
                        0 0 20px wheat,
                        0 0 21px wheat;
                }
                
                .form-inline {
                    margin-right: 10px;
                }

                .disabled-bt {   
                    pointer-events: none;
                    opacity: 0.4;
                }
                
                /********************* small ***********************/
                .header-sm {
                    flex: 1 100%;
                    font-size: 18px;
                    text-align: left;
                }

                .party-size-container-sm {
                    display: flex;
                    align-items: center;
                }

                .party-size-sm {
                    display: flex;
                    width: 60px;
                    height: 35px;
                    margin-left: 5px;
                    margin-right: 5px;
                    
                    text-align: center;
                    flex-direction: column;
                    justify-content: center;

                    color: black;
                    border-radius: 5px 5px 5px 5px;
                    background-color: white;
                }

                .size-button-wrapper-sm {
                    width: 15px;
                    height: 15px;

                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    border-radius: 100%;
                    background-color: white;

                }

                .size-button-sm {
                    width: 10px;
                    height: 10px;
                    display: flex;
                    cursor: pointer;
                }

                .party-name-sm {
                    width: 200px;
                    height: 30px;
                    margin-top: 5px;
                    padding-left: 10px;

                    display: flex;

                    border: 1px #7a7a7a;
                    background-color: white;   
                }

                .party-name-sm::placeholder {
                    color: gray;
                }

                .drink-bt-sm {
                    width: 60px;
                    height: 30px;
                    margin-top: 5px;
                    margin-left: 25px;
                    
                    display:flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    color: white;
                    border-radius: 5px;
                    border: gold solid 1px;
                    background-color: black;
                }

                .drink-bt-sm:hover {
                    cursor: pointer;
                    box-shadow: 
                        0 0 5px wheat,
                        0 0 10px wheat,
                        0 0 20px wheat,
                        0 0 21px wheat;
                }
                
                #form-sm {
                    margin-left: 6px;
                    margin-right: 6px;
                }
            `