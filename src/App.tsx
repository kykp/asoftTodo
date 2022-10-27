import "./App.scss";
import {useEffect} from "react"; 
import { Header } from "./components/Header/Header"; 
import { LeftMenu } from "./components/LeftMenu/LeftMenu";
import { WorkZone } from "./components/WorkZone/WorkZone"; 
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
      <main>
        <LeftMenu/>
        <WorkZone/>
      </main> 
    </>
  );
}

export default App;
