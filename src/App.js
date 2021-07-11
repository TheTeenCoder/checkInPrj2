import './App.css';

import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import  QR  from './components/QR';


function App() {
  return (
    <div className="App font-mono">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/qr/:qr_id" component={Verify}/>
          <Route exact path="/userqr/:student_id" component={QR}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;