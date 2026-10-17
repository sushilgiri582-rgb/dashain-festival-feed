import React from 'react';
import { Mail, MessageCircle, ExternalLink, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onTriggerConfetti: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onTriggerConfetti }) => {
  return (
    <footer className="border-t border-amber-900/10 bg-white dark:border-stone-800 dark:bg-stone-950 text-stone-600 dark:text-stone-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-200/80 dark:border-stone-800">
          
          {/* Brand & Platform Management */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-50 font-bold text-lg">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-600 to-red-600 text-sm text-white">
                🪔
              </span>
              <span className="font-['Playfair_Display',Georgia,serif]">Mero Dashain & Tihar</span>
            </div>
            
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md">
              A community celebration portal uniting Nepali families and the worldwide diaspora with cultural stories, Sayapatri memories, Jamara blessings, and sparkling Tihar lights.
            </p>

            <div className="mt-4 rounded-xl border border-amber-300/80 bg-amber-50/60 p-3 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 inline-block">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Platform Managed by Sushil Giri</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
              Explore Platform
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#feed-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Global Community Feed
                </a>
              </li>
              <li>
                <a href="#traditions-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Dashain & Tihar Traditions
                </a>
              </li>
              <li>
                <a href="#creator-section" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Creator Official Profile
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onTriggerConfetti}
                  className="text-left text-amber-700 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
                >
                  Trigger Sayapatri Blessing Shower 🌸
                </button>
              </li>
            </ul>
          </div>

          {/* Official Creator Contacts */}
          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
              Creator Official Contacts
            </div>
            
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/9779860228005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp: +977 9860228005 (Click to Chat)</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/share/1B549JJvEa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Facebook: Sushil Giri Profile</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:sushilgiri582@gmail.com"
                  className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email: sushilgiri582@gmail.com</span>
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[11px] text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 underline"
              >
                Owner / Admin Portal Access
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-3">
          <div>
            © {new Date().getFullYear()} Mero Dashain & Tihar Global Feed. Platform Managed by Sushil Giri.
          </div>
          <div className="flex items-center gap-4">
            <span>May peace, health, and prosperity reign in every household.</span>
            <span>🇳🇵 शुभ विजया दशमी तथा शुभ दिपावली</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
