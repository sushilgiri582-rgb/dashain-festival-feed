/**
 * High-fidelity vector illustrations encoded as clean SVG data URIs
 * for authentic Dashain and Tihar imagery. Completely resilient and sandbox-safe.
 */

export const FESTIVE_ARTWORKS = {
  dashain_tika: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#451a03" />
      <stop offset="60%" stop-color="#1c1917" />
      <stop offset="100%" stop-color="#0c0a09" />
    </radialGradient>
    <radialGradient id="brassPlate" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="85%" stop-color="#854d0e" />
      <stop offset="100%" stop-color="#422006" />
    </radialGradient>
    <radialGradient id="tikaRed" cx="35%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#f87171" />
      <stop offset="40%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </radialGradient>
    <linearGradient id="jamaraGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="50%" stop-color="#84cc16" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
    <radialGradient id="diyaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#b45309" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlow)" />

  <!-- Ambient light circles -->
  <circle cx="200" cy="180" r="160" fill="url(#diyaGlow)" opacity="0.4" />
  <circle cx="620" cy="420" r="140" fill="url(#diyaGlow)" opacity="0.3" />

  <!-- Brass Thali (Plate) -->
  <ellipse cx="400" cy="340" rx="320" ry="200" fill="#291807" opacity="0.6" filter="blur(15px)" />
  <ellipse cx="400" cy="330" rx="310" ry="190" fill="url(#brassPlate)" stroke="#fef08a" stroke-width="4" />
  <ellipse cx="400" cy="330" rx="275" ry="165" fill="#ca8a04" opacity="0.7" stroke="#fef08a" stroke-dasharray="8 6" stroke-width="2" />
  <ellipse cx="400" cy="330" rx="250" ry="145" fill="#854d0e" opacity="0.5" />

  <!-- Fresh Golden-Green Jamara Sprouts (Lush Barley shoots) -->
  <g transform="translate(420, 280)">
    ${Array.from({ length: 48 }).map((_, i) => {
      const angle = (i * 7.5) - 180;
      const rad = (angle * Math.PI) / 180;
      const x1 = Math.cos(rad) * 60;
      const y1 = Math.sin(rad) * 35;
      const x2 = x1 + Math.cos(rad) * (70 + (i % 6) * 15);
      const y2 = y1 - (60 + (i % 5) * 18);
      const cpX = (x1 + x2) / 2 + ((i % 4) - 2) * 12;
      const cpY = (y1 + y2) / 2 - 20;
      return `<path d="M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}" stroke="url(#jamaraGrad)" stroke-width="${3 + (i % 3)}" stroke-linecap="round" fill="none" opacity="0.9" />`;
    }).join('\n')}
  </g>

  <!-- Crimson Red Rice Tika (Akshata) Mound -->
  <ellipse cx="320" cy="330" rx="75" ry="50" fill="url(#tikaRed)" />
  ${Array.from({ length: 42 }).map((_, i) => {
    const ox = 320 + ((i * 19) % 110) - 55;
    const oy = 330 + ((i * 23) % 70) - 35;
    const r = 2.5 + (i % 2.5);
    return `<ellipse cx="${ox}" cy="${oy}" rx="${r * 1.4}" ry="${r * 0.9}" fill="#fecaca" transform="rotate(${i * 35} ${ox} ${oy})" opacity="0.9" />`;
  }).join('\n')}

  <!-- Fresh Sayapatri (Marigold) Garland Flowers -->
  <g id="marigolds">
    <!-- Center flower -->
    <circle cx="210" cy="310" r="38" fill="#ea580c" />
    <circle cx="210" cy="310" r="32" fill="#f59e0b" />
    <circle cx="210" cy="310" r="24" fill="#fbbf24" />
    <circle cx="210" cy="310" r="14" fill="#fef08a" />

    <!-- Top flower -->
    <circle cx="380" cy="220" r="32" fill="#ea580c" />
    <circle cx="380" cy="220" r="26" fill="#f59e0b" />
    <circle cx="380" cy="220" r="18" fill="#fbbf24" />
    <circle cx="380" cy="220" r="10" fill="#fef08a" />

    <!-- Right flower -->
    <circle cx="560" cy="320" r="36" fill="#ea580c" />
    <circle cx="560" cy="320" r="30" fill="#f59e0b" />
    <circle cx="560" cy="320" r="22" fill="#fbbf24" />
    <circle cx="560" cy="320" r="12" fill="#fef08a" />
  </g>

  <!-- Brass Diya (Oil lamp) with dancing flame -->
  <g transform="translate(140, 200)">
    <circle cx="0" cy="0" r="60" fill="url(#diyaGlow)" />
    <!-- Clay lamp body -->
    <path d="M -35 15 C -25 35 25 35 35 15 C 30 10 -30 10 -35 15 Z" fill="#9a3412" stroke="#ea580c" stroke-width="2" />
    <!-- Flame -->
    <path d="M 0 12 C -12 2 -8 -18 0 -35 C 8 -18 12 2 0 12 Z" fill="#fef08a" />
    <path d="M 0 10 C -6 2 -4 -10 0 -22 C 4 -10 6 2 0 10 Z" fill="#f59e0b" />
    <path d="M 0 8 C -3 3 -2 -4 0 -10 C 2 -4 3 3 0 8 Z" fill="#ef4444" />
  </g>

  <!-- Festival Text Typography Watermark (Subtle & Elegant) -->
  <text x="400" y="540" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#fef08a" opacity="0.95" letter-spacing="3">VIJAYA DASHAMI</text>
  <text x="400" y="568" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#fde047" opacity="0.75" letter-spacing="5">TIKA · JAMARA · BLESSINGS</text>
