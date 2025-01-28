import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import { addTodo, getTodos } from './api';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos}/>
            <Route path="add" element={<TodoAdd />} action={addTodo}/>
        </Route>
    )
);

export default router;
