import { Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./Auth/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JobListPage />} />
      <Route path="/add" element={<AddJobPage />} />
      <Route path="/edit/:id" element={<EditJobPage />} />
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}
