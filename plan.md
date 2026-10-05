# 🚀 Project Plan: Neo-Brutalist Text-to-Image Web App (Pollinations AI)

Ce document sert de guide complet et d'instructions pour le développement et la maintenance de l'application **Text-to-Image Neo-Brutalism**.

---

## 📌 1. Vue d'Ensemble du Projet (Project Overview)
L'objectif est de fournir une application web moderne, ultra-rapide et visuellement saisissante (Style **Neo-Brutalism**) permettant à tout utilisateur d'enntrer une description textuelle (prompt) et de générer instantanément des images via l'API gratuite et performante de **Pollinations AI** (`https://image.pollinations.ai`).

---

## 🎨 2. Style & Design System (Neo-Brutalism)
Le style **Neo-Brutalism** est caractérisé par :
- **Bordures Épaisses** : `3px` à `4px` en noir pur (`#000000`).
- **Ombres Nettes sans Flou** : `box-shadow: 5px 5px 0px #000000;`.
- **Couleurs Vibrantes et Éclatantes** :
  - Jaune Neo (`#FFE600`)
  - Cyan Fluo (`#00E5FF`)
  - Rose Néon (`#FF2A85`)
  - Vert Lime (`#00FF66`)
  - Violet Électrique (`#8B5CF6`)
  - Fond de page neutre chaud (`#F4F0EA` / `#FDFBF7`) ou Dark Mode Brutal (`#121212`).
- **Typographie Impactante** : Police Google Fonts (*Space Grotesk* + *Plus Jakarta Sans*), titres en GRAS et MAJUSCULES.
- **Interactions Tactiles & Micro-animations** : Boutons avec effet d'enfoncement (`transform: translate(3px, 3px)`).

---

## ⚡ 3. Architecture Technique (Technical Architecture)
- **Front-end** : HTML5 sémantique, CSS3 (Variables CSS natif & Neo-Brutalism system), JavaScript ES6+ moderne (Async/Await, Blob Fetching, LocalStorage).
- **Service d'Images** : `https://image.pollinations.ai`
  - URL Format : `https://image.pollinations.ai/prompt/{encoded_prompt}?width={w}&height={h}&seed={s}&model={m}&nologo=true&enhance={b}`
- **Stockage Local (LocalStorage)** : Sauvegarde automatique de l'historique des prompts et des images préférées.

---

## ✨ 4. Architecture UX & Interface Streamlined (Nouveau Design)

### 1. Vue Principale "CRÉATEUR" (Creator View)
- **Haut (Zone d'Affichage Centrale)** : Grand canvas d'image haute définition en style Neo-Brutalism avec indicateur de chargement et actions rapide (Télécharger, Copier lien, Zoom).
- **Bas (Barre Rectangulaire Unifiée - Control Dock)** :
  - Champ de saisie du Prompt moderne.
  - Bouton Popover **⚙️ REGLAGES** pour ouvrir/fermer le panneau de configuration (Dimensions 1:1, 16:9, 9:16, Modèle IA, Style Presets, Seed).
  - Grand bouton d'action **🚀 GÉNÉRER**.

### 2. Vue Dédiée "GALERIE / HISTORIQUE" (Gallery Page)
- Onglet dédié f l-Header (**📚 GALERIE**) pour afficher tout l'historique des images créées.
- Rechargement d'un prompt et d'une image en 1 clic.
- Option pour effacer toute la galerie.


---

## 🛠️ 5. Structure des Fichiers (File Structure)
```
/
├── index.html       # Structure principale de l'interface
├── style.css        # Système de design Neo-Brutalism & thèmes
├── app.js           # Logique JavaScript (API Pollinations, gestionnaires d'évènements, storage)
├── package.json     # Configuration npm pour dev server local (Optionnel)
└── plan.md          # Guide du projet & spécifications
```

---

## 🚀 6. Instructions de Démarrage & Déploiement Online

### Option A: Déploiement Ultra-Rapide avec Netlify Drop (Sans Code)
1. Allez sur **[Netlify Drop](https://app.netlify.com/drop)**.
2. Glissez-déposez le dossier du projet (`lead geniration`).
3. Obtenez un lien public gratuit (ex: `https://neo-gen-ai.netlify.app`) accessible par n'importe qui sur Internet/Google.

### Option B: Déploiement via GitHub Pages
1. Créez un dépôt public sur GitHub.
2. Exécutez les commandes :
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/neo-gen-ai.git
   git push -u origin main
   ```
3. Activez **GitHub Pages** dans `Settings > Pages > Source: main`.

### Option C: Déploiement via Vercel
1. Exécutez `npx vercel` dans le terminal.
2. Suivez les instructions pour publier instantanément.

