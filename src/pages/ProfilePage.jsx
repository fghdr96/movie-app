import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        Please login to view your profile.
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            backgroundColor: "rgba(25, 25, 25, 0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            padding: 5,
            color: "white",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          <Avatar
            src={user.picture}
            alt={user.name}
            sx={{
              width: 120,
              height: 120,
              margin: "0 auto",
              border: "3px solid #ff0000",
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.4)",
            }}
          />

          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            {user.name}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            {user.email}
          </Typography>

          <Typography variant="body2" sx={{ mt: 3, opacity: 0.6 }}>
            Member since: {new Date(user.updated_at).toLocaleDateString()}
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#e50914",
              "&:hover": { backgroundColor: "#b00610" },
              transition: "0.3s",
            }}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </>
  );
}
