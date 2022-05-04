import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import LoginPage from '../pages/LoginPage';
import ContactsPage from "./ContactsPage";

const Main = () => {
  const { user } = useContext(Context);

  return (
    <div>
      {user.isAuth ?
        <ContactsPage />
        : <LoginPage />}
    </div>
  );
};

export default observer(Main);