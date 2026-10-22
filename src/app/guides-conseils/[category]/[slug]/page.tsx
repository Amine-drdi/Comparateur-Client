import type { Metadata } from "next";
import Link from "next/link";
import NavbarA from "@/Components/Home/NavBar";
import Footer from "@/Components/Home/Footer";
import { GUIDE_ARTICLES, getGuideArticle } from "@/lib/guideArticles";
import { SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";

type GuidePageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return GUIDE_ARTICLES.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getGuideArticle(category, slug);

  if (!article) {
    return {};
  }

  const url = `${SITE_URL}/guides-conseils/${article.category}/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "La Mutuelle de France",
      locale: "fr_FR",
      type: "article",
    },
  };
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { category, slug } = await params;
  const article = getGuideArticle(category, slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/guides-conseils/${article.category}/${article.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        inLanguage: "fr-FR",
        mainEntityOfPage: articleUrl,
        author: {
          "@type": "Organization",
          name: "La Mutuelle de France",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "La Mutuelle de France",
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavbarA />
      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li><Link className="underline" href="/">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link className="underline" href={`/guides-conseils/${article.category}`}>
                  Guides {article.category === "mutuelle"
                    ? "mutuelle"
                    : article.category === "assurance"
                      ? "assurance"
                      : article.category === "retraite"
                        ? "retraite"
                      : "pratiques"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{article.title}</li>
            </ol>
          </nav>
          <header className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Guide {article.category === "mutuelle"
                ? "mutuelle santé"
                : article.category === "assurance"
                  ? "assurance"
                  : article.category === "retraite"
                    ? "retraite"
                  : "pratique"}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              {article.introduction}
            </p>
          </header>

          <div className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            {article.category === "assurance" ? (
              <>
                <p className="font-semibold text-slate-900">Vérifiez les conditions auprès de votre assureur</p>
                <p className="mt-2 text-slate-700">
                  Les garanties et démarches dépendent de votre contrat. Consultez les documents contractuels et demandez une confirmation écrite en cas de doute.
                </p>
                <Link
                  className="mt-4 inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                  href="/Contact"
                >
                  Contacter l’équipe
                </Link>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-900">Comparez les garanties selon votre situation</p>
                <p className="mt-2 text-slate-700">
                  La demande de devis est gratuite et sans engagement. Prenez le temps de vérifier les garanties et les conditions de chaque offre.
                </p>
                <Link
                  className="mt-4 inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                  href="/comparateur-mutuelle-sante"
                >
                  Comparer les mutuelles
                </Link>
              </>
            )}
          </div>

          <div className="space-y-9">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 text-2xl font-bold text-slate-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}
                {section.points && (
                  <ul className="list-disc space-y-2 pl-6 text-slate-700">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12" aria-labelledby="faq-title">
            <h2 id="faq-title" className="mb-5 text-2xl font-bold text-slate-900">
              Questions fréquentes
            </h2>
            <div className="space-y-5">
              {article.faqs.map(({ question, answer }) => (
                <div key={question} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{question}</h3>
                  <p className="mt-2 leading-relaxed text-slate-700">{answer}</p>
                </div>
              ))}
            </div>
          </section>

          <nav aria-label="Pages utiles" className="mt-12 rounded-2xl bg-slate-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Pour aller plus loin</h2>
            <ul className="space-y-2">
              {article.relatedLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link className="text-blue-700 underline hover:text-blue-900" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
