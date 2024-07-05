import React from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";
import IMG_HUNTDAO_LOGO from "../../assets/image/HUNT_logo.png";
import { GiArchBridge, GiMushroom } from 'react-icons/gi';
import { BiBook, BiMessageDetail } from 'react-icons/bi';
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { RiBug2Fill, RiMacbookLine, RiGovernmentLine } from 'react-icons/ri';
import { FaGithub, FaTwitter, FaDiscord, FaMedium, FaRegHeart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize, MdBrightness5 } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";

const Sidebar = () => {
    return (
        <StyledComponent>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <MarkImg onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>
                    <img src={IMG_HUNTDAO_LOGO} alt="" width={"60px"}></img>
                </MarkImg>
                <MarkLetter onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>
                    The Hunt Dao
                </MarkLetter>
                <LinkList>
                    <EachLink>
                        <MdOutlineDashboardCustomize fontSize={"1.5rem"} />
                        <EachLinkTxt >Dashboard</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <MdBrightness5 fontSize={"1.5rem"} />
                        <EachLinkTxt >Bond</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <SiDatabricks fontSize={"1.5rem"} />
                        <EachLinkTxt >Stake</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <HiOutlineLightningBolt fontSize={"1.5rem"} />
                        <EachLinkTxt >Zap</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <FaRegHeart fontSize={"1.5rem"} />
                        <EachLinkTxt >Give</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <RiMacbookLine fontSize={"1.5rem"} />
                        <EachLinkTxt >Wrap</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <GiArchBridge fontSize={"1.5rem"} />
                        <EachLinkTxt >Bridge</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <BiMessageDetail fontSize={"1.5rem"} />
                        <EachLinkTxt >Forum</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <RiGovernmentLine fontSize={"1.5rem"} />
                        <EachLinkTxt >Governance</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <BiBook fontSize={"1.5rem"} />
                        <EachLinkTxt >Docs</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <RiBug2Fill fontSize={"1.5rem"} />
                        <EachLinkTxt >Bug Bounty</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <GiMushroom fontSize={"1.5rem"} />
                        <EachLinkTxt >Grants</EachLinkTxt>
                    </EachLink>
                </LinkList>
            </Box>

            <ContactList>
                <Box display={"flex"} width="80%">
                    <ContactBox><FaGithub /></ContactBox>
                    <ContactBox><FaMedium /></ContactBox>
                    <ContactBox><FaTwitter /></ContactBox>
                    <ContactBox><FaDiscord /></ContactBox>
                </Box>
            </ContactList>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    position: fixed;
    width: 350px;
    height: 100vh;
    overflow-y: auto;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    @media (max-width: 1000px) {
        display: none;
    }
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
    padding-left: 40px;
    box-sizing: border-box;
`
const EachLink = styled(Box)`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    align-items: center;
    &:hover{
        cursor: pointer;
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
    cursor: pointer;
    &:hover{
        transition: .3s;
        color: #333;
    }
`
export default Sidebar;
