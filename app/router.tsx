import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ShowCreators from "./pages/ShowCreators"
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <ShowCreators /> },
            { path: "creators/:id", element: <ViewCreator /> },
            { path: "creators/new", element: <AddCreator /> },
            { path: "creators/:id/edit", element: <EditCreator /> }

        ],
    },
]);
