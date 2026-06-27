import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";

export default function Rout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:type" element={<ExplorePage />} />
        <Route path="/:explore/:id" element={<DetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}
