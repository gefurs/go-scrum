import { render, screen} from "@testing-library/react";
import NotFound from "./NotFound";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';

describe("rendering in NotFound", () => {

    it("render image", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toBeInTheDocument(); 
    });

    it("render image with atribute alt", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toHaveAttribute("alt", "Not found image");  
    });

    it("render h2", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 2, name: "La página solicitada no existe"})).toBeInTheDocument(); 
    });

    it("render a with href", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", {name: "Volver"})).toBeInTheDocument(); 
    });

});