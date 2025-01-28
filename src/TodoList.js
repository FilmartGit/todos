import { useLoaderData } from 'react-router-dom';

export default function TodoList(){

  const list = useLoaderData();

  return (
    <section>
      <table className="table is-hoverable is-fullwidth  mt-3">
        <tbody 
        >
          {
            // eslint-disable-next-line array-callback-return
            list.map((item) => {
              return (
                <tr key={item.key} >
                  <td>
                    {item.done && <del>{item.title}</del>}
                    {!item.done && item.title}
                  </td>
                  <td>
                    <button
                      className="button is-success"
                      title="Выполнено"
                      disabled={item.done}
                       
                    >
                      &#9745;
                    </button>
                  </td>
                  <td>
                    <button
                      className="button is-danger"
                      title="Удалить"
                       
                    >
                      &#9746;
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </section>
  );
}
