import styled from "styled-components";
import theme from "../../styles/Theme";
import mercadoPagoImage from "../../assets/images/mercadoPagoImage.png";

const Donate = () => {
    const linkMercadoPago = "https://mpago.la/2eJBr2W";
    
    return(
        <DonateStyled>
            <Image src={mercadoPagoImage} alt="Mercado pago image"/>
            <Title>Colabora con el proyecto donando $100 (ARS) con Mercado Pago</Title>
            <ButtonsContainer>
                <DonateAnchor href={linkMercadoPago} target="_blank" rel="noreferrer">Donar</DonateAnchor>
                <BackButton onClick={(e) => window.history.back()}>Volver</BackButton>
            </ButtonsContainer>
            
        </DonateStyled>
    );
}

const DonateStyled = styled.div`
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

    @media only screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 1.5rem;
    }
`

const ButtonsContainer = styled.div`
    margin-top: 2.4rem;
    display: flex;
    gap: 25px;
`

const DonateAnchor = styled.a`
    height: 2.4rem;
    width: 4.5rem;
    display: flex;
    justify-content: center;
    padding-top: 0.55rem;
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

const BackButton = styled.button`
    height: 2.4rem;
    width: 4.8rem;
    font-size: 1rem;
    font-weight: 500;
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

export default Donate;