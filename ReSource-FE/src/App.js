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
import Resourcedetail from "./Components/Resourcedetail";
import Cart from "./Components/Cart";
import InstituteProfile from "./Components/InstituteProfile";
import Addlab from "./Components/Addlab";
import AddWorkforce from "./Components/AddWorkforce";
import InstituteCompletion from "./Components/InstituteCompletion";
import WorkforceRequest from "./Components/WorkforceRequest";
import Paynow from "./Components/Paynow";
import Labrequest from "./Components/Labrequest";
import InstituteRequests from "./Components/InstituteRequests";
import WorkforceProfile from "./Components/WorkforceProfile";
import UniversityProfile from "./Components/UniversityProfile";
import UGCProfile from "./Components/UGCProfile";
import UGCStaffProfile from "./Components/UGCStaffProfile";
import AccountsProfile from "./Components/AccountsProfile";
import Resourceaddreq from "./Components/ResourceApproval";
import Resourcereq from "./Components/ResourceRequest";
import ViewLab from "./Components/ViewLabs";
import LabDetail from "./Components/LabDetails";
import UniversityList from "./Components/UniversityList"
import InstituteList from "./Components/InstituteList"
import ViewProfileInstitute from "./Components/ViewProfileInstitute";
import ViewUniversityProfile from "./Components/ViewUniversityProfile";
import ViewAccountsProfile from "./Components/ViewAccountsProfile";
import ViewLabAssistantProfile from "./Components/ViewLabAssistantProfile";
import UGCStaffform from "./Components/UGCStaffform";
import Error404 from "./Components/Error404";
import Error503 from "./Components/Error503";
// import ReactPDF from "./Components/ReactPDF";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Indexbody/>}/>{/* Pending */}
          <Route exact path="/login" element={<><LogIn/></>}/>
          <Route exact path="/addres" element={<><Header/><AddResources/><Footer/></>}/>
          <Route exact path="/header" element={<Header/>}/>
          <Route exact path="/footer" element={<Footer/>}/>
          <Route exact path="/viewres" element={<><Header/><ViewResources/><Footer/></>}/>
          <Route exact path="/resdetail/:id" element={<><Header/><Resourcedetail/><Footer/></>}/>
          <Route exact path="/cart" element={<><Header/><Cart/><Footer/></>}/>
          <Route exact path="/instituteProfile" element={<><Header/><InstituteProfile/><Footer/></>}/>{/* Pending */}
          <Route exact path="/addlab" element={<><Header/><Addlab/><Footer/></>}/>
          <Route exact path="/addwf" element={<><Header/><AddWorkforce/><Footer/></>}/>{/* Pending */}
          <Route exact path="/wfrequest" element={<><Header/><WorkforceRequest/><Footer/></>}/>{/* Pending */}
          <Route exact path="/pay/:id" element={<Paynow/>}/>
          <Route exact path="/editlab/:lab_id" element={<><Header/><Addlab/><Footer/></>}/>
         {/* Pending */}
          <Route exact path="/labrequest" element={<><Header/><Labrequest/><Footer/></>}/>
          <Route exact path="/intituterequest" element={<><Header/><InstituteRequests/><Footer/></>}/>
          <Route exact path="/univrequest" element={<><Header/><InstituteRequests/><Footer/></>}/>
          <Route exact path="/wfprofile" element={<><Header/><WorkforceProfile/><Footer/></>}/>
          <Route exact path="/universityProfile" element={<><Header/><UniversityProfile/><Footer/></>}/>
          <Route exact path="/ugcProfile" element={<><Header/><UGCProfile/><Footer/></>}/>
          <Route exact path="/ugcStaffProfile/:id" element={<><Header/><UGCStaffProfile/><Footer/></>}/>
          <Route exact path="/accountsProfile/" element={<><Header/><AccountsProfile/><Footer/></>}/>
          <Route exact path="/resource_addrequest" element = {<><Header/><Resourceaddreq/><Footer/></>}/>
          <Route exact path="/resource_request" element={<><Header/><Resourcereq/><Footer/></>}/>
          <Route exact path="/edit_req" element={<><Header/><Resourcereq/><Footer/></>}/>
          <Route exact path="/viewlab" element={<><Header/><ViewLab/><Footer/></>}/>
          <Route exact path="/labdetail/:id" element = {<><Header/><LabDetail/><Footer/></>}/>
          <Route exact path="/universityList" element={<><Header/><UniversityList/><Footer/></>}/>
          <Route exact path="/instituteList" element={<><Header/><InstituteList/><Footer/></>}/>
          <Route exact path="/viewInstituteProfile/:id" element={<><Header/><ViewProfileInstitute/><Footer/></>}/>
          <Route exact path="/viewUniversityProfile/:id" element={<><Header/><ViewUniversityProfile/><Footer/></>}/>
          <Route exact path="/viewAccountsProfile/:id" element={<><Header/><ViewAccountsProfile/><Footer/></>}/>
          <Route exact path="/viewlabassistantprofile/:id" element={<><Header/><ViewLabAssistantProfile/><Footer/></>}/>
          {/* Extra Lab Detail Routes */}
          <Route exact path="/labdetail" element = {<><Header/><LabDetail/><Footer/></>}/>
          <Route exact path="/ugcstaffform" element = {<><Header/><UGCStaffform/><Footer/></>}/>
          <Route exact path="/error404" element = {<Error404/>}/>    
          <Route exact path="/error503" element = {<Error503/>}/>
          {/* <Route exact path="/reactpdf" element = {<ReactPDF/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;
