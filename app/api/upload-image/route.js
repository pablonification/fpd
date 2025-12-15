import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file provided' }), {
        status: 400,
      });
    }

    const bucket = 'ContentBLOB';
    const fileName = `${Date.now()}-${file.name}`;

    // Upload ke Supabase
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    // GET PUBLIC URL — API baru
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

      
    return new Response(JSON.stringify({ publicUrl: urlData.publicUrl }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
