import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name: 'João Jamba',
            email:'jambapedro123@gmai.com',
            avatarUrl: 'https://github.com/jambaGoDevCode.png'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title:'Example Pool',
            code:'Bola2122',
            ownerId: user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-02T15:50:25.406Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode:'AO'
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-03T16:50:25.406Z',
            firstTeamCountryCode:'BR',
            secondTeamCountryCode:'FR',

            guesses:{
                create:{
                    firstTeamPoint:1,
                    secondTeamPoint:4,
                    
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }


        }
    })
}

main()