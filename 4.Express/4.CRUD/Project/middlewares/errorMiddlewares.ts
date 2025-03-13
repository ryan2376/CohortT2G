import { Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('')
}