import { useState, useEffect } from "react";
import {CgRadioCheck, CgRadioChecked} from "react-icons/cg";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import Card from "../../../components/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask, editStatusTask } from "../../../store/actions/tasksActions";
const debounce = require("lodash.debounce");

const Tasks = () => {
    const [list, setList] = useState(null);
    const [renderList, setRenderList] = useState("");
    const [isAllChecked, setIsAllChecked] = useState(true);
    const [isMineChecked, setIsMineChecked] = useState(false);
    const [owner, setOwner] = useState("all");
    const [search, setSearch] = useState("");
    
    const dispatch = useDispatch();

    const options = ["Seleccionar una prioridad", "ALL", "LOW", "MEDIUM", "HIGH"];

    useEffect(() => {
        dispatch(getTasks(owner === "me" ? "/me" : ""))
    }, [dispatch, owner]);

    const { loading, error, tasks } = useSelector(state => {
        return state.tasksReducer;
    });

    useEffect(() => {
        if(tasks?.length !== 0) {
            setList(tasks);
            setRenderList(tasks);
        } else {
            setList(tasks);
        } 
    }, [tasks]);

    useEffect(() => {
        if(search) {
            setRenderList(list?.filter((item) => item.title.startsWith(search)));
        } else {
            setRenderList(list);
        }
    }, [search, list]);

    const renderColumnCards = (text) => {
        return renderList?.filter((task) => {
            return task.status === text;
        })
        .map((task) => {
            return <Card key={task._id} {...task} data={task} deleteCard={handleDeleteCard} editStatusCard={handleEditStatusCard}/>
        })
    }

    const handleChangeImportance = (e) => {
        if(e.currentTarget.value === "ALL") {
            setRenderList(list);
        } else {
            setRenderList(list?.filter((item) => item.importance === e.currentTarget.value));
        }
    }

    const handleSearch = debounce(e => {
        setSearch(e?.target?.value) 
    }, 1000);

    const handleDeleteCard = (id) => {
        dispatch(deleteTask(id));
    }

    const handleEditStatusCard = (data) => {
        dispatch(editStatusTask(data));
    }

    const toggleIsChecked = () => {
        setIsAllChecked(!isAllChecked);
        setIsMineChecked(!isMineChecked);
        if(owner === "all") {
            setOwner("me");
        } else {
            setOwner("all");
        }
    }

    if(error) {
        return <Error>Hay un error</Error>
    }
    
    return(
        <TasksStyled>
            <TasksTitle>Mis tareas</TasksTitle>

                <TasksForm>
                    <RadioLabel htmlFor="owner">
                        <RadioContainer>
                            <RadioIcon onClick={toggleIsChecked}>
                                {isAllChecked ? <CgRadioChecked style={{ color: "#FF452B", fontSize: 25 }} /> : <CgRadioCheck style={{ color: "#8B8B8B", fontSize: 25 }} />}
                            </RadioIcon>
                            <RadioInput type="hidden" name="owner" value="all"  defaultChecked={isAllChecked} onChange={toggleIsChecked}/>
                            <RadioText>Todas</RadioText>
                        </RadioContainer>

                        <RadioContainer>
                            <RadioIcon onClick={toggleIsChecked}>
                                {isMineChecked ? <CgRadioChecked style={{ color: "#FF452B", fontSize: 25 }} /> : <CgRadioCheck style={{ color: "#8B8B8B", fontSize: 25 }} />}
                            </RadioIcon>
                            <RadioInput type="hidden" name="owner" value="me"  defaultChecked={isMineChecked} onChange={toggleIsChecked}/>
                            <RadioText>Mis tareas</RadioText>
                        </RadioContainer>
                    </RadioLabel>

                    <InputsContainer>
                        <Label htmlFor="title"></Label>
                        <Input type="text" name="title" placeholder="Seleccionar por título..." onChange={handleSearch} />

                        <Label htmlFor="importance"></Label>
                        <Select name="importance" onChange={handleChangeImportance}>
                            {options.map((item, index) => (
                                <Options key={index} value={item}>{item}</Options>
                            ))}
                        </Select> 
                    </InputsContainer>
                </TasksForm>

                <CategoriesContainer>
                    {renderList?.length === 0 ? (<NoTasks>No hay tareas creadas</NoTasks>) 
                    : (loading ? (
                        <> 
                            <Skeleton count={3} height={180}/> 
                        </>
                        )                     
                    : (
                        <>
                            <CardsList>
                                <CategoryTitle>Nuevas</CategoryTitle>
                                {renderColumnCards("NEW")}
                            </CardsList>
                            <CardsList>
                                <CategoryTitle>En proceso</CategoryTitle>
                                {renderColumnCards("IN PROGRESS")}
                            </CardsList>
                            <CardsList>
                                <CategoryTitle>Finalizadas</CategoryTitle>
                                {renderColumnCards("FINISHED")}
                            </CardsList> 
                        </>
                    ))}
                </CategoriesContainer>
        </TasksStyled>
    );
}

