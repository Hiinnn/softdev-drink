import React from 'react';
import styled from 'styled-components';

const serviceTime = {
    day: [1, 2, 3, 4, 5, 6, 7],
    open: '16.00',
    close: '02.30',
    partySize: 10,
}


export default class BookingTime extends React.Component {
    constructor(props) {
        super(props);
        this.Date = new Date();

        this.serviceTime = serviceTime;
        this.maxParty = this.serviceTime.partySize
        this.timeArray = this.createBranchTime(this.serviceTime);

        this.state = { size: 0 }
        this.handlePartyName = this.handlePartyName.bind(this);
        this.submit = this.submit.bind(this);
    }

    createBranchTime = (serviceTime) => {
        let time = [];
        let open = parseFloat(serviceTime.open);
        let close = parseFloat(serviceTime.close);
        if (close < open) close += 24

        let x = Math.abs(open - close);         // declare x (use for count times)

        if (x % 1 < 0.5 || x % 1 > 0.5) {       // parse hrs to 30min
            x = parseInt(x) * 2 + 1;
        }

        let temp = open;                        // init temp
        for (let i = 0; i < x; i++) {
            if (temp > this.Date.getHours()) {    // push time to array
                time.push(temp);
            }

            temp % 1 < 0.2
                ? temp += 0.3       // xx.00
                : temp += 0.7       // xx.30

            if (temp === parseFloat(24)) temp = parseFloat(0)   // check time overflow
        }

        return (time)
    }

    changePartySize = (op) => {
        // check that party is empty or max
        if ((this.state.size === 0 && op === "-") || (this.state.size === this.maxParty && op === "+")) return;

        // add or sub
        let temp = op === "+" ? 1 : -1;
        this.setState(() => {
            return {
                size: this.state.size + temp
            }
        })
    }

    submit = (e) => {
        e.preventDefault();
        console.log(e.target.elements.partyName.value);
    }

    handlePartyName = (event) => {
        this.setState({ partyName: event.target.value })
    }


    render() {
        let working = (this.serviceTime.day.indexOf(this.Date.getUTCDay()) !== -1)   // check that today is open

        let sm = this.props.sm === true ? '-sm' : '';

        console.log(sm);


        return (
            <BookingContainer onSubmit={this.submit}>
                {/** Header */}
                <div className={"header" + sm}> Booking </div>

                {/** Select party size */}
                <div className={"party-size-container" + sm}>
                    <a /*href=""*/ className={"size-button-wrapper" + sm} onClick={() => this.changePartySize('-')}><img className={"size-button" + sm} src="https://image.flaticon.com/icons/svg/271/271220.svg" /></a>
                    <div className={"party-size" + sm}>{this.state.size} คน</div>
                    <a /*href=""*/ className={"size-button-wrapper" + sm} onClick={() => this.changePartySize('+')}><img className={"size-button" + sm} src="https://image.flaticon.com/icons/svg/271/271228.svg" /></a>
                </div>

                {/** Select time */}
                <div className="form-inline" id={'form' + sm}>
                    <select className="custom-select my-1 mr-sm-2 form-control-lg"
                        id="inlineFormCustomSelectPref"
                        disabled={!working}>
                        <option>Time</option>
                        {
                            this.timeArray.map((num, i) => {
                                return (
                                    <option value={i} key={i}>{
                                        ((Math.round(num * 100) / 100)).toFixed(2)
                                    }</option>
                                )
                            })
                        }
                    </select>
                </div>

                {/** Privacy radio check */}
                <FormColumn>
                    <div className="form-check" id="check">
                        <input className="form-check-input" type="radio" name="partyType" id="private" value="option1" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Private
                            </label>
                    </div>
                    <div className="form-check" id="check">
                        <input className="form-check-input" type="radio" name="partyType" id="public" value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Public
                            </label>
                    </div>
                </FormColumn>

                {/** Party name*/}
                <input className={"party-name" + sm} type="text" name="partyName" placeholder="Party name" value={this.state.partyName || ""} onChange={this.handlePartyName} />

                {/** Drink button*/}
                <div className={"drink-bt" + sm} >Drink!</div>
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
                    
                    margin-right: 30px;
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
                    margin-right: 30px;
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
                    margin-left: 15px;
                    margin-right: 15px;
                }
            `