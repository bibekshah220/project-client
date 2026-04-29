import axios from "axios";

const api = axios.create({
    baseURL: "/api/interview",
    withCredentials: true,
})

export const generateInterviewReport = async ({ resume, jobDescription, selfDescription }) => {
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

export const getInterviewReportById = async (id) => {
    const res = await api.get(`/${id}`);
    return res.data;
}

export const getAllInterviews = async () => {
    const res = await api.get("/");
    return res.data;
}