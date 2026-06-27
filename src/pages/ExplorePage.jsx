import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

export default function ExplorePage() {
  const { type } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${type}`, {
        params: { page: pageNo },
      });

      setData((prev) => {
        const combined = [...prev, ...response.data.results];

        const unique = combined.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.id === item.id && t.media_type === item.media_type
            )
        );

        return unique;
      });
    } catch (error) {}
  }, [type, pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box pt="16">
        <Typography
          variant="h3"
          sx={{
            textAlign: { xs: "center", sm: "left" },
            fontWeight: 800,
            pl: { xs: "none", sm: 2 },
            py: 3,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Popular {type}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={3}
          px={2}
        >
          {data.map((exploreData, index) => {
            return (
              <Box
                key={`${exploreData.media_type || type}-${exploreData.id}`}
                sx={{
                  transition: "0.3s ease",
                  borderRadius: "10px",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    cursor: "pointer",
                  },
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  gap: 2,
                }}
              >
                <Card data={exploreData} media_type={type} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
