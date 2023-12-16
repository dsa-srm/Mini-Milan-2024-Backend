export type IResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T | null;
    message_code?: string;
  };
  