
import { Response, Request } from 'express';
import { getOfficer, prisma } from '../helpers';


export const createControllAccess = async (req: Request, res: Response) => {
    const { tag, carPlate, controllAccessEventId } = req.body;
    try {

        const parsedControllAccessEventId= Number(controllAccessEventId);
       
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
                await prisma.controllAccess.create({
                    data: {
                       controllAccessEventId:parsedControllAccessEventId,
                       vehicleId: vehicle.id,
                    },
                });
                return res.status(200).json({
                    ok: true,
                    message: parsedControllAccessEventId===1?"¡Bienvenido!":"Vuelve pronto"
                });
    
            }else{
                return res.status(401).json({
                    ok: false,
                    message:"Tu residencia tiene pagos pendientes o esta inactiva"
                });
            }
        }else{
            return res.status(404).json({
                ok: false,
                message:"Vehiculo no encontrado."
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