
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, email, password, role, isActive, avatar } = body;

    const updates = {
      name,
      email,
      role,
      isActive: isActive,
      avatarUrl: avatar,
      updatedAt: new Date(),
    };

    if (password) {
      const saltRounds = 10;
      updates.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    const [updatedUser] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, parseInt(id)))
      .returning();

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error('Update User Error:', err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, parseInt(id)))
      .returning();

    if (!deletedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'User deleted', data: deletedUser }), {
      status: 200,
    });
  } catch (err) {
    console.error('Delete User Error:', err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
