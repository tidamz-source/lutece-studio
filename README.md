# Lutèce Studio

Outil web (mobile d'abord) pour créer les visuels réseaux sociaux de **Lutèce Ultimate** : stories 9:16, posts 4:5 et carrés 1:1.

- Fonds et éléments (Stelly, signature) issus de la bibliothèque du club
- Calques : glisser, pincer pour zoomer/tourner, réordonner, supprimer
- Texte, bloc score (match ou tournoi), photos importées
- Plusieurs pages pour les carrousels, export dans les 3 formats
- Installable sur l'écran d'accueil et utilisable hors ligne

## Mettre à jour la bibliothèque

1. Déposer les fichiers dans `assets/backgrounds/` (fonds, idéalement 1440×2560) ou `assets/elements/` (PNG transparents).
2. Les déclarer dans `assets/manifest.json` (`backgrounds` ou `elements`). La `palette` y définit aussi les couleurs proposées.
3. Ajouter les nouveaux fichiers à la liste `FILES` de `sw.js` et incrémenter `VERSION`.
