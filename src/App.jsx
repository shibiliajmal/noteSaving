import "./App.css";
import Form from "./form";
import Login from "./login";
import Note from "./note";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/note",
      element: <Note></Note>,
    },
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path:"/add_note",
      element:<Form></Form>
    }
  ]);
  return (
    <>
    
    <RouterProvider router={router} />
    </>
  );
}



export default App;
