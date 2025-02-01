import { useState } from 'react';
import { useFetcher } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetcher = useFetcher();

    const handleFormReset = () => {
        setEmail('');
        setPassword('');
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetcher.submit({ email, password}, { method: 'post', action: '/login'})
    }

    return (
        <section>
            <h1>Вход</h1>
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
                        <input type="submit" value="Войти" className='button is-primary' />
                    </div>
                </div>
            </form>
        </section>
    )
}