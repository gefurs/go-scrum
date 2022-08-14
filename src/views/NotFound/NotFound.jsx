import styled from "styled-components";
import theme from "../../styles/Theme";
import notFoundImage from "../../assets/images/notFoundImage.png";

function NotFound(){
    return(
        <NotFoundStyled>
            <Image src={notFoundImage} alt="Not found image"/>
            <Title>La página solicitada no existe</Title>
            <Button onClick={(e) => window.history.back()}>Volver</Button>
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

const Title = styled.h2`
    color: ${theme.colors.black};
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 0.5rem;

    @media only screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 1.5rem;
    }
`

const Button = styled.button`
    height: 2.4rem;
    width: 4.8rem;
    margin-top: 0.8rem;
    font-weight: 700;
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange};
    border: 0px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        transform: scale(0.98);
        color: ${theme.colors.lightOrange};
    }
`

export default NotFound;