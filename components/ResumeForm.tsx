
import React from 'react';
import { UserDetails, ResumeRequest } from '../types';
// Added Sparkles to the imported icons list
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Linkedin, Award, FileCheck, Languages, Zap, Sparkles } from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (request: ResumeRequest) => void;
  isLoading: boolean;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<ResumeRequest>({
    targetRole: '',
    targetCompany: '',
    details: {
      fullName: '',
      location: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      targetTitle: '',
      education: '',
      experience: '',
      skills: '',
      certifications: '',
      awards: '',
      projects: '',
      languages: '',
      specialRequests: '',
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('details.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: { ...prev.details, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-indigo-900 border-b pb-3 flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500" /> Strategic Targeting
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Target Job Role</label>
              <input
                required
                name="targetRole"
                placeholder="e.g. Director of Engineering"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.targetRole}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Target Company (Optional)</label>
              <input
                name="targetCompany"
                placeholder="e.g. OpenAI or NVIDIA"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.targetCompany}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Professional Headline / Target Title</label>
              <input
                name="details.targetTitle"
                placeholder="e.g. Senior Data Leader | AI & Analytics Strategist"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.targetTitle}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-indigo-900 border-b pb-3 flex items-center gap-3">
            <User className="w-6 h-6 text-indigo-500" /> Executive Branding
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                required
                name="details.fullName"
                placeholder="Sarah Chen"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
              <input
                required
                name="details.location"
                placeholder="London, UK (Global Remote)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                required
                type="email"
                name="details.email"
                placeholder="sarah.chen@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
              <input
                required
                name="details.phone"
                placeholder="+44 20 7946 0958"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1"><Linkedin className="w-4 h-4" /> LinkedIn URL</label>
              <input
                name="details.linkedin"
                placeholder="linkedin.com/in/sarahchen"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.linkedin}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1"><Globe className="w-4 h-4" /> Portfolio / Site</label>
              <input
                name="details.portfolio"
                placeholder="sarahchen.me"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.details.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-indigo-900 border-b pb-3 mb-4 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-indigo-500" /> Professional Legacy (Experience)
          </h3>
          <p className="text-sm text-slate-500 mb-3 italic">List roles and major outcomes. We'll use the APR/STAR framework to quantify your impact.</p>
          <textarea
            required
            name="details.experience"
            rows={6}
            placeholder="e.g. Senior VP at TechCorp (2018-Present). Led a team of 150. Reduced operational costs by $4M. Launched the flagship AI product."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.details.experience}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-indigo-900 border-b pb-2 mb-4 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-indigo-500" /> Education
            </h3>
            <textarea
              required
              name="details.education"
              rows={3}
              placeholder="MBA from Stanford, BS in CS from MIT. Mention honors or key research."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.details.education}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-900 border-b pb-2 mb-4 flex items-center gap-3">
              <Code className="w-6 h-6 text-indigo-500" /> Core Competencies
            </h3>
            <textarea
              required
              name="details.skills"
              rows={3}
              placeholder="Strategic Planning, AI Governance, Cloud Architecture (AWS/Azure), Team Mentorship."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.details.skills}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-indigo-900 border-b pb-2 mb-4 flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-indigo-500" /> Certs & Projects
            </h3>
            <textarea
              name="details.certifications"
              rows={3}
              placeholder="PMP, AWS ML Specialty, Significant Open Source contributions..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.details.certifications}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-900 border-b pb-2 mb-4 flex items-center gap-3">
              <Languages className="w-6 h-6 text-indigo-500" /> Extras (Languages/Awards)
            </h3>
            <textarea
              name="details.languages"
              rows={3}
              placeholder="English (Native), Mandarin (Fluent), 2023 'Innovator of the Year' Award."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.details.languages}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-indigo-900 border-b pb-2 mb-4 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-500" /> Special Requests / 2026 Focus
          </h3>
          <input
            name="details.specialRequests"
            placeholder="e.g. Emphasize AI ethics and hybrid team leadership. 2-page executive style."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.details.specialRequests}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-16 rounded-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center gap-4 text-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Engineering Executive Brand...
            </>
          ) : (
            <>
              <FileCheck className="w-6 h-6" />
              Generate 2026 Elite Resume
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
