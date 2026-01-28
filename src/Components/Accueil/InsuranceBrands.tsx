import Image from "next/image";

type Partner = {
  id: number;
  name: string;
  logo: string;
};

const InsuranceBrands = () => {
  const partners: Partner[] = [
    { id: 1, name: "Néoliane", logo: "/images/Neo.webp" },
    { id: 2, name: "April", logo: "/images/april.png" },
    { id: 3, name: "Alptis", logo: "/images/alptis.png" },
    { id: 4, name: "Apivia", logo: "/images/apivia.png" },
    { id: 5, name: "Allianz", logo: "/images/allianz.png" },
    { id: 6, name: "Groupama", logo: "/images/groupama.png" },
    { id: 7, name: "AXA", logo: "/images/AXA.png" },
    { id: 8, name: "Swisslife", logo: "/images/swisslife.png" },
  ];

  // Duplication x2 (plus stable) + animation translateX(-50%)
  const loop = [...partners, ...partners];

  return (
    <section
      aria-labelledby="insurance-brands-title"
      className="relative overflow-hidden bg-white py-10 sm:py-14 md:py-16 dark:bg-zinc-950"
    >
      {/* Fond subtil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-300/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="bg-yellow-300 text-gray-800 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium">
            Nos partenaires de confiance
          </span>

          <h2
            id="insurance-brands-title"
            className="mt-4 text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl dark:text-zinc-50"
          >
            Plus de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              30 assureurs
            </span>{" "}
            comparés
          </h2>

          <p className="mt-3 text-pretty text-sm text-zinc-600 sm:text-base dark:text-zinc-300">
            Accédez aux meilleures offres du marché en quelques clics
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto mt-10 max-w-6xl">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-zinc-950 sm:w-20 md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-zinc-950 sm:w-20 md:w-24" />

          <div className="overflow-hidden py-4 sm:py-6">
            <div className="flex w-max gap-4 will-change-transform motion-reduce:animate-none animate-marquee hover:[animation-play-state:paused]">
              {loop.map((p, idx) => (
                <div
                  key={`${p.id}-${idx}`}
                  className="group relative flex h-20 w-32 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white/70 px-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 sm:h-24 sm:w-40"
                >
                  <Image
                    src={p.logo}
                    alt={`partenaire la mutuelle de france ${p.name}`}
                    width={140}
                    height={56}
                    className="h-10 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  420
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  offres comparées
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500 text-white shadow-sm dark:bg-amber-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  +163k
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  devis réalisés en 2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Texte descriptif */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm dark:border-blue-500/20 dark:from-blue-500/10 dark:to-cyan-400/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Comparaison simplifiée et transparente
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                Visualisez en un clin d&apos;œil les tarifs de nos partenaires avec notre{" "}
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  comparateur mutuelle santé gratuit
                </span>
                . Obtenez un devis personnalisé et choisissez l&apos;offre la plus adaptée à vos besoins.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white/70 px-3 py-2 text-sm text-zinc-800 shadow-sm backdrop-blur dark:border-amber-300/20 dark:bg-zinc-900/40 dark:text-zinc-100">
                <svg
                  className="h-5 w-5 text-amber-600 dark:text-amber-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11 5a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246A4.535 4.535 0 009 10.908V12.85c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-xs sm:text-sm">
                  Économisez jusqu&apos;à{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-200">
                    40%
                  </span>{" "}
                  avec les promotions du mois
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation (sans dépendance Tailwind config) */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default InsuranceBrands;
