"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { decryptGuideFile, encryptForBattletag } from "@/lib/rxp-crypto";

const BATTLETAG_RE = /^.+#\d+$/;
const SOURCE_TAG = "player#1234";
const GUIDE_URL = "/guide_player_1234.txt";

export function FreeKeyModal() {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!BATTLETAG_RE.test(tag)) {
      return setError("Invalid BattleTag. Format: YourName#12345");
    }

    setError(null);
    setSuccess(null);
    setProcessing(true);

    try {
      const res = await fetch(GUIDE_URL);
      if (!res.ok) throw new Error("Failed to load guide file.");
      const raw = await res.text();

      const { plaintext, version, guideCount } = decryptGuideFile(
        raw,
        SOURCE_TAG,
      );
      const output = encryptForBattletag(plaintext, tag, version);

      const safeName = `guide_${tag.replace("#", "_")}.txt`;
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = safeName;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(`${guideCount} guides generated for ${tag}`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setError(null); setSuccess(null); } }}>
      <DialogTrigger asChild>
        <button className="wow-btn-free group relative w-full cursor-pointer overflow-hidden rounded-lg px-6 py-3.5 text-sm font-bold tracking-wide">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
              <path d="M7 14.354V16" />
              <path d="M17 14.354V16" />
              <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
              <path d="M3 10h18" />
            </svg>
            Get Your Free Lifetime Key
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="wow-card border-gold-dim/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[var(--font-cinzel)] text-lg tracking-wide text-gold-bright">
            Free Lifetime Key
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your BattleTag and we&apos;ll generate a RestedXP guide file
            encrypted just for you. No cost, no strings attached.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="free-tag" className="text-xs font-medium text-gold-dim">
              Your BattleTag
            </Label>
            <Input
              id="free-tag"
              placeholder="YourName#12345"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
              className="wow-input"
              autoFocus
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={processing}
            className="wow-btn-gold w-full rounded-md px-4 py-2.5 text-sm cursor-pointer"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate & Download"
            )}
          </button>

          {error && (
            <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500/30 bg-green-500/5">
              <AlertDescription className="text-sm text-green-400">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <p className="text-center text-[11px] text-muted-foreground/50">
            Everything runs locally in your browser. Your BattleTag never leaves
            your machine.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