</svg>
`) }`,

  tihar_lights: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="nightSky" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="45%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.5" />
      <stop offset="80%" stop-color="#ea580c" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="rangoliG1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#be185d" />
    </linearGradient>
    <linearGradient id="rangoliG2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <linearGradient id="rangoliG3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#eab308" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#nightSky)" />

  <!-- Twinkling stars / fairy lights string on top -->
  <path d="M 0 50 Q 200 120 400 60 T 800 50" fill="none" stroke="#ca8a04" stroke-width="1.5" opacity="0.6" />
  ${Array.from({ length: 24 }).map((_, i) => {
    const x = i * 35;
    const y = 50 + Math.sin(i * 0.5) * 22;
    const colors = ['#fde047', '#38bdf8', '#f43f5e', '#a855f7', '#4ade80'];
    const col = colors[i % colors.length];
    return `
      <circle cx="${x}" cy="${y + 12}" r="8" fill="${col}" opacity="0.3" />
      <circle cx="${x}" cy="${y + 12}" r="3.5" fill="${col}" />
      <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 9}" stroke="#ca8a04" stroke-width="1" />
    `;
  }).join('\n')}

  <!-- Huge Center Rangoli Mandala -->
  <g transform="translate(400, 310)">
    <!-- Base dark floor glow -->
    <circle cx="0" cy="0" r="220" fill="url(#lampGlow)" opacity="0.8" />
    
    <!-- Outer concentric ring -->
    <circle cx="0" cy="0" r="190" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="6 4" opacity="0.8" />
    <circle cx="0" cy="0" r="175" fill="#831843" opacity="0.75" />
    <circle cx="0" cy="0" r="175" fill="none" stroke="#f472b6" stroke-width="2" />

    <!-- 16 Petals in Outer Ring -->
    ${Array.from({ length: 16 }).map((_, i) => {
      const rot = i * (360 / 16);
      return `
        <g transform="rotate(${rot})">
          <path d="M -18 -120 C -25 -160 25 -160 18 -120 Z" fill="url(#rangoliG1)" stroke="#fbcfe8" stroke-width="1.5" />
          <circle cx="0" cy="-145" r="4" fill="#fef08a" />
        </g>
      `;
    }).join('\n')}

    <!-- Middle Geometric Star & Flower -->
    <circle cx="0" cy="0" r="115" fill="#164e63" opacity="0.85" stroke="#38bdf8" stroke-width="2" />
    ${Array.from({ length: 8 }).map((_, i) => {
      const rot = i * (360 / 8);
      return `
        <g transform="rotate(${rot})">
          <path d="M 0 -115 L 25 -65 L -25 -65 Z" fill="url(#rangoliG2)" stroke="#a5f3fc" stroke-width="1.5" />
          <circle cx="0" cy="-70" r="6" fill="#facc15" />
        </g>
      `;
    }).join('\n')}

    <!-- Inner Core & Lotus Petals -->
    <circle cx="0" cy="0" r="65" fill="#713f12" stroke="#facc15" stroke-width="2" />
    ${Array.from({ length: 8 }).map((_, i) => {
      const rot = i * (360 / 8) + 22.5;
      return `
        <g transform="rotate(${rot})">
          <path d="M -12 -25 C -15 -60 15 -60 12 -25 Z" fill="url(#rangoliG3)" stroke="#fef08a" stroke-width="1" />
        </g>
      `;
    }).join('\n')}

    <!-- Center Sacred Diya Lamp -->
    <circle cx="0" cy="0" r="30" fill="url(#lampGlow)" />
    <ellipse cx="0" cy="5" rx="20" ry="12" fill="#9a3412" stroke="#ea580c" stroke-width="2" />
    <path d="M 0 5 C -8 -4 -6 -20 0 -32 C 6 -20 8 -4 0 5 Z" fill="#fef08a" />
    <path d="M 0 4 C -4 -2 -3 -12 0 -22 C 3 -12 4 -2 0 4 Z" fill="#f59e0b" />
  </g>

  <!-- 8 Clay Diyas Arranged Around Mandala with warm lights -->
  ${Array.from({ length: 8 }).map((_, i) => {
    const angle = i * (Math.PI / 4) + (Math.PI / 8);
    const cx = 400 + Math.cos(angle) * 225;
    const cy = 310 + Math.sin(angle) * 225;
    return `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="45" fill="url(#lampGlow)" opacity="0.9" />
        <ellipse cx="0" cy="8" rx="18" ry="10" fill="#78350f" stroke="#b45309" stroke-width="1.5" />
        <path d="M 0 8 C -7 0 -5 -14 0 -24 C 5 -14 7 0 0 8 Z" fill="#fef08a" />
        <path d="M 0 7 C -3 0 -2 -8 0 -15 C 2 -8 3 0 0 7 Z" fill="#f97316" />
      </g>
    `;
  }).join('\n')}

  <!-- Text inscription -->
  <text x="400" y="550" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#fef08a" opacity="0.95" letter-spacing="3">TIHAR & DEEPAWALI</text>
  <text x="400" y="575" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#fbbf24" opacity="0.75" letter-spacing="4">LIGHTS · DIYA · RANGOLI · LAXMI PUJA</text>
