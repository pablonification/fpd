import { supabase } from '../../../../db/supabaseClient.js';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, email, password, role, isActive } = body;

    const updates = {
      name,
      email,
      role,
      is_active: isActive,
    };

    if (password) updates.password = password; // hash jika mau aman

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    return new Response(JSON.stringify({ message: 'User deleted', data }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
