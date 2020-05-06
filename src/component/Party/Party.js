import React from 'react';
import styled from 'styled-components';
import Invite from '../Invite/Invite';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { NotifyAlert } from '../SweetAlert';

export default class PartyList extends React.Component {
    constructor(props) {
        super(props)

        this.postJoin = this.postJoin.bind(this)
        this.postAcceptInvite = this.postAcceptInvite.bind(this)
        this.delDeclineInvite = this.delDeclineInvite.bind(this)
    }

    postJoin = () => {
        const url = `${localStorage.getItem('url')}/party/participate/`
        const body = {
            party_id: this.props.partyData.party_id
        }
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.post(url, body, { headers: head })
            .then((res) => {
                NotifyAlert(() => { window.location.reload() }, 'เข้าร่วมปาร์ตี้สำเร็จ', '', 'success', false)
            })
            .catch((err) => {
            })
    }

    postAcceptInvite() {
        const url = `${localStorage.getItem('url')}/party/participate/`
        const body = {
            party_id: this.props.partyData.party_detail.party_id
        }
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.post(url, body, { headers: head })
            .then((res) => {
                NotifyAlert(() => { window.location.reload() }, 'เข้าร่วมปาร์ตี้สำเร็จ', '', 'success', false)
            })
            .catch((err) => {
            })
    }

    delDeclineInvite() {
        const url = `${localStorage.getItem('url')}/party/invitation/${this.props.partyData.pk}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.delete(url, { headers: head })
            .then((res) => {
                NotifyAlert(() => { window.location.reload() }, 'ยกเลิกคำเชิญสำเร็จ', '', 'success', false)
            })
            .catch((err) => {
            })
    }

    render() {
        let sm = this.props.sm === true ? '-sm' : '';

        if (this.props.partyData)
            return (
                <Party >
                    {
                        // ! Partyname
                        this.props.partyUser
                            ? this.props.inv
                                ? <div className={sm} style={{ float: 'left', width: '260px', fontSize: '20px', textAlign: 'left' }} > {this.props.partyData.party_detail.party_name} </div>
                                : <div className={"party-name" + sm} > {this.props.partyData.party_name} </div>
                            : <div className={"party-name" + sm} > {this.props.partyData.party_name} </div>
                    }


                    {
                        // ! Profile img
                        !this.props.inv &&
                        <div className={"profile-pic-container" + sm} >
                            {
                                Object.keys(this.props.partyData.member_list).map((i) => {
                                    return (
                                        <div style={{ position: 'relative' }} key={i} >
                                            <img className={"party-profile-pic" + sm} src={`${localStorage.getItem('url')}${this.props.partyData.member_list[i].picture}`} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }


                    {
                        // ! Accept-Decline bt when user was invited
                        this.props.inv &&
                        <>
                            <div className={"join-bt" + sm} onClick={this.postAcceptInvite}> ACCEPT </div>
                            <div className={"join-bt" + sm} onClick={this.delDeclineInvite}> DECLINE </div>
                        </>
                    }

                    {
                        // ! Quit party
                        this.props.partyUser && !this.props.inv && !this.props.current &&
                        <div className={"join-bt" + sm} onClick={() => this.props.quit(this.props.partyData.id)} > QUIT </div>
                    }

                    {
                        // ! Button gropp for current party
                        this.props.partyUser && !this.props.inv && this.props.current &&
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={"join-bt" + sm} onClick={() => this.props.quit(this.props.partyData.id)} > QUIT </div>
                            <Link to={`/drinker/order/${this.props.partyData.shop_id}/${this.props.partyData.party_id}`} style={{ textDecoration: 'none' }}>
                                <div className={"join-bt" + sm}
                                    style={{ marginTop: 10 }}
                                    onClick={() => this.props.quit(this.props.partyData.party_id)}> Order </div>
                            </Link>
                            <Link to={`/drinker/bill/${this.props.partyData.party_id}`} style={{ textDecoration: 'none' }}>
                                <div className={"join-bt" + sm}
                                    style={{ marginTop: 10 }}
                                    onClick={() => this.props.quit(this.props.partyData.party_id)}> Bill </div>
                            </Link>
                        </div>
                    }

                    {
                        // ! Join button
                        !this.props.partyUser && !this.props.inv &&
                        <div className={`join-bt${sm}${(this.props.disabledBt === true || !this.props.partyData.is_join === true) ? " disabled-bt" : ""}`} onClick={this.postJoin} > Join </div>
                    }

                </Party >
            );
        else
            return <></>
    }
}

const Party = styled.div`
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
                        width: 70px;
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