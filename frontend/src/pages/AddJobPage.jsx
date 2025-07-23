import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { addJob } from "../redux/jobSlice";
import { toast } from "react-hot-toast";

export default function AddJobPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await dispatch(addJob(formData)).unwrap();
      toast.success("Job role created successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create job role");
    }
  };

  return <JobForm onSubmit={handleCreate} />;
}
