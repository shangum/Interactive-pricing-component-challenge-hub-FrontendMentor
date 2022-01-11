import './App.scss';
import Header from './components/Header';
import PricingComponent from './components/PricingComponent';

function App() {
  return (        
    <div className="body-content">
        <main className="App">
        <Header/>
        <PricingComponent />        
        <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.frontendmentor.io/profile/shangum">Rashid Wilson</a>.
      </div>
      </main>
      
    </div>
    
  );
}

export default App;
