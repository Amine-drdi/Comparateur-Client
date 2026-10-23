import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff] px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto py-16">
        <p className="text-7xl sm:text-8xl font-black text-blue-700 mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Comparez les meilleures mutuelles santé et obtenez un devis gratuit
          en quelques minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/comparateur-mutuelle-sante"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-700 font-semibold px-6 py-3 rounded-xl border-2 border-blue-200 transition-colors"
          >
            Comparer les mutuelles
          </Link>
        </div>
      </div>
    </main>
  );
}
