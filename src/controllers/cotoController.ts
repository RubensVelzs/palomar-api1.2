
import { Response, Request } from 'express';
import { getAdminOrOwner, prisma } from '../helpers';

export const create = async (req: Request, res: Response) => {
    const {user, name} = req.body;
    try {
        const userFound = await getAdminOrOwner(user);

        if (!userFound) return res.status(401).json({
            ok: false,
            message: "Unauthorized"
        });

        
        const coto = await prisma.coto.create({
            data: {
                name
            },
        });
        return res.status(200).json({
            ok: true,
            coto
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        });
    }
}