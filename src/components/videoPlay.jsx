import { Modal, Box, Button } from "@mui/material";

export default function VideoPlay({ videoId, close, title }) {
  return (
    <Modal open={true} onClose={close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "70%" },
          bgcolor: "black",
          boxShadow: 24,
          p: 2,
        }}
      >
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          title={`${title} Trailer`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <Button onClick={close} sx={{ mt: 2, color: "white" }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
