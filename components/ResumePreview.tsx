
import React from 'react';
import { Download, Copy, Check, ArrowLeft, Printer, FileText } from 'lucide-react';

interface ResumePreviewProps {
  markdown: string;
  onBack: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ markdown, onBack }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMD = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Extract name for filename if possible, otherwise default
    const nameMatch = markdown.match(/^# (.*)$/m);
    const fileName = nameMatch ? `${nameMatch[1].replace(/\s+/g, '_')}_Resume.md` : 'Resume.md';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      // H1 - Name (The focus of the brand)
      if (line.startsWith('# ')) {
        return (
          <h1 key={i} className="text-5xl font-serif font-bold mb-3 text-center text-indigo-950 uppercase tracking-tighter">
            {line.replace('# ', '')}
          </h1>
        );
      }
      
      // H2 - Section Headings (Clear, separated hierarchy)
      if (line.startsWith('## ')) {
        return (
          <div key={i} className="mt-12 mb-6 group">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-indigo-900 flex items-center gap-4">
              <span className="shrink-0">{line.replace('## ', '')}</span>
              <div className="h-px bg-indigo-100 flex-grow group-hover:bg-indigo-300 transition-colors" />
            </h2>
          </div>
        );
      }
      
      // H3 - Professional Headline
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl font-medium mb-4 text-center text-slate-500 italic tracking-wide font-serif">
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // H4 - Job Title / Company | Location / Dates
      if (line.startsWith('#### ')) {
        const parts = line.replace('#### ', '').split('|');
        return (
          <div key={i} className="mt-8 mb-3">
            <h4 className="text-lg font-bold text-slate-900 flex flex-wrap justify-between items-baseline gap-2">
              <span className="text-indigo-950">{parts[0]}</span>
              {parts[1] && <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{parts[1].trim()}</span>}
            </h4>
          </div>
        );
      }
      
      // List items (Achievements with bold verbs)
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const content = line.trim().substring(2);
        const parts = content.split(/(\*\*.*?\*\*)/g).map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-bold text-indigo-950">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        return (
          <div key={i} className="flex gap-4 ml-2 mb-3 items-start group">
            <span className="text-indigo-400 text-xs mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">◆</span>
            <p className="text-slate-700 leading-relaxed text-[15px] flex-grow">{parts}</p>
          </div>
        );
      }
      
      // Horizontal Rules (Subtle separators)
      if (line.trim() === '---') {
        return <div key={i} className="my-10 border-t border-slate-100" />;
      }
      
      // Empty lines (Visual breathing space)
      if (line.trim().length === 0) {
        return <div key={i} className="h-2" />;
      }
      
      // Contact / Social block
      if (line.includes('📍') || line.includes('·') || line.includes('✉️')) {
        return (
          <p key={i} className="text-[13px] text-center text-slate-400 mb-10 font-medium tracking-widest uppercase flex justify-center flex-wrap gap-x-4 gap-y-2">
            {line.split('·').map((item, idx) => (
              <span key={idx} className="hover:text-indigo-600 transition-colors cursor-default">{item.trim()}</span>
            ))}
          </p>
        );
      }

      // Paragraph text (Summary / Skills)
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-indigo-950">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return <p key={i} className="text-slate-600 mb-4 leading-relaxed text-[15px] font-normal">{parts}</p>;
    });
  };

  return (
    <div className="max-w-6xl mx-auto mb-24 px-4">
      {/* Control Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 no-print">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 font-bold transition-all uppercase text-[11px] tracking-[0.2em]"
        >
          <div className="p-2 rounded-full bg-white border border-slate-100 group-hover:border-indigo-100 group-hover:shadow-sm transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Refine Strategy
        </button>
        
        <div className="flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={handleCopy}
            title="Copy source markdown"
            className="flex items-center gap-2 bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600 px-5 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-300" />}
            {copied ? 'Copied' : 'Copy MD'}
          </button>

          <button
            onClick={handleDownloadMD}
            title="Download as Markdown file"
            className="flex items-center gap-2 bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600 px-5 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-300" />
            Download .MD
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-3 bg-indigo-950 hover:bg-indigo-900 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-indigo-900/20 transition-all font-bold text-xs uppercase tracking-widest active:scale-95"
          >
            <Printer className="w-4 h-4" /> Finalize to PDF
          </button>
        </div>
      </div>

      {/* The Resume Page (Styled for A4 Feel) */}
      <div className="bg-white p-12 md:p-20 lg:p-24 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-xl border border-slate-50 min-h-[1100px] resume-container mx-auto relative overflow-hidden">
        {/* Subtle decorative elements for the "Elite" look */}
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-950 no-print" />
        
        <div className="max-w-4xl mx-auto">
          {renderMarkdown(markdown)}
        </div>
        
        {/* Page Footer Note */}
        <div className="mt-16 pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-medium">
            Proprietary EliteResume AI Document Strategy · 2026 Edition
          </p>
        </div>
      </div>

      {/* Post-Generation Advice */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="bg-indigo-50/50 border border-indigo-100/50 p-8 rounded-3xl">
          <h5 className="font-serif font-bold text-indigo-950 text-lg mb-2">Visual Performance</h5>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your document uses a <strong>Golden Ratio</strong> vertical rhythm. Key achievements are highlighted using <strong>semantic weight</strong> to ensure that even a cursory glance by a human or AI parser captures your highest-value contributions.
          </p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl">
          <h5 className="font-serif font-bold text-slate-900 text-lg mb-2">Export Integrity</h5>
          <p className="text-slate-500 text-sm leading-relaxed">
            Use the <strong>Finalize to PDF</strong> option for a standard professional submission. The <strong>Download .MD</strong> option allows you to maintain a local, version-controlled source of your professional brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
