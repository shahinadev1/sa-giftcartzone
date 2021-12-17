import Home from "./Components/Pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Pages/Register/Register";
import PageNotFound from "./Components/Pages/NotFound/PageNotFound";
import Navbar from "./Components/shared/NavBar/Navbar";
import Login from "./Components/Pages/Login/Login";
import PasswordReset from "./Components/Pages/PasswordReset/PasswordReset";
import Admin from "./Admin/Admin";
import PrivateRoute from "./Auth/PrivateRoute";
import MobileMenu from "./Components/Pages/Home/BottomNavigation/BottomNavigation";
import Profile from "./Components/UserDashboard/Profile/Profile";
import Orders from "./Components/UserDashboard/Orders/Orders";
import ChangePassword from "./Components/UserDashboard/ChangePassword/ChangePassword";
import Product from "./Components/Pages/Product/Product";
import useAuth from "./Hooks/useAuth";
import SearchPage from "./Components/Pages/SearchPage/SearchPage";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import Cart from "./Components/Cart/Cart";
import AdminRoute from "./Auth/AdminRoute";
import {
  AddCategory,
  AddDiscount,
  AddProduct,
  AllCategory,
  AllOrders,
  Dashboard,
  SubCategory,
  ChangePasswordAdmin,
  AllProduct,
  OrderView,
} from "./Admin";
import AllDiscounts from "./Admin/AllDiscounts/AllDiscounts";
import Checkout from "./Components/Pages/Checkout/Checkout";
import Thanks from "./Components/Pages/Checkout/Thanks/Thanks";
import Order from "./Components/UserDashboard/Orders/Manage/Order/Order";
function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Home />} />
        <Route
          path="/checkout"
          element={user.email ? <Checkout /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/thanks"
          element={
            <PrivateRoute>
              <Thanks />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={user.email ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user.email ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders/:id" element={<OrderView />} />
          <Route path="" element={<Dashboard />} />
          <Route path="all-products" element={<AllProduct />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="all-category" element={<AllCategory />} />
          <Route path="add-subcategory" element={<SubCategory />} />
          <Route path="add-discount" element={<AddDiscount />} />
          <Route path="all-discounts" element={<AllDiscounts />} />
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="change-password" element={<ChangePasswordAdmin />} />
        </Route>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="orders/manage" element={<Order />} />
        </Route>
        <Route path="/search/:term" element={<SearchPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/product" element={<Product />}>
          <Route path=":slug" element={<Product />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Cart />
      <MobileMenu />
    </>
  );
}

export default App;
