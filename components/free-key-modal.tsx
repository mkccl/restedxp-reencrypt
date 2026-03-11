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
import { GUIDES, type GuideConfig } from "@/lib/guides";

const BATTLETAG_RE = /^.+#\d+$/;

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
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
  );
}

export function FreeKeyModal() {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const handleDownload = async (guide: GuideConfig) => {
    if (!BATTLETAG_RE.test(tag)) {
      return setError("Invalid BattleTag. Format: YourName#12345");
    }

    setError(null);
    setProcessing(guide.id);

    try {
      const res = await fetch(guide.guideUrl);
      if (!res.ok) throw new Error(`Failed to load ${guide.title}.`);
      const raw = await res.text();

      const { plaintext, version } = decryptGuideFile(raw, guide.sourceTag);
      const output = encryptForBattletag(plaintext, tag, version);

      const safeName = `${guide.id}_guide_${tag.replace("#", "_")}.txt`;
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = safeName;
      a.click();
      URL.revokeObjectURL(url);

      setCompleted((prev) => new Set(prev).add(guide.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setProcessing(null);
    }
  };

  const handleDownloadAll = async () => {
    for (const guide of GUIDES) {
      if (completed.has(guide.id)) continue;
      await handleDownload(guide);
    }
  };

  const tagValid = BATTLETAG_RE.test(tag);
  const allDone = GUIDES.every((g) => completed.has(g.id));

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setError(null);
          setProcessing(null);
          setCompleted(new Set());
        }
      }}
    >
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
            Get Your Free Lifetime Keys
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="wow-card border-gold-dim/30 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[var(--font-cinzel)] text-lg tracking-wide text-gold-bright">
            Free Lifetime Keys
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your BattleTag, then download whichever guides you want.
            Everything runs locally in your browser.
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
              onChange={(e) => { setTag(e.target.value); setError(null); }}
              className="wow-input"
              autoFocus
            />
            <Alert className="border-gold-dim/20 bg-gold-dim/5">
              <AlertDescription className="text-xs text-gold-dim">
                RestedXP guides are encrypted to a specific BattleTag. The generated
                file will only work with the BattleTag you enter here.
              </AlertDescription>
            </Alert>
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {GUIDES.map((guide) => {
              const done = completed.has(guide.id);
              const loading = processing === guide.id;
              const disabled = !tagValid || loading || !!processing;

              return (
                <div
                  key={guide.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-gold-dim/15 bg-black/20 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {guide.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {guide.expansion} &middot; Levels {guide.levels}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownload(guide)}
                    disabled={disabled || done}
                    className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                      done
                        ? "border border-green-500/30 bg-green-500/10 text-green-400"
                        : "wow-btn-gold"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Spinner className="h-3.5 w-3.5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : done ? (
                      <>
                        <CheckIcon className="h-3.5 w-3.5" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleDownloadAll}
            disabled={!tagValid || !!processing || allDone}
            className="wow-btn-gold w-full rounded-md px-4 py-2.5 text-sm cursor-pointer"
          >
            {allDone ? "All Guides Downloaded" : "Download All Guides"}
          </button>

          <p className="text-center text-[11px] text-muted-foreground/50">
            Your BattleTag never leaves your machine.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
