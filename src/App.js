import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Layoutuser from "./pages/Layoutuser";
import Layoutadmin from "./pages/admin/LayoutAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import GetToken from "./pages/GetToken";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/get-token" element={<GetToken />} />
          <Route path="/admin/*" element={<Layoutadmin />} />
          <Route path="/*" element={<Layoutuser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
