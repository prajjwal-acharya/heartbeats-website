import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Mic2, Music, Guitar } from 'lucide-react';
import { generateLyrics, LyricsResponse } from '../services/geminiService';

const Ghostwriter: React.FC = () => {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('Classical Fusion');
  const [result, setResult] = useState<LyricsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!mood) return;

    setLoading(true);
    setError('');
    const response = await generateLyrics(mood, genre);
    if (response) {
      setResult(response);
    } else {
      setError('Connection to the muse interrupted. Try again later.');
    }
    setLoading(false);
  };

  return (
    <section id="ghostwriter" className="py-32 bg-[#050505] relative border-y border-white/5">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Controls */}
          <div className="reveal-text">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 border border-band-red/30 px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-band-red animate-pulse"></span>
                <span className="text-band-red font-mono text-xs tracking-widest uppercase">Gemini AI Powered</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-black uppercase mb-6 leading-tight">
                The Digital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-band-red to-purple-800">Pandit</span>
              </h2>
              <p className="text-neutral-400 text-lg font-light leading-relaxed">
                Unlock the chakras of creativity. Generate lyrics that blend the mysticism of the East with the grit of the West.
              </p>
            </div>

            <div className="space-y-8 bg-neutral-900/30 p-8 border border-white/5 backdrop-blur-sm">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-band-red transition-colors">
                  Input Vibe / Raga
                </label>
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g., A rainy night in Mumbai, electric sitar solo..."
                  className="w-full bg-transparent border-b border-neutral-700 text-white p-4 focus:outline-none focus:border-band-red transition-all placeholder:text-neutral-700 text-xl font-serif"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3 group-focus-within:text-band-red transition-colors">
                  Fusion Style
                </label>
                <div className="relative">
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-neutral-800 text-white p-4 focus:outline-none focus:border-band-red transition-colors appearance-none cursor-pointer hover:border-neutral-600"
                  >
                    <option>Classical Fusion</option>
                    <option>Bollywood Rock</option>
                    <option>Sufi Electronic</option>
                    <option>Psychedelic Folk</option>
                    <option>Desert Blues</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mic2 className="h-4 w-4 text-neutral-500" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !mood}
                className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-band-red hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Composing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" /> Invoke Muse
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Output Display */}
          <div className="relative h-full min-h-[500px] reveal-text" style={{ transitionDelay: '200ms' }}>
            {/* Decorative Border */}
            <div className="absolute -inset-1 bg-gradient-to-br from-band-red via-transparent to-purple-900 opacity-20 blur-lg"></div>

            <div className="relative h-full bg-[#0a0a0a] border border-neutral-800 p-10 flex flex-col">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Live Output</span>
                </div>
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(`${result.verse}\n\nChords: ${result.chords}\n\nSing like: ${result.referenceSong} - ${result.referenceArtist}`)}
                    className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                )}
              </div>

              <div className="flex-grow overflow-y-auto max-h-[600px] custom-scrollbar space-y-6">
                {error ? (
                  <div className="h-full flex flex-col items-center justify-center text-red-500">
                    <p className="text-center font-mono text-sm">{error}</p>
                  </div>
                ) : result ? (
                  <>
                    {/* Reference Song */}
                    <div className="bg-band-red/10 border border-band-red/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Music className="h-4 w-4 text-band-red" />
                        <span className="text-xs uppercase tracking-widest text-band-red font-bold">Sing Like</span>
                      </div>
                      <p className="text-xl font-serif text-white">
                        {result.referenceSong} <span className="text-neutral-400">—</span> <span className="text-neutral-300">{result.referenceArtist}</span>
                      </p>
                    </div>

                    {/* Raag Analysis */}
                    <div className="text-sm text-neutral-500 italic border-l-2 border-purple-500/50 pl-4">
                      {result.raagAnalysis}
                    </div>

                    {/* Verse */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Mic2 className="h-4 w-4 text-neutral-500" />
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Verse</span>
                      </div>
                      <div className="font-serif text-base md:text-lg text-neutral-200 whitespace-pre-wrap leading-loose italic min-h-[200px]">
                        {result.verse.split('\\n').map((line, idx) => (
                          <p key={idx} className="mb-1">{line}</p>
                        ))}
                      </div>
                    </div>

                    {/* Chords */}
                    <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Guitar className="h-4 w-4 text-amber-500" />
                        <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Chords</span>
                      </div>
                      <p className="font-mono text-lg text-amber-200">
                        {result.chords}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-800">
                    <Mic2 className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-center font-mono text-sm">
                      "Waiting for Raga parameters..."
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ghostwriter;