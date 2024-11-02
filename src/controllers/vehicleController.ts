import { Response, Request } from "express"
import { getAdminOrOwner, prisma } from '../helpers';
import { ok } from "assert";


export const createVehicle = async (req: Request, res: Response) => {
    const { user, carPlate, ...rest } = req.body;
    try {
        const userFound = await getAdminOrOwner(user);

        if (!userFound) return res.status(401).json({
            ok: false,
            message: "Unauthorized"
        });

        const residenceTotalVehicles = await prisma.residence.findUnique({
            where: {
                id: rest.residenceId,
            },
            select: {
                _count: {
                    select: { vehicles: true },
                },
            },
        });

        const currentVehicle = await prisma.vehicle.findUnique({
            where: {
                carPlate: carPlate
            }
        });

        if(currentVehicle) return res.status(400).json({
            ok:false,
            message:"This vehicle already created"
        })

        if (residenceTotalVehicles?._count.vehicles !== 10) {
            let tag = carPlate.replaceAll('-', '');

            if (16 - tag.length !== 0) {
                for (let i = tag.length; i < 16; i++) {
                    tag += '0';
                }
            }

            const vehicle = await prisma.vehicle.create({
                data: {
                    carPlate,
                    tag,
                    ...rest,
                },
            });

            return res.status(200).json({
                ok: true,
                vehicle
            });
        } else {
            return res.status(400).json({
                ok: false,
                message: "This residence has the maximum number of vehicles"
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

export const getAll = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const userFound = await getAdminOrOwner(user);
        if (!userFound) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const vehicles = await prisma.vehicle.findMany({
            include: {
                residence: true
            }
        });

        return res.status(200).json({
            ok: true,
            vehicles
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            error
        })
    }
}

export const getVehicle = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { id } = req.params;
    try {
        const userFound = await getAdminOrOwner(user);
        if (!userFound) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                residence: true
            }

        });

        if (!vehicle) return res.status(404).json({
            ok: false,
            message: "Vehicle not found"
        })

        return res.status(200).json({
            ok: true,
            vehicle
        })

    } catch (error) {
        return res.status(500).json({
            ok: true,
            error
        })

    }
}

export const update = async(req:Request, res:Response)=>{
    const {user, ...rest} = req.body;
    const {id} = req.params;
    const {carPlate}= rest;
    let tag="";
    try {
        const userFound = await getAdminOrOwner(req.body.user);

        if(!userFound) return res.status(401).json({
            ok:false,
            message:"Unauthorized"
        });

        if(carPlate){
            tag = carPlate.replaceAll('-', '');

            if (16 - tag.length !== 0) {
                for (let i = tag.length; i < 16; i++) {
                    tag += '0';
                }
            }

            const updatedVehicle = await prisma.vehicle.update({
                where: {
                  id: Number(id), 
                },
                data: {
                    carPlate,
                    tag,
                },
              })


          return res.status(200).json({
            ok:true,
            updatedVehicle
      })
        }

        const currentVehicle = await prisma.vehicle.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!currentVehicle) return res.status(404).json({
            ok:false,
            message:"Vehicle not found"
        })
    

        const updatedVehicle = await prisma.vehicle.update({
            where: {
              id: Number(id), 
            },
            data: {
              ...rest,
           
            },
          })

          return res.status(200).json({
                ok:true,
                updatedVehicle
          })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        })
    }
}


export const deleteVehicle = async(req:Request, res:Response)=>{
    const {user} = req.body;
    const {id} = req.params;
    try {
        const userFound = await getAdminOrOwner(user);
        if(!userFound) return res.status(401).json({
            ok:false,
            message:"Unauthorized"
        });

        const vehicle = await prisma.vehicle.findUnique({
            where:{
                id:Number(id)
            }
        });

        if(!vehicle) return res.status(404).json({
            ok:false,
            message:"Vehicle not found"
        });

        await prisma.vehicle.delete({
            where:{
                id:Number(id)
            }
        });

        return res.status(200).json({
            ok:true,
            message:"Vehicle deleted"
        })

    } catch (error) {
        
        return res.status(500).json({
            ok:true,
            message:"Vehicle deleted"
        })
    }
}