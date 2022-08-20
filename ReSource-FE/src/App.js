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
import WorkforceRequest from "./Components/WorkforceRequest";
import Paynow from "./Components/Paynow";
import Labrequest from "./Components/Labrequest";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<><Indexbody/></>}/>{/* Pending */}
          <Route exact path="/login" element={<><LogIn/></>}/>
          <Route exact path="/addres" element={<AddResources/>}/>
          <Route exact path="/header" element={<Header/>}/>
          <Route exact path="/footer" element={<Footer/>}/>
          <Route exact path="/viewres" element={<><Header/><ViewResources/><Footer/></>}/>
          <Route exact path="/profile" element={<><Header/><Profile/><Footer/></>}/>{/* Pending */}
          <Route exact path="/resdetail/:id" element={<><Header/><Resourcedetail/><Footer/></>}/>
          <Route exact path="/cart" element={<><Header/><Cart/><Footer/></>}/>
          <Route exact path="/instituteProfile" element={<InstituteProfile/>}/>{/* Pending */}
          <Route exact path="/addlab" element={<><Header/><Addlab/><Footer/></>}/>
          <Route exact path="/addwf" element={<><Header/><AddWorkforce/><Footer/></>}/>{/* Pending */}
          <Route exact path="/wfrequest" element={<><Header/><WorkforceRequest/><Footer/></>}/>{/* Pending */}
          <Route exact path="/pay/:id" element={<Paynow/>}/>
          <Route exact path="/editlab/:lab_id" element={<><Header/><Addlab/><Footer/></>}/>
          <Route exact path="/labreq" element={<><Header/><Labrequest/><Footer/></>}/>{/* Pending */}
        </Routes>
    </Router>
  );
}

export default App;
