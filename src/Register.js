import { useState } from "react";
import { useFetcher } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  const resetErrorMessage = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
  };

  const handleFormReset = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    resetErrorMessage();
  };

  const validate = () => {
    resetErrorMessage();
    if (!email) {
      setErrorEmail("Поле обязательно для заполнения");
    } else if (!password) {
      setErrorPassword("Поле обязательно для заполнения");
    } else if (!passwordConfirm) {
      setErrorPasswordConfirm("Поле обязательно для заполнения");
    } else if (password !== passwordConfirm) {
      setErrorPasswordConfirm("Пароли не совпадают");
    } else return true;
  };

  if (fetcher.data) {
    resetErrorMessage();
    if (fetcher.data === "auth/email-already-in-use") {
      setErrorEmail(
        "Пользователь с таким адресом электронной почты уже зарегистрирован"
      );
    } else if (fetcher.data === "auth/weak-password") {
      setErrorPassword("Пароль должен быть не менее 6 символов");
    }
    fetcher.data = undefined;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetcher.submit(
        { email, password },
        { method: "post", action: "/register" }
      );
    }
  };

  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <div className="field">
          <label className="label">Адрес электронной почты</label>
          <div className="control">
            <input
              type="email"
              name="email"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorEmail && <p className="help is-danger">{errorEmail}</p>}
        </div>
        <div className="field">
          <label className="label">Пароль</label>
          <div className="control">
            <input
              type="password"
              name="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorPassword && <p className="help is-danger">{errorPassword}</p>}
        </div>
        <div className="field">
          <label className="label">Повтор пароля</label>
          <div className="control">
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              className="input"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          {errorPasswordConfirm && (
            <p className="help is-danger">{errorPasswordConfirm}</p>
          )}
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <input
              type="reset"
              value="Сбросить"
              className="button is-warning is-light"
            />
          </div>
          <div className="control">
            <input
              type="submit"
              value="Зарегистрироваться"
              className="button is-primary"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
