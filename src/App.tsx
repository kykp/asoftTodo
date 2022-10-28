import React from "react";
import "./App.scss";
import {useEffect} from "react"; 
import { Header } from "./components/Header/Header"; 
import {Main} from "./components/Main/Main"
import {fetchProjects, fetchTasks} from "./feauters/todo/todoSlice";
import { useAppDispatch } from "./hook";


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  },[dispatch]);

  return (
    <> 
      <Header />
      <Main/>
    </>
  );
}

export default App;
