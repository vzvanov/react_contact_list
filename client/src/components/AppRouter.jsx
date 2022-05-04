import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "..";
import ContactPage from "../pages/ContactPage";
import MainPage from "../pages/MainPage";

const authRoute = [
  <Route key={"contacts/:id"} path="contacts/:id" element={<ContactPage />} />
];

const publicRoute = [
  <Route key={"/"} path="/" element={<MainPage />} />
];

const AppRouter = () => {
  const { user } = useContext(Context);

  let allRoute = publicRoute;
  if (user.isAuth) {
    allRoute = allRoute.concat(authRoute);
  }

  return (
    <Routes>
      {allRoute}
      <Route path="*" element={<MainPage />} replace />
    </Routes>
  );
};

export default observer(AppRouter);