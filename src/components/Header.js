import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../styles/Theme";
import logo from "../assets/images/goScrumLogo.png";

const Header = () => {
    const userName = localStorage.getItem("userName");

    const navigate = useNavigate();

    const { tasks } = useSelector(state => {
        return state.tasksReducer;
    });
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
    }

    return(
        <StyledHeader>
            <Image src={logo} alt="logo"/>
            {console.log(process.env)}
            <Environment>Entorno: {process.env.NODE_ENV}, corriendo en el puerto {process.env.REACT_APP_PORT}</Environment>
            <Container>
                <Button onClick={() => navigate("/donate")}>Donar</Button>
                <Text>Tareas creadas: {tasks?.length}</Text>
                <Text>{userName}</Text>
                <XButton onClick={handleLogout}>X</XButton>
            </Container>
        </StyledHeader>
        
    );
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    top: 0;
    position: sticky;
    background-color: ${theme.colors.white};
    padding: 0px 11px;
    box-shadow: 0px 2px 10px #00000071;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        height: 50px;
    }
`

const Image = styled.img`
    width: 70px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 82px;
    }
`

const Container = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 25%;
    }
`

const Button = styled.button`
    height: 15px;
    width: 35px;
    font-size: 10px;
    font-weight: 400;
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange};
    border: 0px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        transform: scale(0.98);
        color: ${theme.colors.lightOrange};
    }
    
    @media screen and (min-width: ${theme.viewport.desktop}) {
        height: 25px;
        width: 70px;
        font-size: 14px;
    }

    -webkit-box-shadow: 0px 5px 5px #00000045;
`

const Text = styled.p`
    font-size: 11px;
    font-weight: 400;
    color: ${theme.colors.black};

    @media screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 15px;
    }
`

const XButton = styled.button`
    background: none;
    border: 0;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    color: ${theme.colors.orange};

    @media screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 15px;
    }
`

const Environment = styled.span`
    font-size: 9px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 15px;
    }
`

export default Header;