const TasksStyled = styled.div`
    background-color: ${theme.colors.superLightGrey};
    color: ${theme.colors.black};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    margin: 10px;
    padding: 0 10px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 50%;
        margin: 10px 10px 10px 0;
    }
`

const TasksTitle = styled.h1`
    color: ${theme.colors.black};
    font-size: 1.4rem;
    font-weight: 500;
    margin: 20px 0 0 10px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        justify-content: flex-start;
    }
`

const TasksForm = styled.form`
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const Label = styled.label`
    margin: 7px 0 2px;
    font-size: 0.7rem;
    font-weight: 400;
    display: flex;
    gap: 10px;
    position: relative;
`

const RadioLabel = styled(Label)`
    @media screen and (min-width: ${theme.viewport.desktop}) {
        flex-direction: row;
        align-items: center;
    }
`

const RadioContainer = styled.div`
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 5px;
`

const RadioInput = styled.input``

const RadioIcon = styled.div`
    cursor: pointer;
`

const RadioText = styled.span`
    font-size: 0.8rem;
    font-weight: 400;
`

const InputsContainer = styled.div`
    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 65%;
        display: flex;
        gap: 10px;
    }
`

const Input = styled.input`
    font-size: 0.8rem;
    font-weight: 400;
    width: 100%;
    height: 2.5rem;
    border: 1px solid ${theme.colors.grey};
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey};
    padding-left: 1.4rem;
    border-radius: 5px;

    :focus {
        outline: none;
    }
`

const Select = styled.select`
    font-size: 0.8rem;
    font-weight: 400;
    width: 100%;
    height: 2.5rem;
    border: 1px solid ${theme.colors.grey};
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey};
    padding-left: 1.4rem;
    border-radius: 5px;
    overflow-y: scroll;

    :focus {
        outline: none;
    }
`

const Options = styled.option`
    font-size: 0.8rem;
    font-weight: 400;
`

const CategoriesContainer = styled.div`
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        font-size: 0.5rem;
        font-weight: 400;
        color: ${theme.colors.black};
        flex-direction: row;
    }
`

const NoTasks = styled.h2`
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    color: ${theme.colors.black};

    @media screen and (min-width: ${theme.viewport.desktop}) {
        margin: 1.5rem auto;
    }
`

const CategoryTitle = styled.h2`
    display: none;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        display: block;
        font-size: 1.1rem;
        font-weight: 500;
        color: ${theme.colors.black};
        margin: 8px;
    }
`

const CardsList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 33%;
        background-color: ${theme.colors.white};
        border: 0;
        border-radius: 10px;
        padding: 15px 8px;
    }
`

const Error = styled.h2`
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    color: ${theme.colors.black};

    @media screen and (min-width: ${theme.viewport.desktop}) {
        margin: 1.5rem auto;
    }
`

export default Tasks;