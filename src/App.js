import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from './pages/rootPage';
import { StoreInfo } from './pages/itemPage';

function App() {
  return (
    <div className="App">
      <a
        href="http://webservice.recruit.co.jp/">
        <img
          src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
          alt="ホットペッパー Webサービス"
          width="135" height="17" border="0" title="ホットペッパー Webサービス"
        />
      </a>
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<HomePage />}/>
            <Route exact path='/storeinfo/:storeid' element={<StoreInfo />}/>
          </Routes>
        </Router>
      </header>
      <footer>v03062246test</footer>
    </div>
  );
}

export default App;
