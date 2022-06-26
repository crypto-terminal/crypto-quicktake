import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

const container = document.getElementById("app");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ChakraProvider>
  </React.StrictMode>
);
