export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      maqola?: string;
      phone_number?: string;
      
  };
}