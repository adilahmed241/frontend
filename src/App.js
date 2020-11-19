import React from 'react';
// import data from './data';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';

import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
// import Product from './components/Product';
import OrderListScreen from './screens/OrderListScreen';


function App() {
   
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  ///////////////////////////////
 
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
           MENALESH
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>       
          
        <main className="main">
          <div className="content">
          
          
            <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
           <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>

<AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>

            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            {/* <Route path="/product/:id" component={ProductScreen}></Route> */}
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            
            <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
            
            <Route path="/" exact={true} 
               component={HomeScreen}></Route>
 

          </div>

        </main>
        <footer className="row center">
          All right reserved 2020 Developed by:-ICONIC-DEVELOPER COMPANY.
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
