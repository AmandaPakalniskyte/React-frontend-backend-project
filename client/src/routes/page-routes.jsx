import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';
import HomePage from '../pages/home-page';
import GalleryPage from '../pages/gallery-page';
import ConceptPage from '../pages/concept-page';
import InfoPage from '../pages/info-page';
import OrderPage from '../pages/order-page';
import FavouritesPage from '../pages/favourites-page/favourites-page';
import GuestRegisterPage from '../pages/guest-register-page';
import LoginPage from '../pages/login-page';
import RegisterPage from '../pages/register-page';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../pages/profile-page';
import UserProfilePage from '../pages/user-profile-page';
import RequireVisitor from './require-visitor';
import RequireAuth from './require-auth';

const PageRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/concept" element={<ConceptPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/contact" element={<GuestRegisterPage />} />
      <Route path="/info/:id" element={<InfoPage />} />
      <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="/user-profile" element={<RequireAuth><UserProfilePage /></RequireAuth>} />

      <Route path="auth/" element={<RequireVisitor><MainLayout /></RequireVisitor>}>
        <Route path="register" element={<RequireVisitor><RegisterPage /></RequireVisitor>} />
        <Route path="login" element={<RequireVisitor><LoginPage /></RequireVisitor>} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default PageRoutes;
