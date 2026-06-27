import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PlayArrow, Star, Visibility } from "@mui/icons-material";

export default function BannerHome() {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        setCurrentImage((prev) => prev + 1);
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content", // important!
            height: "100%",
          }}
        >
          {bannerData.map((data, index) => {
         

            return (
              <Box
                key={index}
                sx={{
                  flex: "0 0 100vw",
                  height: "100%",
                  scrollSnapAlign: "start",
                  position: "relative",
                  transform: `translateX(-${currentImage * 100}%)`,
                  transition: "transform 0.6s ease-in-out",
                }}
              >
                <img
                  src={imageURL + data.backdrop_path}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    width: "100%",
                    display: { lg: "flex", xs: "none" },
                    alignContent: "center",
                    justifyContent: "space-between",
                    paddingBottom: { lg: 20 },
                    transform: "translateY(-50%)",
                  }}
                >
                  <Button
                    onClick={handlePrevious}
                    sx={{
                      minWidth: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s",
                      "&:hover": {
                        bgcolor: "rgba(188,66,52,0.8)",
                      },
                      mx: 2,
                    }}
                  >
                    <FaAngleLeft size="24" color="white" />
                  </Button>
                  <Button
                    sx={{
                      minWidth: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s",
                      "&:hover": {
                        bgcolor: "rgba(188,66,52,0.8)",
                      },
                      mx: 2,
                    }}
                  >
                    <FaAngleRight
                      onClick={handleNext}
                      size="24"
                      color="white"
                    />
                  </Button>
                </Box>

                <Box
                  width={{ xs: "80%", sm: "30%" }}
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    left: { xs: "50%", sm: 40 },
                    transform: { xs: "translateX(-50%)", sm: "none" },
                    color: "white",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    {data.title || data.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: { xs: 2, sm: 3, md: 4 }, 
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data.overview}
                  </Typography>
                  <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyItems="center"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Star
                        sx={{
                          fontSize: { xs: "0.85rem", md: "1rem" },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", md: "0.9rem" },
                        }}
                      >
                        Rating : {Number(data.vote_average).toFixed(1)} +
                      </Typography>
                    </Box>
                    <Typography> | </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Visibility
                        sx={{
                          fontSize: { xs: "0.85rem", md: "1rem" },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", md: "0.9rem" },
                        }}
                      >
                        View : {Number(data.popularity).toFixed(0)}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    component={Link}
                    to={`/${data.media_type}/${data.id}`}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      mt: 2,
                      /*    px: 3,
                      py: 1,*/
                      "&:hover": { bgcolor: "#BC4234", color: "white" },
                      px: { xs: 4, sm: 3 }, // wider on mobile
                      py: { xs: 1.2, sm: 1 }, // taller on mobile
                      fontSize: { xs: "0.9rem", sm: "0.8rem" },
                      borderRadius: 2,
                    }}
                    startIcon={<PlayArrow sx={{ verticalAlign: "middle" }} />}
                  >
                    {" "}
                    Play Now
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
