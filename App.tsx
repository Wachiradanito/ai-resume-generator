
import React, { useState } from 'react';
import { AppStatus, ResumeRequest } from './types';
import { generateResume } from './services/geminiService';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { Sparkles, FileText, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (request: ResumeRequest) => {
    setStatus(AppStatus.GENERATING);
    setError(null);
    try {
      const result = await generateResume(request);
      setGeneratedResume(result);
      setStatus(AppStatus.SUCCESS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleBack = () => {
    setStatus(AppStatus.IDLE);
    setGeneratedResume(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header - Hidden on Print */}
      <header className="pt-16 pb-24 bg-slate-900 text-white relative overflow-hidden no-print">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
            <Sparkles className="w-3 h-3" /> 2026 Executive Edition
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6">EliteResume <span className="text-indigo-400">AI</span></h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Engineered for global leaders. We transform basic careers into high-impact narratives 
            optimized for <span className="text-white font-medium">Workday, Greenhouse, and human intuition.</span>
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-12 relative z-20 pb-24">
        {status === AppStatus.IDLE && (
          <div className="space-y-12">
            <section className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 max-w-5xl mx-auto mb-12 no-print">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                    <ShieldCheck className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">ATS Hardened</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Linear, single-column logic that guarantees a perfect parse in major systems.</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                    <Sparkles className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">APR Framework</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Quantified achievements using the elite Action-Project-Result strategy.</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                    <FileText className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Spacious Design</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Whitespace-optimized layouts that increase readability by up to 40%.</p>
                </div>
              </div>
            </section>
            
            <ResumeForm onSubmit={handleSubmit} isLoading={status === AppStatus.GENERATING} />
          </div>
        )}

        {status === AppStatus.GENERATING && (
          <div className="max-w-2xl mx-auto text-center py-32 space-y-10 no-print">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-28 h-28 border-[6px] border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Strategizing Your Legacy</h2>
              <p className="text-slate-500 text-lg animate-pulse">Orchestrating metrics and aligning with 2026 hiring benchmarks...</p>
            </div>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto p-8 bg-white border border-red-100 shadow-xl rounded-2xl flex items-start gap-5 no-print">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">System Error</h3>
              <p className="text-slate-500 text-sm mb-6">{error}</p>
              <button 
                onClick={() => setStatus(AppStatus.IDLE)}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Reset & Retry
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.SUCCESS && generatedResume && (
          <ResumePreview markdown={generatedResume} onBack={handleBack} />
        )}
      </main>

      {/* Footer - Hidden on Print */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-auto no-print">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-bold text-slate-900">EliteResume AI</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">Premium Strategic Branding for Global Career Excellence.</p>
          <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Strategic Guidance</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
