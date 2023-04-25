import React, { FC, useContext, useEffect, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import { UserService } from "./service/UserService";

const App: FC = observer(() => {
  const { store } = useContext(Context);
  const [user, setUser] = useState<IUser[]>([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const logout = () => {
    store.logout();
  };

  const getUser = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (store.isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "Авторизуйтесь"}
      </h1>
      <h3>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Аккаунт НЕ подтвержден по почте'}</h3>
      <button
        style={{ padding: "5px 10px", marginTop: "10px" }}
        onClick={logout}
      >
        Выйти
      </button>
      <div>
        <button
          style={{ padding: "5px 10px", marginTop: "10px" }}
          onClick={getUser}
        >
          Получить пользователей
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {user.map(({ email, id }) => (
          <h3 key={id}>{email}</h3>
        ))}
      </div>
    </div>
  );
});

export default App;
