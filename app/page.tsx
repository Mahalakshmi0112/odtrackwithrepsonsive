"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
  Filter,
  Download,
  Eye,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Camera,
  UserIcon,
  Lock,
  Mail,
  LogOut,
} from "lucide-react"

// Types
interface ODRequest {
  id: string
  studentName: string
  registerNumber: string
  department: string
  year: string
  section: string
  mentor: string
  purpose: string
  subcategory: string
  fromDate: string
  toDate: string
  session: string
  venue?: string
  description?: string
  status: "pending" | "approved" | "rejected" | "forwarded_to_hod"
  submittedAt: string
  groupMembers?: string[]
  attachments?: string[]
}

interface ProfileData {
  name: string
  email: string
  photo?: string
}

const sampleRequests: ODRequest[] = [
  {
    id: "1",
    studentName: "Arjun Krishnan",
    registerNumber: "310624104001",
    department: "Computer Science Engineering",
    year: "2nd Year",
    section: "A",
    mentor: "Dr. Priya Sharma",
    purpose: "Co-curricular",
    subcategory: "NSS",
    fromDate: "2024-01-15",
    toDate: "2024-01-15",
    session: "Half Day",
    venue: "SRM EEC Campus",
    description: "NSS community service activity - Blood donation camp organization",
    status: "pending",
    submittedAt: "2024-01-10T10:30:00Z",
    groupMembers: ["Priya Nair", "Karthik Raj"],
    attachments: ["nss_activity_proposal.pdf", "permission_letter.pdf"],
  },
  {
    id: "2",
    studentName: "Meera Patel",
    registerNumber: "310624104002",
    department: "Computer Science Engineering",
    year: "3rd Year",
    section: "B",
    mentor: "Prof. Suresh Kumar",
    purpose: "Extra-curricular",
    subcategory: "Rotaract Club",
    fromDate: "2024-01-20",
    toDate: "2024-01-21",
    session: "Full Day",
    venue: "Chennai Trade Centre",
    description: "Inter-college Rotaract conference and workshop",
    status: "approved",
    submittedAt: "2024-01-12T14:20:00Z",
    attachments: ["conference_invitation.pdf"],
  },
  {
    id: "3",
    studentName: "Rahul Sharma",
    registerNumber: "310624104003",
    department: "Computer Science Engineering",
    year: "4th Year",
    section: "A",
    mentor: "Dr. Anitha Raj",
    purpose: "Other",
    subcategory: "Internship",
    fromDate: "2024-01-25",
    toDate: "2024-01-26",
    session: "Full Day",
    venue: "Infosys, Chennai",
    description: "Technical interview and internship orientation program",
    status: "rejected",
    submittedAt: "2024-01-15T09:15:00Z",
    attachments: ["internship_offer_letter.pdf", "company_details.pdf"],
  },
  {
    id: "4",
    studentName: "Sneha Reddy",
    registerNumber: "310624104004",
    department: "Computer Science Engineering",
    year: "2nd Year",
    section: "C",
    mentor: "Prof. Vikram Singh",
    purpose: "Co-curricular",
    subcategory: "Youth Red Cross",
    fromDate: "2024-01-30",
    toDate: "2024-01-30",
    session: "Half Day",
    venue: "Government Hospital, Chennai",
    description: "Health awareness campaign and first aid training",
    status: "pending",
    submittedAt: "2024-01-18T11:45:00Z",
    groupMembers: ["Arun Kumar", "Divya Menon", "Ravi Prakash"],
    attachments: ["health_campaign_plan.pdf"],
  },
]

// NEW: Define the types for the modal's props
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

// MODIFIED: Apply the types to the function's parameters
function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="details-modal-overlay">
      {" "}
      {/* Reusing existing overlay style */}
      <div className="details-modal" style={{ maxWidth: "400px" }} onClick={(e) => e.stopPropagation()}>
        <div className="details-modal-header">
          <h2>{title}</h2>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="details-modal-content">
          <p style={{ marginBottom: "20px" }}>{message}</p>
          <div className="form-actions" style={{ justifyContent: "flex-end" }}>
            <button className="cancel-profile-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="save-profile-btn" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string>("")

  // Login component
  const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      // Simulate authentication delay
      setTimeout(() => {
        if (email.endsWith("@hod.com") && password === "hod123") {
          setIsAuthenticated(true)
          setUserRole("hod")
        } else if (email.endsWith("@staff.com") && password === "staff123") {
          setIsAuthenticated(true)
          setUserRole("staff")
        } else if (email.includes("@") && password) {
          setError("Invalid credentials. Please try again.")
        } else {
          setError("Please enter valid credentials.")
        }
        setIsLoading(false)
      }, 1000)
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/srm-eec-logo.webp" alt="SRM EEC Logo" className="login-logo" />
            <h1>SRM EEC</h1>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <div className="credentials-info">
              <p>
                <strong>Example Credentials:</strong>
              </p>
              <p>HOD - Email: example@hod.com, Password: hod123</p>
              <p>Staff - Email: example@staff.com, Password: staff123</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  if (userRole === "staff") {
    return <StaffDashboard />
  }

  return <HODDashboard />
}