</svg>
`) }`,

  himalayan_village_ping: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="40%" stop-color="#38bdf8" />
      <stop offset="70%" stop-color="#fde047" />
      <stop offset="100%" stop-color="#f97316" />
    </linearGradient>
    <linearGradient id="snowPeak" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#93c5fd" />
    </linearGradient>
    <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="100%" stop-color="#14532d" />
    </linearGradient>
    <linearGradient id="hill2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#166534" />
    </linearGradient>
    <linearGradient id="hillFore" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" />
      <stop offset="30%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="70%" stop-color="#f97316" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Golden Autumn Sky -->
  <rect width="800" height="600" fill="url(#skyGrad)" />

  <!-- Golden Setting Sun -->
  <circle cx="580" cy="220" r="140" fill="url(#sunGlow)" />
  <circle cx="580" cy="220" r="45" fill="#fef08a" />

  <!-- Distant Snowy Himalayas (Machapuchare / Annapurna style) -->
  <polygon points="120,320 230,140 340,320" fill="url(#snowPeak)" opacity="0.9" />
  <polygon points="280,320 420,110 560,320" fill="url(#snowPeak)" />
  <polygon points="490,320 600,160 710,320" fill="url(#snowPeak)" opacity="0.85" />
  <!-- Mountain shadows -->
  <polygon points="420,110 420,320 560,320" fill="#64748b" opacity="0.35" />
  <polygon points="230,140 230,320 340,320" fill="#64748b" opacity="0.3" />

  <!-- Layered Terraced Hills -->
  <path d="M 0 340 Q 200 300 450 350 T 800 320 L 800 600 L 0 600 Z" fill="url(#hill1)" />
  <path d="M 0 390 Q 280 340 550 400 T 800 370 L 800 600 L 0 600 Z" fill="url(#hill2)" opacity="0.95" />

  <!-- Traditional Nepali Red-Clay Village Houses -->
  <g transform="translate(180, 380)">
    <!-- House 1 -->
    <rect x="0" y="30" width="80" height="50" fill="#ea580c" />
    <polygon points="-10,30 40,0 90,30" fill="#991b1b" stroke="#7f1d1d" stroke-width="2" />
    <!-- White mud upper half & wooden balcony -->
    <rect x="0" y="30" width="80" height="22" fill="#fffbeb" />
    <rect x="25" y="55" width="20" height="25" fill="#451a03" />
    <rect x="10" y="35" width="14" height="12" fill="#78350f" />
    <rect x="55" y="35" width="14" height="12" fill="#78350f" />
    <!-- Sayapatri garland on eaves -->
    <path d="M -5 32 Q 40 42 85 32" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="6 3" />
  </g>

  <g transform="translate(290, 410)">
    <!-- House 2 -->
    <rect x="0" y="25" width="65" height="42" fill="#c2410c" />
    <polygon points="-8,25 32,0 73,25" fill="#b91c1c" stroke="#991b1b" stroke-width="2" />
    <rect x="0" y="25" width="65" height="18" fill="#fef3c7" />
    <rect x="22" y="45" width="18" height="22" fill="#451a03" />
    <path d="M -4 27 Q 32 35 69 27" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-dasharray="5 2" />
  </g>

  <!-- Foreground Green Ridge -->
  <path d="M 0 460 Q 350 420 800 450 L 800 600 L 0 600 Z" fill="url(#hillFore)" />

  <!-- Traditional Bamboo Swing (Linge Ping) on Hilltop -->
  <g transform="translate(560, 310)">
    <!-- Four Giant Bamboo Poles -->
    <line x1="-50" y1="210" x2="30" y2="10" stroke="#ca8a04" stroke-width="8" stroke-linecap="round" />
    <line x1="-30" y1="210" x2="35" y2="10" stroke="#a16207" stroke-width="7" stroke-linecap="round" />
    <line x1="110" y1="210" x2="35" y2="10" stroke="#ca8a04" stroke-width="8" stroke-linecap="round" />
    <line x1="90" y1="210" x2="30" y2="10" stroke="#a16207" stroke-width="7" stroke-linecap="round" />
    <!-- Top Junction Ring -->
    <circle cx="33" cy="10" r="12" fill="#713f12" stroke="#eab308" stroke-width="3" />
    
    <!-- Swaying Jute Rope & Wooden Seat -->
    <path d="M 33 15 Q 15 100 20 155" fill="none" stroke="#78350f" stroke-width="4.5" />
    <rect x="10" y="155" width="22" height="7" rx="2" fill="#451a03" transform="rotate(-8 20 155)" />

    <!-- Villager swinging happily in Dhaka / Nepali dress -->
    <circle cx="21" cy="132" r="7" fill="#fbcfe8" />
    <polygon points="17,126 25,124 23,130" fill="#dc2626" /> <!-- Dhaka Topi -->
    <path d="M 21 139 L 20 155 L 14 172" stroke="#dc2626" stroke-width="5" stroke-linecap="round" />
    <path d="M 20 155 L 28 170" stroke="#fff" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Marigold bush in bottom corner -->
  <g transform="translate(40, 500)">
    ${Array.from({ length: 12 }).map((_, i) => {
      const bx = (i * 22) % 180;
      const by = Math.sin(i * 1.2) * 20;
      return `
        <circle cx="${bx}" cy="${by}" r="15" fill="#ea580c" />
        <circle cx="${bx}" cy="${by}" r="11" fill="#f59e0b" />
        <circle cx="${bx}" cy="${by}" r="6" fill="#fef08a" />
      `;
    }).join('\n')}
  </g>

  <!-- Inscription -->
  <text x="400" y="550" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#ffffff" opacity="0.95" letter-spacing="3">NEPAL FESTIVE HILLS</text>
  <text x="400" y="575" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#fef08a" opacity="0.8" letter-spacing="4">LINGE PING · TERRACED VILLAGE · TRADITIONS</text>
