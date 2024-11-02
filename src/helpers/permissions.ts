import { prisma } from "./prisma-client-helpers";

export const getAdminOrOwner = async (user: number) => {
    try {
        const userFound = await prisma.user.findUnique({
            where: {
                id: user
            },
            omit: { password: true }
        },);

        if (userFound?.isAdmin || userFound?.isOwner) return true;
        return false;
    } catch (error) {
        return null;
    }
}

export const getOfficer = async (user: number) => {
    try {
        const userFound = await prisma.user.findUnique({
            where: {
                id: user
            },
            omit: { password: true }
        },);

        if ((userFound?.isOfficer || userFound?.isShief || userFound?.isOwner) && !userFound.isAdmin) return true;
        return false;
    } catch (error) {
        return null;
    }
}