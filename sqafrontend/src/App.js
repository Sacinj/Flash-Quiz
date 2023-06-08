import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './App.css';

//pages
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Quiz from './Components/Quiz';
import FCSet from './Components/FCSet';
import Welcome from './Components/Welcome';
import Greeting from './Components/Greeting';
import AboutUs from './Components/AboutUs';
import EditFCSet from './Components/EditFCSet';

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
        <Route path="quiz" element={<Greeting/>}></Route>
        <Route path="quiz/:children" element={<Quiz/>}></Route>
        <Route path="fcset" element={<FCSet/>}></Route>
        <Route path="aboutus" element={<AboutUs/>}></Route>
        <Route path="editFC/:children" element={<EditFCSet/>}></Route>
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
