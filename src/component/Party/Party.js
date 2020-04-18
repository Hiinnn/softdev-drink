import React from 'react';
import styled from 'styled-components';

export default class PartyList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.partyData)
        return (
            <Party>
                <div className="party-name">{this.props.partyData.name}</div>
                <div className="profile-pic-container">
                    {Object.keys(this.props.partyData.member).map((i) => {
                        return (<img className="party-profile-pic" key={i} src={this.props.partyData.member[i].profile}/>)
                    })}
                </div>
                <div className="join-bt">Join</div>
            </Party>
        )
    }
}

const Party = styled.div`
                    width: 100%;
                    height: auto;

                    display: flex;
                    flex-wrap: wrap;

                    border: solid red;
                    padding: 10px 15px 25px 10px;
                    border-width: 0px 0px 2px 0px;

                    .party-name {
                        height: 40px;

                        flex: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        color: white;
                        font-size: 20px;
                        padding-left: 10px;
                    }

                    .profile-pic-container {
                        width: 370px;
                        min-height: 70px;
                        max-height: 140px;
                        overflow: auto;

                        display: flex;
                        flex-wrap: wrap;
                        justify-content: left;
                    }

                    .profile-pic-container::-webkit-scrollbar {
                        width: 10px;
                        background-color: white;
                    }

                    .profile-pic-container::-webkit-scrollbar-thumb {
                        width: 10px;
                        background-color: red;
                    }

                    .party-profile-pic {
                        width: 50px;
                        height: 50px;
                        margin: 10px;
                        border-radius: 100%;
                    }

                    .join-bt {
                        width: 60px;
                        height: 30px;
                        margin-top: 5px;
                        margin-left: 35px;
                        
                        display:flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;

                        color: white;
                        border-radius: 5px;
                        border: gold solid 1px;
                        background-color: black;
                    }

                    .join-bt:hover {
                        cursor: pointer;
                        box-shadow: 
                            0 0 5px wheat,
                            0 0 10px wheat,
                            0 0 20px wheat,
                            0 0 21px wheat;
                    }
                `