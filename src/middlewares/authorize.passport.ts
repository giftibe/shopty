import {Response, Request, NextFunction} from 'express'
const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        }
        return res.status(401).json({
            message: "Unauthorized access"
        });
    };
};
export default requireRole