
export interface UserDetails {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  targetTitle?: string;
  education: string;
  experience: string;
  skills: string;
  certifications?: string;
  awards?: string;
  projects?: string;
  languages?: string;
  specialRequests?: string;
}

export interface ResumeRequest {
  targetRole: string;
  targetCompany?: string;
  details: UserDetails;
}

export interface GeneratedResume {
  markdown: string;
  timestamp: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
