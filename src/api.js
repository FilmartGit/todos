import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getDatabase, ref, push, set, query, get, remove } from 'firebase/database';
import firebase from './firebase.js';
import { redirect } from 'react-router-dom';

const auth = getAuth(firebase);
const database = getDatabase(firebase);

function getUserID(){
    if (auth.currentUser){
        return auth.currentUser?.uid;
    } else {
        return window.localStorage.getItem('user-id');
    }
}

export async function getTodos(){
    const currentUserId = getUserID();
    if (!currentUserId){
        return redirect('/login');
    }
    const r = ref(database, `users/${currentUserId}/todos`);
    const q = query(r);
    const s = await get(q);
    const res = [];
    s.forEach((doc) => {
        const __todo = doc.val();
        __todo.key = doc.key;
        res.push(__todo);
    });
    return res;
}

export async function login({request}){
    const fd = await request.formData();
    try {
        const cr = await signInWithEmailAndPassword(auth, fd.get('email'), fd.get('password'));
        window.localStorage.setItem('user-id', cr.user.uid);
        return redirect('/');
    } catch (e){
        return e.code;
    }
}

export async function logOut(){
    await signOut(auth);
    window.localStorage.removeItem('user-id');
    return redirect('/login');
}

export async function register({request}) {
    const fd = await request.formData();
    try {
        const cr = await createUserWithEmailAndPassword(auth, 
            fd.get('email'), fd.get('password'));
            window.localStorage.setItem('user-id', cr.user.uid);
            return redirect('/');
        } catch (e) {
        return e.code;
    }
}

export function setStateChangeHandler(func){
    return onAuthStateChanged(auth, func);
}

export async function addTodo({request}){
    const currentUserId = getUserID();
    if (!currentUserId){
        return redirect('/login');
    }
    const db = ref(database, `users/${currentUserId}/todos`);
    const fd = await request.formData();    
    const date = new Date();
    const newTodo = {
        title: fd.get('title'),
        desc: fd.get('desc'),
        image: fd.get('image'),
        done: false,
        createAt: date.toLocaleString(),
    };
   
    const r = await push(db);
    await set(r, newTodo);
    return redirect('/');
}

export async function getTodo({params}){
    const currentUserId = getUserID();
    if (!currentUserId){
        return redirect('/login');
    }
    const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
    const q = query(r);
    const s = await get(q);
    if (!s.exists()){
        throw new Error();
    };
    return s.val();
}

export function actTodo({params, request}){
    const currentUserId = getUserID();
    if (!currentUserId){
        return redirect('/login');
    }
    if (request.method === 'PATCH'){
        const r = ref(database, `users/${currentUserId}/todos/${params.key}/done`);
        set(r, true);
    } else {
        const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
        remove(r);
    }
    return redirect('/');
}

export function onlyLoggedOut(){
    if (getUserID()){
        return redirect('/');
    } else {
        return null;
    }
}