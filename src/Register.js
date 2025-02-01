import { useState } from 'react';
import { useFetcher } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetcher = useFetcher();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetcher.submit({ email, password }, { method: 'post', action: '/register' });
    };

    const handleFormReset = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <section>
            <h1>Регистрация</h1>
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className='field'>
                    <label className='label'>
                        Адрес электронной почты
                    </label>
                    <div className='control'>
                        <input type="email" name='email' value={email} className='input' onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>
                        Пароль
                    </label>
                    <input type="password" name="password" value={password} className='input' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='field is-grouped is-grouped-right'>
                    <div className='control'>
                        <input type="reset" value="Сбросить" className='button is-warning is-light' />
                    </div>
                    <div className='control'>
                        <input type="submit" value="Зарегистрироваться" className='button is-primary' />
                    </div>
                </div>
            </form>
        </section>
    )
}