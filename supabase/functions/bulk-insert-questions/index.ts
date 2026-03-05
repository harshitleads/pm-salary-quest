import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const questions = await req.json();
    console.log("Received", questions.length, "questions");

    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(JSON.stringify({ error: "Expected a non-empty array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = questions.map((q: any) => ({
      category: q.category,
      "salaryTier": q.salaryTier,
      "salaryRange": q.salaryRange,
      question: q.question,
      options: q.options,
      "correctAnswers": q.correctAnswers,
      "multipleCorrect": q.multipleCorrect ?? false,
      hint: q.hint,
      explanation: q.explanation,
      tier: q.tier ?? 1,
      difficulty: q.difficulty ?? 1,
      source: q.source ?? "",
      active: q.active ?? true,
      "flagCount": 0,
    }));

    // Insert in batches of 25
    const batchSize = 25;
    let inserted = 0;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase.from("questions").insert(batch);
      if (error) {
        console.error("Insert error at batch", i, error);
        return new Response(JSON.stringify({ error: error.message, detail: error.details, inserted }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      inserted += batch.length;
      console.log("Inserted batch", i, "total:", inserted);
    }

    return new Response(JSON.stringify({ success: true, inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Caught error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
