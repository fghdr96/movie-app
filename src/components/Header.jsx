import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import mylogo from "../assets/Logo1.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import {
  AccountBox,
  Home,
  Login,
  Logout,
  Movie,
  Tv,
} from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import defaultUserImage from "../assets/user.png";

const settings = [];

export default function Header() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "30px",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AppBar
          position="static"
          sx={{
            background: "hsla(0, 0%, 28%, 0.25)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box flex={1} sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                <Link to="/">
                  <img
                    src={mylogo}
                    alt="logo"
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      objectFit: "cover",

                      pt: 1,
                      pb: 1,
                    }}
                  />
                </Link>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiPaper-root": {
                      backgroundColor: "rgba(40, 40, 40, 0.9)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      color: "white",
                      paddingY: 1,
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Home sx={{ fontSize: "large", mr: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        alignItems: "space-between",
                        fontWeight: "600",
                      }}
                    >
                      <Link
                        to="/"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontSize: "18px",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#E04A3A")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}
                      >
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Tv sx={{ mr: 1, fontSize: "large" }} />
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", fontWeight: "600" }}
                    >
                      <Link
                        to="/Explore/tv"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontSize: "18px",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#E04A3A")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}
                      >
                        TV Shows
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Movie sx={{ mr: 1, fontSize: "large" }} />
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", fontWeight: "600" }}
                    >
                      <Link
                        to="/Explore/movie"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontSize: "18px",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#E04A3A")}
                        onMouseLeave={(e) => (e.target.style.color = "white")}
                      >
                        Movies
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                  paddingY: 1,
                  width: "100%",
                }}
              >
                <Link to="/">
                  <img
                    src={mylogo}
                    alt="logo"
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Button>

                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <Link
                    to="/Explore/tv"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    TV Shows
                  </Link>
                </Button>

                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <Link
                    to="/Explore/movie"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Movies
                  </Link>
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name || "user"}
                      src={isAuthenticated ? user.picture : defaultUserImage}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{
                    mt: "45px",
                    "& .MuiPaper-root": {
                      backgroundColor: "rgba(40, 40, 40, 0.9)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      color: "white",
                      paddingY: 1,
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    sx={{
                      "&:hover": {
                        color: "#E04A3A",
                      },
                      transition: "color 0.3s",
                    }}
                  >
                    <AccountBox fontSize="small" sx={{ mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>

                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}

                  {/* Auth0 Login / Logout */}
                  {isAuthenticated ? (
                    <MenuItem
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      sx={{
                        "&:hover": {
                          color: "#E04A3A",
                        },
                        transition: "color 0.3s",
                      }}
                    >
                      <Logout fontSize="small" sx={{ mr: 1 }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "400",
                        }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() => loginWithRedirect()}
                      sx={{
                        "&:hover": {
                          color: "#E04A3A",
                        },
                        transition: "color 0.3s",
                      }}
                    >
                      <Login fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: "400" }}>
                        Login
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box
          sx={{
            flexGrow: 0,
            padding: "10px 30px",
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",

            background: "hsla(0, 0%, 33%, 0.60)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.trim()) {
                navigate(`/search?q=${searchInput}`);
                setSearchInput("");
              }
            }}
            style={{ width: "50%" }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
            </Search>
          </form>
        </Box>
      </motion.div>
    </>
  );
}
