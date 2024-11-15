import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
