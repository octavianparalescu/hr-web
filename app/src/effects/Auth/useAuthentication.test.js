import React from "react";
import useAuthentication from "./useAuthentication";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

function TestComponent() {
    const {isAuth} = useAuthentication();
    if (isAuth) {
        return <div>auth</div>;
    }
    return <div>non-auth</div>;
}

let container = null;

beforeEach(() => {
    // set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("useAuthentication returns initial response", () => {
    act(() => {
        render(<TestComponent/>, container);
    });
    expect(container.textContent).toBe("non-auth");
});