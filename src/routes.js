import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import { actTodo, addTodo, getTodo, getTodos } from './api';
import TodoDetail from './todoDetail';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos} action={actTodo}/>
            <Route path="add" element={<TodoAdd />} action={addTodo}/>
            <Route path=":key" element={<TodoDetail />} loader={getTodo}/>
        </Route>
    )
);

export default router;
