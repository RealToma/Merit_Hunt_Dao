import React, { useState, useMemo, useEffect } from "react";
import { Box, Modal } from '@material-ui/core';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";

import Staked01 from "../../assets/image/stake.svg"
import Reward01 from "../../assets/image/rewards.svg";
import Triangle01 from "../../assets/image/triangle.png"

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { GiCancel } from 'react-icons/gi';
import CustomButton from '../../components/elements/buttons';
import Slider from '@material-ui/core/Slider';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from "ethers";
import { CONTRACTS } from "../../utils/constants";
import { HUNT_ABI, SHUNT_ABI } from "../../utils/abi";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Sun',
        price: 1,
        trading: 3908,
        staked: 2000,
    },
    {
        name: 'Mon',
        price: 0.4,
        trading: 2400,
        staked: 2400,
    },
    {
        name: 'Tue',
        price: 0.8,
        trading: 1398,
        staked: 2210,
    },
    {
        name: 'Wed',
        price: 0.5,
        trading: 3908,
        staked: 2000,
    },
    {
        name: 'Thr',
        price: 1.2,
        trading: 4800,
        staked: 1881,
    },
    {
        name: 'Fri',
        price: 0.1,
        trading: 2400,
        staked: 2400,
    },
    {
        name: 'Sat',
        price: 0.8,
        trading: 1398,
        staked: 2210,
    },
];


