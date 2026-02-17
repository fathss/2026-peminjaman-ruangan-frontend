import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <div className="">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
