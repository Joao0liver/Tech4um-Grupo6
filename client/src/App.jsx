import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

function App() {
  // Estado global de usuários
  const [users, setUsers] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home users={users} />} />
      <Route path="/Cadastro" element={<Cadastro users={users} setUsers={setUsers} />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
