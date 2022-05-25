import trackIt from '../assets/images/TrackIt.png'
import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "./Context/UserContext";

function Header() {
    const { login, setLogin } = useContext(UserContext);
    return (
        <Header1>
            <img src={trackIt} alt="logoTrackIt" />
            <img src={login.image} alt="fotoProfile" />
        </Header1>
    )
}
export default Header;

const Header1 = styled.div`
    height: 70px;
    width: 100%;
    position:fixed;
    display:flex;
    justify-content: space-between;
    align-items: center;
    top: 0px;
    border-radius: 0px;
    box-shadow: 0px 4px 4px 0px #00000026;
    background-color: #126BA5;
    padding:0 18px;

    img:nth-child(1) {
    width: 97px;
    }
    img:nth-child(2) {
    height: 51px;
    width: 51px;
    border-radius: 98.5px;        
    }
`;