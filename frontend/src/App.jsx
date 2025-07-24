import { Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import ThemeToggleButton from "./components/ThemeToggleButton";

export default function App() {
  return (
    <>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/add" element={<AddJobPage />} />
        <Route path="/edit/:id" element={<EditJobPage />} />
      </Routes>
    </>
  );
}
