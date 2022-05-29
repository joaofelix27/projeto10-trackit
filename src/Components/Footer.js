import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserContext from "./Context/UserContext";
import { useEffect, useState, useContext } from "react";

function Footer() {
    const { percentage } = useContext(UserContext);
    return (
        <Footer1>
            <Link style={{ textDecoration: 'none' }} to="/habitos">
                <h1>Hábitos</h1>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/hoje">
            <div  >
                <CircularProgressbar
                    value={percentage}
                    background={true}
                    backgroundPadding={6}
                    text={'Hoje'}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                            // Path color
                            stroke: `#FFFFFF `,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                            // Customize transition animation
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            // Rotate the path
                            transformOrigin: 'center center',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                            // Trail color
                            stroke: '#52B6FF',
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                            // Rotate the trail
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },
                        // Customize the text
                        text: {
                            // Text color
                            fill: '#FFFFFF',
                            // Text size
                            fontSize: '18px',
                            fontWeight:'400',
                            lineHeight:'22px',
                            fontFamily:'Lexend Deca'
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                            fill: '#52B6FF',
                        },
                    }}
                />
            </div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/historico">
                <h1>Histórico</h1>
            </Link>

        </Footer1>
    )
}
export default Footer;

const Footer1 = styled.div`
    height: 70px;
    width: 100%;
    position:fixed;
    display:flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0px;
    border-radius: 0px;
    box-shadow: 0px 4px 4px 0px #00000026;
    background-color: #FFFFFF;
    padding:0 36px;
    border-top: 1px solid #D4D4D4;
    
    div {
        height: 91px;
        width: 91px;
        background-color: #52B6FF;
        border-radius: 98.5px;
        margin-bottom:40px;
    }

    h1 {
        font-family: Lexend Deca;
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;
        color: #52B6FF;

    }
        
`;
