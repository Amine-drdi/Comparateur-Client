import icone from "../../assets/mutuelle-entreprises/images/assurance-medicale.png"
export default function AssuranceBanner() {
    return (
      <div className="bg-blue-100 w-full py-10 px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={icone}
            alt="Assurance Icon"
            className="w-16 h-16"
          />
          <h2 className="text-2xl md:text-3xl font-semibold text-[#002b45]">
          Trouvez les meilleurs remboursements pour l'orthodontie adulte
          </h2>
        </div>
        <a
  href="/Typeform"
  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md text-center transition-colors"
>
  Comparer
</a>
      </div>
    );
  }
  