</svg>
`) }`,

  diaspora_gathering: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="roomGlow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#451a03" />
      <stop offset="50%" stop-color="#27180b" />
      <stop offset="100%" stop-color="#0c0a09" />
    </radialGradient>
    <radialGradient id="lampWarm" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="40%" stop-color="#fde047" stop-opacity="0.8" />
      <stop offset="80%" stop-color="#ea580c" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#roomGlow)" />

  <!-- Modern Panoramic Window looking over glowing city abroad -->
  <rect x="80" y="60" width="300" height="240" rx="8" fill="#090d16" stroke="#475569" stroke-width="4" />
  <!-- City skyline silhouette -->
  <polygon points="90,300 120,180 150,180 150,300" fill="#1e293b" />
  <polygon points="160,300 190,140 220,140 220,300" fill="#334155" />
  <polygon points="230,300 260,200 290,200 290,300" fill="#1e293b" />
  <polygon points="300,300 330,160 360,160 360,300" fill="#334155" />
  <!-- City window pin lights -->
  ${Array.from({ length: 30 }).map((_, i) => {
    const cx = 110 + (i * 17) % 240;
    const cy = 170 + ((i * 29) % 110);
    return `<circle cx="${cx}" cy="${cy}" r="2" fill="#fef08a" opacity="0.75" />`;
  }).join('\n')}

  <!-- Warm Festive Feast Table -->
  <ellipse cx="400" cy="460" rx="340" ry="120" fill="#431407" stroke="#78350f" stroke-width="4" />
  <ellipse cx="400" cy="455" rx="320" ry="105" fill="#78350f" opacity="0.6" />

  <!-- Brass Thali with Sel Roti & Sweets -->
  <g transform="translate(400, 440)">
    <circle cx="0" cy="0" r="80" fill="url(#lampWarm)" opacity="0.4" />
    <ellipse cx="0" cy="0" rx="70" ry="40" fill="#ca8a04" stroke="#fef08a" stroke-width="2" />
    <!-- Sel Roti (Nepali ring-shaped sweet fried bread) -->
    <path d="M 0 0 C 30 -20 30 20 0 20 C -30 20 -30 -20 0 -20" fill="none" stroke="#b45309" stroke-width="14" stroke-linecap="round" />
    <path d="M 0 0 C 30 -20 30 20 0 20 C -30 20 -30 -20 0 -20" fill="none" stroke="#d97706" stroke-width="10" stroke-linecap="round" />
  </g>

  <!-- Diaspora Family Gathering Avatars in Dhaka & Saree -->
  <!-- Father / Elder with Dhaka Topi -->
  <g transform="translate(490, 240)">
    <circle cx="0" cy="0" r="32" fill="#fbcfe8" />
    <!-- Dhaka Topi -->
    <polygon points="-24,-16 0,-44 24,-16" fill="#b91c1c" stroke="#fef08a" stroke-width="1.5" />
    <path d="M -10 -30 L 10 -30" stroke="#fef08a" stroke-width="1" />
    <!-- Kurtha -->
    <path d="M -35 32 C -20 80 20 80 35 32 Z" fill="#15803d" />
    <!-- Sayapatri Mala Garland around neck -->
    <path d="M -26 32 Q 0 68 26 32" fill="none" stroke="#f59e0b" stroke-width="8" stroke-dasharray="10 3" />
  </g>

  <!-- Mother / Daughter in Festive Red Saree -->
  <g transform="translate(620, 260)">
    <circle cx="0" cy="0" r="28" fill="#fbcfe8" />
    <!-- Red Vermilion Tika on forehead -->
    <circle cx="0" cy="-6" r="4" fill="#dc2626" />
    <!-- Festive hair bun & flower -->
    <circle cx="18" cy="-10" r="10" fill="#f59e0b" />
    <!-- Red Saree / Pote -->
    <path d="M -30 28 C -15 75 15 75 30 28 Z" fill="#dc2626" />
    <path d="M -22 28 Q 0 60 22 28" fill="none" stroke="#fbbf24" stroke-width="6" stroke-dasharray="8 2" />
  </g>

  <!-- Warm ambient hanging festive lanterns -->
  <g transform="translate(400, 70)">
    <line x1="0" y1="0" x2="0" y2="40" stroke="#ca8a04" stroke-width="2" />
    <circle cx="0" cy="65" r="50" fill="url(#lampWarm)" />
    <polygon points="-20,40 20,40 30,75 -30,75" fill="#ea580c" />
    <polygon points="-30,75 30,75 0,105" fill="#c2410c" />
    <circle cx="0" cy="75" r="10" fill="#fef08a" />
  </g>

  <!-- Typography -->
  <text x="400" y="555" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#fef08a" opacity="0.95" letter-spacing="3">GLOBAL NEPALI DIASPORA</text>
  <text x="400" y="580" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#fde047" opacity="0.75" letter-spacing="4">CELEBRATING TOGETHER WORLDWIDE</text>