const Overview = ({ poolRef, rewardRef }) => {

    const { account, active, library } = useWeb3React();
    const HUNT_Contract = useMemo(() => (library ? new ethers.Contract(CONTRACTS.HUNT_TOKEN, HUNT_ABI, library.getSigner()) : null), [library]);
    const SHUNT_CONTRACT = useMemo(() => (library ? new ethers.Contract(CONTRACTS.STAKED_HUNT, SHUNT_ABI, library.getSigner()) : null), [library]);

    const [open_graph, setGraphOpen] = useState(false);
    const handleGraphOpen = () => setGraphOpen(true);
    const handleGraphClose = () => setGraphOpen(false);

    const [totalStaked, setTotalStaked] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [amount, set_amount] = useState(0);
    const [duration, set_duration] = useState(0);
    const [locked, set_locked] = useState(false);
    const [flag_spin_load, set_spin_load] = useState(false);


    const marks = [
        {
            value: 0,
            label: '0 weeks',
        },
        {
            value: 52,
            label: '52 weeks',
        },
    ];
    function valuetext(value) {
        return `${value} weeks`;
    }

    const handleSliderChange = (event, newValue) => {
        set_duration(newValue);
    };

    const stake = async () => {
        try {
            set_spin_load(true);
            let amount_wei = amount * Math.pow(10, 18);
            const approve = await HUNT_Contract.approve(CONTRACTS.STAKED_HUNT, "0x" + amount_wei.toString(16));
            await approve.wait();
            var t_duration;
            if (locked === true) {
                t_duration = duration * 60 * 60 * 24 * 7;
            }
            else {
                t_duration = 0;
            }
            const stakeHunt = await SHUNT_CONTRACT.deposit("0x" + amount_wei.toString(16), "0x" + t_duration.toString(16), account);
            await stakeHunt.wait();
            NotificationManager.success('Successed. See your results.', 'Hi.', 3000);
            setTimeout(() => {
                set_spin_load(false);
                set_amount(0);
                set_locked(false);
                getTotalStaked();
                handleClose();
                set_duration(0);
            }, 3000);

        }
        catch (err) {
            console.log(err);
            NotificationManager.error('Failed. Try it again.', 'Hi.', 3000);
            set_spin_load(false);
            set_locked(false);
            set_amount(0);
            handleClose();
            set_duration(0);
        }
    }

    const getTotalStaked = async () => {
        try {
            const staked = await SHUNT_CONTRACT.getTotalDeposit(account);
            setTotalStaked(parseInt(staked._hex) / Math.pow(10, 18))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotalStaked();
    }, [getTotalStaked])
    return (
        <StyledComponent>
            <RewardText>
                <LeftText01>
                    Rewards
                </LeftText01>
                <RightText01>
                    The Hunt DAO offers two core pools. Variable locking for up to twelve months is available for HUNT and LP staking.
                </RightText01>
            </RewardText>
            <CenterPart>
                <Left01>
                    <Box display={"flex"} flex={"2.5"} width={'100%'} height={"100%"} flexDirection={"column"} borderBottom={"1px solid white"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop="auto" marginBottom={"auto"} width={"100%"}>
                            <img src={Staked01} alt="staked01"></img>
                        </Box>
                        <SmText01>
                            Staked
                        </SmText01>
                        <BgText01>
                            {totalStaked} HUNT
                            {/* $ 1500 */}
                        </BgText01>
                    </Box>
                    <Box display={"flex"} flex={"1"} justifyContent="center" height={"100%"} alignItems={"center"} width={'100%'}>
                        {

                            active ?
                                <>
                                    <ConnectWalletBtn01 onClick={() => {
                                        handleOpen();
                                        // poolRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        Stake
                                    </ConnectWalletBtn01>
                                </> :
                                <>
                                    <ConnectWalletBtn01 >
                                        Connect Wallet
                                    </ConnectWalletBtn01>
                                </>
                        }
                    </Box>
                </Left01>
                <Center01>
                    <Box display={"flex"} flex={"2.5"} width={'100%'} justifyContent="center" alignItems={"center"} flexDirection={"column"} borderBottom={"1px solid white"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop="auto" marginBottom={"auto"} width={"100%"}>
                            <img src={Reward01} alt="reward01"></img>
                        </Box>
                        <SmText01>
                            Deposit
                        </SmText01>
                        <BgText01>
                            {/* $ 120 */}
                        </BgText01>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"auto"} marginBottom={'auto'} width={"100%"}>
                            <SmText02 display={"flex"} justifyContent={"center"} alignContent={"center"} width={"100%"}>
                                {/* <img src={Mark02} width={"40px"} height={"40px"} alt="mark02" ></img>{'\u00a0'} */}
                                {/* HUNT 120 */}
                            </SmText02>
                        </Box>
                    </Box>
                    <Box display={"flex"} flex={"1"} justifyContent="center" alignItems={"center"} width={'100%'}>
                        {

                            active ?
                                <>
                                    <ConnectWalletBtn01 onClick={() => {
                                        rewardRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        Unstake
                                    </ConnectWalletBtn01>
                                </> :
                                <>
                                    <ConnectWalletBtn01 >
                                        Connect Wallet
                                    </ConnectWalletBtn01>
                                </>
                        }
                    </Box>
                </Center01>
                <Right01>
                    <Part01 display={"flex"} position={"relative"} flex={"1"} justifyContent="center" alignItems={"center"} flexDirection={"column"} width="100%">
                        <GraphBox01 onClick={() => {
                            handleGraphOpen();
                        }}>
                            <ResponsiveContainer width="100%" height="100%" >
                                <AreaChart
                                    width={"100%"}
                                    height={"100%"}
                                    data={data}
                                    margin={{
                                        top: 30,
                                        right: 20,
                                        left: -20,
                                        bottom: 0,
                                    }}

                                >
                                    {/* <CartesianGrid strokeDasharray="2 2" /> */}
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="price" stroke="#333" fill="#93aebc" />

                                </AreaChart>
                            </ResponsiveContainer>
                        </GraphBox01>
                        <GraphInfoBox>
                            <Box display={"flex"} flex="1" fontSize={"16px"} justifyContent={"center"} alignItems={"center"} >HUNT Price</Box>
                            <Box display={"flex"} flex="1" fontSize={"20px"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"}>$ 1</Box>
                            <Box display={"flex"} flex="1" fontSize={"16px"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"} color={"#333"}>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><img src={Triangle01} width={"16px"} height={"16px"} alt="" /></Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"2%"}>1.63%</Box>
                            </Box>
                        </GraphInfoBox>
                    </Part01>
                    <Part01 display={"flex"} flex={"1"} justifyContent="center" alignItems={"center"} flexDirection={"column"} width="100%" marginTop={"10%"}>
                        <SmText03>
                            Total Locked Amount
                        </SmText03>
                        <Bgtext02>
                            $ {totalStaked}
                        </Bgtext02>
                        <SmText03>
                            Total Claimed Amount
                        </SmText03>
                        <Bgtext02>
                            $ 0.00
                        </Bgtext02>
                    </Part01>

                </Right01>
            </CenterPart>
            {/* Graph modal */}
            <Modal open={open_graph} onClose={handleGraphClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_Graph}>
                <GraphModalComponent>
                    <Box display={"flex"} width={"100%"} height={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}>
                        <GraphInfoBox>
                            <Box display={"flex"} flex="1" fontSize={"2rem"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"}>HUNT Price</Box>
                            <Box display={"flex"} flex="1" fontSize={"2rem"} justifyContent={"center"} alignItems={"center"} fontWeight={"700"}>$ 1</Box>
                            <Box display={"flex"} flex="1" fontSize={"18px"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"} color={"#333"}>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><img src={Triangle01} width={"24px"} height={"24px"} alt="" /></Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"2%"} fontSize={"1.6rem"}>1.63%</Box>
                            </Box>
                        </GraphInfoBox>
                        <GraphBox01>
                            <ResponsiveContainer width="100%" height="100%" >
                                <AreaChart
                                    width={"100%"}
                                    height={"100%"}
                                    data={data}
                                    margin={{
                                        top: 0,
                                        right: 10,
                                        left: -10,
                                        bottom: 0,
                                    }}

                                >
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="price" stroke="#333" fill="#93aebc" />
                                    <Area type="monotone" dataKey="trading" stroke="#82ca9d" fill="#82ca9d" />
                                    <Area type="monotone" dataKey="staked" stroke="#ffc658" fill="#ffc658" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </GraphBox01>
                    </Box>

                    {/* <MarkLetter>
                        The Hunt Price
                    </MarkLetter>
                     */}
                </GraphModalComponent>
            </Modal>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <ModalBox>
                    <CancelBox01 onClick={() => {
                        handleClose();
                        set_spin_load(false);
                        set_locked(false);
                        set_amount(0);
                        set_duration(0);
                    }}>
                        <GiCancel></GiCancel>
                    </CancelBox01>
                    <TitleText01>
                        {/* <img src={Mark01} width={"30px"} height={"30px"} alt=""></img> */}
                        Hunt Staking
                    </TitleText01>

                    <SelectDuration>
                        <FlexibleBox onClick={() => {
                            if (flag_spin_load === true) {
                                NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                                return;
                            }
                            set_locked(false);
                        }} locked={locked ? 1 : 0}>Flexible</FlexibleBox>
                        <LockedBox onClick={() => {
                            if (flag_spin_load === true) {
                                NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                                return;
                            }
                            set_locked(true);
                        }} locked={locked ? 1 : 0}>Locked</LockedBox>
                    </SelectDuration>

                    <SmText04 >
                        Amount
                    </SmText04>
                    <InputAmount component={"input"} value={amount} type={'number'} onChange={(e) => {
                        if (flag_spin_load === true) {
                            NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                            return;
                        }
                        set_amount(e.target.value);
                    }}></InputAmount>
                    {locked ? <>
                        <Box display={"flex"} width={"100%"}>
                            <Box display={"flex"} flex="1" width={"100%"}>
                                <SmText04>
                                    Lock for : ({duration} weeks)
                                </SmText04></Box>
                            <Box display={"flex"} flex="1" width={"100%"} >
                                <SmText04 justifyContent={"flex-end"}>
                                    Weight : ({(1 + duration / 52).toFixed(2)})
                                </SmText04></Box>
                        </Box>
                        <Slider
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            // step={10}
                            value={duration}
                            marks={marks}
                            max={52}
                            valueLabelDisplay="on"
                            onChange={handleSliderChange}
                        />
                        {/* <InputAmount component={"input"} value={duration} type={'number'} onChange={(e) => {
                            set_duration(e.target.value);
                        }}></InputAmount> */}
                    </> : <></>}
                    <Box display={"flex"} width={"100%"} marginTop={"5%"} position={"relative"} onClick={() => {
                        if (flag_spin_load === true) {
                            NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                            return;
                        }
                        stake();
                    }}>
                        {flag_spin_load ?
                            <Box display={"flex"} position={"absolute"} left={"20%"} justifyContent={"center"} alignItems={"center"} top="10%">
                                <TailSpin color="white" height={35} width={35} />
                            </Box>
                            :
                            <></>
                        }
                        <CustomButton str={"Stake"} width={"100%"} height={"56px"} color={"white"} bgcolor={"#333"} fsize={"16px"} fweight={"600"} bradius={"8px"} />
                    </Box>
                </ModalBox>
            </Modal>
            <NotificationContainer />
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    width: 80%;
    flex-direction: column;
    margin-top: 50px;
    color: #333;
`
const RewardText = styled(Box)`
    display: flex;
    width: 100%;
    margin-top: 50px;
`

const LeftText01 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 54px;
    line-height: 36px;
    letter-spacing: -.01em;

`
const RightText01 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -.01em;
    max-width: 560px;
    float: right;
`
const GraphModalComponent = styled(Box)`
 display: flex;
  width: 900px;
  height: 600px;
  flex-direction: column;
  background-color: white;
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(100px)!important;
  border-radius: 20px!important;
  padding: 30px;
  box-sizing: initial;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
  animation: back_animation1 0.5s 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes back_animation1 {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
    @media (max-width: 1200px) {
        transition: .5s !important;
        width: 750px;
        height: 500px;
    }
    @media (max-width: 1000px) {
        transition: .5s !important;
        width: 600px;
        height: 400px;
    }
    @media (max-width: 800px) {
        transition: .5s !important;
        width: 450px;
        height: 300px;
    }
    @media (max-width: 600px) {
        transition: .5s !important;
        width: 300px;
        height: 200px;
    }
    @media (max-width: 450px) {
        transition: .5s !important;
        width: 180px;
        height: 120px;
    }
`
const CenterPart = styled(Box)`
    display: grid;
    width: 100%;
    margin-top: 5%;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 40px;
    @media (max-width: 1200px) {
        transition: 0.5s;
        grid-auto-flow: row;
  }
`
const Left01 = styled(Box)`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
    background: white;
    backdrop-filter: blur(100px);
    border-radius: 8px;
    padding: 30px;
    box-sizing: border-box;
    /* height:414px; */
    &:hover{
        transition: .5s;
        box-shadow: 0 10px 15px rgb(0 0 0  / 30%);
    }
`

const Center01 = styled(Box)`
    display: flex;
    flex: 1 1 0%;
    flex-direction:column;
    /* align-items: center;
    justify-content: center; */
    background: white;
    backdrop-filter: blur(100px);
    border-radius: 8px;
    /* height:414px; */
    padding: 30px;
    box-sizing: border-box;
    &:hover{
        transition: .5s;
        box-shadow: 0 10px 15px rgb(0 0 0  / 30%);
    }
`

const Right01 = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:414px;
`

const SmText01 = styled(Box)`
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`
const BgText01 = styled(Box)`
    display: flex;
    margin-top:auto;
    margin-bottom: auto;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    letter-spacing: -.01em;
    font-size: 40px;
    line-height: 40px;
    color: #333;
`
const Bgtext02 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`
const SmText03 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-end;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`

const GraphBox01 = styled(Box)`
    display: flex;
    flex: 4;
    width: 90%;
    height: 90%;
    justify-content: center;
    align-items: center;

`
const GraphInfoBox = styled(Box)`
    display: flex;
    flex: 1;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`

const ConnectWalletBtn01 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    border: none;
    padding: 8px 16px;
    margin: 0 auto;
    max-width: 240px;
    text-align: center;
    background-color: #333;
    color: white;
    cursor: pointer;
    &:hover{
        transition: .5s;
        color: #ffd47d;
    }
`
const SmText02 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`
const Part01 = styled(Box)`
    display: flex;
    background: white;
    backdrop-filter: blur(100px);
    border-radius: 8px;
    &:hover{
        transition: .5s;
        box-shadow: 0 10px 15px rgb(0 0 0  / 30%);
    }
`
const ModalBox = styled(Box)`
    display: flex;
    width: 400px;
    flex-direction: column;
    background: white;
    /* background-color: #D4EEE9; */
    border: none;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(100px)!important;
    border-radius: 8px;
    padding: 30px;
    transition: box-shadow 300ms;
    transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
    outline: none;
    animation: back_animation1 0.5s 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes back_animation1 {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
`

const CancelBox01 = styled(Box)`
    display: flex;
    position: absolute;
    right: 5%;
    top: 5%;
    font-size: 30px;
    opacity: 0.4;
    transition: .1s;
    &:hover{
        cursor:pointer;
        transition: .3s;
        color:#333;
        opacity: 1;
    }
`

const FlexibleBox = styled(Box)`
    display: flex;
    flex: 1;
    border-bottom: 1px solid #333;
    opacity: ${({ locked }) => locked ? 0.4 : 1};
    border-bottom: ${({ locked }) => locked ? "1px solid #333" : "2px solid #333"};
    font-family: 'Radio Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #333;
    justify-content: center;
    align-items: center;
    transition: .3s;
    &:hover{
        cursor: pointer;
        opacity: 1;
        border-bottom: 2px solid #333;
    }
`
const TitleText01 = styled(Box)`
    display: flex;
    flex:1;
    align-items: center;
    font-family: 'Radio Grotesk';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
    color: #333;
`
const SelectDuration = styled(Box)`
    display: flex;
    width: 100%;
    margin-top: 8%;
    height: 50px;
    /* border-radius: 50px; */
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    /* border: 2px solid rgb(133, 133, 133); */
`

const LockedBox = styled(Box)`
    display: flex;
    flex: 1;
    opacity: ${({ locked }) => locked ? 1 : 0.4};
    font-family: 'Radio Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #333;
    border-bottom: ${({ locked }) => locked ? "2px solid #333" : "1px solid #333"};
    justify-content: center;
    align-items: center;
    transition: .3s;
    &:hover{
        cursor: pointer;
        border-bottom: 2px solid #333;
        opacity: 1;
    }
`

const InputAmount = styled(Box)`
    display: flex;
    margin-top: 2%;
    height: 40px;
    outline: none;
    font-family: 'Radio Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color:  #333;;
    border: none ;
    background: none ;
    border-bottom: 1px solid #333;
`

const SmText04 = styled(Box)`
    display: flex;
    width: 100%;
    font-family: 'Radio Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #333;
    margin-top: 5%;
`

export const CustomBackdrop_Graph = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.6;
`

export default Overview;
