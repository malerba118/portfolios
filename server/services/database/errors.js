export class UnauthenticatedError extends Error {
  constructor() {
    super("User is not authenticated");
    this.name = "UnauthenticatedError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("User is not authorized");
    this.name = "UnauthorizedError";
  }
}

export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource not found");
    this.name = "ResourceNotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}
