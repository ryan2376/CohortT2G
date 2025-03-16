import { Request, Response, NextFunction } from "express"

/**
 * 
 * @param fn The async function to wrap async functions
 * @returns a fxn that executes the async function and catches the error
 * @description Avoid the problem of try catch not being automatically passed to the async thread
 */

export const asyncHandler = <T = any, R extends Request = Request>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: R, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}