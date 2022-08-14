import { render, screen} from "@testing-library/react";
import Register from "./Register";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("https://goscrum-api.alkemy.org/auth/data", (_, res, ctx) => {
        return res(ctx.json({
            result: {
                "continente": ["America", "Europa", "Otro"],
                "region": ["Otro", "Latam", "Brasil", "America del Norte"],
                "Rol": ["Team Member", "Team Leader"],
            },
        }));
    })
); 

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("rendering in Register", () => {

    it("render h1", () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 1, name: "Registro"})).toBeInTheDocument(); 
    });

    it("render form labels", () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByText("Nombre de usuario")).toBeInTheDocument();
        expect(screen.getByText("Contraseña")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Rol")).toBeInTheDocument();
        expect(screen.getByText("Continente")).toBeInTheDocument();
    });

    it("fetch rol options", async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByRole("option", {name: "Seleccionar un rol"})).toBeInTheDocument(); 
        expect(await screen.findByRole("option", {name: "Team Member"})).toBeInTheDocument(); 
    });

    it("fetch continent options", async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByRole("option", {name: "Seleccionar un continente"})).toBeInTheDocument(); 
        expect(await screen.findByRole("option", {name: "Europa"})).toBeInTheDocument(); 
    });

    it("render buttons", () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", {name: "Enviar"})).toBeInTheDocument(); 
        expect(screen.getByRole("link", {name: "Iniciar sesión"})).toBeInTheDocument();
    });

});
