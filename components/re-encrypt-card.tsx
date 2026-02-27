"use client";

import { useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { decryptGuideFile, encryptForBattletag } from "@/lib/rxp-crypto";

const BATTLETAG_RE = /^.+#\d+$/;

function SwordsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19 21l2-2" />
      <path d="M9.5 6.5 21 18v3h-3L6.5 9.5" />
      <path d="M11 5l-6 6" />
      <path d="M8 8 4 4" />
      <path d="M5 3 3 5" />
    </svg>
  );
}

export function ReEncryptCard() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceTag, setSourceTag] = useState("");
  const [destTag, setDestTag] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setError(null);
    setSuccess(null);
    setResult(null);

    const match = f.name.match(/!([^(]+?)\s*(?:\(\d+\))?\.txt$/i);
    if (match) {
      setSourceTag(match[1].trim());
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const handleProcess = async () => {
    if (!file) return setError("Select a guide file first, champion.");
    if (!BATTLETAG_RE.test(sourceTag))
      return setError("Invalid source BattleTag. Format: Name#12345");
    if (!BATTLETAG_RE.test(destTag))
      return setError("Invalid destination BattleTag. Format: Name#12345");

    setError(null);
    setSuccess(null);
    setResult(null);
    setProcessing(true);

    try {
      const raw = await file.text();
      const { plaintext, version, guideCount } = decryptGuideFile(
        raw,
        sourceTag,
      );
      const output = encryptForBattletag(plaintext, destTag, version);

      const safeName = `guide_${destTag.replace("#", "_")}.txt`;
      setResult(output);
      setFileName(safeName);
      setSuccess(
        `${guideCount} guides re-forged for ${destTag}`,
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "The arcane ritual failed.",
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !fileName) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="wow-card w-full max-w-lg rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <SwordsIcon className="h-7 w-7 text-gold shrink-0" />
          <div>
            <CardTitle className="font-[var(--font-cinzel)] text-xl tracking-wide text-gold-bright">
              RestedXP Re-Encrypt
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              Re-forge a RestedXP guide export for a different BattleTag.
              <br />
              <span className="text-xs opacity-60">
                All processing happens locally in your browser.
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File upload zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`wow-dropzone cursor-pointer rounded-lg p-6 text-center ${
            dragOver
              ? "wow-dropzone-active"
              : file
                ? "wow-dropzone-done"
                : ""
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {file ? (
            <div>
              <p className="text-sm font-medium text-green-400/90">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click or drop to change
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground">
                Drop your guide .txt file here
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                or click to browse
              </p>
            </div>
          )}
        </div>

        {/* Source BattleTag */}
        <div className="space-y-1.5">
          <Label htmlFor="source-tag" className="text-xs font-medium text-gold-dim">
            Source BattleTag
          </Label>
          <Input
            id="source-tag"
            placeholder="Player#12345"
            value={sourceTag}
            onChange={(e) => setSourceTag(e.target.value)}
            className="wow-input"
          />
        </div>

        {/* Destination BattleTag */}
        <div className="space-y-1.5">
          <Label htmlFor="dest-tag" className="text-xs font-medium text-gold-dim">
            Destination BattleTag
          </Label>
          <Input
            id="dest-tag"
            placeholder="NewPlayer#67890"
            value={destTag}
            onChange={(e) => setDestTag(e.target.value)}
            className="wow-input"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleProcess}
            disabled={processing || !file}
            className="wow-btn-gold flex-1 rounded-md px-4 py-2.5 text-sm cursor-pointer"
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
                Channeling...
              </span>
            ) : (
              "Re-Encrypt"
            )}
          </button>
          {result && (
            <button
              onClick={handleDownload}
              className="rounded-md border border-gold-dim/50 bg-transparent px-4 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 cursor-pointer"
            >
              Download
            </button>
          )}
        </div>

        {/* Alerts */}
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
      </CardContent>
    </Card>
  );
}
