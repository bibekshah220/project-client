import { generateInterviewReport, fetchInterviewReport, getAllInterviews } from "../api/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports, error, setError } = context;

  const generateReport = async ({ resume, jobDescription, selfDescription }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateInterviewReport({ resume, jobDescription, selfDescription });
      setReport(data.interviewReport);
      return data.interviewReport;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchInterviewReport(id);
      setReport(data.interviewReport);
      return data.interviewReport;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllInterviews();
      setReports(data.interviewReports);
      return data.interviewReports;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, report, reports, generateReport, fetchReport, fetchAllReports };
};
