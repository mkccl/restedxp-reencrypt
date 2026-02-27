import { ReEncryptCard } from "@/components/re-encrypt-card";

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
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
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
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
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/bg-midnight.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-[#090d15]" />
      </div>

      {/* Leather texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: "url(/bg-leather.jpg)",
          backgroundSize: "600px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center px-4 py-12 md:py-20">
        {/* Tool */}
        <ReEncryptCard />

        {/* Why section */}
        <section className="mt-12 w-full max-w-2xl space-y-6">
          <h2 className="font-[var(--font-cinzel)] text-center text-lg tracking-wide text-gold">
            Why This Tool Exists
          </h2>

          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            RestedXP charges ~$50 for a WoW leveling addon and locks it behind a
            local authentication key. This directly violates Blizzard&apos;s UI
            Add-On Development Policy, which states that addons must be free and
            their code fully visible.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1 */}
            <div className="wow-card rounded-lg p-4">
              <ShieldIcon className="mb-2 h-5 w-5 text-gold-dim" />
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Blizzard&apos;s Rules Are Clear
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                &quot;Add-ons must be free of charge&quot; and &quot;code must be
                completely visible.&quot; RestedXP violates both. NaowUI is
                heading down the same path.
              </p>
            </div>

            {/* Card 2 */}
            <div className="wow-card rounded-lg p-4">
              <UsersIcon className="mb-2 h-5 w-5 text-gold-dim" />
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Share With Your Guild
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                One person buys it, their friends and guildmates can use it too.
                Nobody should have to pay $50 each for what should be free.
              </p>
            </div>

            {/* Card 3 */}
            <div className="wow-card rounded-lg p-4">
              <ScaleIcon className="mb-2 h-5 w-5 text-gold-dim" />
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Not Piracy
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This does not crack, redistribute, or bypass server-side
                protection (there is none). It re-encrypts an export someone
                already paid for.
              </p>
            </div>
          </div>

          <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
            The WoW addon community has thrived for 20 years because of openness
            and sharing. Patreon donations and tip jars are fine — locking addon
            functionality behind a paywall with DRM is not.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-12 space-y-2 text-center text-xs text-muted-foreground/50">
          <p>
            Made by{" "}
            <a
              href="https://github.com/mkccl"
              className="text-gold-dim/70 transition-colors hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              ccl
            </a>
            {" · "}
            <a
              href="https://github.com/mkccl"
              className="text-gold-dim/70 transition-colors hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open source on GitHub
            </a>
          </p>
          <p className="text-[10px] text-muted-foreground/30">
            World of Warcraft and Blizzard Entertainment are trademarks of
            Blizzard Entertainment, Inc. Background imagery used under
            Blizzard&apos;s fan site policy for non-commercial purposes.
          </p>
        </footer>
      </main>
    </div>
  );
}
