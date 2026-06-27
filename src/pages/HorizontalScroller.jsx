import { Box, Typography } from "@mui/material";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useRef } from "react";
import Card from "../components/Card";

export default function HorizontalScroller({
  title,
  data,
  trending,
  media_type,
}) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <Box
        sx={{ p: { xs: 2, sm: 3, md: 4 }, overflowX: "hidden" }}
        position="relative"
      >
        <Typography
          variant="h6"
          sx={{
            pl: { xs: "2px", sm: "none" },
            fontWeight: "800",
            letterSpacing: 1,
            textTransform: "uppercase",
            fontSize: {
              xs: "1rem",
              sm: "1.2rem",
              md: "1.4rem",
            },
            lineHeight: 1.2,
            mb: 2,
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>

        {/* Left scroll button */}
        <Box
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            top: "55%",
            left: 5,
            transform: "translateY(-50%)",
            zIndex: 10,
            cursor: "pointer",
            display: { sm: "flex" },
            bgcolor: "rgba(0,0,0,0.4)",
            p: 1,
            borderRadius: "50%",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <FaAngleLeft size={25} color="white" />
        </Box>

        {/* Right scroll button */}
        <Box
          onClick={scrollRight}
          sx={{
            position: "absolute",
            top: "55%",
            right: 5,
            transform: "translateY(-50%)",
            zIndex: 10,
            cursor: "pointer",
            display: { sm: "flex" },
            bgcolor: "rgba(0,0,0,0.4)",
            p: 1,
            borderRadius: "50%",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <FaAngleRight size={25} color="white" />
        </Box>

        {/* Scrollable container */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            gap: 2,
            mt: 3,
            scrollSnapType: "x mandatory",
            transition: "all",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data.map((item, index) => (
            <Box
              key={item.id}
              sx={{ scrollSnapAlign: "start", flex: "0 0 auto" }}
            >
              <Card
                data={item}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
