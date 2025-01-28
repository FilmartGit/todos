import { Link } from 'react-router-dom';

export default function Error404(){
    return (
        <section>
            <h1>Дело не обнаружено.</h1>
            <p>
                Вернитесь на <Link to="/">перечень дел</Link> и выберите какое-либо другое дело.
            </p>
        </section>
    )
}