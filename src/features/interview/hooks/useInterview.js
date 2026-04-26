import { useState } from "react";
import { generateInterviewReport } from "../api/interview.api.js";

export const useInterview = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const generate = async ({ resume, jobDescription, selfDescription }) => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const data = await generateInterviewReport({
        resume,
        jobDescription,
        selfDescription,
      });
      setReport(data.interviewReport);
      return data.interviewReport;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, report, error, generate };
};
