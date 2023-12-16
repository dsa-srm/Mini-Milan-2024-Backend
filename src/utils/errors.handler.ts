export default class ErrorHandler extends Error {
    status_code: number;
    message: string;
    data: any;
    message_code:string;
  
    constructor(errorObj: { status_code: number; message: string; data?: any ,message_code:string;}) {
      super();
      this.status_code = errorObj.status_code;
      this.message = errorObj.message;
      this.data = errorObj.data;
      this.message_code = errorObj.message_code;
    }
  
    toString() {
      return {
        message: this.message,
        status_code: this.status_code,
        data: this.data,
        message_code:this.message_code
      };
    }
  }
  