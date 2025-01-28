import { HttpStatusCode } from "../enum/httpStatusCode.enum";

export default class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }

  static badRequest(message: string): ApiError {
    return new ApiError(HttpStatusCode.BAD_REQUEST, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError(HttpStatusCode.NOT_FOUND, message);
  }

  static internal(message: string): ApiError {
    return new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}
