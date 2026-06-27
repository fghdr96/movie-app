import { Box, Typography } from "@mui/material";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Card({ data, trending, index, media_type }) {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediaType = data.media_type ?? media_type;
  return (
    <>
      <Link
        to={"/" + mediaType + "/" + data.id}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "inline-block",
        }}
      >
        <Box position="relative" width="100%" sx={{ overflowX: "hidden" }}>
          <Box
            component="img"
            src={imageURL + data?.poster_path}
            alt={data?.title || "no image"}
            sx={{
              width: "220px",
              height: "auto",
              display: "block",
              borderRadius: 2,
            }}
          />
          <Box position="absolute" top={3}>
            {trending && (
              <Box
                py={1}
                px={2}
                sx={{
                  bgcolor: "black",
                  opacity: 0.7,
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                }}
              >
                #{index} Trending
              </Box>
            )}
          </Box>
          <Box
            position="absolute"
            bottom={0}
            sx={{
              bgcolor: "black",
              opacity: 0.8,
              width: "100%",
              height: "17%",
              borderBottomRightRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          >
            <Typography
              variant="body2"
              top={3}
              px={1}
              fontSize="xSmall"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.title || data.name}
            </Typography>
          </Box>
          <Box
            position="absolute"
            bottom={0}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            sx={{ width: "100%", minWidth: "200px" }}
          >
            <Typography
              px={1}
              mb={1}
              color="#9B9B9B"
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.75rem",
                  md: "0.75rem",
                  lg: "0.77rem",
                },
              }}
            >
              {moment(data.release_date || data.first_air_date).format(
                "MMMM Do YYYY"
              )}
            </Typography>
            <Typography
              bgcolor="black"
              mb={1}
              px={1}
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.78rem",
                  md: "0.78rem",
                  lg: "0.75rem",
                },
                alignItems: "center",
              }}
              borderRadius="50px"
              color="#c9c3c3ff"
            >
              Rating: {Number(data.vote_average).toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </Link>
    </>
  );
}
