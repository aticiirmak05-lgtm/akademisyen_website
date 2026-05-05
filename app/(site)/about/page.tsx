import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations'
import { User, Mail, Briefcase, GraduationCap, Code2, Sparkles, Building, ExternalLink } from 'lucide-react'

export const revalidate = 0

const experiences = [
  {
    company: 'Yıldız Teknik Üniversitesi',
    type: 'Tam zamanlı · 13 yıl 4 ay',
    roles: [
      {
        title: 'Tarihi Mirası Koruma Uygulama ve Araştırma Merkezi Yönetim Kurulu Üyesi',
        date: 'Oca 2025 - Devam ediyor'
      },
      {
        title: 'Bölüm Başkan Yardımcısı',
        date: 'Haz 2023 - Devam ediyor'
      },
      {
        title: 'Fakülte Yönetim Kurulu Üyesi',
        date: 'Eki 2022 - Devam ediyor'
      },
      {
        title: 'Doçent',
        date: 'Ağu 2020 - Devam ediyor'
      },
      {
        title: 'Dr. Öğr. Üyesi',
        date: 'Nis 2019 - Ağu 2020'
      },
      {
        title: 'Araştırma Görevlisi',
        date: 'Şub 2013 - Nis 2019'
      }
    ]
  },
  {
    company: 'COST Association - European Cooperation in Science and Technology',
    type: 'Dönemsel · 3 yıl 4 ay',
    roles: [
      {
        title: 'Yönetim Kurulu Üyesi',
        date: 'May 2024 - Devam ediyor',
        desc: 'CA23158 - Artistic Intelligence - Responsiveness, accessibility, responsibility, equity (ARTinRARE) Avrupa Birliği destekli projede Türkiye temsilcisi (Ulusal Koordinatör) olarak görev yapmaktayım.'
      },
      {
        title: 'Aksiyon Grubu Üyesi',
        date: 'Şub 2023 - Devam ediyor',
        desc: 'CA19119 - Investigation on comics and graphic novels in the iberian cultural area (iCOn-MICS) Avrupa Birliği destekli projede çalışma grubu üyesi olarak faaliyet göstermekteyim.'
      }
    ]
  },
  {
    company: 'YTU Reality Lab',
    type: 'Yarı zamanlı',
    roles: [
      {
        title: 'Eş Koordinatör',
        date: 'Eki 2019 - Tem 2023'
      }
    ]
  },
  {
    company: 'Milli Savunma Üniversitesi',
    type: 'Tam zamanlı',
    roles: [
      {
        title: 'Yedek Subay',
        date: 'Şub 2018 - Şub 2019'
      }
    ]
  },
  {
    company: 'CENTRAL QUEENSLAND UNIVERSITY',
    type: 'Tam zamanlı',
    roles: [
      {
        title: 'Misafir Araştırmacı',
        date: 'Kas 2016 - Oca 2017'
      }
    ]
  },
  {
    company: 'İstanbul Aydın Üniversitesi',
    type: 'Yarı zamanlı',
    roles: [
      {
        title: 'Öğretim Görevlisi',
        date: 'Eyl 2012 - Ara 2012'
      }
    ]
  }
]

const education = [
  {
    school: 'Yıldız Teknik Üniversitesi',
    degree: 'Doktora (Dr.), Sanat ve Tasarım Anasanat Dalı',
    date: 'Şub 2015 – Eki 2017'
  },
  {
    school: 'Yıldız Teknik Üniversitesi',
    degree: 'Yüksek Lisans (Master), İnteraktif Medya Tasarımı',
    date: 'Haz 2012 – Oca 2015'
  },
  {
    school: 'UCLA',
    degree: 'Araştırmacı (Yüksek Lisans), Medya Sanatları ve Tasarım',
    date: '2014 - 2014'
  },
  {
    school: 'Marmara Üniversitesi',
    degree: 'Lisans Derecesi, Metalurji ve Malzeme Müh. (İng.)',
    date: '2007 - 2012'
  }
]

const skills = [
  'Proje Yönetimi',
  'İngilizce',
  'Grafik Tasarımı',
  '3B Modelleme',
  'Animasyon',
  'Karikatür',
  'Sanal Gerçeklik'
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn delay={0.2} className="mb-16">

          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
            Bahadır Uçan
          </h1>
          <p className="text-xl md:text-2xl font-light text-[var(--muted)] leading-relaxed">
            Karikatürist, çizer ve akademisyen. Dijital ve geleneksel sanatın kesişiminde araştırma ve üretim yapıyor.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left/Center) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Experience Section */}
            <FadeIn delay={0.3}>
              <div className="glass-panel p-8">
                <h2 className="text-2xl font-light mb-8 flex items-center gap-3">
                  <Briefcase className="text-[var(--accent)]" size={24} />
                  Deneyim
                </h2>
                <div className="space-y-10">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index !== experiences.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-[-40px] w-px bg-[var(--border)]" />
                      )}
                      
                      <div className="flex gap-4">
                        <div className="mt-1 relative z-10 flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center">
                            <Building size={12} className="text-[var(--accent)]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-[var(--foreground)]">{exp.company}</h3>
                          <p className="text-sm text-[var(--muted)] mb-4">{exp.type}</p>
                          
                          <div className="space-y-4">
                            {exp.roles.map((role, rIndex) => (
                              <div key={rIndex} className="relative pl-4 border-l border-[var(--border)]">
                                <h4 className="font-medium text-[var(--foreground)]">{role.title}</h4>
                                <p className="text-sm text-[var(--muted)] mt-1">{role.date}</p>
                                {role.desc && (
                                  <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed opacity-90">
                                    {role.desc}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Skills Container */}
              <FadeIn delay={0.4}>
                <div className="glass-panel p-6">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Sparkles size={18} className="text-[var(--accent)]" />
                    Yetenekler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Education Container */}
              <FadeIn delay={0.5}>
                <div className="glass-panel p-6">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <GraduationCap size={18} className="text-[var(--accent)]" />
                    Eğitim
                  </h3>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[var(--foreground)] leading-tight">{edu.school}</h4>
                          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{edu.degree}</p>
                          <p className="text-xs text-[var(--muted)] opacity-70 mt-1">{edu.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Contact Container */}
              <FadeIn delay={0.6}>
                <div className="glass-panel p-6">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Code2 size={18} className="text-[var(--accent)]" />
                    İletişim
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a href="mailto:iletisim@bahadirucan.com" className="group flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                          <Mail size={14} className="text-[var(--muted)] group-hover:text-black transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent-light)] transition-colors">
                            E-Posta Gönder
                          </p>
                        </div>
                        <ExternalLink size={14} className="ml-auto text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
