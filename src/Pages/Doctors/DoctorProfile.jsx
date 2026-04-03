import { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Hospital,
  Briefcase,
  Award,
  Stethoscope,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  FileText,
  CalendarDays,
  Activity,
  Brain,
  Shield,
  Verified,
  Clock,
  Globe,
  Heart
} from 'lucide-react';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Kanchana Silva",
    specialty: "Cardiologist",
    subSpecialties: ["Interventional Cardiology", "Heart Failure", "Preventive Cardiology"],
    experience: "15 years",
    hospital: "Kandy General Hospital",
    location: "Kandy, Sri Lanka",
    email: "dr.kanchana.silva@healthai.lk",
    phone: "+94 77 123 4567",
    bio: "Experienced Cardiologist with a passion for preventive cardiology and patient-centered care. Specializing in heart failure, hypertension, and interventional procedures. Committed to providing comprehensive cardiac care and improving patient outcomes through evidence-based medicine.",
    education: [
      "MD in Cardiology - University of Colombo",
      "Fellowship in Interventional Cardiology - Apollo Hospitals",
      "MBBS - University of Peradeniya"
    ],
    certifications: [
      "Board Certified in Cardiology",
      "Advanced Cardiac Life Support (ACLS)",
      "Basic Life Support (BLS) Instructor"
    ],
    languages: ["English", "Sinhala", "Tamil"],
    consultationFee: 4500,
    rating: 4.9,
    totalPatients: 2847,
    totalAppointments: 5230,
    satisfactionRate: 98,
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setProfile(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAvailabilityChange = (day, value) => {
    setProfile(prev => ({
      ...prev,
      availability: { ...prev.availability, [day]: value }
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Profile updated successfully!</p>
                <p className="text-xs text-gray-500">Your changes have been saved</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 mb-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-600">Doctor Profile</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">My Professional Profile</h1>
            <p className="text-slate-500 mt-1 text-lg">Manage your professional information and credentials</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                isEditing
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-600'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-2xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-t-2xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-teal-600 border-b-2 border-teal-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden sticky top-6">
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-teal-500 to-cyan-600 relative" />

              {/* Avatar */}
              <div className="relative px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center text-7xl shadow-xl border-4 border-white relative">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover rounded-3xl" />
                    ) : (
                      <span>👨‍⚕️</span>
                    )}
                    {isEditing && (
                      <>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-2 rounded-xl shadow-lg hover:bg-teal-700 transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
                  <p className="text-teal-600 font-medium mt-1">{profile.specialty}</p>
                  
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">{profile.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                      <Verified className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">Verified</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-x-2 text-sm text-gray-500 mt-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>Available for consultations</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
                  <div className="text-center">
                    <Users className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-800">{profile.totalPatients.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Total Patients</p>
                  </div>
                  <div className="text-center">
                    <FileText className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-800">{profile.totalAppointments.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Appointments</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Hospital className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{profile.hospital}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">Languages Spoken</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-8">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                {/* Bio Section */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                    About Me
                  </h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows={6}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                  ) : (
                    <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Education */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        {isEditing ? (
                          <div className="flex-1 flex gap-2">
                            <input
                              value={edu}
                              onChange={(e) => handleArrayChange('education', idx, e.target.value)}
                              className="flex-1 border border-slate-300 rounded-xl px-4 py-2"
                            />
                            <button
                              onClick={() => removeArrayItem('education', idx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-slate-700 flex-1">{edu}</p>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addArrayItem('education')}
                        className="mt-3 text-teal-600 text-sm font-medium hover:text-teal-700"
                      >
                        + Add Education
                      </button>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    Certifications & Licenses
                  </h3>
                  <div className="space-y-3">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                        {isEditing ? (
                          <div className="flex-1 flex gap-2">
                            <input
                              value={cert}
                              onChange={(e) => handleArrayChange('certifications', idx, e.target.value)}
                              className="flex-1 border border-slate-300 rounded-xl px-4 py-2"
                            />
                            <button
                              onClick={() => removeArrayItem('certifications', idx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-slate-700 flex-1">{cert}</p>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addArrayItem('certifications')}
                        className="mt-3 text-teal-600 text-sm font-medium hover:text-teal-700"
                      >
                        + Add Certification
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Specialty</label>
                    <input
                      type="text"
                      name="specialty"
                      value={profile.specialty}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Consultation Fee (LKR)</label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={profile.consultationFee}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Hospital/Clinic</label>
                    <input
                      type="text"
                      name="hospital"
                      value={profile.hospital}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal-600" />
                  Working Hours
                </h3>
                <div className="space-y-4">
                  {Object.entries(profile.availability).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="capitalize font-medium text-slate-700 w-32">{day}</span>
                        {isEditing ? (
                          <input
                            value={hours}
                            onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                            className="flex-1 border border-slate-300 rounded-xl px-4 py-2"
                          />
                        ) : (
                          <span className="text-slate-600">{hours}</span>
                        )}
                      </div>
                      {!isEditing && hours !== "Closed" && (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          Available
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                    <Heart className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-3xl font-bold">{profile.satisfactionRate}%</p>
                    <p className="text-sm opacity-90 mt-1">Patient Satisfaction</p>
                    <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${profile.satisfactionRate}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <Users className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-3xl font-bold">{profile.totalPatients.toLocaleString()}</p>
                    <p className="text-sm opacity-90 mt-1">Total Patients Treated</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <Star className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-3xl font-bold">{profile.rating}</p>
                    <p className="text-sm opacity-90 mt-1">Average Rating</p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button for Editing Mode */}
            {isEditing && activeTab !== 'statistics' && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save All Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DoctorProfile;