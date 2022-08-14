import styled from "styled-components";
import theme from "../../styles/Theme";
import Header from "../../components/Header";
import NewTask from "../Home/NewTask/NewTask";
import Tasks from "../Home/Tasks/Tasks";

const Home = () => {

    return(
        <>
            <Header />
            <Content>
                <NewTask />
                <Tasks />
            </Content>
        </>
    );
}

const Content = styled.div`
    margin: 10px 0;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        flex-direction: row;
    }
`

export default Home;