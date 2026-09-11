import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maghanim | Shariah-compliant payments",
  description: "Shariah-compliant payments infrastructure for the Gulf.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <template
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: A centered currency portrait matching the supplied layout reference. OWN-WORLD: emerald geometric field, restrained champagne gold, cream typography. STORY: Understand regional payments and explore solutions and governance. FIRST VIEWPORT: compact upper-left wordmark, centered gold Arabic mark and headline, isolated coin rising from the bottom. FORM: Reference-led currency prospectus; seed maghanim-reference-v3. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />
        {children}
      </body>
    </html>
  );
}

