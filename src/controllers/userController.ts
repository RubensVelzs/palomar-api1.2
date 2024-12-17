import { Response, Request } from "express"
import { createAccessToken, getAdminOrOwner, prisma } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
    try {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        await prisma.user.create({
            data: {
                ...req.body,
                avatar: `${req.body.name[0]}${req.body.lastname[0]}`,
                password: passwordHashed
            }
        });

        return res.status(200).json({
            ok: true
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await prisma.user.findFirst({
            where: {
                email,
            },

        });

        if (!userFound) {
            return res.status(4000).json({
                ok: false,
                message: "Invalid Credentials"
            });
        }

        const paswordMatch = bcrypt.compareSync(password, userFound.password);

        if (!paswordMatch) {
            return res.json({
                ok: false,
                message: "Invalid Credentials"
            });
        };

        const token = await createAccessToken(userFound.id);

        return res.status(200).json({
            ok: true,
            access: token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}


export const verify = async (req: Request, res: Response) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    try {
        jwt.verify(token as string, 'secret', async (err, decoded) => {
            if (err) return res.status(403).json({ ok: false, message: "Unhauthorized" });
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(decoded)
                } ,
                omit: {password: true}
              },);

            if(!user) return res.status(404).json({ok: false, message: "User not found"}); 

            return res.json({
                ok:true,
                user
            })
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

export const getUsers = async (req:Request, res: Response)=>{
    try {
        const userFound = await getAdminOrOwner(req.body.user);

        if(!userFound) return res.status(401).json({
            ok:false,
            message:"Unauthorized"
        });
        
        const users = await prisma.user.findMany();
        return res.json({
            ok: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}