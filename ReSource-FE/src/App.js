import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AddResources from "./Components/AddResources";
import Indexbody from './Components/Indexbody';
import LogIn from "./Components/LogIn";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<><Indexbody/></>}/>
          <Route exact path="/login" element={<><LogIn/></>}/>
          <Route exact path="/addres" element={<AddResources/>}/>
        </Routes>
    </Router>
  );
}

export default App;
