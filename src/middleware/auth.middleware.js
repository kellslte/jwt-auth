import { verifyToken } from "../services/jwt.service.js";

const authMiddleware = function ( req, res, next )
{
    try
    {
        const payload = verifyToken( req ); 

        if ( !payload )
        {
            throw new Error('User is not authenticated');
        }

        req.user = {
            id: payload.sub,
            name: payload.name,
            email: payload.email
        };

        next();
    } catch (e) {
        return res.status( 401 ).json( {
            success: false,
            message: e.message
        } );
    }
 }

export default authMiddleware;