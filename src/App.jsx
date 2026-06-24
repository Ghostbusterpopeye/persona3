import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

const menuVideo = '/Mainn.mp4'
const main2     = '/main2.mp4'

// Redirect component — langsung buka URL eksternal lalu kembali ke /
function ExternalRedirect({ to }) {
  useEffect(() => {
    window.open(to, "_blank", "noopener,noreferrer");
  }, []);
  return <Navigate to="/" replace />;
}

// import useEffect
import { useEffect } from 'react';

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => {
        if (page === "github") {
          window.open("https://github.com/Ghostbusterpopeye", "_blank", "noopener,noreferrer");
        } else if (page === "sideproj" || page === "contact") {
          window.open("mailto:sultanshalahuddin01@gmail.com", "_blank");
        } else {
          navigate(`/${page}`);
        }
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        {/* Catch-all: redirect route yang tidak dikenal ke home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}