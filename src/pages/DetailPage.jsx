import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetail";
import useFetch from "../hooks/useFetch";
import HorizontalScroller from "./HorizontalScroller";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  CalendarMonth,
  Description,
  Edit,
  Info,
  MonetizationOn,
  MovieCreation,
  Star,
  Timelapse,
  Visibility,
  Work,
} from "@mui/icons-material";
import moment from "moment";
import VideoPlay from "../components/videoPlay";

export default function DetailPage() {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationsData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );
  const { data: videoData } = useFetchDetail(
    `/${params?.explore}/${params?.id}/videos`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const trailer =
    videoData?.results?.find(
      (v) =>
        v.type === "Trailer" &&
        v.site === "YouTube" &&
        v.name.toLowerCase().includes("official")
    ) ||
    videoData?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

  const handlePlayVideo = () => {
    if (trailer) {
      setPlayVideoId(trailer.key);
      setPlayVideo(true);
    } else {
      alert("No trailer available");
    }
  };

  const releaseDate = data.release_date || data.first_air_date;

  const movieRuntime = data.runtime;
  const tvRuntime = data.episode_run_time?.[0];
  const totalMinutes = movieRuntime || tvRuntime;
  let hours = 0;
  let minutes = 0;

  if (totalMinutes) {
    hours = Math.floor(totalMinutes / 60);
    minutes = totalMinutes % 60;
  }

  const director = castData?.crew?.find((c) =>
    ["Director", "Episode Director", "Series Director"].includes(c.job)
  );

  const writer = castData?.crew?.find((c) =>
    ["Writer", "Screenplay", "Story", "Teleplay"].includes(c.job)
  );

  const producer = castData?.crew?.find((c) =>
    ["Producer", "Executive Producer", "Co-Producer"].includes(c.job)
  );

  return (
    <>
      <Box bgcolor="rgba(0,0,0,0.3)">
        <Box
          sx={{
            width: "100vw",
            height: "60vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={imageURL + data.backdrop_path}
            alt={data.title || data.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              filter: "brightness(0.85)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
            }}
          />
        </Box>

        <Box
          sx={{
            px: { lg: "54px", xs: "none" },
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            alignItems: { xs: "center", lg: "flex-start" },
          }}
        >
          <Box sx={{ position: "relative", mt: "-19vh" }}>
            <img
              src={imageURL + data.poster_path}
              alt={data.title || data.name}
              style={{
                width: "30vh",
                height: "35vh",
                objectFit: "cover",
                filter: "brightness(0.85)",
                borderRadius: "5%",
              }}
            />
            {trailer ? (
              <>
                <Button
                  onClick={handlePlayVideo}
                  sx={{
                    bgcolor: "white",
                    width: "30vh",
                    color: "black",
                    mt: 2,
                    display: "flex",
                    alignItems: { xs: "center", lg: "flex-start" },
                  }}
                >
                  Play Trailer
                </Button>
                <Button
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    width: "30vh",
                    mt: 1,
                  }}
                >
                  Watch on YouTube
                </Button>
              </>
            ) : (
              <Typography sx={{ mt: 2, color: "gray" }}>
                Trailer not available
              </Typography>
            )}
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                letterSpacing: 1,
                textAlign: { xs: "center", lg: "justify" },
              }}
            >
              {" "}
              {data.title || data.name}{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(232, 222, 222, 0.92)", py: "3px", px: "10px" }}
            >
              {data.tagline}
            </Typography>
            <Box px="10px">
              <Typography variant="body1">
                <Star sx={{ fontSize: "small" }} /> Rating :{" "}
                {Number(data.vote_average).toFixed(1)}+
              </Typography>
              <Typography variant="body1">
                <Visibility sx={{ fontSize: "small" }} /> View :{" "}
                {Number(data.vote_count)}
              </Typography>
              <Typography variant="body1">
                <Timelapse sx={{ fontSize: "small" }} /> Duration :{" "}
                {totalMinutes ? `${hours}h ${minutes}m` : "Unknown"}
              </Typography>
            </Box>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />
            <Box px="10px" py="20px">
              <Typography variant="h5" fontWeight="bold" letterSpacing={1.5}>
                <Description sx={{ fontSize: "large", pr: "5px" }} />
                Overview :
              </Typography>
              <Typography variant="body1 ">{data.overview}</Typography>

              <Box py="10px">
                <Typography variant="body1">
                  <Info sx={{ fontSize: "small", mr: 1 }} />
                  Status : {data.status}
                </Typography>

                <Typography variant="body1">
                  <CalendarMonth sx={{ fontSize: "small", mr: 1 }} />
                  Release Date : {moment(releaseDate).format("MMMM Do YYYY")}
                </Typography>
                <Typography variant="body1">
                  <MonetizationOn sx={{ fontSize: "small", mr: 1 }} /> Revenue :{" "}
                  {Number(data.revenue).toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

            <Box px="10px" py="20px">
              <Typography variant="h5" fontWeight="bold" letterSpacing={1.5}>
                Crew
              </Typography>
              <Typography variant="body1">
                <MovieCreation sx={{ fontSize: "small", mr: 1 }} />
                Director : {director?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                <Edit sx={{ fontSize: "small", mr: 1 }} />
                Writer : {writer?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                <Work sx={{ fontSize: "small", mr: 1 }} />
                Producer : {producer?.name || "N/A"}
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

            <Box px="10px" py="20px">
              <Typography
                variant="h5"
                fontWeight="bold"
                letterSpacing={1.5}
                sx={{ mb: 2 }}
              >
                Cast
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {castData?.cast?.slice(0, 12).map((starCast, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: "30%", sm: "22%", md: "18%", lg: "12%" },
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={
                        starCast.profile_path
                          ? imageURL + starCast.profile_path
                          : "https://via.placeholder.com/150?text=No+Image"
                      }
                      alt={starCast.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "13px" },
                        fontWeight: "bold",
                        mt: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {starCast.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: "10px", sm: "12px" },
                        color: "gray",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {starCast.character}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />
          </Box>
        </Box>

        <Box>
          <HorizontalScroller
            data={similarData}
            title={"SIMILAR " + params?.explore}
            media_type={params?.explore}
          />
        </Box>
        <Box>
          <HorizontalScroller
            data={recommendationsData}
            title={"MORE LIKE THIS " + params?.explore}
            media_type={params?.explore}
          />
        </Box>

        {playVideo && (
          <VideoPlay
            videoId={playVideoId}
            close={() => setPlayVideo(false)}
            title={data.title || data.name}
          />
        )}
      </Box>
    </>
  );
}
