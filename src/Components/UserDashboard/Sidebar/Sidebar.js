import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  const pathname = "/user";
  return (
    <Box
      className="shadow-sm"
      sx={{ width: "100%", backgroundColor: "#fff", mt: 1 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/profile")}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/orders")}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="My orders" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/change-password")}>
            <ListItemButton>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
