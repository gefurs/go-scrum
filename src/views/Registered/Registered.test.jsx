import { render, screen} from "@testing-library/react";
import Registered from "./Registered";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';

describe("rendering in Registered", () => {

    it("render image", () => {
        render(
            <BrowserRouter>
                <Registered />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toBeInTheDocument(); 
    });

    it("render image with atribute alt", () => {
        render(
            <BrowserRouter>
                <Registered />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toHaveAttribute("alt", "Welcome image");  
    });

    it("render h2", () => {
        render(
            <BrowserRouter>
                <Registered />
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 2, name: "El TeamID de tu equipo es:"})).toBeInTheDocument(); 
    });

    it("render a with href", () => {
        render(
            <BrowserRouter>
                <Registered />
            </BrowserRouter>
        );
        expect(screen.getByRole("link", {name: "Continuar"})).toBeInTheDocument(); 
    });

});

