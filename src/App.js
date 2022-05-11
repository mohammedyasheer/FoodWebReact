import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore';
import PageNotFound from './pages/PageNotFound';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute';
import HouseListing from './pages/HouseListing';
import PayingGuest from './pages/PayingGuest';
import SingleHouseListing from './pages/SingleHouseListing';
import EditHouseListing from './pages/EditHouseListing';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/sign-up' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/404' element={<PageNotFound />} />
          <Route path='/paying-guest' element={<PayingGuest />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/create-house-listing' element={<PrivateRoute />}>
             <Route path='/create-house-listing' element={<HouseListing />} />
          </Route>
          <Route path='/edit-listing/:listingId' element={<EditHouseListing />}/>
          <Route path='/paying-guest/:listingId' element={<SingleHouseListing />}/>
          <Route path='/contact/:landlordId/' element={<Contact />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default App;
