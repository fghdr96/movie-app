import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!query) return;

    try {
      setLoading(true);

      const response = await axios.get(`search/multi`, {
        params: {
          query: query,
          page: page,
        },
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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [query, page]);
  // Reset when query changes
  useEffect(() => {
    setPage(1);
    setData([]);
  }, [query]);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: { xs: "center", sm: "left" },
            pl: { xs: 0, sm: 2 },
            py: 3,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "white",
          }}
        >
          Search Results
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={3}
        px={2}
        py={2}
      >
        {data.map((searchData) => (
          <Box
            key={`${searchData.media_type}-${searchData.id}`}
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
            <Card data={searchData} media_type={searchData.media_type} />
          </Box>
        ))}
      </Box>

      {/* No results */}
      {data.length === 0 && !loading && (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "gray",
            py: 5,
          }}
        >
          No results found.
        </Typography>
      )}

      {/* Loading indicator */}
      {loading && (
        <Typography
          sx={{
            textAlign: "center",
            color: "gray",
            py: 2,
          }}
        >
          Loading more results...
        </Typography>
      )}
    </>
  );
}
