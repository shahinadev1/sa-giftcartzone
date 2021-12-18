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
import useAuth from "../../../../Hooks/useAuth";
import { styled } from "@mui/material/styles";
import MobileCartModal from "./MobileCartModal/MobileCartModal";
import MobileCategory from "./MobileCategory/MobileCategory";
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
  const { user, isLoading, isAdmin } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const items = useSelector((state) => state.cartReducer);
  return (
    <>
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
          <IconButton color="inherit" onClick={() => setOpen2(!open2)}>
            <GridViewIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0.2 }} />
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <StyledBadge badgeContent={items.items.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Box sx={{ flexGrow: 0.2 }} />
          <IconButton
            color="inherit"
            onClick={() => {
              if (!isLoading) {
                if (user.email) {
                  if (!isAdmin) {
                    navigate("/profile");
                  } else {
                    navigate("/admin");
                  }
                }
              }
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
        <MobileCartModal isOpen={{ open, setOpen }} />
        <MobileCategory isOpen={{ open2, setOpen2 }} />
      </AppBar>
    </>
  );
};

export default MobileMenu;
