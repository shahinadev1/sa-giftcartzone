import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        display: { md: "none" },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0.2 }} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0.2 }} />
        <IconButton color="inherit">
          <GridViewIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0.2 }} />
        <IconButton color="inherit">
          <ShoppingBagIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0.2 }} />
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MobileMenu;
