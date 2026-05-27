# BRAHMO Clinical Safety Dashboard 🛡️⚕️

![BRAHMO Architecture](https://img.shields.io/badge/Architecture-Dual_Layer_Safety-blue)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_|_TypeScript_|_Tailwind_|_Supabase-success)

## 📌 The Problem
Generative AI holds massive potential for clinical decision support, but it suffers from a fatal flaw: **hallucinations**. In a medical setting, an AI cannot be trusted to "guess" drug-drug interactions or renal dosing adjustments. If an LLM hallucinates a medication recommendation for a patient with Chronic Kidney Disease (CKD) or specific allergies, the results can be catastrophic.

## 💡 The Solution: A Dual-Layer AI Architecture
The BRAHMO Clinical Safety Dashboard solves this by stripping the clinical reasoning *out* of the AI model and replacing it with a **Deterministic Safety Brain**. 

Instead of asking an LLM, "Is it safe to give this patient Amoxicillin?", the system relies on a two-layer architecture:

1. **The Deterministic Layer (Supabase / Hardcoded Fallback)**
   - Acts as the absolute source of truth.
   - Cross-references proposed medications against the patient's exact lab values (eGFR, Cr), current medications, and allergies.
   - Identifies exact contraindications (e.g., *Clarithromycin + Atorvastatin = Rhabdomyolysis Risk*).
   - Generates strict, mathematical rules that the AI *cannot* override.

2. **The LLM Presentation Layer (Gemini / Claude)**
   - Receives the mathematical constraints from the Deterministic Layer.
   - Formats the clinical alerts into a highly readable, empathetic, and professional consultation note for the prescribing physician.
   - Enhances readability without compromising clinical safety.

## 🚀 Key Features
*   **Real-time Clinical Guardrails:** Instantly flags severe interactions, renal dosing failures, and allergy cross-reactivities.
*   **Dual-Column Comparison UI:** Visually demonstrates the difference between a standard "unguarded" LLM and the BRAHMO Enhanced AI, proving the necessity of the deterministic layer.
*   **Premium Medical Interface:** Built with Next.js, Tailwind CSS, and Framer Motion for a sleek, glassmorphic, and highly responsive user experience.
*   **Resilient API Design:** Includes automatic exponential backoff retry logic to handle upstream LLM API rate limits (e.g., 503 Service Unavailable) seamlessly without breaking the user experience.

## 🛠️ Technical Stack
*   **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, React Markdown
*   **Backend/API:** Next.js Serverless Route Handlers
*   **Database:** Supabase (PostgreSQL) with mock-data fallback for seamless deployment
*   **AI Integration:** Google Gemini 2.5 Flash / Anthropic Claude 3 Haiku / OpenAI
*   **Deployment:** Vercel

## 💻 Running the Project Locally

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
   Create a `.env.local` file in the root directory and add your preferred LLM API key:
   ```env
   # Use either Google Gemini (AIza...), Anthropic (sk-ant...), or OpenAI (sk-...)
   LLM_API_KEY=your_api_key_here
   
   # Optional: If you are connecting to a live Supabase instance
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

6. **Deployed project:**
   Navigate to [https://brahmo-fawn.vercel.app?_vercel_share=tdDeMukqRm371GJpbCMuAq6qlrx1w8qx]

---
*Developed as a demonstration of clinically safe, deterministic AI architectures for modern healthcare applications.*
