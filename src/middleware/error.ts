import type { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    data: null,
    error: { message: `Route ${req.method} ${req.path} not found` },
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Keep this! It prints the detailed error in YOUR terminal for debugging
  console.error(err);

  // Send a safe, generic message to the client instead of err.message
  res.status(500).json({
    success: false,
    data: null,
    error: { message: 'Internal server error' }, 
  });
};
