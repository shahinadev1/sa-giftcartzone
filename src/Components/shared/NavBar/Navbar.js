import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SearchIcon from "@mui/icons-material/Search";
import useAuth from "../../../Hooks/useAuth";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
export default function Navbar(props) {
  const [search, setSearch] = React.useState(false);
  const { user, LogOut, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const searchRef = React.useRef();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const isMobile = true;
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "65px" }}>
      <ElevationScroll {...props}>
        <AppBar sx={{ zIndex: 9999 }}>
          <Toolbar>
            <NavLink to="/" className="text-white text-decoration-none">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                SA GiftCards
              </Typography>
            </NavLink>
            <Search className="hide-in-mobile">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                ref={searchRef}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {true ? (
              <Search className="hide-in-pc">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  autoFocus={true}
                  ref={searchRef}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            ) : (
              ""
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "200",
                    fontSize: "18px",
                  }}
                >
                  <LocalOfferIcon /> Offer
                </Link>
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "200",
                    fontSize: "18px",
                    marginRight: "20px",
                  }}
                >
                  <LiveHelpIcon /> Support
                </Link>
              </Typography>
              {user?.email ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar src={user.photoURL} />
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  color="secondary"
                  endIcon={<LoginIcon />}
                >
                  Sign in
                </Button>
              )}
            </Box>
            {user?.email ? (
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/user/profile");
                      handleClose();
                    }}
                    sx={{ alignItems: "center" }}
                  >
                    <img
                      src={user?.photoURL}
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                      }}
                      alt=""
                    />
                    {user?.displayName} / {isAdmin ? "admin" : "user"}
                  </MenuItem>
                  <Divider />
                  {isAdmin ? (
                    <MenuItem
                      onClick={() => {
                        navigate("/admin");
                        handleClose();
                      }}
                    >
                      <PersonIcon
                        sx={{ fontSize: "18px", marginRight: "10px" }}
                      />
                      Dashboard
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          navigate("/user/profile");
                          handleClose();
                        }}
                      >
                        <PersonIcon
                          sx={{ fontSize: "18px", marginRight: "10px" }}
                        />
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/user/orders");
                          handleClose();
                        }}
                      >
                        <ShoppingCartIcon
                          sx={{ fontSize: "18px", marginRight: "10px" }}
                        />
                        My order(s)
                      </MenuItem>
                    </>
                  )}
                  <MenuItem
                    onClick={() => {
                      LogOut();
                      handleClose();
                    }}
                  >
                    <LogoutIcon
                      sx={{ fontSize: "18px", marginRight: "10px" }}
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{ display: { md: "none", lg: "none", xs: "block" } }}
                onClick={() => navigate("/login")}
                color="secondary"
                endIcon={<LoginIcon />}
              ></Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
