import React from "react";
import { TopNav } from "./components";
import { Route, Routes } from "react-router-dom";
import { News, Home, Account, Market } from "./components";

export function App() {
  return (
    <React.Fragment>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/account" element={<Account />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </React.Fragment>
  );
}
