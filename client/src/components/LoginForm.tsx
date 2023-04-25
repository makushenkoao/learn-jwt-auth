import React, { ChangeEvent, FC, useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = () => {
    store.login(email, password);
  };

  const registration = () => {
    store.registration(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        gap: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={emailHandler}
        style={{ width: "300px", padding: "5px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={passwordHandler}
        style={{ width: "300px", padding: "5px" }}
      />
      <div
        style={{
          display: "flex",
          gap: "50px",
        }}
      >
        <button
          style={{
            padding: "5px 10px",
          }}
          onClick={login}
        >
          Логин
        </button>
        <button
          style={{
            padding: "5px 10px",
          }}
          onClick={registration}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
});