function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "reports">("home")
  const [requests, setRequests] = useState<ODRequest[]>(sampleRequests)
  const [showFilters, setShowFilters] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<ODRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Prof. Anitha Sharma",
    email: "anitha.sharma@srmeec.edu.in",
    photo: undefined,
  })
  // NEW: State for the confirmation modal
  const [modalState, setModalState] = useState<{
  isOpen: boolean;
  action: "approve" | "reject" | null; // This line is changed
  requestId: string | null;
}>({
  isOpen: false,
  action: null,
  requestId: null,
});

  // Filter states
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    purpose: "all",
    subcategory: "all",
    year: "all",
    section: "all",
    dateFrom: "",
    dateTo: "",
    search: "",
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter requests based on current filters and active tab
  const filteredRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      if (filters.status !== "all" && request.status !== filters.status) return false
      if (filters.department !== "all" && request.department !== filters.department) return false
      if (filters.purpose !== "all" && request.purpose !== filters.purpose) return false
      if (filters.subcategory !== "all" && request.subcategory !== filters.subcategory) return false
      if (filters.year !== "all" && request.year !== filters.year) return false
      if (filters.section !== "all" && request.section !== filters.section) return false
      if (filters.dateFrom && request.fromDate < filters.dateFrom) return false
      if (filters.dateTo && request.toDate > filters.dateTo) return false
      if (
        filters.search &&
        !request.studentName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !request.registerNumber.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false

      return true
    })

    if (activeTab === "home") {
      filtered = filtered.filter((request) => request.status === "pending")
    } else if (activeTab === "reports") {
      filtered = filtered.filter((request) => request.status === "forwarded_to_hod" || request.status === "rejected")
    }

    return filtered
  }, [requests, filters, activeTab])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredRequests.length
    const pending = filteredRequests.filter((r) => r.status === "pending").length
    const forwarded = filteredRequests.filter((r) => r.status === "forwarded_to_hod").length
    const rejected = filteredRequests.filter((r) => r.status === "rejected").length

    return { total, pending, approved: forwarded, rejected }
  }, [filteredRequests])

  const handleRequestAction = (requestId: string, action: "approve" | "reject") => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, status: action === "approve" ? "forwarded_to_hod" : "rejected" }
          : request,
      ),
    )

    if (action === "approve") {
      alert("Request forwarded to HOD for final approval!")
    } else {
      alert("Request rejected successfully.")
    }
  }

  // NEW: Handlers for the confirmation modal
  const handleOpenModal = (action: "approve" | "reject", requestId: string) => {
    setModalState({ isOpen: true, action: action, requestId: requestId })
  }

  const handleCloseModal = () => {
    setModalState({ isOpen: false, action: null, requestId: null })
  }

  const handleConfirmAction = () => {
    if (modalState.action && modalState.requestId) {
      handleRequestAction(modalState.requestId, modalState.action)
    }
    handleCloseModal()
  }

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, photo: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Download student PDF - same functionality as HOD
  const downloadStudentPDF = (request: ODRequest, attachmentName: string) => {
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 500
>>
stream
BT
/F1 12 Tf
50 750 Td
(Student Attachment Document) Tj
0 -30 Td
(Student: ${request.studentName}) Tj
0 -15 Td
(Register Number: ${request.registerNumber}) Tj
0 -15 Td
(Department: ${request.department}) Tj
0 -30 Td
(Attachment: ${attachmentName}) Tj
0 -30 Td
(This is a sample PDF attachment submitted by the student) Tj
0 -15 Td
(for the OD request. In a real application, this would be) Tj
0 -15 Td
(the actual document uploaded by the student.) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000206 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
756
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${attachmentName.replace(".pdf", "")}_${request.registerNumber}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const viewRequestDetails = (request: ODRequest) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  // Export to Excel functionality
  const exportToExcel = () => {
    const csvContent = [
      [
        "Student Name",
        "Register Number",
        "Department",
        "Year",
        "Section",
        "Purpose",
        "Subcategory",
        "From Date",
        "To Date",
        "Session",
        "Venue",
        "Status",
        "Submitted At",
      ].join(","),
      ...filteredRequests.map((request) =>
        [
          request.studentName,
          request.registerNumber,
          request.department,
          request.year,
          request.section,
          request.purpose,
          request.subcategory,
          request.fromDate,
          request.toDate,
          request.session,
          request.venue || "Not specified",
          request.status,
          new Date(request.submittedAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `od_requests_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="hod-header">
        <div className="header-top-row">
          <div className="header-left">
            <img src="/srm-eec-logo.webp" alt="SRM Easwari Engineering College" className="college-logo" />
            <div className="header-title">
              <h1>SRM EEC</h1>
            </div>
          </div>

          <div className="header-profile-container">
            <button className="logout-button-small" onClick={() => window.location.reload()}>
              <LogOut size={14} />
              Logout
            </button>
            <div className="header-profile-small" onClick={() => setShowProfileModal(true)}>
              <div className="profile-avatar-small">
                {profileData.photo ? (
                  <img src={profileData.photo || "/placeholder.svg"} alt="Profile" className="profile-photo" />
                ) : (
                  <UserIcon size={16} />
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className="header-nav-bottom">
          <button className={`nav-button ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
            Home
          </button>
          <button
            className={`nav-button ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </nav>
      </header>

      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>Profile Settings</h2>
              <button className="close-modal" onClick={() => setShowProfileModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="profile-modal-content">
              <div className="profile-photo-section">
                <div className="profile-photo-container">
                  {profileData.photo ? (
                    <img src={profileData.photo || "/placeholder.svg"} alt="Profile" className="profile-photo-large" />
                  ) : (
                    <UserIcon size={60} />
                  )}
                  <label className="photo-upload-btn">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    className="profile-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    className="profile-input"
                  />
                </div>
                <div className="form-actions">
                  <button className="save-profile-btn" onClick={() => setShowProfileModal(false)}>
                    Save Changes
                  </button>
                  <button className="cancel-profile-btn" onClick={() => setShowProfileModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedRequest && (
        <div className="details-modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="details-modal-header">
              <h2>Request Details</h2>
              <button className="close-modal" onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="details-modal-content">
              <div className="details-section">
                <h3>Student Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedRequest.studentName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Register Number:</span>
                    <span className="detail-value">{selectedRequest.registerNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedRequest.department}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year & Section:</span>
                    <span className="detail-value">
                      {selectedRequest.year} - Section {selectedRequest.section}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Mentor:</span>
                    <span className="detail-value">{selectedRequest.mentor}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>OD Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Purpose:</span>
                    <span className="detail-value">{selectedRequest.purpose}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Subcategory:</span>
                    <span className="detail-value">{selectedRequest.subcategory}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">
                      {selectedRequest.fromDate} to {selectedRequest.toDate}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Session:</span>
                    <span className="detail-value">{selectedRequest.session}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Venue:</span>
                    <span className="detail-value">{selectedRequest.venue || "Venue not specified"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${selectedRequest.status}`}>{selectedRequest.status}</span>
                  </div>
                </div>
              </div>

              {selectedRequest.description && (
                <div className="details-section">
                  <h3>Description</h3>
                  <p className="description-text">{selectedRequest.description}</p>
                </div>
              )}

              {selectedRequest.groupMembers && selectedRequest.groupMembers.length > 0 && (
                <div className="details-section">
                  <h3>Group Members</h3>
                  <div className="group-members">
                    {selectedRequest.groupMembers.map((member, index) => (
                      <span key={index} className="member-tag">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div className="details-section">
                  <h3>Attachments</h3>
                  <div className="attachments">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <FileText size={16} />
                        <span>{attachment}</span>
                        <button
                          className="download-attachment-btn"
                          onClick={() => downloadStudentPDF(selectedRequest, attachment)}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="details-actions">
                <button className="close-details-btn" onClick={() => setShowDetailsModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "home" && (
          <>
            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-header">
                <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showFilters && (
                <div className="filter-grid">
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      className="filter-select"
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Department</label>
                    <select
                      className="filter-select"
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                      <option value="all">All Departments</option>
                      <option value="Computer Science Engineering">Computer Science Engineering</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Purpose</label>
                    <select
                      className="filter-select"
                      value={filters.purpose}
                      onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                    >
                      <option value="all">All Purposes</option>
                      <option value="Co-curricular">Co-curricular</option>
                      <option value="Extra-curricular">Extra-curricular</option>
                      <option value="Internship">Internship</option>
                      <option value="Research Team">Research Team</option>
                      <option value="Projects">Projects</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Subcategory</label>
                    <select
                      className="filter-select"
                      value={filters.subcategory}
                      onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
                    >
                      <option value="all">All Subcategories</option>
                      <option value="NSS">NSS</option>
                      <option value="Youth Red Cross">Youth Red Cross</option>
                      <option value="Campus Life">Campus Life</option>
                      <option value="Rotaract Club">Rotaract Club</option>
                      <option value="Industry Training">Industry Training</option>
                      <option value="Technical Research">Technical Research</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Year</label>
                    <select
                      className="filter-select"
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                      <option value="all">All Years</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Section</label>
                    <select
                      className="filter-select"
                      value={filters.section}
                      onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                    >
                      <option value="all">All Sections</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                    />
                  </div>

                  <div className="filter-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                    />
                  </div>

                  <div className="filter-group">
                    <label>Search</label>
                    <input
                      type="text"
                      placeholder="Search by name or register number..."
                      className="filter-input"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Total Requests</span>
                  <div className="stat-icon total">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-change positive">Active requests</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Pending</span>
                  <div className="stat-icon pending">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-change negative">Requires attention</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Reviewed</span>
                  <div className="stat-icon approved">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.approved}</div>
                <div className="stat-change positive">Forwarded to HOD</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Rejected</span>
                  <div className="stat-icon rejected">
                    <XCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.rejected}</div>
                <div className="stat-change negative">Declined requests</div>
              </div>
            </div>

            {/* Requests Section */}
            <div className="requests-section">
              <div className="section-header">
                <h2 className="section-title">OD Requests ({filteredRequests.length})</h2>
              </div>

              <div className="requests-grid">
                {filteredRequests.length === 0 ? (
                  <div className="empty-state">
                    <h3>No requests found</h3>
                    <p>Try adjusting your filters to see more results</p>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <div className="student-info">
                          <div className="student-avatar">{request.studentName.charAt(0)}</div>
                          <div className="student-details">
                            <h3>{request.studentName}</h3>
                            <p>
                              {request.registerNumber} • {request.department}
                            </p>
                          </div>
                        </div>
                        <span className={`status-badge ${request.status}`}>{request.status}</span>
                      </div>

                      <div className="request-details">
                        <div className="detail-item">
                          <Calendar className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.fromDate} to {request.toDate} ({request.session})
                          </span>
                        </div>
                        <div className="detail-item">
                          <MapPin className="detail-icon" size={16} />
                          <span className="detail-text">{request.venue || "Venue not specified"}</span>
                        </div>
                        <div className="detail-item">
                          <User className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.year} • Section {request.section}
                          </span>
                        </div>
                        <div className="detail-item">
                          <FileText className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.purpose} - {request.subcategory}
                          </span>
                        </div>
                      </div>

                      <div className="request-actions">
                        <button className="action-button primary" onClick={() => viewRequestDetails(request)}>
                          <Eye size={16} />
                          View Details
                        </button>
                        {request.status === "pending" && (
                          <>
                            <button
                              className="action-button approve"
                              onClick={() => handleOpenModal("approve", request.id)} // MODIFIED
                            >
                              <Check size={16} />
                              Forward to HOD
                            </button>
                            <button
                              className="action-button danger"
                              onClick={() => handleOpenModal("reject", request.id)} // MODIFIED
                            >
                              <X size={16} />
                              Reject
                            </button>
                          </>
                        )}
                        {request.status === "forwarded_to_hod" && (
                          <span className="status-badge forwarded">Forwarded to HOD</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "reports" && (
          <div className="requests-section">
            <div className="section-header">
              <h2 className="section-title">Reports ({filteredRequests.length})</h2>
              <button className="export-button" onClick={exportToExcel}>
                <Download size={16} />
                Export to Excel
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">This Month</span>
                  <div className="stat-icon total">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="stat-value">{requests.filter((r) => r.status === "forwarded_to_hod").length}</div>
                <div className="stat-change positive">Forwarded to HOD</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Co-curricular</span>
                  <div className="stat-icon approved">
                    <Users size={20} />
                  </div>
                </div>
                <div className="stat-value">
                  {
                    requests.filter((r) => r.purpose === "Co-curricular" && r.status === "forwarded_to_hod")
                      .length
                  }
                </div>
                <div className="stat-change positive">NSS, Youth Red Cross</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Extra-curricular</span>
                  <div className="stat-icon pending">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="stat-value">
                  {
                    requests.filter((r) => r.purpose === "Extra-curricular" && r.status === "forwarded_to_hod")
                      .length
                  }
                </div>
                <div className="stat-change positive">Campus Life, Rotaract</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Rejected</span>
                  <div className="stat-icon rejected">
                    <XCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{requests.filter((r) => r.status === "rejected").length}</div>
                <div className="stat-change negative">Declined requests</div>
              </div>
            </div>

            <div className="requests-grid">
              {filteredRequests.length === 0 ? (
                <div className="empty-state">
                  <h3>No requests found</h3>
                  <p>Forwarded and rejected requests will appear here for reporting</p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <div className="student-info">
                        <div className="student-avatar">{request.studentName.charAt(0)}</div>
                        <div className="student-details">
                          <h3>{request.studentName}</h3>
                          <p>
                            {request.registerNumber} • {request.department}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`status-badge ${
                          request.status === "forwarded_to_hod" ? "forwarded" : request.status
                        }`}
                      >
                        {request.status === "forwarded_to_hod" ? "Forwarded to HOD" : request.status}
                      </span>
                    </div>

                    <div className="request-details">
                      <div className="detail-item">
                        <Calendar className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.fromDate} to {request.toDate} ({request.session})
                        </span>
                      </div>
                      <div className="detail-item">
                        <MapPin className="detail-icon" size={16} />
                        <span className="detail-text">{request.venue || "Venue not specified"}</span>
                      </div>
                      <div className="detail-item">
                        <User className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.year} • Section {request.section}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FileText className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.purpose} - {request.subcategory}
                        </span>
                      </div>
                    </div>

                    <div className="request-actions">
                      {request.status === "forwarded_to_hod" && (
                        <button
                          className="action-button danger"
                          onClick={() => handleRequestAction(request.id, "reject")}
                        >
                          <X size={16} />
                          Reject
                        </button>
                      )}
                      {request.status === "rejected" && <span className="status-text rejected">Rejected</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
      {/* NEW: Render the Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title={`Confirm ${modalState.action === "approve" ? "Forward" : "Rejection"}`}
        message={`Are you sure you want to ${
          modalState.action === "approve" ? "forward this request to the HOD" : "reject this request"
        }?`}
      />
    </div>
  )
}

function HODDashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "reports">("home")
  const [requests, setRequests] = useState<ODRequest[]>(sampleRequests)
  const [showFilters, setShowFilters] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<ODRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@srmeec.edu.in",
    photo: undefined,
  })
  // NEW: State for the confirmation modal
  const [modalState, setModalState] = useState<{
  isOpen: boolean;
  action: "approve" | "reject" | null; // This line is changed
  requestId: string | null;
}>({
  isOpen: false,
  action: null,
  requestId: null,
});

  // Filter states
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    purpose: "all",
    subcategory: "all",
    year: "all",
    section: "all",
    dateFrom: "",
    dateTo: "",
    search: "",
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter requests based on current filters and active tab
  const filteredRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      if (filters.status !== "all" && request.status !== filters.status) return false
      if (filters.department !== "all" && request.department !== filters.department) return false
      if (filters.purpose !== "all" && request.purpose !== filters.purpose) return false
      if (filters.subcategory !== "all" && request.subcategory !== filters.subcategory) return false
      if (filters.year !== "all" && request.year !== filters.year) return false
      if (filters.section !== "all" && request.section !== filters.section) return false
      if (filters.dateFrom && request.fromDate < filters.dateFrom) return false
      if (filters.dateTo && request.toDate > filters.dateTo) return false
      if (
        filters.search &&
        !request.studentName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !request.registerNumber.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false

      return true
    })

    if (activeTab === "home") {
      filtered = filtered.filter((request) => request.status === "pending" || request.status === "forwarded_to_hod")
    } else if (activeTab === "reports") {
      filtered = filtered.filter((request) => request.status === "approved" || request.status === "rejected")
    }

    return filtered
  }, [requests, filters, activeTab])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredRequests.length
    const pending = filteredRequests.filter(
      (r) => r.status === "pending" || r.status === "forwarded_to_hod",
    ).length
    const approved = filteredRequests.filter((r) => r.status === "approved").length
    const rejected = filteredRequests.filter((r) => r.status === "rejected").length

    return { total, pending, approved, rejected }
  }, [filteredRequests])

  const handleRequestAction = (requestId: string, action: "approve" | "reject") => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: action === "approve" ? "approved" : "rejected" } : request,
      ),
    )

    if (action === "approve") {
      alert("Request approved successfully! It will now appear in the Reports section.")
    } else {
      alert("Request rejected successfully.")
    }
  }

  // NEW: Handlers for the confirmation modal
  const handleOpenModal = (action: "approve" | "reject", requestId: string) => {
    setModalState({ isOpen: true, action, requestId })
  }

  const handleCloseModal = () => {
    setModalState({ isOpen: false, action: null, requestId: null })
  }

  const handleConfirmAction = () => {
    if (modalState.action && modalState.requestId) {
      handleRequestAction(modalState.requestId, modalState.action)
    }
    handleCloseModal()
  }

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, photo: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Export to Excel functionality
  const exportToExcel = () => {
    const csvContent = [
      [
        "Student Name",
        "Register Number",
        "Department",
        "Year",
        "Section",
        "Purpose",
        "Subcategory",
        "From Date",
        "To Date",
        "Session",
        "Venue",
        "Status",
        "Submitted At",
      ].join(","),
      ...filteredRequests.map((request) =>
        [
          request.studentName,
          request.registerNumber,
          request.department,
          request.year,
          request.section,
          request.purpose,
          request.subcategory,
          request.fromDate,
          request.toDate,
          request.session,
          request.venue || "Not specified",
          request.status,
          new Date(request.submittedAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `od_requests_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadApprovalLetter = (request: ODRequest) => {
    const approvalContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 1000
>>
stream
BT
/F1 12 Tf
50 750 Td
(OFFICIAL DUTY APPROVAL LETTER) Tj
0 -30 Td
(SRM Easwari Engineering College) Tj
0 -15 Td
(Chennai, Tamil Nadu) Tj
0 -30 Td
(Date: ${new Date().toLocaleDateString()}) Tj
0 -30 Td
(APPROVAL FOR OFFICIAL DUTY) Tj
0 -30 Td
(Student Details:) Tj
0 -15 Td
(Name: ${request.studentName}) Tj
0 -15 Td
(Register Number: ${request.registerNumber}) Tj
0 -15 Td
(Department: ${request.department}) Tj
0 -15 Td
(Year: ${request.year}) Tj
0 -15 Td
(Section: ${request.section}) Tj
0 -15 Td
(Mentor: ${request.mentor}) Tj
0 -30 Td
(OD Details:) Tj
0 -15 Td
(Purpose: ${request.purpose}) Tj
0 -15 Td
(Subcategory: ${request.subcategory}) Tj
0 -15 Td
(Duration: ${request.fromDate} to ${request.toDate}) Tj
0 -15 Td
(Session: ${request.session}) Tj
0 -15 Td
(Venue: ${request.venue || "Not specified"}) Tj
0 -15 Td
(Description: ${request.description || "No description provided"}) Tj
0 -30 Td
(Group Members: ${request.groupMembers ? request.groupMembers.join(", ") : "Individual request"}) Tj
0 -30 Td
(This is to certify that the above-mentioned student has been) Tj
0 -15 Td
(granted official duty for the specified purpose and duration.) Tj
0 -30 Td
(Approved by: Dr. Rajesh Kumar) Tj
0 -15 Td
(Head of Department) Tj
0 -15 Td
(SRM Easwari Engineering College) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000206 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
1256
%%EOF`

    const blob = new Blob([approvalContent], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `approval_letter_${request.registerNumber}_${request.studentName.replace(/\s+/g, "_")}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Download student PDF
  const downloadStudentPDF = (request: ODRequest, attachmentName: string) => {
    // Create a simple PDF content for the attachment
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 500
>>
stream
BT
/F1 12 Tf
50 750 Td
(Student Attachment Document) Tj
0 -30 Td
(Student: ${request.studentName}) Tj
0 -15 Td
(Register Number: ${request.registerNumber}) Tj
0 -15 Td
(Department: ${request.department}) Tj
0 -30 Td
(Attachment: ${attachmentName}) Tj
0 -30 Td
(This is a sample PDF attachment submitted by the student) Tj
0 -15 Td
(for the OD request. In a real application, this would be) Tj
0 -15 Td
(the actual document uploaded by the student.) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000206 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
756
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${attachmentName.replace(".pdf", "")}_${request.registerNumber}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const viewRequestDetails = (request: ODRequest) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="hod-header">
        <div className="header-top-row">
          <div className="header-left">
            <img src="/srm-eec-logo.webp" alt="SRM Easwari Engineering College" className="college-logo" />
            <div className="header-title">
              <h1>SRM EEC</h1>
            </div>
          </div>

          <div className="header-profile-container">
            <button className="logout-button-small" onClick={() => window.location.reload()}>
              <LogOut size={14} />
              Logout
            </button>
            <div className="header-profile-small" onClick={() => setShowProfileModal(true)}>
              <div className="profile-avatar-small">
                {profileData.photo ? (
                  <img src={profileData.photo || "/placeholder.svg"} alt="Profile" className="profile-photo" />
                ) : (
                  <UserIcon size={16} />
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className="header-nav-bottom">
          <button className={`nav-button ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
            Home
          </button>
          <button
            className={`nav-button ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </nav>
      </header>

      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>Profile Settings</h2>
              <button className="close-modal" onClick={() => setShowProfileModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="profile-modal-content">
              <div className="profile-photo-section">
                <div className="profile-photo-container">
                  {profileData.photo ? (
                    <img src={profileData.photo || "/placeholder.svg"} alt="Profile" className="profile-photo-large" />
                  ) : (
                    <UserIcon size={60} />
                  )}
                  <label className="photo-upload-btn">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    className="profile-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    className="profile-input"
                  />
                </div>
                <div className="form-actions">
                  <button className="save-profile-btn" onClick={() => setShowProfileModal(false)}>
                    Save Changes
                  </button>
                  <button className="cancel-profile-btn" onClick={() => setShowProfileModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedRequest && (
        <div className="details-modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="details-modal-header">
              <h2>Request Details</h2>
              <button className="close-modal" onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="details-modal-content">
              <div className="details-section">
                <h3>Student Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedRequest.studentName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Register Number:</span>
                    <span className="detail-value">{selectedRequest.registerNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedRequest.department}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year & Section:</span>
                    <span className="detail-value">
                      {selectedRequest.year} - Section {selectedRequest.section}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Mentor:</span>
                    <span className="detail-value">{selectedRequest.mentor}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>OD Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Purpose:</span>
                    <span className="detail-value">{selectedRequest.purpose}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Subcategory:</span>
                    <span className="detail-value">{selectedRequest.subcategory}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">
                      {selectedRequest.fromDate} to {selectedRequest.toDate}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Session:</span>
                    <span className="detail-value">{selectedRequest.session}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Venue:</span>
                    <span className="detail-value">{selectedRequest.venue || "Venue not specified"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${selectedRequest.status}`}>{selectedRequest.status}</span>
                  </div>
                </div>
              </div>

              {selectedRequest.description && (
                <div className="details-section">
                  <h3>Description</h3>
                  <p className="description-text">{selectedRequest.description}</p>
                </div>
              )}

              {selectedRequest.groupMembers && selectedRequest.groupMembers.length > 0 && (
                <div className="details-section">
                  <h3>Group Members</h3>
                  <div className="group-members">
                    {selectedRequest.groupMembers.map((member, index) => (
                      <span key={index} className="member-tag">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div className="details-section">
                  <h3>Attachments</h3>
                  <div className="attachments">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <FileText size={16} />
                        <span>{attachment}</span>
                        <button
                          className="download-attachment-btn"
                          onClick={() => downloadStudentPDF(selectedRequest, attachment)}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="details-actions">
                <button className="close-details-btn" onClick={() => setShowDetailsModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "home" && (
          <>
            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-header">
                <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showFilters && (
                <div className="filter-grid">
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      className="filter-select"
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Department</label>
                    <select
                      className="filter-select"
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                      <option value="all">All Departments</option>
                      <option value="Computer Science Engineering">Computer Science Engineering</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Purpose</label>
                    <select
                      className="filter-select"
                      value={filters.purpose}
                      onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                    >
                      <option value="all">All Purposes</option>
                      <option value="Co-curricular">Co-curricular</option>
                      <option value="Extra-curricular">Extra-curricular</option>
                      <option value="Internship">Internship</option>
                      <option value="Research Team">Research Team</option>
                      <option value="Projects">Projects</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Subcategory</label>
                    <select
                      className="filter-select"
                      value={filters.subcategory}
                      onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
                    >
                      <option value="all">All Subcategories</option>
                      <option value="NSS">NSS</option>
                      <option value="Youth Red Cross">Youth Red Cross</option>
                      <option value="Campus Life">Campus Life</option>
                      <option value="Rotaract Club">Rotaract Club</option>
                      <option value="Industry Training">Industry Training</option>
                      <option value="Technical Research">Technical Research</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Year</label>
                    <select
                      className="filter-select"
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                      <option value="all">All Years</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Section</label>
                    <select
                      className="filter-select"
                      value={filters.section}
                      onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                    >
                      <option value="all">All Sections</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                    />
                  </div>

                  <div className="filter-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                    />
                  </div>

                  <div className="filter-group">
                    <label>Search</label>
                    <input
                      type="text"
                      placeholder="Search by name or register number..."
                      className="filter-input"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Total Requests</span>
                  <div className="stat-icon total">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-change positive">Active requests</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Pending</span>
                  <div className="stat-icon pending">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-change negative">Requires attention</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Approved</span>
                  <div className="stat-icon approved">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.approved}</div>
                <div className="stat-change positive">Successfully processed</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Rejected</span>
                  <div className="stat-icon rejected">
                    <XCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{stats.rejected}</div>
                <div className="stat-change negative">Declined requests</div>
              </div>
            </div>

            {/* Requests Section */}
            <div className="requests-section">
              <div className="section-header">
                <h2 className="section-title">OD Requests ({filteredRequests.length})</h2>
              </div>

              <div className="requests-grid">
                {filteredRequests.length === 0 ? (
                  <div className="empty-state">
                    <h3>No requests found</h3>
                    <p>Try adjusting your filters to see more results</p>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <div className="student-info">
                          <div className="student-avatar">{request.studentName.charAt(0)}</div>
                          <div className="student-details">
                            <h3>{request.studentName}</h3>
                            <p>
                              {request.registerNumber} • {request.department}
                            </p>
                          </div>
                        </div>
                        <span className={`status-badge ${request.status}`}>{request.status}</span>
                      </div>

                      <div className="request-details">
                        <div className="detail-item">
                          <Calendar className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.fromDate} to {request.toDate} ({request.session})
                          </span>
                        </div>
                        <div className="detail-item">
                          <MapPin className="detail-icon" size={16} />
                          <span className="detail-text">{request.venue || "Venue not specified"}</span>
                        </div>
                        <div className="detail-item">
                          <User className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.year} • Section {request.section}
                          </span>
                        </div>
                        <div className="detail-item">
                          <FileText className="detail-icon" size={16} />
                          <span className="detail-text">
                            {request.purpose} - {request.subcategory}
                          </span>
                        </div>
                      </div>

                      <div className="request-actions">
                        <button className="action-button primary" onClick={() => viewRequestDetails(request)}>
                          <Eye size={16} />
                          View Details
                        </button>
                        {(request.status === "pending" || request.status === "forwarded_to_hod") && (
                          <>
                            <button
                              className="action-button approve"
                              onClick={() => handleOpenModal("approve", request.id)} // MODIFIED
                            >
                              <Check size={16} />
                              Approve
                            </button>
                            <button
                              className="action-button danger"
                              onClick={() => handleOpenModal("reject", request.id)} // MODIFIED
                            >
                              <X size={16} />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "reports" && (
          <div className="requests-section">
            <div className="section-header">
              <h2 className="section-title">Reports ({filteredRequests.length})</h2>
              <button className="export-button" onClick={exportToExcel}>
                <Download size={16} />
                Export to Excel
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">This Month</span>
                  <div className="stat-icon total">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="stat-value">{requests.filter((r) => r.status === "approved").length}</div>
                <div className="stat-change positive">Approved requests</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Co-curricular</span>
                  <div className="stat-icon approved">
                    <Users size={20} />
                  </div>
                </div>
                <div className="stat-value">
                  {requests.filter((r) => r.purpose === "Co-curricular" && r.status === "approved").length}
                </div>
                <div className="stat-change positive">NSS, Youth Red Cross</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Extra-curricular</span>
                  <div className="stat-icon pending">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="stat-value">
                  {requests.filter((r) => r.purpose === "Extra-curricular" && r.status === "approved").length}
                </div>
                <div className="stat-change positive">Campus Life, Rotaract</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">Rejected</span>
                  <div className="stat-icon rejected">
                    <XCircle size={20} />
                  </div>
                </div>
                <div className="stat-value">{requests.filter((r) => r.status === "rejected").length}</div>
                <div className="stat-change negative">Declined requests</div>
              </div>
            </div>

            <div className="requests-grid">
              {filteredRequests.length === 0 ? (
                <div className="empty-state">
                  <h3>No requests found</h3>
                  <p>Approved and rejected requests will appear here for reporting and management</p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <div className="student-info">
                        <div className="student-avatar">{request.studentName.charAt(0)}</div>
                        <div className="student-details">
                          <h3>{request.studentName}</h3>
                          <p>
                            {request.registerNumber} • {request.department}
                          </p>
                        </div>
                      </div>
                      <span className={`status-badge ${request.status}`}>{request.status}</span>
                    </div>

                    <div className="request-details">
                      <div className="detail-item">
                        <Calendar className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.fromDate} to {request.toDate} ({request.session})
                        </span>
                      </div>
                      <div className="detail-item">
                        <MapPin className="detail-icon" size={16} />
                        <span className="detail-text">{request.venue || "Venue not specified"}</span>
                      </div>
                      <div className="detail-item">
                        <User className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.year} • Section {request.section}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FileText className="detail-icon" size={16} />
                        <span className="detail-text">
                          {request.purpose} - {request.subcategory}
                        </span>
                      </div>
                    </div>

                    <div className="request-actions">
                      {request.status === "approved" && (
                        <>
                          <button
                            className="action-button success"
                            onClick={() => downloadApprovalLetter(request)}
                          >
                            <Download size={16} />
                            Download PDF
                          </button>
                          <button
                            className="action-button danger"
                            onClick={() => handleRequestAction(request.id, "reject")}
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      {request.status === "rejected" && <span className="status-text rejected">Rejected</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
      {/* NEW: Render the Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title={`Confirm ${modalState.action}`}
        message={`Are you sure you want to ${modalState.action} this request?`}
      />
    </div>
  )
}