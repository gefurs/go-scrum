import { useState } from "react";
import styled from "styled-components";
import theme from "../styles/Theme";

const Card = ({ _id, title, createdAt, user: {userName}, description, status, importance, deleteCard, editStatusCard, data }) => {
    const [showMore, setShowMore] = useState(false);

    const dateTime = new Date(createdAt).toLocaleString() + " hs.";

    const limitDescription = (description) => {
        if(description.length > 170) {
            return {string: description.slice(0, 167).concat("..."), addButton: true}
        } else {
            return {string: description, addButton: false}
        }
    }

    return(
        <CardStyled>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <XButton onClick={() => deleteCard(_id)}>x</XButton>
            </CardHeader>
            <Text>{dateTime}</Text>
            <Text>{userName}</Text>
            <ButtonsContainer>
                <StatusButton type="button" status={status} onClick={() => editStatusCard(data)}>{status.toLowerCase()}</StatusButton>
                <ImportanceButton type="button" importance={importance}>{importance.toLowerCase()}</ImportanceButton>
            </ButtonsContainer>
            {!showMore ? 
                <CardDescription>{limitDescription(description).string}</CardDescription> 
            : 
                <>
                    <CardDescription>{description}</CardDescription>
                    <LessButton onClick={() => setShowMore(false)}>Ver menos</LessButton>
                </>}
            {!showMore && limitDescription(description).addButton && <MoreButton onClick={() => setShowMore(true)}>Ver más</MoreButton>}
        </CardStyled>
    );
}

const CardStyled = styled.div`
    width: 100%;
    border: 1px solid ${theme.colors.grey};
    background-color: ${theme.colors.white};
    padding-left: 1.4rem;
    border-radius: 5px;
`

const CardHeader = styled.div`
    margin: 1rem 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardTitle = styled.h1`
    color: ${theme.colors.black};
    font-size: 0.95rem;
    font-weight: 500;
    text-align: flex-start;
`

const XButton = styled.button`
    margin-right: 1rem;
    background: none;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: ${theme.colors.orange};

    @media screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 15px;
    }
`

const Text = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: ${theme.colors.black};
`

const CardDescription = styled(Text)`
    margin: 0 1rem 1rem 0;
    font-size: 9px;
`

const ButtonsContainer = styled.div`
    margin: 0.5rem 0;
    display: flex;
    gap: 5px;
`

const Button = styled.button`
    height: 18px;
    border: 0;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 400;
    color: ${theme.colors.white};
    padding: 2px 4px;

    &:hover {
        transform: scale(0.98);
    }
`

const StatusButton = styled(Button)`
    background-color: ${props => props.status === "NEW" ? theme.colors.red : (props.status === "IN PROGRESS" ? theme.colors.yellow : theme.colors.green)};
    color: ${props => props.status === "IN PROGRESS" ? theme.colors.black : theme.colors.white};

    &:hover {
        color: ${props => props.status === "IN PROGRESS" ? theme.colors.grey : theme.colors.superLightGrey};
    }
`

const ImportanceButton = styled(Button)`
    background-color: ${props => props.importance === "HIGH" ? theme.colors.red : (props.importance === "MEDIUM" ? theme.colors.blue : theme.colors.grey)};

    &:hover {
        color: ${theme.colors.superLightGrey};
    }
`

const MoreButton = styled(Button)`
    background-color: ${theme.colors.red};
    margin-bottom: 1rem;

    -webkit-box-shadow: 0px 5px 5px #00000045;

    &:hover {
        color: ${theme.colors.lightOrange};
    }
`

const LessButton = styled(Button)`
    background-color: ${theme.colors.red};
    margin-bottom: 1rem;

    -webkit-box-shadow: 0px 5px 5px #00000045;

    &:hover {
        color: ${theme.colors.lightOrange};
    }
`

export default Card;