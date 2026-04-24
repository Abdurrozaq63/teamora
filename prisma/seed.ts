import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, RoleName } from "../app/generated/prisma/client";
import { Pool, neonConfig} from "@neondatabase/serverless"
import ws from "ws"

neonConfig.webSocketConstructor = ws

// const pool = new Pool({
//     connectionString: process.env.DIRECT_URL!,
// })

const adapter = new PrismaNeon({
    connectionString: process.env.DIRECT_URL!,
})
const prisma = new PrismaClient({adapter})

async function main() {
    await prisma.role.createMany({
        data: [
            {name: RoleName.OWNER},
            {name: RoleName.ADMIN},
            {name: RoleName.MEMBER},
        ],
        skipDuplicates: true,
    })
}

main().catch((e) => {
    console.error(e);
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
   // await pool.end
})