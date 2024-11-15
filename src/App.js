import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import WellbeingForm from './components/WellbeingForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
