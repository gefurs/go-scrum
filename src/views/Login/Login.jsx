import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import theme from "../../styles/Theme";
import { sweetAlert } from "../../utils/sweetAlert";

const { REACT_APP_API_URL } = process.env;

// import axios from "axios";

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();

    const messages = {
        empty: "*Campo obligatorio",
        invalidUserName: "*El nombre de usuario debe tener al menos 4 caracteres",
        invalidPassword: "*La contraseña debe tener al menos 6 caracteres",
    };

    const initialValues = {
        userName: "",
        password: ""
    }

    const onSubmit = () => {

        fetch(`${REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: values.userName,
                password: values.password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.status_code === 200) {
                localStorage.setItem("token", data.result.token);
                localStorage.setItem("userName", data.result.user.userName);
                navigate("/");
            } else {
                sweetAlert();
            }
        })
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, messages.invalidUserName).required(messages.empty),
        password: Yup.string().min(6, messages.invalidPassword).required(messages.empty),
    });

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const {handleSubmit, handleChange, handleBlur, values, errors, touched} = formik;

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <LoginStyled>
            <LoginForm onSubmit={handleSubmit}>
                <LoginTitle>Iniciar sesión</LoginTitle>

                <LabelInput htmlFor="userName">Nombre de usuario</LabelInput>
                <Input type="text" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur}
                    className = {errors.userName && touched.userName ? "error" : ""}
                />
                {errors.userName && touched.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}

                <LabelInput htmlFor="password">Contraseña</LabelInput>
                <PasswordInputContainer className = {errors.password && touched.password ? "error" : ""}>
                    <PasswordInput
                        type={passwordShown ? "text" : "password"}
                        name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
                        />
                    <PasswordIcon onClick={toggleShowPassword}>
                        {passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </PasswordIcon>
                </PasswordInputContainer>
                {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}

                <ButtonSubmit type="submit">Enviar</ButtonSubmit>
                <ButtonMessageContainer>
                    <ButtonMessage>Ir a </ButtonMessage>
                    <LinkToRegisterPage to={"/register"}>Registrarme</LinkToRegisterPage>
                </ButtonMessageContainer>

            </LoginForm>
        </LoginStyled>
    );
};

const LoginStyled = styled.div`
    background-color: ${theme.colors.superLightGrey};
    color: ${theme.colors.black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    @media screen and (min-width: ${theme.viewport.desktop}) {
        background-color: ${theme.colors.lightGrey};
    }
`

const LoginForm = styled.form`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;

    @media screen and (min-width: ${theme.viewport.tablet}) {
        background-color: ${theme.colors.white};
        width: 50%;
    }

    @media screen and (min-width: ${theme.viewport.desktop}) {
        background-color: ${theme.colors.white};
        width: 25%;
    }
`

const LoginTitle = styled.h1`
    color: ${theme.colors.orange};
    font-size: 1.4rem;
    font-weight: 500;
    text-align: flex-start;
    margin: 1rem 1.3rem 1rem;
`

const LabelInput = styled.label`
    margin: 7px 20px 2px;
    font-size: 0.7rem;
    font-weight: 400;
    display: flex;
    position: relative;
`

const Input = styled.input`
    margin: 0px 20px;
    font-size: 0.8rem;
    font-weight: 400;
    height: 2.5rem;
    border: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.white};
    padding-left: 1.4rem;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

    &.error {
        border: 1px solid ${theme.colors.orange};
    }
`

const ErrorMessage = styled.span`
    margin: 0px 20px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.orange};
    display: flex;
    justify-content: flex-start;
    height: 1rem;
`

const PasswordInputContainer = styled.div`
    margin: 0px 20px;
    height: 2.5rem;
    border: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.white};
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.error {
        border: 1px solid ${theme.colors.orange};
    }
`

const PasswordInput = styled.input`
    font-size: 0.8rem;
    font-weight: 400;
    height: 2.5rem;
    width: 100%;
    border: 0px;
    padding-left: 1.4rem;
    border-radius: 5px;
    background-color: transparent;

    &:focus {
        outline: none;
    }
`

const PasswordIcon = styled.span`
    width: 15%;
    font-size: 1.5rem;
    color: ${theme.colors.grey};
    cursor: pointer;
    text-align: center;
`

const ButtonSubmit = styled.button`
    margin: 0px 20px;
    height: 2.4rem;
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

const ButtonMessageContainer = styled.div`
    margin: 5px 20px 20px;
    display: flex;
`

const ButtonMessage = styled.p`
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.black};
    display: flex;
    justify-content: center;
    position: relative;
`

const LinkToRegisterPage = styled(Link)`
    margin-left: 0.4rem;
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.orange};
    cursor: pointer;
    background-color: transparent;
    border: none;
    text-decoration: none;
`

export default Login;