import { useLoaderData, Link, useSubmit } from "react-router-dom";

export default function TodoList() {
  const list = useLoaderData();
  const submit = useSubmit();

  const handleDoneClick = (key) => {
    submit(null, { action: `/${key}`, method: "patch" });
  };

  const handleDeleteClick = (key) => {
    submit(null, { action: `/${key}`, method: "delete" });
  };

  return (
    <section>
      <table className="table is-hoverable is-fullwidth  mt-3">
        <tbody>
          {
            // eslint-disable-next-line array-callback-return
            list.map((item) => {
              return (
                <tr key={item.key}>
                  <td>
                    <Link to={`/${item.key}`}>
                      {item.done && <del>{item.title}</del>}
                      {!item.done && item.title}
                    </Link>
                  </td>
                  <td>
                    <button
                      className="button is-success"
                      title="Выполнено"
                      disabled={item.done}
                      onClick={() => {handleDoneClick(item.key)}}
                    >
                      &#9745;
                    </button>
                  </td>
                  <td>
                    <button
                      className="button is-danger"
                      title="Удалить"
                      onClick={() => {handleDeleteClick(item.key)}}
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
