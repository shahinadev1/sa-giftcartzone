import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { styled } from "@mui/material/styles";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const MobileMenu = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cartReducer);
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
          <StyledBadge badgeContent={items.items.length} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
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
