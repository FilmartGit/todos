import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import firebase from './firebase.js';
import { redirect } from 'react-router-dom';
import todos from './todos';

export function getTodos(){
    return todos;
}

const auth = getAuth(firebase);

export async function login({request}){
    const fd = await request.formData();
    try {
        const oUC = await signInWithEmailAndPassword(auth, fd.get('email'), fd.get('password'));
        return redirect('/');
    } catch (e){
        return e.code;
    }
}

export async function logOut(){
    await signOut(auth);
    return redirect('/login');
}

export async function register({request}) {
    const fd = await request.formData();
    try {
        const oUC = await createUserWithEmailAndPassword(auth, fd.get('email'), fd.get('password'));
        return redirect('/');
    } catch (e) {
        return e.code;
    }
}

export function setStateChangeHandler(func){
    return onAuthStateChanged(auth, func);
}

export async function addTodo({request}){
    const fd = await request.formData();
    const date = new Date();
    const newTodo = {
        title: fd.get('title'),
        desc: fd.get('desc'),
        image: fd.get('image'),
        done: false,
        createAt: date.toLocaleString(),
        key: date.getTime()
    };
    todos.push(newTodo);
    return redirect('/');
}

export function getTodo({params}){
    const key = +params.key;
    const todo = todos.find(current => current.key === key);
    if(!todo){
        throw new Error();
    }
    return todo;
}

export function actTodo({params, request}){
    const key = +params.key;
    const todo = todos.findIndex(current => current.key === key);
    if (request.method === 'PATCH'){
        todos[todo].done = true;
    } else {
        todos.splice(todo, 1);
    }
    return redirect('/');
}

