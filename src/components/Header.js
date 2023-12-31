import { styled } from "styled-components"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";


export default function Header() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const image = localStorage.getItem("image");

    useEffect(() => {
        if (!token) {
            alert("É necessário estar logado para prosseguir");
            navigate("/");
            return;
        }
    })

    function getHome(event) {
        event.preventDefault()
        navigate('/timeline')
    }

    function handleArrowClick() {
        setShowLogout(!showLogout);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("image")
        localStorage.removeItem("userId")
        navigate('/');
    }

    return (
            <StyledLogoContainer>
                <StyledLogo onClick={getHome}> linkr</StyledLogo>
                <SearchBar />
                <Container>
                <StyledArrow onClick={handleArrowClick} showLogout={showLogout}>
                    <StyledArrowIcon showLogout={showLogout}>&#9660;</StyledArrowIcon>
                    {showLogout && (
                        <StyledLogoutBox data-test = "menu">
                            <StyledLogoutOption onClick={handleLogout} data-test = "logout">logout</StyledLogoutOption>
                        </StyledLogoutBox>
                    )}
                </StyledArrow>
                <ProfileImg src={image} data-test= "avatar"/>
                </Container>
            </StyledLogoContainer>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileImg = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 30px;
    margin-right: 20px;
`

const StyledLogoContainer = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515; 
    color:#ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); 
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 4;
    top: 0;
`

const StyledLogo = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    margin-left:10px;
    font-size: 49px;
    font-family: 'Passion One', cursive;
    font-weight: 700;
`;

const StyledArrow = styled.div`
    margin-right:9px;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledArrowIcon = styled.div`
    font-size: 20px;
    transform: ${props => (props.showLogout ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease-in-out;
`;

const StyledLogoutBox = styled.div`
    position: absolute;
    background-color: #151515; 
    top: 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 10px;
    border-radius: 5px;
`;

const StyledLogoutOption = styled.div`
    font-family: 'Passion One', cursive;
    font-size:20px;
    font-weight: 400;
    background-color: #151515; 
    color:#ffffff;
    cursor: pointer;
`;

