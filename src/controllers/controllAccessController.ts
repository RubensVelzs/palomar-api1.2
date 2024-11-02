
import { Response, Request } from 'express';
import { getOfficer, prisma } from '../helpers';


export const createControllAccess = async (req: Request, res: Response) => {
    const { tag, carPlate, controllAccessEventId } = req.body;
    try {
       
        const vehicle = await prisma.vehicle.findUnique({
            where:{
                carPlate,
                tag
            },
            include:{
                residence:true,

            },
            omit:{
                residenceId:true
            }
        });

        if(vehicle){
            if (vehicle?.residence.isActive) {
                const controllAccess = await prisma.controllAccess.create({
                    data: {
                       controllAccessEventId,
                       vehicleId: vehicle.id,
                    },
                });
                return res.status(200).json({
                    ok: true,
                    controllAccess
                });
    
            }else{
                return res.status(401).json({
                    ok: false,
                    message:"Your residence has pending payments or is inactive."
                });
            }
        }else{
            return res.status(404).json({
                ok: false,
                message:"Vehicle not found."
            });
        }
        

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}


export const getAllControllAccess = async(req:Request,res:Response)=>{

    try {
       
        const accesses  = await prisma.controllAccess.findMany({
            include:{
                vehicle:true,
                controllAccessEvent:true
            },
            omit:{
                vehicleId:true,
                controllAccessEventId:true
            }
        }); 

        return res.status(200).json({
            ok:true,
            accesses
        })

       
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}