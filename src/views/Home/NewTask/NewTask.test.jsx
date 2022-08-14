import { render, screen} from "@testing-library/react";
import NewTask from "./NewTask";
import "jest-styled-components";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("https://goscrum-api.alkemy.org/task/data", (_, res, ctx) => {
        return res(ctx.json({
            result: {
                "status": ["NEW", "IN PROGRESS", "FINISHED"],
                "importance": ["HIGH", "MEDIUM", "LOW"],
            },
        }));
    })
); 

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("rendering in NewTask", () => {

    const initialState = {output:10};
    const mockStore = configureStore();
    let store;

    it("render h1", () => {
        store = mockStore(initialState);

        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 1, name: "Crear tarea"})).toBeInTheDocument(); 
    });

    it("render h2", () => {
        store = mockStore(initialState);

        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByRole("heading", {level: 2, name: "Crea tus tareas"})).toBeInTheDocument(); 
    });

    it("render Title input", async () => {
        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );

        const inputs = screen.getAllByRole("textbox");

        expect(inputs[0]).toBeInTheDocument(); 
        expect(inputs[0]).toHaveAttribute("placeholder", "Título");
    });

    it("render Description textarea", async () => {
        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );

        const inputs = screen.getAllByRole("textbox");

        expect(inputs[1]).toBeInTheDocument(); 
        expect(inputs[1]).toHaveAttribute("placeholder", "Descripción");
    });

    it("fetch status options", async () => {
        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByRole("option", {name: "Seleccionar un estado"})).toBeInTheDocument(); 
        expect(await screen.findByRole("option", {name: "NEW"})).toBeInTheDocument(); 
    });

    it("fetch importance options", async () => {
        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByRole("option", {name: "Seleccionar importancia"})).toBeInTheDocument(); 
        expect(await screen.findByRole("option", {name: "HIGH"})).toBeInTheDocument(); 
    });

    it("render button", () => {
        store = mockStore(initialState);

        render(
            <BrowserRouter>
                <Provider store={store} >
                    <NewTask />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByRole("button", {name: "Crear"})).toBeInTheDocument(); 
    });

});