import { Response, Request } from "express"
import { getAdminOrOwner, prisma } from '../helpers';


export const createPropertyType = async (req: Request, res: Response) => {
    const { user, ...rest } = req.body;
    try {

        const userFound = await getAdminOrOwner(user);

        if (!userFound) return res.status(401).json({
            ok: false,
            message: "Unauthorized"
        });
       const propertyType = await prisma.propertyType.create({
            data: {
               ...rest
            }
        });

        return res.status(200).json({
            ok: true,
            propertyType
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}