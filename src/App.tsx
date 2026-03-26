import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="">
          <AppRoutes />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;