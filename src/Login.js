import { useState } from "react";
import { useFetcher } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const resetErrorMessage = () => {
    setErrorEmail("");
    setErrorPassword("");
  };

  const validate = () => {
    resetErrorMessage();
    if (!email) {
      setErrorEmail("Поле обязательно для заполнения");
    } else if (!password) {
      setErrorPassword("Поле обязательно для заполнения");
    } else return true;
  };

  const handleFormReset = () => {
    setEmail("");
    setPassword("");
    resetErrorMessage();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetcher.submit({ email, password }, { method: "post", action: "/login" });
    }
  };

  if (fetcher.data){
    resetErrorMessage();
    console.log(fetcher.data);
    if (fetcher.data === 'auth/invalid-credential') setErrorEmail('Неправильное имя пользователя или пароль');
    if (fetcher.data === 'wrong-password') setErrorPassword('Неправильное имя пользователя или пароль');
    fetcher.data = undefined;
  }

  return (
    <section>
      <h1>Вход</h1>
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
            {errorPassword && <p className="help is-danger">{errorPassword}</p>}
          </div>
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
            <input type="submit" value="Войти" className="button is-primary" />
          </div>
        </div>
      </form>
    </section>
  );
}
