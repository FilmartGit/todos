import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import { actTodo, addTodo, getTodo, getTodos, login, logOut, register } from './api';
import TodoDetail from './todoDetail';
import Error404 from './Error404';
import Register from './Register';
import Login from './Login';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} element={<TodoList />} loader={getTodos} />
            <Route path="add" element={<TodoAdd />} action={addTodo}/>
            <Route path=":key" element={<TodoDetail />} loader={getTodo} action={actTodo} errorElement={<Error404 />}/>
            <Route path="register" element={<Register />} action={register}/>
            <Route path='login' element={<Login />} action={login}/>
            <Route path='logout' loader={logOut}/>
        </Route>
    )
);

export default router;