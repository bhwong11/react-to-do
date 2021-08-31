import React from 'react';

import Header from './components/Header';
import Routes from './config/routes';

function App() {
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <Header/>
      <Routes/>
    </div>
  );
}

export default App;
