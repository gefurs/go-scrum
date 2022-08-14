import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import theme from "../../styles/Theme";

const { REACT_APP_API_URL } = process.env;

const Register = () => {
    const [data, setData] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isOnTeam, setIsOnTeam] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${REACT_APP_API_URL}/auth/data`)
        .then((response) => response.json())
        .then((apiData) => setData(apiData.result));

    }, []);

    const messages = {
        empty: "*Campo obligatorio",
        invalidUserName: "*El nombre de usuario debe tener al menos 4 caracteres",
        invalidPassword: "*La contraseña debe tener al menos 6 caracteres",
        invalidEmail: "*Por favor, ingrese un correo electrónico válido",
    };

    const initialValues = {
        userName: "",
        password: "",
        email: "",
        teamID: "",
        role: "",
        continent: "",
        region: "",
        onTeam: false, 
    }

    const handleChangeContinent = (value) => {
        setFieldValue("continent", value);
        if(value !== "America") {
            setFieldValue("region", "Otro");
        }
    }

    const toggleIsOnTeam = () => {
        setIsOnTeam(!isOnTeam);
        setFieldValue("onTeam", !formik.values.onTeam);
    }

    const onSubmit = () => {
        const teamID = !values.teamID ? uuidv4() : values.teamID;
        
        fetch(`${REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    userName: values.userName,
                    password: values.password,
                    email: values.email,
                    teamID,
                    role: values.role,
                    continent: values.continent,
                    region: values.region,
                },
            }),
        })
        .then((response) => response.json())
        .then((data) => 
            navigate("/registered/" + data?.result?.user?.teamID)
        )
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, messages.invalidUserName).required(messages.empty),
        password: Yup.string().min(6, messages.invalidPassword).required(messages.empty),
        email: Yup.string().email(messages.invalidEmail).required(messages.empty),
        role: Yup.string().required(messages.empty),
        continent: Yup.string().required(messages.empty),
        region: Yup.string().required(messages.empty),
    });

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const {handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue} = formik;

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <RegisterStyled>
            <RegisterForm onSubmit={handleSubmit}>
                <RegisterTitle>Registro</RegisterTitle>
                
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

                <LabelInput htmlFor="email">Email</LabelInput>
                <Input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                    className = {errors.email && touched.email ? "error" : ""}
                />
                {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}

                <OnTeamContainer>
                    <OnTeamIcon onClick={toggleIsOnTeam}>
                        {isOnTeam ? <BsToggle2On style={{ color: "#FF452B", fontSize: 25 }} /> : <BsToggle2Off style={{ color: "#FFC5BE", fontSize: 25 }} />}
                    </OnTeamIcon>
                    <Input type="hidden" name="onTeam" value={values.onTeam} />
                    <OnTeamSpan htmlFor="onTeam">Perteneces a un equipo ya creado</OnTeamSpan>
                </OnTeamContainer>

                {isOnTeam && (
                    <>
                        <LabelInput htmlFor="teamID">Por favor, introduce el identificador de equipo</LabelInput>
                        <Input type="text" name="teamID" value={values.teamID} onChange={handleChange} 
                            className = {errors.teamID && touched.teamID ? "error" : ""}
                        />
                    </>
                )}

                <LabelInput htmlFor="role">Rol</LabelInput>
                <Select name="role" value={values.role} onChange={handleChange} onBlur={handleBlur} className = {errors.role && touched.role ? "error" : ""}>
                    <Options value="">Seleccionar un rol</Options>
                    {data?.Rol?.map((item) => (
                        <Options key={item} value={item}>{item}</Options>
                    ))}
                </Select>
                {errors.role && touched.role && <ErrorMessage>{errors.role}</ErrorMessage>}

                <LabelInput htmlFor="continent">Continente</LabelInput> 
                <Select name="continent" value={values.continent} onChange={e => handleChangeContinent(e.currentTarget.value)} onBlur={handleBlur} 
                    className = {errors.continent && touched.continent ? "error" : ""}
                >
                    <Options value="">Seleccionar un continente</Options>
                    {data?.continente?.map((item) => (
                        <Options key={item} value={item}>{item}</Options>
                    ))}
                </Select> 
                {errors.continent && touched.continent && <ErrorMessage>{errors.continent}</ErrorMessage>}

                {values.continent === "America" && (
                    <>
                        <LabelInput htmlFor="region">Región</LabelInput>
                        <Select name="region" value={values.region} onChange={handleChange} onBlur={handleBlur} className = {errors.region && touched.region ? "error" : ""}>
                            <Options value="">Seleccionar una región</Options>
                                {data?.region?.map((item) => (
                            <Options key={item} value={item}>{item}</Options>
                            ))}
                        </Select>
                        {errors.region && touched.region && <ErrorMessage>{errors.region}</ErrorMessage>}
                    </>
                )}
                
                <ButtonSubmit type="submit">Enviar</ButtonSubmit>
                <ButtonMessageContainer>
                    <ButtonMessage>Ir a </ButtonMessage>
                    <LinkToLoginPage to={"/login"}>Iniciar sesión</LinkToLoginPage>
                </ButtonMessageContainer>
                
            </RegisterForm>
        </RegisterStyled>
    )
}

const RegisterStyled = styled.div`
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

const RegisterForm = styled.form`
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

const RegisterTitle = styled.h1`
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

const Input = styled.input`
    margin: 0px 20px;
    font-size: 0.8rem;
    font-weight: 400;
    height: 2.5rem;
    border: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.white};
    padding-left: 1.4rem;
    border-radius: 5px;

    :focus {
        outline: none;
    }

    &.error {
        border: 1px solid ${theme.colors.orange};
    }
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

const OnTeamContainer = styled.div`
    margin: 10px 20px 2px;
    display: flex;
    justify-content: space-beetween;
    height: 1.5rem;
    width: 100%;
`

const OnTeamIcon = styled.div`
    display: flex;
    justify-content: center;
    width: 2rem;
    cursor: pointer;
`

const OnTeamSpan = styled.span`
    font-size: 10px;
    font-weight: 400;
    margin: 0.3rem 0 0 0.5rem;
`

const Select = styled.select`
    margin: 0px 20px;
    font-size: 0.8rem;
    font-weight: 400;
    height: 2.5rem;
    border: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.white};
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

const LinkToLoginPage = styled(Link)`
    margin-left: 0.4rem;
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.orange};
    cursor: pointer;
    background-color: transparent;
    border: none;
    text-decoration: none;
`

export default Register;