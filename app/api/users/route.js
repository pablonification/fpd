import { supabase } from '../../../db/supabaseClient';
import bcrypt from 'bcrypt'; // Pastikan import bcrypt
export async function GET(req) {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role, isActive, avatar } = body;

    // 1. Tentukan tingkat kompleksitas hashing (salt rounds)
    const saltRounds = 10;

    // 2. Lakukan hashing pada password mentah
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(body);
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          // 3. Masukkan hasil hash ke kolom passwordHash
          password_hash: hashedPassword,
          role,
          // Menggunakan 'is_active' sesuai nama kolom PostgreSQL (snake_case)
          is_active: isActive,
          avatar_url: avatar,
        },
      ])
      .select()
      .single();

    if (error) {
      // Log error Supabase/PostgreSQL untuk debugging
      console.error('Supabase Insert Error:', error);
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
