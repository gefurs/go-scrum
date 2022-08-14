import styled from "styled-components";
import theme from "../../styles/Theme";
import { useParams, Link } from "react-router-dom";
import welcome from "../../assets/images/welcome.png";

function Registered(){
    const { teamID } = useParams();

    return(
        <NotFoundStyled>
            <Image src={welcome} alt="Welcome image"/>
            <TextContainer>
                <Title>El TeamID de tu equipo es:</Title>
                <Span>{teamID}</Span>
            </TextContainer>
            <LinkToLogin to={"/"}>Ir a Login</LinkToLogin>
        </NotFoundStyled>
    );
}

const NotFoundStyled = styled.div`
    background-color: ${theme.colors.superLightGrey};
    color: ${theme.colors.black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Image = styled.img`
    width: 15rem;
    text-align: center;

    @media only screen and (min-width: ${theme.viewport.desktop}) {
        width: 20rem;
    }
`

const TextContainer = styled.div`
    @media only screen and (min-width: ${theme.viewport.desktop}) {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`

const Title = styled.h2`
    color: ${theme.colors.grey};
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 0.5rem;

    @media only screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 1.5rem;
    }
`

const Span = styled.span`
    color: ${theme.colors.black};
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 0.5rem;

    @media only screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 1.5rem;
    }
`

const LinkToLogin = styled(Link)`
    margin-top: 2.4rem;
    height: 2.4rem;
    width: 6.2rem;
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange};
    border: none;
    border-radius: 5px;
    text-decoration: none;

    &:hover {
        transform: scale(0.98);
        color: ${theme.colors.lightOrange};
    }
`

export default Registered;