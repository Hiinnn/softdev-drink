import React from 'react';
import styled from 'styled-components';
import Invite from '../Invite/Invite';

export default class PartyList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			let sm = this.props.sm === true ? '-sm' : '';
			return ( <
				Party > {
					this.props.partyUser ?
					< div className = { sm }
					style = {
						{ float: 'left', width: '360px', fontSize: '20px', textAlign: 'left' } } > { this.props.partyData.party_name } < /div> :
						< div className = { "party-name" + sm } > { this.props.partyData.party_name } < /div>
				}


				<
				div className = { "profile-pic-container" + sm } > {
					Object.keys(this.props.partyData.member_list).map((i) => {
							return ( <
								div style = {
									{ position: 'relative' } }
								key = { i } >
								<
								img className = { "party-profile-pic" + sm }
								src = { this.props.partyData.member_list[i].picture }
								/>

								<
								/div>)
							})
					} <
					/div>

					{
						this.props.partyUser &&
							<
							div className = { "join-bt" + sm } > QUIT < /div>
					} {
						!this.props.partyUser && < div className = { "join-bt" + sm } > Join < /div>
					} <
					/Party>
				);
			}
		}

		const Party = styled.div `
                    width: 100%;
                    height: auto;

                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;

                    border: solid #7a7a7a;
                    padding: 10px 15px 25px 10px;
                    border-width: 0px 0px 1px 0px;

                    /********************** Normal ***********************/
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
                        border-radius: 10px;
                        background-color: red;
                    }

                    .profile-pic-container::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background-color: rgb(34, 28, 28);
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

                    .disabled-bt {
                        pointer-events: none;
                        opacity: 0.4;
                    }

                    /********************** Small ***********************/
                    .party-name-sm {
                                height: 40px;

                        flex: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        color: white;
                        font-size: 18px;
                        padding-left: 10px;
                    }

                    .profile-pic-container-sm {
                        width: 210px;
                        min-height: 40px;
                        max-height: 80px;
                        overflow: auto;

                        display: flex;
                        flex-wrap: wrap;
                        justify-content: left;
                    }

                    .profile-pic-container-sm::-webkit-scrollbar {
                        width: 10px;
                        border-radius: 10px;
                        background-color: rgb(34, 28, 28);
                    }

                    .profile-pic-container-sm::-webkit-scrollbar-thumb {
                                border-radius: 10px;
	                    background-image: linear-gradient(rgb(255, 251, 0),rgb(247, 0, 255));
                    }

                    .party-profile-pic-sm {
                                width: 30px;
                        height: 30px;
                        margin: 5px;
                        border-radius: 100%;
                    }

                    .join-bt-sm {
                                width: 60px;
                        height: 30px;
                        margin-left: 25px;

                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;

                        color: white;
                        border-radius: 5px;
                        border: gold solid 1px;
                        background-color: black;
                    }

                    .join-bt-sm:hover {
                                cursor: pointer;
                        box-shadow:
                            0 0 5px wheat,
                            0 0 10px wheat,
                            0 0 20px wheat,
                            0 0 21px wheat;
                    }

                    .cross-delete{
                        position:absolute;
                        display: block;
                        bottom: 0px;
                        right: 10px;
                        z-index: 10;
                        cursor : pointer;
                    }

                    .cross-delete:hover{
                        text-shadow: white 0em 0em 0.5em,white 0em 0em 0.5em;
                    }
                `