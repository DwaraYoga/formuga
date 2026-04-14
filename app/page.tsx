'use client';

import { Instagram, Mail, MapPin, ArrowRight, ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

// CSS Animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-fade-in-scale {
    animation: fadeInScale 0.8s ease-out forwards;
  }

  .opacity-0 {
    opacity: 0;
  }
`;

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=34.02.03.2001"
        );
        const result = await res.json();
        console.log("API Response:", result);
        const cuacaData = result.data[0].cuaca.flat();
        setData(cuacaData);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        console.log("Fetch attempt completed");
      }
    };

    fetchData();
  }, []);

const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 5;
  };

  const itemsPerPage = getItemsPerPage();
  const maxIndex = Math.max(0, data.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observe semua section dengan ID
    const observableSections = document.querySelectorAll('section[id], footer[id]');
    observableSections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Tombol Back to Top
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <style>{styles}</style>
      <div className='fixed bottom-8 right-8 z-100'>
      <button
        onClick={scrollToTop}
        className={`
          group flex items-center justify-center
          w-14 h-14 rounded-full 
          bg-white border border-slate-100 shadow-2xl shadow-slate-200/50
          hover:bg-slate-900 hover:text-white transition-all duration-500
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
        `}
        aria-label="Back to top"
      >
        <div className="relative flex flex-col items-center">
          <ArrowUp 
            size={20} 
            className="group-hover:-translate-y-1 transition-transform duration-300" 
          />
          <span className="absolute top-6 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Top
          </span>
        </div>
      </button>
    </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <a href="/admin" className="font-bold tracking-tighter text-xl">FORMUGA</a>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#sejarah" className="hover:text-black transition">Profil</a>
            <a href="#visi" className="hover:text-black transition">Visi Misi</a>
            <a href="#kontak" className="hover:text-black transition text-slate-900 underline underline-offset-4">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 animate-fade-in-scale"
              style={{ animationDelay: '0s' }}>
            Official Community Website
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] leading-none text-slate-900 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}>
            Formuga <br /> 
            <span className="text-slate-800 italic font-light text-5xl tracking-tight">Forum Muda Mudi Genting Utara.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}>
            Merajut Kebersamaan, Menggapai Harapan. <br />
            Wadah kolaborasi pemuda untuk masa depan desa yang lebih cerah.
          </p>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-slate-300 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      <section id="bmkg" className={`py-16 px-4 bg-slate-50 ${visibleSections['sejarah'] ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Prakiraan Cuaca</h2>
            <p className="text-blue-600 font-medium">Kelurahan Tirtomulyo</p>
          </div>

          {/* Container Utama dengan padding horizontal agar tombol tidak terpotong */}
          <div className="relative px-2 sm:px-12"> 
            {data.length > 0 ? (
              <>
                {/* Tombol Navigasi Kiri */}
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white shadow-lg rounded-full transition-all duration-300 border border-slate-100 ${
                    currentIndex === 0 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Viewport Mask (Hanya bagian ini yang overflow-hidden) */}
                <div className="overflow-hidden py-4"> 
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ 
                      transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 2 : 5))}%)` 
                    }}
                  >
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="w-1/2 md:w-1/5 flex-none px-2"
                      >
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.weather_desc}
                            className="w-12 h-12 md:w-14 md:h-14 mb-3 object-contain"
                          />
                          <span className="font-bold text-slate-700 text-sm md:text-base">
                            {new Date(item.local_datetime).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="font-bold text-slate-700 text-sm md:text-base">
                            {new Date(item.local_datetime).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                          <span className="text-[10px] md:text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
                            {item.weather_desc}
                          </span>
                          <div className="flex gap-2 text-[10px] md:text-xs text-slate-500 font-medium border-t border-slate-50 pt-2 w-full justify-center">
                            <span>🌡️ {item.t}°</span>
                            <span className="text-slate-300">|</span>
                            <span>💧 {item.hu}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Navigasi Kanan */}
                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= data.length - (window.innerWidth < 768 ? 2 : 5)}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white shadow-lg rounded-full transition-all duration-300 border border-slate-100 ${
                    currentIndex >= data.length - (window.innerWidth < 768 ? 2 : 5) ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-slate-400 font-medium">Sinkronisasi data BMKG...</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEJARAH - LARGE & CLEAN */}
      <section id="sejarah" className={`py-32 px-8 bg-slate-50 ${visibleSections['sejarah'] ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <h2 className="text-4xl font-bold tracking-tight">Sejarah Kami.</h2>
          <p className="text-xl leading-relaxed text-slate-600 font-light italic">
            "Berdiri sejak tahun 2017, Formuga (Forum Muda Mudi Genting Utara) lahir dari kerinduan akan sinergi antar pemuda desa untuk berkontribusi secara nyata di bidang sosial, budaya, dan ekonomi."
          </p>
        </div>
      </section>

      {/* TUJUAN - GRID LAYOUT */}
      <section id="tujuan" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-1px bg-slate-100 border border-slate-100">
            {[
              { title: "Kebersamaan", desc: "Menjadi wadah kreativitas dan pengembangan diri yang inklusif." },
              { title: "Peran Aktif", desc: "Mendorong partisipasi muda-mudi dalam pembangunan ekonomi desa." },
              { title: "Karakter", desc: "Membentuk generasi berdaya saing, berakhlak, dan peduli lingkungan." },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`bg-white p-16 group hover:bg-slate-50 transition-colors ${visibleSections['tujuan'] ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: visibleSections['tujuan'] ? `${i * 0.15}s` : '0s' }}
              >
                <span className="text-slate-300 font-mono text-sm block mb-10">0{i+1}</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section id="visi" className={`py-32 px-8 bg-slate-900 text-white rounded-[3rem] mx-4 mb-4 ${visibleSections['visi'] ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
              <div 
                key={i} 
                className={`flex gap-6 border-t border-slate-800 pt-8 ${visibleSections['visi'] ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: visibleSections['visi'] ? `${i * 0.15}s` : '0s' }}
              >
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
      <footer id="kontak" className={`py-32 px-8 ${visibleSections['kontak'] ? 'animate-fade-in-up' : 'opacity-0'}`}>
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