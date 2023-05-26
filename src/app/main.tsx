import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import "~/processes/registration/model.ts";

import { appStarted } from "~/shared/config/init.ts";

import { Application } from "./application";
import "./index.css";

registerSW();

const container = document.querySelector("#root") as HTMLElement;
const root = ReactDOM.createRoot(container);

appStarted();
root.render(<Application />);
