import axios from "axios";

const api = axios.create({
  baseURL: "/api/interview",
  withCredentials: true,
});

/**
 * POST /api/interview
 * Sends resume (PDF), job description, and self description to generate an interview report.
 * Expects multipart/form-data.
 */
export async function generateInterviewReport({ resume, jobDescription, selfDescription }) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  if (selfDescription) {
    formData.append("selfDescription", selfDescription);
  }
  if (resume) {
    formData.append("resume", resume);
  }

  const res = await api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
