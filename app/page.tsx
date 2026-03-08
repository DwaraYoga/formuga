
import { Instagram, Mail, MapPin, ArrowRight, ArrowDown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <span className="font-bold tracking-tighter text-xl">FORMUGA</span>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#tentang" className="hover:text-black transition">Profil</a>
            <a href="#visi" className="hover:text-black transition">Visi Misi</a>
            <a href="#kontak" className="hover:text-black transition text-slate-900 underline underline-offset-4">Kontak</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Official Community Website
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] leading-none text-slate-900">
            Formuga <br /> 
            <span className="text-slate-300 italic font-medium tracking-tight">Genting Utara.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Merajut Kebersamaan, Menggapai Harapan. <br />
            Wadah kolaborasi pemuda untuk masa depan desa yang lebih cerah.
          </p>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-slate-300">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* SEJARAH - LARGE & CLEAN */}
      <section id="tentang" className="py-32 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <h2 className="text-4xl font-bold tracking-tight">Sejarah Kami.</h2>
          <p className="text-xl leading-relaxed text-slate-600 font-light italic">
            "Berdiri sejak tahun 2017, Formuga (Forum Muda Mudi Genting Utara) lahir dari kerinduan akan sinergi antar pemuda desa untuk berkontribusi secara nyata di bidang sosial, budaya, dan ekonomi."
          </p>
        </div>
      </section>

      {/* TUJUAN - GRID LAYOUT */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-1px bg-slate-100 border border-slate-100">
            {[
              { title: "Kebersamaan", desc: "Menjadi wadah kreativitas dan pengembangan diri yang inklusif." },
              { title: "Peran Aktif", desc: "Mendorong partisipasi muda-mudi dalam pembangunan ekonomi desa." },
              { title: "Karakter", desc: "Membentuk generasi berdaya saing, berakhlak, dan peduli lingkungan." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-16 group hover:bg-slate-50 transition-colors">
                <span className="text-slate-300 font-mono text-sm block mb-10">0{i+1}</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section id="visi" className="py-32 px-8 bg-slate-900 text-white rounded-[3rem] mx-4 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">Visi</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl">
              Mewujudkan generasi muda yang <span className="text-slate-400">kreatif, berdaya, dan berkontribusi nyata</span> untuk kemajuan masyarakat.
            </p>
          </div>

          <h2 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">Misi</h2>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">

            {[
              { t: "Solidaritas", d: "Membangun persaudaraan melalui kegiatan sosial, olahraga, dan seni." },
              { t: "Kontribusi", d: "Menginisiasi program bakti desa dan aksi kemanusiaan." },
              { t: "Kreativitas", d: "Mendorong karya nyata melalui inovasi teknologi dan seni." },
              { t: "Kemitraan", d: "Kolaborasi strategis dengan berbagai organisasi dan komunitas." },
            ].map((misi, i) => (
              <div key={i} className="flex gap-6 border-t border-slate-800 pt-8">
                <ArrowRight className="text-slate-600 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold mb-2 tracking-tight">{misi.t}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{misi.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK & FOOTER */}
      <footer id="kontak" className="py-32 px-8">
        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-32">
          <div className="flex flex-col md:flex-row justify-between gap-20">
            <div className="max-w-md">
              <h2 className="text-5xl font-bold tracking-tighter mb-8">Hubungi Kami.</h2>
              <p className="text-slate-500 font-light mb-12">
                Kami selalu terbuka untuk ide, saran, dan kolaborasi baru demi kemajuan Genting Utara.
              </p>
              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-4"><MapPin size={16}/> Genting, Tirtomulyo, Kretek, Bantul</div>
                <div className="flex items-center gap-4 text-slate-400"><Mail size={16}/> formuga2017@gmail.com</div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <a 
                href="https://instagram.com/formuga_" 
                className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                <Instagram size={20} />
                <span className="font-bold tracking-tight">@formuga_</span>
              </a>
              
              <div className="mt-20 text-right">
                <div className="font-black text-2xl tracking-tighter italic mb-2">FORMUGA</div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  © 2026 Genting Utara • Bantul • DIY
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}