import * as argon from 'argon2';
import { issueToken } from '../services/jwt.service.js';
import User from '../models/user.model.js';

export const loginController = async function ( req, res, next )
{
    try {
        const { email, password } = req.body;

        const user = await User.findOne( { email: email } );

        if ( !user )
        {
            throw new Error( 'User not found' );
        }

        if ( !argon.verify( user.password, password ) )
        {
            throw new Error( 'Invalid credentials, check your email or password' );
        }

        const payload = {
          sub: user.id,
          name: user.name,
          email: user.email,
        }; 

        const token = issueToken( payload );

        return res.status( 200 ).json( {
            success: true,
            message: 'User logged in successfully',
            authorization: {
                type: 'bearer',
                token: token
            }
        })
    } catch (e) {
         return res.status(422).json({
           success: false,
           message: e.message,
         });
    }
 }

export const registerController = async function ( req, res, next )
{
    try {
        const { name, email, password, passwordConfirmation } = req.body;

        if ( password !== passwordConfirmation )
        {
            throw new Error( 'Passwords do not match' );
        }

        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
          ) !== true
        ) {
          throw new Error("Email is required and must be a valid email address");
        }

        if (!name | typeof name !== 'string' )
        {
            throw new Error( 'Name ir required and must be a string' );
        }

        const hashedPassword = await argon.hash( password );

        const user = await User.create( {
            name, email,
            password: hashedPassword
        } );
        
        await user.save();

        return res.status( 201 ).json( {
            success: true,
            message: 'User registered successfully',
            data: {
                user: user
            }
        })
    } catch (e) {
        return res.status( 422 ).json( {
            success: false,
            message: e.message
        })
    }
 }

export const getAuthenticatedUser = function ( req, res, next )
{
    return res.status( 200 ).json( {
        success: true,
        message: 'User successfully retrieved',
        data: {
            user: req.user
        }
    } );
 }