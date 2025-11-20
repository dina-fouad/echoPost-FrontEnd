import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  // Navigation menu items used for Desktop and Mobile drawer
  const menuItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Posts", icon: <ArticleIcon />, path: "/posts" },
    { label: "Create", icon: <CreateIcon />, path: "/create" },
    { label: "Admin Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  ];

  return (
    <>
      {/* ===================== APP BAR (Main Header) ===================== */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "95%",
          marginTop: "20px",
          backgroundColor: "rgba(60, 53, 53, 0.45)", // Frosted glass effect
          backdropFilter: "blur(8px)",
          boxShadow: `
            0 0 15px rgba(0,0,0,0.35),
            inset 0 0 6px rgba(0,0,0,0.25)
          `,
          borderRadius: "10px",
          height: { xs: "55px", sm: "60px" },
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar
            disableGutters
            sx={{
              height: { xs: "55px", sm: "60px" },
              display: "flex",
              alignItems: "center",
              pl: 0,
              pr: { xs: 1.2, sm: 2 },
            }}
          >
            {/* ================= Mobile Menu Button (Left Side) ================= */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" }, // Visible only on mobile
                color: "white",
                marginRight: 0,
              }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* ================= Logo ================= */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: { xs: -1, sm: -1.5 },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  width: {
                    xs: "110px",
                    sm: "120px",
                    md: "140px",
                    lg: "165px",
                  },
                  borderRadius: "12px",
                  objectFit: "cover",
                  filter: `
                    drop-shadow(0px 2px 2px rgba(0,0,0,0.45))
                    drop-shadow(0px 4px 6px rgba(0,0,0,0.35))
                    drop-shadow(0px 8px 14px rgba(0,0,0,0.25))
                  `,
                }}
              />
            </Box>

            {/* ================= Desktop Navigation Menu ================= */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" }, // Hidden on mobile
                gap: 2,
                ml: 4,
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    key={item.label}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "15px",
                      display: "flex",
                      gap: "6px",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* ================= Auth Buttons (Right Side) ================= */}
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                gap: 1,
              }}
            >
              {/* Login Button */}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                    padding: { xs: "2px 4px", sm: "4px 8px", md: "6px 12px" },
                    minWidth: "auto",
                  }}
                >
                  Login
                </Button>
              </Link>

              {/* Register Button */}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                    padding: { xs: "2px 6px", sm: "4px 10px", md: "6px 14px" },
                    minWidth: "auto",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ===================== MOBILE DRAWER ===================== */}
      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#2a2a2a",
            width: 200, // Mobile drawer width
            color: "white",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Box sx={{ width: 200, paddingTop: 1.5 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setOpenMenu(false)}
                  sx={{
                    py: 0.7,
                    minHeight: "38px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "32px",
                      "& svg": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
