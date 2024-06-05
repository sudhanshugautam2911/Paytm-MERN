import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
import Protected from "./auth/Protected";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={
            <Protected>
              <Dashboard />
            </Protected>} />
          <Route path="/send" element={
            <Protected>
              <SendMoney />
            </Protected>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
