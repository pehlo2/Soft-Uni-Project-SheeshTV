import './App.css';
import Navigation from './components/header/navigation/Navigation';
import Footer from './components/footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login-form/Login';
import Register from './components/register-form/Register';
import NotFound from './components/not-found/Not-Found';
import { useEffect, useState } from 'react';
import Profile from './components/profile/Profile-page';
import UploadVideo from './components/uploadVideo/Upload';
import VideoDashboard from './components/videos-dashboard/Videos-dashboard';
import { AuthProvider } from './context/authContext';
import { VideoProvider } from './context/videoContext';
import Logout from './components/logout/Logout';
import VideoDetailsLink from './components/video-details-link/Video-details-link';
import DiscoverCreators from './components/discover-creators/Discover-creators';
import AuthGuard from './components/guards/Auth-guard';
import AlreadyAuthenticatedGuard from './components/guards/AlreadyAuthenticatedGuard';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorProvider } from './context/errorContext';

function App() {
  const [theme, setTheme] = useState('dark');
 
  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <ErrorBoundary>
      < ErrorProvider>
        <AuthProvider>
          <VideoProvider>
            <div className='app' data-theme={theme}>
              <Navigation toggleTheme={toggleTheme} />
              <main className='main-app'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='*' element={<NotFound />} />
                  <Route path='/404' element={<NotFound />} />
                  <Route path='/dashboard' element={<VideoDashboard />} />
                  <Route path='/videos/:videoId' element={<VideoDetailsLink />} />
                  <Route path='/users/:profileId' element={<Profile />}>
                    <Route path='upload' element={<UploadVideo />} />
                  </Route>
                  <Route element={<AlreadyAuthenticatedGuard />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                  </Route>
                  <Route element={<AuthGuard />}>
                    <Route path='/discover' element={<DiscoverCreators />} />
                    <Route path='/logout' element={<Logout />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </VideoProvider>
        </AuthProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default App;