</svg>
`) }`,

  bhai_tika: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="btBg" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#3b0764" />
      <stop offset="60%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090514" />
    </radialGradient>
    <radialGradient id="sacredAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde047" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#d946ef" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#btBg)" />

  <!-- Sacred Circle of Mustard Oil & Water (Traditional Boundary) -->
  <circle cx="400" cy="300" r="230" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="8 6" opacity="0.7" />
  <circle cx="400" cy="300" r="240" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.5" />

  <!-- Center Sacred Aura -->
  <circle cx="400" cy="300" r="160" fill="url(#sacredAura)" />

  <!-- Traditional Kalash (Brass pot with Mango leaves and Coconut) -->
  <g transform="translate(400, 270)">
    <!-- Mango leaves -->
    <path d="M 0 -40 Q -40 -90 -50 -120 Q -10 -90 0 -40" fill="#15803d" />
    <path d="M 0 -40 Q 40 -90 50 -120 Q 10 -90 0 -40" fill="#16a34a" />
    <path d="M 0 -40 Q 0 -105 0 -130 Q 15 -90 0 -40" fill="#22c55e" />
    <!-- Sacred Coconut with Red Cloth -->
    <circle cx="0" cy="-65" r="26" fill="#78350f" />
    <circle cx="0" cy="-65" r="18" fill="#dc2626" />
    <!-- Brass Kalash body -->
    <ellipse cx="0" cy="0" rx="45" ry="35" fill="#eab308" stroke="#ca8a04" stroke-width="2" />
    <path d="M -30 -25 L 30 -25 L 20 -40 L -20 -40 Z" fill="#ca8a04" />
    <!-- Swastika / Auspicious mark -->
    <path d="M -12 0 L 12 0 M 0 -12 L 0 12 M -12 -12 L -12 0 M 12 12 L 12 0 M 12 -12 L 0 -12 M -12 12 L 0 12" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" />
  </g>

  <!-- Makhamali (Globe Amaranth / Purple Everlasting) Garland -->
  <g transform="translate(400, 310)">
    ${Array.from({ length: 28 }).map((_, i) => {
      const angle = (i * (360 / 28) * Math.PI) / 180;
      const x = Math.cos(angle) * 190;
      const y = Math.sin(angle) * 130;
      return `
        <circle cx="${x}" cy="${y}" r="14" fill="#a21caf" />
        <circle cx="${x}" cy="${y}" r="10" fill="#c026d3" />
        <circle cx="${x}" cy="${y}" r="5" fill="#f472b6" />
      `;
    }).join('\n')}
  </g>

  <!-- Saptarangi Tika (Seven-colored vertical rainbow stripes) -->
  <g transform="translate(190, 220)">
    <rect x="-10" y="-10" width="80" height="180" rx="10" fill="#1e1b4b" stroke="#facc15" stroke-width="2" opacity="0.9" />
    <text x="30" y="15" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#fde047">SAPTARANGI</text>
    <!-- 7 Rainbow Tika powders in traditional order -->
    <line x1="30" y1="35" x2="30" y2="150" stroke="#dc2626" stroke-width="6" stroke-linecap="round" />
    <line x1="22" y1="40" x2="22" y2="145" stroke="#ea580c" stroke-width="5" stroke-linecap="round" />
    <line x1="14" y1="45" x2="14" y2="140" stroke="#facc15" stroke-width="5" stroke-linecap="round" />
    <line x1="38" y1="40" x2="38" y2="145" stroke="#16a34a" stroke-width="5" stroke-linecap="round" />
    <line x1="46" y1="45" x2="46" y2="140" stroke="#0284c7" stroke-width="5" stroke-linecap="round" />
    <line x1="6" y1="52" x2="6" y2="133" stroke="#4f46e5" stroke-width="4" stroke-linecap="round" />
    <line x1="54" y1="52" x2="54" y2="133" stroke="#9333ea" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Traditional Walnut (Okhar) & Puffed Rice (Baji/Masala) -->
  <g transform="translate(610, 280)">
    <circle cx="0" cy="0" r="60" fill="#ca8a04" stroke="#fde047" stroke-width="2" />
    <!-- Walnuts -->
    <ellipse cx="-15" cy="-10" rx="16" ry="12" fill="#78350f" stroke="#451a03" stroke-width="2" />
    <ellipse cx="15" cy="-5" rx="16" ry="12" fill="#78350f" stroke="#451a03" stroke-width="2" />
    <ellipse cx="0" cy="18" rx="18" ry="13" fill="#854d0e" stroke="#451a03" stroke-width="2" />
  </g>

  <!-- Typography -->
  <text x="400" y="545" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#fef08a" opacity="0.95" letter-spacing="3">SACRED BHAI TIKA</text>
  <text x="400" y="572" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#e879f9" opacity="0.8" letter-spacing="4">SEVEN COLORED TIKA · MAKHAMALI MALA · EVERLASTING BOND</text>
</svg>
`) }`
};
