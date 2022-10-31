import React from "react";
import "./App.scss";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { fetchTasks } from "./feauters/todo/asyncActions";
import { fetchProjects } from "./feauters/project/asyncActions";
import { useAppDispatch } from "./hook";
import { isReachable } from "./ServerReachable";

function App() {
  const dispatch = useAppDispatch();
  isReachable();
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
