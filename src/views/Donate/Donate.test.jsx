import { render, screen} from "@testing-library/react";
import Donate from "./Donate";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';

describe("rendering in Donate", () => {

    it("render image", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toBeInTheDocument(); 
    });

    it("render image with atribute alt", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("img")).toHaveAttribute("alt", "Mercado pago image");  
    });


    it("render h2", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 2, name: "Colabora con el proyecto donando $100 (ARS) con Mercado Pago"})).toBeInTheDocument(); 
    });

    it("render a with href", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("link", {name: "Donar"})).toHaveAttribute("href", "https://mpago.la/2eJBr2W"); 
    });

    it("render anchor with target: _blank", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("link", {name: "Donar"})).toHaveAttribute("target", "_blank"); 
    });


    it("render button", () => {
        render(
            <BrowserRouter>
                <Donate />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", {name: "Volver"})).toBeInTheDocument(); 
    });

});

