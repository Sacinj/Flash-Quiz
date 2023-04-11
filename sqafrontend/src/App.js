import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './App.css';

//pages
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Quiz from './Components/Quiz';
import FCSet from './Components/FCSet';
import Welcome from './Components/Welcome';

//layouts
import RootLayout from './layouts/RootLayout';
import SignLayout from './layouts/SignLayout';
import HomeLayout from './layouts/HomeLayout';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Welcome />}></Route>
      <Route path="sign" element={<SignLayout />}>
        <Route index element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Route>
      <Route path="homelayout" element={<HomeLayout />}>
        <Route path="quiz" element={<Quiz/>}></Route>
        <Route path="fcset" element={<FCSet/>}></Route>
      </Route>
      
    </Route>
  )
); 

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
    
  );
}

export default App;
