import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/Register';
import ExplorePage from './Components/Explore/Explore';
import EventAndFestival from './Components/EventAndFestival';
import ExploreDetail from './Components/Explore/ExploreDetail';
import DisplayProfile from './Components/Profile/displayProfile';
import EditProfile from './Components/Profile/editProfile';
import ViewPosts from './Components/Profile/viewPosts';
import FavoritePosts from './Components/Profile/favoritePosts';
import Posts from './Components/Posts/Posts';
import PostDetail from './Components/Posts/PostDetail';
import SearchResult from './Components/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/Context/AuthContext';
import PrivateRoute from '../src/Routes/PrivateRoute';
import PublicRoute from '../src/Routes/publicRoute';
import NotFoundPage from './Components/ReusableComponent/NotFoundPage'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/festival" element={<EventAndFestival />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/detail/:id" element={<ExploreDetail />} />
          <Route path="/viewPosts" element={<ViewPosts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postDetail" element={<PostDetail />} />
          <Route path="/search" element={<SearchResult />} />

          {/* Public Routes (accessible only when not logged in) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />


          {/* Protected Routes */}
          <Route
            path="/displayProfile"
            element={
              <PrivateRoute>
                <DisplayProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/editProfile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewPosts"
            element={
              <PrivateRoute>
                <ViewPosts />
              </PrivateRoute>
            }
          />
          <Route
            path="/favoritePosts"
            element={
              <PrivateRoute>
                <FavoritePosts />
              </PrivateRoute>
            }
          />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFoundPage />} /> {/* Wildcard route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
