import "next-auth"
import {RoleName} from "@/app/generated/prisma"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            role: RoleName| null
            tenantId: string | null
            tenantName: string | null
        }
    }
}