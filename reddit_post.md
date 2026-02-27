# Why I Built a Key-Sharing Tool for RestedXP – And Why It Matters

**TL;DR:** RestedXP costs €50 and locks features behind an authentication key that's checked locally (no internet connection). This violates Blizzard's Addon Policy on multiple levels. I built a tool that lets people who already own the addon share access with their friends/guildmates — because nobody should have to pay €50 *per person* for what Blizzard says must be free. And RestedXP isn't the only one — NaowUI is heading down the same path.

---

## The Problem

There's an addon called **RestedXP** (restedxp.com) being sold for **€50** through a Twitch streamer's channel. You either subscribe or buy a key to unlock it. The addon itself checks your authentication key **locally** — no server call, no internet verification, just an internal string comparison inside the Lua code.

And this isn't an isolated case — **NaowUI** is going down the exact same route. If we don't push back now, this becomes the new normal.

Here's where it gets interesting: **Blizzard's UI Add-On Development Policy** is crystal clear on this:

> **1) Add-ons must be free of charge.**
> All add-ons must be distributed free of charge. Developers may not create "premium" versions of add-ons with additional for-pay features, charge money to download an add-on, charge for services related to the add-on, or otherwise require some form of monetary compensation to download or access an add-on.

> **2) Add-on code must be completely visible.**
> The programming code of an add-on must in no way be hidden or obfuscated, and must be freely accessible to and viewable by the general public.

This addon violates **both** of these rules. It's paywalled at €50 and uses an authentication mechanism to gate content — which is a form of code obfuscation and access restriction.

## What the Tool Does

Let me be clear about what this tool **does and doesn't do:**

- ✅ It allows someone who **already purchased** the addon to generate a shareable key for their friends or guildmates
- ✅ It rewrites the local authentication key so that additional users within the same friend group / guild can use the addon
- ❌ It does **not** crack, pirate, or redistribute the addon itself
- ❌ It does **not** bypass any server-side protection (there is none)
- ❌ It does **not** prevent the original creator from making money — someone in the group still needs to have bought it

Think of it like this: One person in your guild buys it, and their friends don't have to pay €50 *each* just to access something that **should be free in the first place** according to Blizzard's own rules.

## Why This Matters Beyond One Addon

This isn't just about €50. It's about a growing trend in the WoW addon space where creators like RestedXP exploit a loophole:

- They sell "import strings" or "configurations" behind Twitch subs or Patreon tiers
- They use local authentication checks to lock down what is essentially addon functionality
- They rely on the fact that Blizzard rarely enforces their own addon policy

If we normalize €50 paywalls on addons, what's next? We're already seeing it spread — NaowUI is next in line. Paid DBM? Premium WeakAura packs with DRM? The addon ecosystem has always been built on community and open access — that's literally what Blizzard's policy protects.

## The Legal Side (for the curious)

For those wondering about legality:

- **Blizzard's Addon Policy** explicitly requires addons to be free and open-source. The addon creator is the one violating the rules here, not the users.
- Under both **EU copyright law** and the **DMCA**, anti-circumvention rules generally protect "effective technological measures." A local Lua string comparison with zero server verification is a stretch to call an "effective" protection measure — especially when Blizzard's own policy requires the code to be fully visible and unobfuscated in the first place.
- In the EU specifically, anti-circumvention provisions do **not apply to computer programs** in the same way they apply to film or music DRM. Software has explicit carve-outs that allow things like interoperability and backup copies.
- The addon creator is operating **outside of Blizzard's rules** by charging money and obfuscating access. It's hard to argue that circumventing a protection mechanism is illegal when the protection mechanism itself shouldn't exist according to the platform's own policy.

That said, I'm not a lawyer. I'm sharing what I've researched. If anyone has more expertise here, I'd love to hear your take.

## What You Can Do

1. **Report the addon to Blizzard** — File a ticket or post on the official forums. Reference the UI Add-On Development Policy directly.
2. **Report the Twitch channel** — Gating non-Twitch content behind subscriptions is questionable under Twitch's own monetization guidelines.
3. **Support open addon development** — Donate to addon creators who keep their work free and open, as the community intended.

---

The WoW addon community has thrived for 20 years because of openness and sharing. Let's not let a €50 paywall change that.

**Edit:** To be clear, I have nothing against addon creators making money. Patreon donations, tip jars on websites, that's all fine. What I'm against is *locking addon functionality behind a paywall with DRM* — which is exactly what Blizzard's policy was designed to prevent.
