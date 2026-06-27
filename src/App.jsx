import React, { useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerDate, setImageURL } from "./store/slice/movieSlice";
import Rout from "./routes/Rout";

export default function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = useCallback(async () => {
    try {
      const response = await axios.get("/trending/all/week");

      dispatch(setBannerDate(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);

  const fetchConfiguration = useCallback(async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, [fetchTrendingData, fetchConfiguration]);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Rout />

        <Footer />
      </BrowserRouter>
    </>
  );
}
