
import { Response, Request } from 'express';
import { getAdminOrOwner, prisma } from '../helpers';

export const createResidence = async (req: Request, res: Response) => {

    const {user, ...rest} = req.body;
    try {
        const userFound = await getAdminOrOwner(user);

        if (userFound) {
            const residence = await prisma.residence.create({
                data: {
                    ...rest
                },
            });

            return res.status(200).json({
                ok: true,
                residence
            });
        }else{
            return res.status(401).json({
                ok: false,
                message: "Unauthorized"
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}


export const getResidences = async(req:Request, res:Response)=>{
    try {
        const userFound = await getAdminOrOwner(req.body.user);

        if(!userFound) return res.status(401).json({
            ok:false,
            message: "Unauthorized"
        });

        const residences = await prisma.residence.findMany({
            include:{
                user:{
                    omit: {password:true}
                },
                coto:true,
                propertyType:true
            },
            omit: {userId:true, cotoId:true, propertyTypeId:true}
        });
        return res.status(200).json({
            ok:true,
            data:residences
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            message: error
        })
    }
}

export const getResidence = async(req:Request, res:Response)=>{
    try {

        const userFound = await getAdminOrOwner(req.body.user);

        if(!userFound) return res.status(401).json({
            ok:false,
            message: "Unauthorized"
        });

        const residence = await prisma.residence.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include:{
                user:{
                   omit: {password:true} 
                },
                coto:true,
                propertyType:true
            },
            omit: {userId:true, cotoId:true, propertyTypeId:true}
          
        },);

        return res.status(200).json({
            ok:true,
            data:residence
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            message:error
        })
    }
}


export const updateResidence = async(req:Request, res:Response)=>{
    const {user, ...rest} = req.body;
    try {
        const userFound = await getAdminOrOwner(req.body.user);
        if(!userFound) return res.status(401).json({
            ok:false,
            message:"Unauthorized"
        });
        const updatedResidence = await prisma.residence.update({
            where: {
              id: Number(req.params.id), 
            },
            data: {
              ...rest,
            },
          })

          return res.status(200).json({
                ok:true,
                updatedResidence
          })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        })
    }
}