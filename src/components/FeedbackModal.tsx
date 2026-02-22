import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const FeedbackModal = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Bug Report");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim() || loading) return;
    setLoading(true);
    await supabase.from("feedback").insert({
      feedback_type: type,
      description: description.trim(),
    } as any);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setDescription("");
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-quiz-option">
          🐛 Report a Bug / Suggest Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-quiz-heading">Send Feedback</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="text-4xl">🎉</span>
            <p className="text-quiz-option font-semibold">Thanks for your feedback!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Type of Feedback</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Bug Report">🐛 Bug Report</option>
                <option value="Feature Request">💡 Feature Request</option>
                <option value="Question / Other">❓ Question / Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Tell us what happened or what you'd like to see..."
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button onClick={handleSubmit} disabled={!description.trim() || loading} size="lg" className="w-full text-quiz-option">
              {loading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
