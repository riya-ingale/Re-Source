import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AddResources from "./Components/AddResources";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Indexbody from './Components/Indexbody';
import LogIn from "./Components/LogIn";
import ViewResources from "./Components/ViewResources";
import Profile from "./Components/Profile";
import Resourcedetail from "./Components/Resourcedetail";
import Cart from "./Components/Cart";
import InstituteProfile from "./Components/InstituteProfile";
import Addlab from "./Components/Addlab";
import AddWorkforce from "./Components/AddWorkforce";
import InstituteCompletion from "./Components/InstituteCompletion";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<><Indexbody/></>}/>
          <Route exact path="/login" element={<><LogIn/></>}/>
          <Route exact path="/addres" element={<AddResources/>}/>
          <Route exact path="/header" element={<Header/>}/>
          <Route exact path="/footer" element={<Footer/>}/>
          <Route exact path="/viewres" element={<><Header/><ViewResources/><Footer/></>}/>
          <Route exact path="/profile" element={<><Header/><Profile/><Footer/></>}/>
          <Route exact path="/resdetail" element={<><Header/><Resourcedetail/><Footer/></>}/>
          <Route exact path="/cart" element={<><Header/><Cart/><Footer/></>}/>
          <Route exact path="/instituteProfile" element={<InstituteProfile/>}/>
          <Route exact path="/addlab" element={<><Header/><Addlab/><Footer/></>}/>
          <Route exact path="/addwf" element={<><Header/><AddWorkforce/><Footer/></>}/>
          <Route exact path="/instidetails" element={<><Header/><InstituteCompletion/><Footer/></>}/>
        </Routes>
    </Router>
  );
}

export default App;
