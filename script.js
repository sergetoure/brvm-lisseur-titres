
const fraisCourtage = 1.014;

function calculatorTitre(actualNbreTitreEnPortefeuille, avgPricePerTitreEnProtefeuille, targetAvgPricePerTitre, actualPriceTitreToBuy) {
  let nbreTitreToBuy;

  nbreTitreToBuy =
    (actualNbreTitreEnPortefeuille *
      (avgPricePerTitreEnProtefeuille-targetAvgPricePerTitre)) /
    (targetAvgPricePerTitre-actualPriceTitreToBuy * fraisCourtage);

  return nbreTitreToBuy;
};

const myForm = document.getElementById("calculatorForm");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData= new FormData(myForm);
  actualNbreTitreEnPortefeuille = parseFloat(formData.get("actualNbreTitreEnPortefeuille"));
  avgPricePerTitreEnProtefeuille = parseFloat(formData.get("avgPricePerTitreEnProtefeuille"));
  targetAvgPricePerTitre = parseFloat(formData.get("targetAvgPricePerTitre"));
  actualPriceTitreToBuy = parseFloat(formData.get("actualPriceTitreToBuy"));
  const result = calculatorTitre(actualNbreTitreEnPortefeuille, avgPricePerTitreEnProtefeuille, targetAvgPricePerTitre, actualPriceTitreToBuy);
  const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
  document.getElementById("result").innerHTML = result>= 0 ? `Nombre de titres à acheter: <span>${Math.round(result)}</span> titres au prix de <span>${formatter.format(Math.floor(actualPriceTitreToBuy))}</span> pour un montant total de <span>${formatter.format(Math.floor(Math.round(result) * actualPriceTitreToBuy * fraisCourtage))}</span> vous permettra d'atteindre un prix moyen de <span>${formatter.format(targetAvgPricePerTitre)}</span> par titre.`: `Le prix moyen cible est déjà atteint ou dépassé. Aucun achat nécessaire.`;

});
