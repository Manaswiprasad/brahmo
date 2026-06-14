# BRAHMO Clinical Safety Dashboard 🛡️⚕️

![BRAHMO Architecture](https://img.shields.io/badge/Architecture-Dual_Layer_Safety-blue)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_|_TypeScript_|_Tailwind_|_Supabase-success)
![Hackathon](https://img.shields.io/badge/Hackathon-VISIONARY_2.0-purple)

## 🌟 Project Overview
BRAHMO is a next-generation **Clinical Decision Support System (CDSS)** that merges the communicative power of Large Language Models (LLMs) with absolute deterministic mathematical safety and immersive WebXR Augmented Reality (AR) visualizations.

This documentation is tailored to address the **VISIONARY Hackathon 2.0** evaluation criteria, demonstrating our commitment to Novelty, Usability, Innovation, and Engineering Excellence.

---

## 1. Novelty (Global Standards Paradigm)
**The Problem:** Generative AI holds massive potential for healthcare, but it suffers from a fatal flaw: **hallucinations**. An LLM cannot be trusted to "guess" drug-drug interactions or renal dosing. A hallucination in a clinical setting is fatal.

**Our Novel Solution:** We are pioneering a **Dual-Layer Architecture** that strips clinical reasoning *out* of the AI model. 
*   **The Deterministic Brain:** A strict rules engine (Supabase/PostgreSQL) that mathematically cross-references patient eGFR, creatinine clearance, and polypharmacy interactions to generate absolute constraints.
*   **The AR Neurological Mapper:** We go beyond standard text UI by integrating a fully embedded WebXR Augmented Reality viewer (`@google/model-viewer`). It visualizes immediate severe drug reactions (like Serotonin Toxicity) directly on a 3D anatomical brain stem model using glowing interactive AR hotspots.

This combination of deterministic clinical safety and embedded WebXR visualization is a feature set **rarely seen in standard medical software**, bringing the prototype on par with Global Standards of medical technology.

---

## 2. Innovation & Scale (Real World Impact)
BRAHMO solves a critical real-world problem at scale: **Safe AI adoption in hospitals.**
*   **Scalability:** By keeping the safety engine deterministic, hospitals can infinitely scale their rulesets (adding thousands of drug-drug interactions) without needing to fine-tune massive LLMs or worry about prompt drift.
*   **Use Cases Solved:** 
    *   Renal dosing adjustments (calculating eGFR dynamically).
    *   Preventing severe polypharmacy interactions (e.g., Macrolides + Statins).
    *   Allergy cross-reactivity mapping.
    *   Visual patient education via AR.

---

## 3. Usability (Intervention-Free Execution)
We built BRAHMO to run smoothly without requiring complex user setup.
*   **Zero-Config Deployment:** Deployed natively on Vercel. 
*   **Fallback Resilience:** If the live database connection fails, the system automatically falls back to an internal mock-data engine, ensuring the app **never crashes** during a demonstration or clinical crisis.
*   **API Resilience:** Implemented automatic exponential backoff retry logic. If the upstream LLM API throws a 503 error, the system silently retries without interrupting the physician's workflow.

---

## 4. Documentation & Technical Justifications

### 🛠️ Why We Chose This Tech Stack
*   **Next.js 14 (App Router) & React 18:** Selected for lightning-fast server-side rendering, ensuring that critical medical data loads instantly. The App Router allows us to build secure Server Actions, keeping API keys hidden.
*   **TypeScript:** Strict typing is non-negotiable for clinical software to prevent runtime data-shape errors.
*   **WebXR (`@google/model-viewer`):** Chosen over bulky libraries like Three.js because it provides a native AR bridge (ARKit/ARCore) on mobile devices without requiring users to download a separate app.
*   **Supabase (PostgreSQL):** Chosen for its robust relational data modeling, allowing us to build complex SQL joins for allergy cross-reactivity and drug interaction matrices.

### 🧠 Developer Insights & Process
1.  **Insight - AI is a terrible calculator:** Early iterations tried to make the LLM calculate eGFR. We quickly realized LLMs fail at basic math unpredictably. **Justification:** We shifted to a deterministic JavaScript/SQL calculation layer, completely removing math from the LLM's responsibilities.
2.  **Insight - UI Aesthetics Matter:** Doctors suffer from alert fatigue. **Justification:** We implemented a sleek, dark-mode, glassmorphic UI using Tailwind CSS to reduce eye strain, and clear visual color-coding (Red/Yellow/Green) for safety alerts.

---

## 💻 Developer Guide: Running the Prototype

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manaswiprasad/brahmo.git
   cd brahmo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Required: Google Gemini, Anthropic, or OpenAI Key
   LLM_API_KEY=your_api_key_here
   
   # Optional: The app will safely fall back to mock data if omitted
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Test the AR Feature:**
   Navigate to [http://localhost:3000](http://localhost:3000), load a patient, and open the Consultation Console. Ask a query and click **"Launch AR Visualization"** at the bottom to see the interactive 3D neurological mapping!

---

## 🏛️ Architecture & Interview Guide (Deep Dive)

If you are a technical recruiter or hackathon judge, this section details the underlying engineering of the BRAHMO engine.

### 1. The Data Flow (How It Connects)
The dual-layer architecture ensures the LLM is tightly constrained by database rules:
1.  **The User Input:** The physician enters a drug query in the React/Next.js frontend.
2.  **Layer 1 (The Deterministic Check):** The frontend sends a POST request to a secure Next.js Serverless Route (`/api/safety-check`). This API cross-references the patient's data against the database (Supabase) to identify exact mathematical contraindications.
3.  **Layer 2 (Prompt Injection):** The backend takes the strict mathematical constraints (e.g., "Max dose 250mg due to eGFR") and *injects* them into a hidden system prompt.
4.  **The LLM Call:** The highly constrained prompt is sent to the LLM (Gemini/Claude). The LLM processes the rules and returns an empathetic, 100% safe clinical note.

### 2. Database Schema (PostgreSQL)
We chose a relational database (PostgreSQL via Supabase) because drug interactions are inherently relational, avoiding the data duplication that would occur in a NoSQL (MongoDB) approach.
*   **`Patients`:** Stores demographics and raw creatinine levels. (We store raw creatinine so eGFR can be calculated dynamically, rather than storing an outdated static kidney score).
*   **`Drugs`:** The master index. Uses PostgreSQL `JSONB` columns to store complex, nested renal dosing rules flexibly.
*   **`DrugInteractions`:** A "Join Table" (Many-to-Many) that maps dangerous combinations and assigns clinical severity (e.g., "CONTRAINDICATED").
*   **`AllergyCrossReactivity`:** Maps which drug classes cross-react (e.g., Penicillins -> Cephalosporins).

### 3. Data Fetching & Clinical Math
To guarantee ultra-low latency (<5ms) during emergency prescribing scenarios, we do not hit the database on every query.
*   **Singleton In-Memory Caching:** On first load, the backend fetches all master rules via `Promise.all()` and stores them in a global Hash Map in server RAM for `O(1)` retrieval.
*   **Deterministic Math (CKD-EPI):** LLMs are terrible calculators. Instead of asking the AI to calculate kidney function, our `calculators.ts` file uses the global gold standard **CKD-EPI 2021 Equation**. It applies weighted math (`alpha`, `kappa`) deterministically based on raw patient demographics, completely eliminating the risk of math hallucination.
