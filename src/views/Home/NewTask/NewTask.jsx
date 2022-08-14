import { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/actions/tasksActions";

const { REACT_APP_API_URL } = process.env;

const NewTask = () => {
    const [data, setData] = useState();
    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    const messages = {
        empty: "*Campo obligatorio",
    }

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/task/data`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((apiData) => setData(apiData.result));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialValues = {
        title: "",
        status: "",
        importance: "",
        description: "",
    }

    const onSubmit = () => {
        dispatch(createTask(values));
        resetForm();
        toast("información enviada");
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(messages.empty),
        status: Yup.string().required(messages.empty),
        importance: Yup.string().required(messages.empty),
        description: Yup.string().required(messages.empty),
    });

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const {handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm} = formik;

    return(
        <NewTaskStyled>
            <NewTasksTitle>Crear tarea</NewTasksTitle>
            <NewTaskSubTitle>Crea tus tareas</NewTaskSubTitle>

            <NewTaskForm onSubmit={handleSubmit}>

                <Label htmlFor="title"></Label>
                <Input type="text" name="title" placeholder="Título" value={values.title} onChange={handleChange} onBlur={handleBlur} 
                    className = {errors.title ? "error" : ""}
                />
                {errors.title && touched.title && <ErrorMessage>{errors.title}</ErrorMessage>}

                <Label htmlFor="status"></Label>
                <Select name="status" value={values.status} onChange={handleChange} onBlur={handleBlur} className = {errors.status ? "error" : ""}>
                    <Options value="">Seleccionar un estado</Options>
                    {data?.status?.map((item) => (
                        <Options key={item} value={item}>{item}</Options>
                    ))}
                </Select>
                {errors.status && touched.status && <ErrorMessage>{errors.status}</ErrorMessage>}

                <Label htmlFor="importance"></Label>
                <Select name="importance" value={values.importance} onChange={handleChange} onBlur={handleBlur} className = {errors.importance ? "error" : ""}>
                    <Options value="">Seleccionar importancia</Options>
                    {data?.importance.map((item) => (
                        <Options key={item} value={item}>{item}</Options>
                    ))}
                </Select>
                {errors.importance && touched.importance && <ErrorMessage>{errors.importance}</ErrorMessage>}

                <Label htmlFor="description"></Label>
                <DescriptionInput type="textarea" name="description" placeholder="Descripción" value={values.description} onChange={handleChange} onBlur={handleBlur}
                    className = {errors.description ? "error" : ""}
                />
                {errors.description && touched.description && <ErrorMessage>{errors.description}</ErrorMessage>}

                <Button type="submit">Crear</Button>
                <ToastContainer />
            </NewTaskForm>
        </NewTaskStyled>
    );
}

const NewTaskStyled = styled.div`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        width: 50%;
        padding: 30px 10px;
        justify-content: flex-start;
    }
`

const NewTasksTitle = styled.h1`
    color: ${theme.colors.black};
    font-size: 1.4rem;
    font-weight: 500;
    text-align: flex-start;
    margin: 0 0 1rem 0.2rem;

    @media screen and (min-width: ${theme.viewport.desktop}) {

    }
`

const NewTaskSubTitle = styled.h2`
    color: ${theme.colors.black};
    font-size: 0.8rem;
    font-weight: 400;
    text-align: flex-start;
    margin: 0 0 0.5rem 0.2rem;
`

const NewTaskForm = styled.form``

const Label = styled.label`
    margin: 7px 0 2px;
    font-size: 0.7rem;
    font-weight: 400;
    display: flex;
    gap: 10px;
    position: relative;
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

    &.error {
        border: 1px solid ${theme.colors.orange};
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

    &.error {
        border: 1px solid ${theme.colors.orange};
    }
`

const Options = styled.option`
    font-size: 0.8rem;
    font-weight: 400;
`

export const ErrorMessage = styled.span`
    margin: 0px 20px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.orange};
    display: flex;
    justify-content: flex-start;
    height: 1rem;
`

const DescriptionInput = styled.textarea`
    font-size: 0.8rem;
    font-weight: 400;
    width: 100%;
    height: 120px;
    border: 1px solid ${theme.colors.grey};
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey};
    padding: 1rem 1rem 1rem 1.4rem;
    border-radius: 5px;
    overflow-y: scroll;
    resize: none;

    :focus {
        outline: none;
    }

    &.error {
        border: 1px solid ${theme.colors.orange};
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

export default NewTask;