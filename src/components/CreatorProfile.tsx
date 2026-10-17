import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, MessageCircle, ShieldCheck, Heart, Copy, Check } from 'lucide-react';

export const CreatorProfile: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="creator-section" className="py-14 border-t border-amber-900/10 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-amber-300/60 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 p-6 sm:p-10 shadow-lg dark:border-amber-900/50 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 p-1 shadow-xl">
                  <div className="h-full w-full rounded-2xl bg-stone-900 flex flex-col items-center justify-center text-white p-2">
                    <span className="text-3xl mb-1">🪔</span>
                    <span className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-amber-200">
                      Sushil Giri
                    </span>
                    <span className="text-[10px] text-stone-400">Platform Manager</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 text-white shadow-md">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>

              <h3 className="mt-4 font-['Playfair_Display',Georgia,serif] text-xl font-bold text-stone-900 dark:text-stone-50">
                Sushil Giri
              </h3>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                Platform Manager & Community Lead
              </p>
              <div className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                Dedicated to connecting Nepalis worldwide for Dashain & Tihar celebrations
              </div>

              {/* Admin Access Shortcut */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:border-amber-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-stone-100 transition-colors shadow-2xs"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                <span>Admin Login Portal</span>
              </button>
            </div>

            {/* Official Contact Details */}
            <div className="lg:col-span-8">
              <div className="border-b border-stone-200/80 dark:border-stone-800 pb-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Official Creator & Contact Profile
                </span>
                <h4 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  Platform Managed by Sushil Giri
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Have questions, want to partner, suggest community initiatives, or report an entry? Reach out directly through the official channels below:
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/9779860228005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-emerald-500 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      WhatsApp Chat
                    </div>
                    <div className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-0.5">
                      +977 9860228005
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                    Click to Chat Directly →
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1B549JJvEa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-stone-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Facebook Profile
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 truncate">
                      Sushil Giri Official
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-blue-700 dark:text-blue-400 group-hover:underline">
                    Connect on Facebook →
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:sushilgiri582@gmail.com"
                  className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-red-500 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-stone-400 group-hover:text-red-600 transition-colors" />
                    </div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Email Address
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 truncate">
                      sushilgiri582@gmail.com
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-red-700 dark:text-red-400 group-hover:underline">
                    Send Direct Email →
                  </div>
                </a>

              </div>

              {/* Quick Copy Action */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span>Quick Copy:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('+9779860228005', 'phone')}
                  className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 font-mono text-stone-800 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200"
                >
                  {copied === 'phone' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>+977 9860228005</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard('sushilgiri582@gmail.com', 'email')}
                  className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 font-mono text-stone-800 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200"
                >
                  {copied === 'email' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>sushilgiri582@gmail.com</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
