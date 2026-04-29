import { generateInterviewReport, fetchInterviewReport, getAllInterviews } from "../api/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } = context;

 const generateReport = async ({ resume, jobDescription, selfDescription }) => {
    setLoading(true);
    try {
      const data = await generateInterviewReport({ resume, jobDescription, selfDescription });
      setReport(data.interviewReport);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async (id) => {
    setLoading(true);
    try {
      const data = await fetchInterviewReport(id);
      setReport(data.interviewReport);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const data = await getAllInterviews();
      setReports(data.interviewReports);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, report, reports, generateReport, fetchReport, fetchAllReports };
};
