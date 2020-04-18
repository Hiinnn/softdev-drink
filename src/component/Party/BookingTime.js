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

        return (
            <BookingContainer onSubmit={this.submit}>
                <div className="header"> Booking </div>                 {/** Header */}
                <div className="party-size-container">                  {/** Select party size */}
                    <a /*href=""*/ onClick={() => this.changePartySize('-')}><img className="size-button" src="https://image.flaticon.com/icons/svg/271/271220.svg" /></a>
                    <div className="party-size">{this.state.size} คน</div>
                    <a /*href=""*/ onClick={() => this.changePartySize('+')}><img className="size-button" src="https://image.flaticon.com/icons/svg/271/271228.svg" /></a>
                </div>
                <div className="form-inline">                          {/** Select time */}
                    {
                        (working)
                            ?
                            <>
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
                            </>
                            :
                            <>

                            </>
                    }
                </div>
                <FormColumn>                                            {/** Privact radio check */}
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
                <input className="party-name" type="text" name="partyName" placeholder="Party name" value={this.state.partyName || ""} onChange={this.handlePartyName} />         {/** Party name*/}
                <div className="drink-bt" >Drink!</div>
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
                border-bottom: solid red 2px;

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

                .size-button {
                    width: 20px;
                    height: 20px;
                    display: flex;
                }

                .party-name {
                    width: 370px;
                    height: 30px;
                    margin-top: 5px;
                    padding-left: 10px;

                    display: flex;

                    border: 1px gray;
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
            `