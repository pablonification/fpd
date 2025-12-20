
import { db } from './db/db.js';
import { users } from './db/schema.js';

async function listUsers() {
    try {
        const allUsers = await db.select({
            id: users.id,
            email: users.email,
            name: users.name
        }).from(users);

        console.log('--- REGISTERED USERS ---');
        allUsers.forEach(u => {
            console.log(`[${u.id}] ${u.name} - ${u.email}`);
        });
        console.log('------------------------');
        process.exit(0);
    } catch (err) {
        console.error('Error listing users:', err);
        process.exit(1);
    }
}

listUsers();
