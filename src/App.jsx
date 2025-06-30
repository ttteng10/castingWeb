import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import WebtoonAdd from "./pages/WebtoonAdd/WebtoonAdd";
import RootLayout from "./pages/Root";
import { loader as webtoonsLoader } from "./components/Webtoons/Webtoons";
import { loader as charactersLoader } from "./pages/Detail/Detail";
import { loader as voteLoader } from "./pages/Vote/Vote";
import { loader as resultLoader } from "./pages/Result/Result";
import Detail from "./pages/Detail/Detail";
import Vote from "./pages/Vote/Vote";
import Result from "./pages/Result/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: webtoonsLoader },
      { path: "webtoonAdd", element: <WebtoonAdd /> },
      {
        path: "webtoonDetail/:id",
        element: <Detail />,
        loader: charactersLoader,
      },
      {
        path: "webtoonVote/:webtoonId/:characterId",
        element: <Vote />,
        loader: voteLoader,
      },
      {
        path: "webtoonResult/:webtoonId/:characterId",
        element: <Result />,
        loader: resultLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
