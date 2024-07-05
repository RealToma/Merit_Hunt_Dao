import React, { useState, useRef, useEffect } from "react";
import { Box, Modal } from '@material-ui/core';
import styled from "styled-components";
// import { useWeb3React } from "@web3-react/core";
import { GiArchBridge, GiMushroom } from 'react-icons/gi';
import { BiBook, BiMessageDetail } from 'react-icons/bi';
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { RiBug2Fill, RiMacbookLine, RiGovernmentLine } from 'react-icons/ri';
import { FaGithub, FaTwitter, FaDiscord, FaMedium, FaRegHeart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize, MdMenu, MdBrightness5 } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import Navbar from "../navbar/navbar";
import Overview from "./overview";
// import Reward from "./reward";
// import Pool from "./pool";
import Deposit from "./deposit";
import IMG_HUNTDAO_LOGO from "../../assets/image/HUNT_logo.png"

const Staking = () => {
    // const { active } = useWeb3React();
    // const [flagStack, setFlagStack] = useState(false);
    // const [flagClaim, setFlagClaim] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const poolRef = useRef();
    const rewardRef = useRef();

    // const [scrollPosition, setScrollPosition] = useState(0);
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    // };

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll, { passive: true });
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, []);

    return (
        <StyledComponent>
            <Navbar />
            <Overview poolRef={poolRef} rewardRef={rewardRef} />
            <Deposit ref={rewardRef} />
            {/* <Pool ref={poolRef} /> */}
            {/* <Reward ref={rewardRef} /> */}

            {/* small menu mobile responsive */}
            <CustomBtn2 onClick={() => {
                handleOpen();
            }}>
                <MdMenu />
            </CustomBtn2>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_Navbar}>
                <ModalComponent>
                    <MarkImg onClick={() => {
                        window.scrollTo(0, 0);
                    }}>
                        <img src={IMG_HUNTDAO_LOGO} alt="" width={"60px"}></img>
                    </MarkImg>
                    <MarkLetter onClick={() => {
                        window.scrollTo(0, 0);
                    }}>
                        The Hunt Dao
                    </MarkLetter>
                    <LinkList>
                        <EachLink onClick={() => handleClose()}>
                            <MdOutlineDashboardCustomize fontSize={"1.5rem"} />
                            <EachLinkTxt >Dashboard</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <MdBrightness5 fontSize={"1.5rem"} />
                            <EachLinkTxt >Bond</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <SiDatabricks fontSize={"1.5rem"} />
                            <EachLinkTxt >Stake</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <HiOutlineLightningBolt fontSize={"1.5rem"} />
                            <EachLinkTxt >Zap</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <FaRegHeart fontSize={"1.5rem"} />
                            <EachLinkTxt >Give</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <RiMacbookLine fontSize={"1.5rem"} />
                            <EachLinkTxt >Wrap</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <GiArchBridge fontSize={"1.5rem"} />
                            <EachLinkTxt >Bridge</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <BiMessageDetail fontSize={"1.5rem"} />
                            <EachLinkTxt >Forum</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <RiGovernmentLine fontSize={"1.5rem"} />
                            <EachLinkTxt >Governance</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <BiBook fontSize={"1.5rem"} />
                            <EachLinkTxt >Docs</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <RiBug2Fill fontSize={"1.5rem"} />
                            <EachLinkTxt >Bug Bounty</EachLinkTxt>
                        </EachLink>
                        <EachLink onClick={() => handleClose()}>
                            <GiMushroom fontSize={"1.5rem"} />
                            <EachLinkTxt >Grants</EachLinkTxt>
                        </EachLink>
                    </LinkList>
                    <ContactList>
                        <Box display={"flex"} width="80%">
                            <ContactBox onClick={() => handleClose()}><FaGithub /></ContactBox>
                            <ContactBox onClick={() => handleClose()}><FaMedium /></ContactBox>
                            <ContactBox onClick={() => handleClose()}><FaTwitter /></ContactBox>
                            <ContactBox onClick={() => handleClose()}><FaDiscord /></ContactBox>
                        </Box>
                    </ContactList>
                </ModalComponent>
            </Modal>

        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    background-color: #e5e5e5;
    margin-left: 350px;
    @media (max-width: 1000px) {
        transition: .5s;
        margin-left: 0px;
    }
    /* overflow-y: scroll; */
`


const ModalComponent = styled(Box)`
    display: flex;
    transition: .5s;
    position: fixed;
    width: 320px;
    outline: none;
    height: 100vh;
    flex-direction: column;
    align-items: center ;
    background-color: white;
    overflow-y: auto;
`

const MarkImg = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
`

const MarkLetter = styled(Box)`
    display: flex;
    justify-content: content;
    margin-top: 10px;
    color: #333;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
`

const LinkList = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
    color: #333;
    font-weight: 700;
    margin-top: 30px;
`
const EachLink = styled(Box)`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 30px;
    align-items: center;
    cursor: pointer;
    &:hover{
        transition: .3s;
        color: #93aebc;
    }
`
const EachLinkTxt = styled(Box)`
    display: flex;
    margin-left: 15px;
    font-size: 1rem;
`


const ContactList = styled(Box)`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #93aebc;
`

const ContactBox = styled(Box)`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    &:hover{
        cursor: pointer;
        transition: .3s;
        color: #333;
    }
`
const CustomBtn2 = styled(Box)`
    display: none;
    position: fixed;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    left: 20px;
    top: 20px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background-color: #333;
    color: white;
    cursor: pointer;
    &:hover{
        transition: .5s;
        color: #ffd47d;
    }
    
    @media (max-width: 1000px) {
        transition: .5s;
        display: flex;
    }
`
export const CustomBackdrop_Navbar = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.6;
`


export default Staking;
