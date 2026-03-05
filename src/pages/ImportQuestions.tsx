import { useState } from "react";
import questionsData from "@/data/questions-import.json";
import { supabase } from "@/integrations/supabase/client";

const ImportQuestions = () => {
  const [status, setStatus] = useState<string>("Ready to import " + questionsData.length + " questions");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    setStatus("Importing...");
    try {
      const { data, error } = await supabase.functions.invoke("bulk-insert-questions", {
        body: questionsData,
      });
      if (error) {
        setStatus("Error: " + error.message);
      } else {
        setStatus("Done! " + JSON.stringify(data));
      }
    } catch (e: any) {
      setStatus("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Import Questions</h1>
      <p className="text-muted-foreground">{status}</p>
      <button
        onClick={handleImport}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
      >
        {loading ? "Importing..." : "Import All Questions"}
      </button>
    </div>
  );
};

export default ImportQuestions;
