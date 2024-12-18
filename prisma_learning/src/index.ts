import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['info', 'query']});

async function insertUserData(username: string, password: string, firstName: string, lastName: string){
    const response = await prisma.userT.create({
        data: {
            username, 
            password, 
            firstName, 
            lastName
        }
    })
    console.log(response)
}

async function insertToDos(description: string, done: boolean, userId: number){
    const response = await prisma.todos.create({
        data: {
            description,
            done, 
            author: {
                connect: {
                    id: userId
                }
            }
        }
    })
    console.log(response);
}

async function getTodos(userId: number){
    const response = await prisma.todos.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            description: true, 
            done: true,
            userId: true,
            author: true,
        }
    })
    console.log(response);
}

// insertUserData("sd", "voe", "seinc", "usd");
// insertToDos("some ptino", false, 2);
getTodos(2)