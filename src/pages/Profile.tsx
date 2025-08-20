import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, X } from 'lucide-react';
import { mockUser } from '../data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ahmed Hegazy',
    email: mockUser.email,
    role: mockUser.role,
    phone: '+20 (100) 123-4567',
    location: 'Cairo, Egypt',
    bio: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies. Passionate about creating exceptional user experiences and scalable applications for clients worldwide.',
    company: 'Freelance',
    website: 'www.ahmedhegazy.dev',
    hourlyRate: '85'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and modern web technologies. Passionate about creating exceptional user experiences and scalable applications.',
      company: 'Freelance',
      website: 'www.sarahjohnson.dev',
      hourlyRate: '85'
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 xl:p-8 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg xl:text-xl">Manage your account settings and preferences</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-3 xl:px-8 xl:py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-base xl:text-lg"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 xl:px-8 xl:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base xl:text-lg"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 xl:px-8 xl:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base xl:text-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Picture Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 xl:w-32 xl:h-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                <User className="w-12 h-12 xl:w-16 xl:h-16 text-blue-600" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <Camera className="w-4 h-4 xl:w-5 xl:h-5" />
                </button>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl xl:text-2xl font-semibold text-gray-900">{formData.name}</h3>
              <p className="text-base xl:text-lg text-gray-600">{formData.role}</p>
              {isEditing && (
                <button className="mt-2 text-sm xl:text-base text-blue-600 hover:text-blue-800 font-medium">
                  Change Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                <User className="w-5 h-5 inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                <Mail className="w-5 h-5 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                <Phone className="w-5 h-5 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                <MapPin className="w-5 h-5 inline mr-2" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                <Briefcase className="w-5 h-5 inline mr-2" />
                Job Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.role}</p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                Company
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">{formData.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                />
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">
                  <a href={`https://${formData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-all">
                    {formData.website}
                  </a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
                Hourly Rate
              </label>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-16 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">/hour</span>
                </div>
              ) : (
                <p className="text-base xl:text-lg text-gray-900 py-3">${formData.hourlyRate}/hour</p>
              )}
            </div>
          </div>

          <div className="mt-6 xl:mt-8">
            <label className="block text-sm xl:text-base font-medium text-gray-700 mb-3">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base xl:text-lg"
                placeholder="Tell clients about yourself..."
              />
            ) : (
              <p className="text-base xl:text-lg text-gray-900 py-3 leading-relaxed">{formData.bio}</p>
            )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm xl:text-base font-medium text-gray-900">Password</h3>
                <p className="text-sm xl:text-base text-gray-600">Last updated 3 months ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm xl:text-base">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm xl:text-base font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm xl:text-base text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm xl:text-base font-medium">
                Enabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;