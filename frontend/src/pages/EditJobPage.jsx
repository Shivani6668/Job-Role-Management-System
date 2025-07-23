import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateJob } from "../redux/jobSlice";
import { toast } from "react-hot-toast";

export default function EditJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobroles`)
      .then((res) => {
        const found = res.data.find(j => j._id === id);
        if (found) setJob(found);
        else toast.error("Job not found");
      })
      .catch(() => toast.error("Error fetching job"));
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await dispatch(updateJob({ id, job: formData })).unwrap();
      toast.success("Job role updated successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to update job role");
    }
  };

  return job ? <JobForm onSubmit={handleUpdate} initialValues={job} isEditing /> : null;
}
