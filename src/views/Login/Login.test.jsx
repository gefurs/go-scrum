import { render, screen} from "@testing-library/react";
import Login from "./Login";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';

describe("rendering in Login", () => {

    it("render h1", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 1, name: "Iniciar sesión"})).toBeInTheDocument(); 
    });

    it("render form labels", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByText("Nombre de usuario")).toBeInTheDocument();
        expect(screen.getByText("Contraseña")).toBeInTheDocument();
    });

    it("render input", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("render buttons", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", {name: "Enviar"})).toBeInTheDocument(); 
        expect(screen.getByRole("link", {name: "Registrarme"})).toBeInTheDocument();
    });

});
