import BannerHome from "../components/BannerHome";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import HorizontalScroller from "./HorizontalScroller";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const trendingData = useSelector((state) => state.movieData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowsData } = useFetch("/tv/popular");
  const { data: onTheAirShowsData } = useFetch("/tv/on_the_air");

  return (
    <>
      <Box>
        <BannerHome />
        <HorizontalScroller
          title="Trending Show"
          data={trendingData}
          trending={true}
        />
        <HorizontalScroller
          title="Now Playing"
          data={nowPlayingData}
          trending={false}
          media_type={"movie"}
        />
        <HorizontalScroller
          title="Top Rated Shows"
          data={topRatedData}
          trending={false}
          media_type={"movie"}
        />

        <HorizontalScroller
          title="Popular TV Shows"
          data={popularTvShowsData}
          trending={false}
          media_type={"tv"}
        />
        <HorizontalScroller
          title="On The Air"
          data={onTheAirShowsData}
          trending={false}
          media_type={"tv"}
        />
      </Box>
    </>
  );
}
