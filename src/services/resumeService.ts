// Resume Service for API calls
export interface ResumeData {
  _id?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
  };
  summary: string;
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  skills: string[];
  selectedTemplate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

class ResumeService {
  private baseUrl = '/api/resumes';

  // Save a new resume to MongoDB
  async saveResume(resumeData: Omit<ResumeData, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ResumeData>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error saving resume:', error);
      return {
        success: false,
        error: 'Failed to save resume to database'
      };
    }
  }

  // Update an existing resume
  async updateResume(id: string, resumeData: Omit<ResumeData, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ResumeData>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating resume:', error);
      return {
        success: false,
        error: 'Failed to update resume in database'
      };
    }
  }

  // Get a specific resume by ID
  async getResume(id: string): Promise<ApiResponse<ResumeData>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching resume:', error);
      return {
        success: false,
        error: 'Failed to fetch resume from database'
      };
    }
  }

  // Get resumes by email
  async getResumesByEmail(email: string): Promise<ApiResponse<ResumeData[]>> {
    try {
      const response = await fetch(`${this.baseUrl}?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching resumes by email:', error);
      return {
        success: false,
        error: 'Failed to fetch resumes from database'
      };
    }
  }

  // Get all resumes (with limit)
  async getAllResumes(limit: number = 10): Promise<ApiResponse<ResumeData[]>> {
    try {
      const response = await fetch(`${this.baseUrl}?limit=${limit}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching all resumes:', error);
      return {
        success: false,
        error: 'Failed to fetch resumes from database'
      };
    }
  }

  // Delete a resume
  async deleteResume(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting resume:', error);
      return {
        success: false,
        error: 'Failed to delete resume from database'
      };
    }
  }

  // Save to localStorage as backup
  saveToLocalStorage(resumeData: any): void {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Load from localStorage
  loadFromLocalStorage(): any {
    try {
      const data = localStorage.getItem('resumeData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }
}

export default new ResumeService();
