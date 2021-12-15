import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { DashboardCustomize } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  const pathname = "/admin";
  return (
    <Box
      className="shadow-sm"
      sx={{ width: "100%", backgroundColor: "#fff", mt: 1 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding onClick={() => navigate(pathname)}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardCustomize />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/add-product")}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Add product" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/all-products")}
          >
            <ListItemButton>
              <ListItemIcon>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText primary="All products" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/add-category")}
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Add category" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/add-subcategory")}
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Add subcategory" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/all-category")}
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="All category" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/add-discount")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Add discount" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/all-discounts")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="All discounts" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/all-orders")}
          >
            <ListItemButton>
              <ListItemIcon>
                <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText primary="All orders" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => navigate(pathname + "/change-password")}
          >
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
