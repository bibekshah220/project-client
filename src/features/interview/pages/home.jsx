import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview.js'

const Home = () => {
  const [fileName, setFileName]   = useState(null)
  const [file, setFile]           = useState(null)
  const [fileError, setFileError] = useState(null)
  const [jdCount, setJdCount]     = useState(0)
  const [sdCount, setSdCount]     = useState(0)
  const [jdError, setJdError]     = useState(false)
  const jdRef = useRef(null)
  const sdRef = useRef(null)
  const navigate = useNavigate()
  const { loading, error, generateReport } = useInterview()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Exceeds 5 MB limit — pick a smaller file')
      setFileName(null)
      setFile(null)
      e.target.value = ''
      return
    }

    setFileError(null)
    setFileName(file.name)
    setFile(file)
  }

  const handleGenerate = async () => {
    const jd = jdRef.current?.value.trim()
    if (!jd) {
      setJdError(true)
      jdRef.current?.focus()
      setTimeout(() => setJdError(false), 1800)
      return
    }

    try {
      const result = await generateReport({
        resume: file,
        jobDescription: jd,
        selfDescription: sdRef.current?.value.trim() || '',
      })
      if (result?._id) {
        navigate(`/interview/${result._id}`)
      }
    } catch {
      // error is already set in the hook
    }
  }

  const uploadClass = [
    'upload-zone',
    fileName  ? 'has-file'  : '',
    fileError ? 'has-error' : '',
  ].filter(Boolean).join(' ')

  return (
    <main className="home">
      <div className="interview-input-group">

        {/* ── LEFT ── */}
        <div className="left">
          <span className="left-label">Job Description</span>
          <textarea
            ref={jdRef}
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the full job description — include role, responsibilities, and requirements..."
            className={jdError ? 'field-error' : ''}
            onChange={(e) => setJdCount(e.target.value.length)}
          />
          <span className={`char-counter ${jdCount > 0 ? (jdCount > 1800 ? 'warn' : 'active') : ''}`}>
            {jdCount > 0 ? `${jdCount} chars` : ''}
          </span>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">

          {/* Resume upload */}
          <div className="input-group">
            <label htmlFor="resume">Resume / CV</label>
            <div className={uploadClass}>
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <div className="upload-icon">
                <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 10V4M5.5 6.5L8 4l2.5 2.5" />
                  <rect x="2" y="2" width="12" height="12" rx="3" />
                </svg>
              </div>
              <div className="upload-text">
                <span className="upload-main">
                  {fileError ? 'File too large' : fileName ?? 'Drop PDF or click to browse'}
                </span>
                <span className="upload-hint">
                  {fileError
                    ? fileError
                    : fileName
                      ? `${(fileName.length)} · Ready to analyse`
                      : 'PDF only · Max 5 MB'}
                </span>
              </div>
            </div>
          </div>

          {/* Self description */}
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              ref={sdRef}
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in a few sentences..."
              onChange={(e) => setSdCount(e.target.value.length)}
            />
            <span className={`char-counter ${sdCount > 0 ? (sdCount > 1800 ? 'warn' : 'active') : ''}`}>
              {sdCount > 0 ? `${sdCount} chars` : ''}
            </span>
          </div>

          {/* Button */}
          <button
            className={`generate-btn ${loading ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={loading}
          >
            <span className="btn-text">
              {loading ? 'Analysing' : 'Generate Interview Report'}
            </span>
            {!loading && <span className="btn-arrow">→</span>}
          </button>

          {error && <p className="api-error">{error}</p>}

        </div>
      </div>
    </main>
  )
}

export default Home