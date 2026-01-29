import React, { useState, useEffect } from "react";
import axios from "axios";

// Fonction utilitaire pour extraire le stepId numérique depuis une URL Néoliane
function extractStepIdFromUrl(url: string): string | null {
  if (!url) return null;
  const parts = url.split("/");
  for (let i = parts.length - 2; i >= 0; i--) {
    if (/^\d+$/.test(parts[i])) {
      return parts[i];
    }
  }
  return null;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  selectedOffer: any;
};

type Step =
  | "panier"
  | "subscription"
  | "stepconcern"
  | "stepbank"
  | "stepcancellation"
  | "uploaddoc"
  | "validation"
  | "done";

const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose, formData, selectedOffer }) => {
  const [step, setStep] = useState<Step>("panier");
  const [leadId, setLeadId] = useState<string>("");
  const [subId, setSubId] = useState<string>("");
  const [stepId, setStepId] = useState<string>("");
  const [requiredDocs, setRequiredDocs] = useState<any[]>([]);
  const [contractIds, setContractIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adherentData, setAdherentData] = useState<any>({});
  const [bankData, setBankData] = useState<any>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get("/api/neoliane/token");
        setAccessToken(res.data.token);
      } catch (err) {
        console.error("Erreur lors de la récupération du token", err);
      }
    };
    fetchToken();
  }, []);

  if (!isOpen) return null;

  // --- 1. Création du panier ---
  const handleCreatePanier = async () => {
    setLoading(true);
    setError(null);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear().toString();
      const month = (tomorrow.getMonth() + 1).toString();
      const day = tomorrow.getDate().toString();

      const cotisation = parseFloat(selectedOffer.montant);
      const fraisDossier = parseFloat(formData.fraisDossier || "0");
      const totalAmount = (cotisation + fraisDossier).toFixed(2);

      const payload = {
        total_amount: 75.5,
        profile: {
          date_effect: { year, month, day },
          zipcode: formData.codePostal,
          producttype: "sante",
          members: [
            {
              concern: "a1",
              birthyear: formData.dateNaissance.split("-")[0],
              regime: mapRegime(formData.regimeSocial),
              products: [
                {
                  product_id: selectedOffer.gamme_id,
                  formula_id: selectedOffer.formule_id,
                },
              ],
            },
          ],
        },
      };

      const response = await axios.post("/api/neoliane/cart", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLeadId(response.data.value.lead_id);
      setStep("subscription");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 2. Création de la souscription ---
  const handleCreateSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "/api/neoliane/subscription",
        {
          lead_id: leadId,
          signtype: "1",
          features: ["CANCELLATION_LETTER_BETA"],
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSubId(res.data.value.id);

      // EXTRACT the stepconcernId from the form URL
      let sid = "";
      if (res.data.value.form && res.data.value.form.url) {
        sid = extractStepIdFromUrl(res.data.value.form.url) || "";
      }
      if (!sid) {
        setError("Impossible de récupérer l'identifiant de l'étape adhérent (stepconcernId).");
        setLoading(false);
        return;
      }
      setStepId(sid);
      setStep("stepconcern");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 3. StepConcern (infos adhérent) ---
  const handleStepConcern = async (infos: any) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `/api/neoliane/subscription/${subId}/stepconcern/${stepId}`,
        infos,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      await fetchSubscription();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 4. Récupération de la souscription (pour savoir l'étape suivante, les docs à upload, etc.) ---
  const fetchSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/neoliane/subscription/${subId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRequiredDocs(res.data.value.required_docs || []);
      setContractIds((res.data.value.contracts || []).map((c: any) => c.id));

      // --- Extraction dynamique du bon stepId pour stepbank ---
      if (res.data.value.currentstep === "2") {
        let bankStepId = null;
        const urlsToCheck = [
          res.data.value.form?.url,
          res.data.value.save?.url,
          res.data.value.validate?.url,
        ];
        for (const url of urlsToCheck) {
          if (url && url.includes("/Stepbank/")) {
            bankStepId = extractStepIdFromUrl(url);
            break;
          }
        }
        if (!bankStepId) {
          setError("Impossible de récupérer l'identifiant de l'étape bancaire (stepbankId).");
          setLoading(false);
          return;
        }
        setStepId(bankStepId);
        setStep("stepbank");
      } else if (res.data.value.currentstep === "3") {
        setStep("stepcancellation");
      }
      // Ajoute ici la gestion pour les autres étapes si besoin
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 5. StepBank (infos bancaires) ---
  const handleStepBank = async (infos: any) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `/api/neoliane/subscription/${subId}/stepbank/${stepId}`,
        infos,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      await fetchSubscription();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 6. Upload des documents ---
  const handleUploadDoc = async (
    docType: string,
    base64Content: string,
    contract_ids: string[],
    concern?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `/api/neoliane/subscription/${subId}/document`,
        {
          type: docType,
          content: base64Content,
          contract_ids,
          ...(concern ? { concern } : {}),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setStep("validation");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- 7. Validation des contrats ---
  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    try {
      for (const contractId of contractIds) {
        await axios.put(
          `/api/neoliane/contract/${contractId}/validate`,
          [],
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }
      setStep("done");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  // --- Utilitaire mapping ---
  const mapRegime = (regime: string) => {
    const mapping: { [key: string]: string } = {
      salarie: "1",
      sans_emploi: "7",
      retraite: "4",
      fonctionnaire: "9",
    };
    return mapping[regime] || "1";
  };

  // --- Affichage dynamique selon l'étape ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        {error && (
          <div className="mb-2 text-red-600">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
        {loading && <div className="mb-2 text-blue-600">Chargement…</div>}
        {step === "panier" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-sky-800">
              Souscription à l'offre
            </h2>
            <p className="mb-2">
              <strong>Nom :</strong> {formData.nom} {formData.prenom}
            </p>
            <p className="mb-2">
              <strong>Offre sélectionnée :</strong>{" "}
              {selectedOffer.gamme_label} - {selectedOffer.formule_label}
            </p>
            <p className="mb-2">
              <strong>Montant :</strong> {selectedOffer.montant} €
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Cette action va envoyer votre profil à Néoliane pour démarrer la
              souscription.
            </p>
            <button
              onClick={handleCreatePanier}
              className="bg-sky-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition w-full"
            >
              Confirmer la souscription
            </button>
          </>
        )}
        {step === "subscription" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">
              Création de la souscription
            </h2>
            <button
              onClick={handleCreateSubscription}
              className="bg-sky-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition w-full"
            >
              Créer la souscription
            </button>
          </>
        )}
        {/* === FORMULAIRE ADHERENT === */}
        {step === "stepconcern" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">
              Informations adhérent
            </h2>
            <form
              className="space-y-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                try {
                  const [year, month, day] =
                    adherentData.birthdate?.split("-") || ["", "", ""];
                  const payload = {
                    members: [
                      {
                        is_politically_exposed: Number(
                          adherentData.is_politically_exposed
                        ),
                        gender: adherentData.gender,
                        lastname: adherentData.lastname,
                        firstname: adherentData.firstname,
                        regime: adherentData.regime,
                        birthdate: {
                          year: String(parseInt(year, 10)),
                          month: String(parseInt(month, 10)),
                          day: String(parseInt(day, 10)),
                        },
                        birthplace: adherentData.birthplace,
                        birthzipcode: adherentData.birthzipcode,
                        birthcountry: adherentData.birthcountry,
                        csp: adherentData.csp,
                        numss: adherentData.numss,
                        numorganisme: adherentData.numorganisme,
                        enumbusinesssector_id: Number(
                          adherentData.enumbusinesssector_id
                        ),
                      },
                    ],
                    streetnumber: adherentData.streetnumber,
                    street: adherentData.street,
                    streetbis: adherentData.streetbis,
                    zipcode: adherentData.zipcode,
                    city: adherentData.city,
                    email: adherentData.email,
                    phone: adherentData.phone,
                  };
                  await handleStepConcern(payload);
                } catch (e: any) {
                  setError(e.message);
                }
                setLoading(false);
              }}
            >
              <div>
                <label className="text-sky-900">
                  Civilité <span className="text-red-600">*</span>
                </label>
                <select
                  name="gender"
                  value={adherentData?.gender || ""}
                  onChange={(e) =>
                    setAdherentData((d: any) => ({
                      ...d,
                      gender: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                  required
                >
                  <option value="">Choisir</option>
                  <option value="M">Monsieur</option>
                  <option value="F">Madame</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sky-900">
                    Nom <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="lastname"
                    value={adherentData?.lastname || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        lastname: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Prénom <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="firstname"
                    value={adherentData?.firstname || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        firstname: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Date de naissance <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    value={adherentData?.birthdate || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        birthdate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Lieu de naissance <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="birthplace"
                    value={adherentData?.birthplace || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        birthplace: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Code postal naissance{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="birthzipcode"
                    value={adherentData?.birthzipcode || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        birthzipcode: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Pays naissance <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="birthcountry"
                    value={adherentData?.birthcountry || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        birthcountry: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Numéro sécurité sociale{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="numss"
                    value={adherentData?.numss || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        numss: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>

                <div>
                  <label className="text-sky-900">
                    Régime <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="regime"
                    value={adherentData?.regime || "Salarié"}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        regime: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  >
                    <option value="Salarié">Salarié</option>
                    <option value="TNS indépendant">TNS indépendant</option>
                    <option value="Retraité salarié">Retraité salarié</option>
                    {/* ...autres régimes */}
                  </select>
                </div>
                <div>
                  <label className="text-sky-900">
                    CSP <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="csp"
                    value={adherentData?.csp || "11"}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        csp: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Numéro rue <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="streetnumber"
                    value={adherentData?.streetnumber || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        streetnumber: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Rue <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="street"
                    value={adherentData?.street || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        street: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">Complément d'adresse</label>
                  <input
                    name="streetbis"
                    value={adherentData?.streetbis || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        streetbis: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Code postal <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="zipcode"
                    value={adherentData?.zipcode || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        zipcode: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Ville <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="city"
                    value={adherentData?.city || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        city: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={adherentData?.email || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Téléphone <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    value={adherentData?.phone || ""}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2  focus:text-cyan-950"
                    required
                  />
                </div>
                <div>
                  <label className="text-sky-900">
                    Exposé politiquement <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="checkbox"
                    name="is_politically_exposed"
                    value={1}
                    checked={adherentData?.is_politically_exposed == 1}
                    onChange={(e) =>
                      setAdherentData((d: any) => ({
                        ...d,
                        is_politically_exposed: Number(e.target.checked ? 1 : 0),
                      }))
                    }
                    className="accent-sky-800 ml-2"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-sky-800 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
              </div>
            </form>
          </>
        )}
        {/* === FIN FORMULAIRE ADHERENT === */}

        {/* === FORMULAIRE BANCAIRE === */}
        {step === "stepbank" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">
              Informations bancaires
            </h2>
            <form
              className="space-y-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                try {
                  const payload = {
                    details: [
                      {
                        levydate: bankData.levydate,
                        levyfrequency: bankData.levyfrequency,
                        iban: bankData.iban,
                        bic: bankData.bic || "",
                        isDifferentFromStepConcern: "0", // Si le titulaire est le même que l'adhérent
                        gender: "",
                        lastname: "",
                        firstname: "",
                        streetnumber: "",
                        street: "",
                        streetbis: "",
                        zipcode: "",
                        city: "",
                        country: "",
                      },
                    ],
                  };
                  await handleStepBank(payload);
                } catch (err: any) {
                  setError(err.message);
                }
                setLoading(false);
              }}
            >
              <div>
                <label className="text-sky-900">Jour du prélèvement *</label>
                <br />
                <input
                  type="number"
                  min="1"
                  max="31"
                  name="levydate"
                  value={bankData.levydate || ""}
                  onChange={(e) =>
                    setBankData((d: any) => ({
                      ...d,
                      levydate: e.target.value,
                    }))
                  }
                  className="w-40 px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                  required
                />
              </div>
              <div>
                <label className="text-sky-900">
                  Fréquence du prélèvement *
                </label>
                <br />
                <select
                  name="levyfrequency"
                  value={bankData.levyfrequency || ""}
                  onChange={(e) =>
                    setBankData((d: any) => ({
                      ...d,
                      levyfrequency: e.target.value,
                    }))
                  }
                  className="w-40 px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                  required
                >
                  <option value="">Choisir</option>
                  <option value="Mensuel">Mensuel</option>
                  <option value="Trimestriel">Trimestriel</option>
                  <option value="Semestriel">Semestriel</option>
                  <option value="Annuel">Annuel</option>
                </select>
              </div>
              <div>
                <label className="text-sky-900">IBAN *</label>
                <br />
                <input
                  name="iban"
                  value={bankData.iban || ""}
                  onChange={(e) =>
                    setBankData((d: any) => ({
                      ...d,
                      iban: e.target.value,
                    }))
                  }
                  className="w-96 px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                  required
                />
              </div>
              <div>
                <label className="text-sky-900">BIC</label> <br />
                <input
                  name="bic"
                  value={bankData.bic || ""}
                  onChange={(e) =>
                    setBankData((d: any) => ({
                      ...d,
                      bic: e.target.value,
                    }))
                  }
                  className="w-96 px-4 py-2 border rounded-lg focus:outline-none border-sky-800 focus:ring-2 focus:text-cyan-950"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-sky-800 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
              </div>
            </form>
          </>
        )}
        {/* === FIN FORMULAIRE BANCAIRE === */}

        {step === "stepcancellation" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">Résiliation</h2>
            {/* Ajoute ici un formulaire pour la résiliation si besoin */}
            <button
              onClick={() => setStep("uploaddoc")}
              className="bg-sky-800 text-white px-6 py-3 rounded-lg w-full"
            >
              Passer à l'upload documents
            </button>
          </>
        )}
        {step === "uploaddoc" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">
              Upload des documents
            </h2>
            {/* Pour chaque requiredDoc affiche un input fichier, puis appelle handleUploadDoc(type, base64, contract_ids, concern) */}
            <button
              onClick={() => setStep("validation")}
              className="bg-sky-800 text-white px-6 py-3 rounded-lg w-full"
            >
              Valider les documents
            </button>
          </>
        )}
        {step === "validation" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-sky-800">
              Validation des contrats
            </h2>
            <button
              onClick={handleValidate}
              className="bg-green-700 text-white px-6 py-3 rounded-lg w-full"
            >
              Valider la souscription
            </button>
          </>
        )}
        {step === "done" && (
          <div className="text-green-700 font-bold text-xl">
            Souscription finalisée avec succès !
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;