import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Bell, Building2, CheckCircle2, ChevronDown, CircleDollarSign,
  ClipboardList, CreditCard, FileText, GraduationCap, Home, LayoutDashboard,
  Lock, Mail, MessageCircle, Plane, Search, Send, Settings,
  ShieldCheck, UserRound, Users, WalletCards, Globe2, Heart, MapPin, Gift,
  CalendarDays, Phone, Info, Upload, Smartphone, Bus,
  Train, Car, Star, Languages, Wifi, Landmark, Paperclip, Smile, CheckCheck,
  X, Video, SlidersHorizontal, LogOut, Camera, Plus, Trash2, Clock3, AlertTriangle,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import universityHero from './assets/university-student-hero.png'
import supportHero from './assets/support-student-hero.png'
import dashboardStudentHero from './assets/dashboard-african-student.png'
import esimPhoneHero from './assets/esim-phone-hero.png'
import financeHero from './assets/finance-student-hero.png'
import parisPackBackground from './assets/paris-pack-background.png'

const queryClient = new QueryClient()

const logos = {
  studyway: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/academia.svg',
  campusFrance: 'https://logo.clearbit.com/campusfrance.org',
  parisSaclay: 'https://logo.clearbit.com/universite-paris-saclay.fr',
  edhec: 'https://logo.clearbit.com/edhec.edu',
  escp: 'https://logo.clearbit.com/escp.eu',
  societeGenerale: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/societegenerale.svg',
  bnp: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bnpparibas.svg',
  bpifrance: 'https://logo.clearbit.com/bpifrance.fr',
  sorbonne: 'https://logo.clearbit.com/sorbonne-universite.fr',
  montreal: 'https://logo.clearbit.com/umontreal.ca',
  tum: 'https://logo.clearbit.com/tum.de',
  uclouvain: 'https://logo.clearbit.com/uclouvain.be',
  creditMutuel: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/creditmutuel.svg',
  n26: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/n26.svg',
  revolut: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/revolut.svg',
  airFrance: 'https://logo.clearbit.com/airfrance.com',
  ethiopian: 'https://logo.clearbit.com/ethiopianairlines.com',
  turkish: 'https://logo.clearbit.com/turkishairlines.com',
  rwandair: 'https://logo.clearbit.com/rwandair.com',
  orange: 'https://logo.clearbit.com/orange.com',
  europe: 'https://flagcdn.com/w80/eu.png',
  france: 'https://flagcdn.com/w40/fr.png',
  canada: 'https://flagcdn.com/w40/ca.png',
  belgium: 'https://flagcdn.com/w40/be.png',
  germany: 'https://flagcdn.com/w40/de.png',
  swiss: 'https://flagcdn.com/w40/ch.png',
  togo: 'https://flagcdn.com/w40/tg.png',
}

const avatars = {
  christelle: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  kossi: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  koffi: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=240&q=80',
  parent: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
}

const navItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, to: '/' },
  { label: 'Mes demandes', icon: ClipboardList, to: '/documents' },
  { label: 'Mes documents', icon: FileText, to: '/documents' },
  { label: 'Logement', icon: Home, to: '/logement' },
  { label: 'Universités', icon: Building2, to: '/universites' },
  { label: 'Visa & Immigration', icon: Plane, to: '/visa' },
  { label: 'Finance & Banque', icon: CreditCard, to: '/finance' },
  { label: 'Billets & Transport', icon: Plane, to: '/transport' },
  { label: 'Accompagnement', icon: UserRound, to: '/accompagnement' },
  { label: 'eSIM & Forfait', icon: Smartphone, to: '/esim' },
]

const settingsItems = [
  { label: 'Modifier le profil', title: 'Modifier le profil', icon: UserRound, to: '/settings/profile' },
  { label: 'Adresse de facturation', title: 'Adresse de facturation', icon: FileText, to: '/settings/billing' },
  { label: 'Méthode de paiement', title: 'Méthode de paiement', icon: CreditCard, to: '/settings/payment-methods' },
  { label: 'Historique de connexion', title: 'Historique de connexion', icon: Clock3, to: '/settings/login-history' },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/*" element={<Shell />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-blue-600 shadow-lg shadow-blue-950/20">
        <img src={logos.studyway} alt="StudyWay" className="h-7 w-7" />
      </div>
      {!compact && (
        <div>
          <div className="text-2xl font-black tracking-tight text-white">Study<span className="text-blue-400">Way</span></div>
          <div className="text-[11px] font-medium text-blue-100">Votre avenir, notre mission</div>
        </div>
      )}
    </div>
  )
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[0.9fr_1.25fr_0.8fr]">
      <section className="relative hidden overflow-hidden bg-[#06245a] p-10 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.35),transparent_32%),linear-gradient(180deg,#07377e,#061b47)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <Logo />
          <div className="max-w-xs">
            <Plane className="mb-8 text-blue-200" size={54} />
            <h1 className="text-4xl font-black leading-tight">Étudiez à l'étranger en toute sérénité</h1>
            <div className="mt-10 space-y-6 text-sm font-semibold text-blue-50">
              {['Accompagnement personnalisé', 'Dossiers sécurisés et suivis', 'Logement & installation assurés', 'Support 24h/7j'].map((item) => (
                <div className="flex items-center gap-3" key={item}><ShieldCheck size={22} /> {item}</div>
              ))}
            </div>
          </div>
          <img src={avatars.kossi} alt="Étudiant StudyWay" className="h-44 w-44 rounded-full border border-white/20 object-cover shadow-2xl shadow-blue-950/40" />
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[560px]">
          <div className="mb-10 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-600 text-white"><img src={logos.studyway} alt="StudyWay" className="h-8 w-8 brightness-0 invert" /></div>
            <div><div className="text-3xl font-black text-slate-950">Study<span className="text-blue-600">Way</span></div><div className="text-xs font-semibold text-slate-500">Votre avenir, notre mission</div></div>
          </div>
          <div className="mb-8">
            <h2 className="text-4xl font-black tracking-tight text-slate-950">{isRegister ? 'Créer un compte' : 'Bienvenue de retour !'}</h2>
            <p className="mt-3 text-slate-500">{isRegister ? "Rejoignez StudyWay et lancez votre projet d'études à l'étranger" : 'Connectez-vous à votre compte StudyWay'}</p>
          </div>
          <form className="rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
            {isRegister && <div className="grid gap-4 sm:grid-cols-2"><Field icon={UserRound} label="Prénom" placeholder="Votre prénom" /><Field icon={UserRound} label="Nom" placeholder="Votre nom" /></div>}
            <Field icon={Mail} label="Adresse email" placeholder="votre@email.com" />
            {isRegister && <Field icon={UserRound} label="Numéro de téléphone" placeholder="+228 90 12 34 56" />}
            <Field icon={Lock} label="Mot de passe" placeholder={isRegister ? 'Creez un mot de passe' : 'Votre mot de passe'} type="password" />
            {isRegister && <Field icon={Lock} label="Confirmer le mot de passe" placeholder="Confirmez votre mot de passe" type="password" />}
            {isRegister && <label className="mt-4 block text-sm font-bold text-slate-700">Vous êtes...<select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-600 outline-none focus:border-blue-500"><option>Étudiant</option><option>Parent / Tuteur</option><option>École partenaire</option></select></label>}
            <button type="button" className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">{isRegister ? 'Créer mon compte' : 'Se connecter'} <ArrowRight size={18} /></button>
            <div className="mt-6 text-center text-sm text-slate-500">{isRegister ? 'Vous avez déjà un compte ? ' : "Vous n'avez pas de compte ? "}<Link className="font-bold text-blue-600" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Se connecter' : 'Créer un compte'}</Link></div>
          </form>
        </motion.div>
      </section>
      <section className="relative hidden overflow-hidden bg-blue-50 p-10 lg:block">
        <div className="soft-grid absolute inset-0 opacity-80" />
        <div className="relative flex h-full flex-col justify-end gap-6">
          <img src={avatars.christelle} alt="Étudiante StudyWay" className="mx-auto h-80 w-80 rounded-lg object-cover shadow-2xl shadow-blue-200" />
          <InfoCard icon={ShieldCheck} title="Vos données sont sécurisées" text="Sécurité et confidentialité garanties" />
          <InfoCard icon={CheckCircle2} title="Support dédié" text="Notre équipe est la pour vous accompagner" />
        </div>
      </section>
    </main>
  )
}

function Field({ icon: Icon, label, placeholder, type = 'text' }) {
  return <label className="mt-4 block text-sm font-bold text-slate-700">{label}<span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-400 focus-within:border-blue-500"><Icon size={18} /><input type={type} placeholder={placeholder} className="w-full border-none bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400" /></span></label>
}

function InfoCard({ icon: Icon, title, text }) {
  return <div className="rounded-lg border border-white/80 bg-white/90 p-5 shadow-xl shadow-blue-100"><div className="flex gap-4"><div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon size={24} /></div><div><div className="font-black text-slate-950">{title}</div><p className="mt-1 text-sm text-slate-500">{text}</p></div></div></div>
}

function AccountPage() {
  const overview = [
    [WalletCards, 'Paiements totaux', '1 607 000 FCFA', 'Ce mois-ci', 'bg-blue-50 text-blue-700'],
    [CheckCircle2, 'Paiements effectués', '1 378 000 FCFA', 'Ce mois-ci', 'bg-emerald-50 text-emerald-700'],
    [CalendarDays, 'Paiements à venir', '230 000 FCFA', 'Ce mois-ci', 'bg-amber-50 text-amber-700'],
    [FileText, 'Documents', '12', 'Total', 'bg-violet-50 text-violet-700'],
  ]
  const services = [
    [Home, 'Logement', 'Résidence Les Estudines, Paris', 'Actif', "Loyer payé jusqu'au 31 mai 2025", 'bg-blue-50 text-blue-700'],
    [GraduationCap, 'Université', 'Licence Informatique - L1', 'Inscrit', 'Année académique 2024-2025', 'bg-blue-50 text-blue-700'],
    [Landmark, 'Compte bancaire', 'Compte ouvert - Boursorama', 'Actif', 'Compte vérifié', 'bg-violet-50 text-violet-700'],
    [ShieldCheck, 'Assurance', 'Assurance habitation', 'Actif', 'Valide jusqu au 12/09/2025', 'bg-emerald-50 text-emerald-700'],
    [Smartphone, 'Forfait mobile (eSIM)', 'Orange 50Go', 'Actif', 'Expire le 12/06/2025', 'bg-amber-50 text-amber-700'],
  ]
  const activities = [
    [CheckCircle2, 'Paiement loyer', 'Mai 2025', '10 mai 2025', '- 361 000 FCFA', 'text-emerald-600'],
    [FileText, 'Document ajouté', 'Attestation de scolarité', '8 mai 2025', '', 'text-blue-600'],
    [Landmark, 'Paiement université', "Frais d'inscription", '5 mai 2025', '- 984 000 FCFA', 'text-violet-600'],
  ]
  const actions = [
    [WalletCards, 'Effectuer un paiement', "Payer le loyer, l'université, etc.", 'text-amber-600'],
    [CreditCard, "Envoyer de l'argent", "Recharger le portefeuille de votre enfant", 'text-blue-600'],
    [Upload, 'Télécharger un document', 'Ajouter un nouveau document', 'text-violet-600'],
    [MessageCircle, 'Contacter le support', "Obtenir de l'aide rapidement", 'text-emerald-600'],
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-950 lg:p-10">
      <Link to="/" className="mb-8 flex w-fit items-center gap-3 rounded-lg px-2 py-1">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-700 shadow-lg shadow-blue-200"><img src={logos.studyway} alt="StudyWay" className="h-8 w-8 brightness-0 invert" /></div>
        <div><div className="text-2xl font-black">Study<span className="text-blue-700">Way</span></div><div className="text-xs font-semibold text-slate-500">Retour accueil</div></div>
      </Link>
      <div className="mx-auto grid max-w-[1500px] gap-6 xl:grid-cols-[1fr_430px]">
        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[170px_1fr_260px]">
              <div><h2 className="mb-6 text-xl font-black">Mon enfant</h2><img src={avatars.kossi} alt="Koffi M. Lucas" className="h-32 w-32 rounded-full object-cover" /></div>
              <div className="pt-14">
                <h1 className="text-2xl font-black">Koffi M. Lucas <span className="ml-3 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">Actif</span></h1>
                <div className="mt-5 grid gap-4 text-sm md:grid-cols-[150px_1fr]"><span className="text-slate-500">ID Étudiant</span><b>EDU-582941</b><span className="text-slate-500">Email</span><b>lucas.koffi@email.com</b><span className="text-slate-500">Université</span><b>Université Paris-Saclay</b><span className="text-slate-500">Statut actuel</span><b className="w-fit rounded-lg bg-blue-50 px-3 py-1 text-blue-700">Étudiant</b></div>
              </div>
              <div className="space-y-6 pt-4">
                <button className="h-12 w-full rounded-lg border border-blue-700 font-black text-blue-800">Voir le profil complet</button>
                <div className="text-sm text-slate-500">Derniere connexion<br /><b className="mt-1 block text-base text-slate-900">12 mai 2025 a 14:32</b></div>
                <div className="text-sm text-slate-500">Compte lie le<br /><b className="mt-1 block text-base text-slate-900">10 mars 2025</b></div>
                <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 font-black text-blue-800"><Lock size={17} />Gerer l'acces</button>
              </div>
            </div>
          </motion.section>

          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-black">Vue d'ensemble</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-4">
              {overview.map(([Icon, label, value, sub, tone]) => <div key={label} className={`flex items-center gap-4 rounded-lg p-5 ${tone}`}><Icon size={34} /><div><div className="text-sm font-bold text-slate-700">{label}</div><div className="text-2xl font-black text-slate-950">{value}</div><div className="text-sm font-medium text-slate-500">{sub}</div></div></div>)}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <h2 className="border-b border-slate-100 p-6 text-xl font-black">Suivi des services</h2>
            <div className="divide-y divide-slate-100 px-6">
              {services.map(([Icon, title, sub, status, detail, tone]) => <div key={title} className="grid items-center gap-4 py-5 lg:grid-cols-[1fr_120px_1fr_130px]"><div className="flex items-center gap-4"><div className={`grid h-12 w-12 place-items-center rounded-lg ${tone}`}><Icon size={24} /></div><div><b>{title}</b><div className="text-sm text-slate-500">{sub}</div></div></div><span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-600">{status}</span><span className="text-sm font-medium text-slate-500">{detail}</span><button className="h-10 rounded-lg border border-slate-200 font-black text-blue-800">Voir détails</button></div>)}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><h2 className="mb-4 text-xl font-black">Dernières activités</h2>{activities.map(([Icon, title, sub, date, amount, tone]) => <div key={title} className="flex items-center justify-between border-b border-slate-100 py-5 last:border-0"><div className="flex items-center gap-4"><div className={`grid h-12 w-12 place-items-center rounded-full bg-slate-50 ${tone}`}><Icon size={24} /></div><div><b>{title}</b><div className="text-sm">{sub}</div><div className="text-sm text-slate-500">{date}</div></div></div><b className={tone}>{amount}</b></div>)}<button className="mt-4 w-full font-black text-blue-800">Voir toutes les activités</button></section>
          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><h2 className="mb-5 text-xl font-black">Actions rapides</h2>{actions.map(([Icon, title, sub, tone]) => <div key={title} className="flex gap-4 py-4"><div className={`grid h-11 w-11 place-items-center rounded-lg bg-slate-50 ${tone}`}><Icon size={22} /></div><div><b>{title}</b><p className="text-sm text-slate-500">{sub}</p></div></div>)}</section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-7 shadow-sm"><h2 className="text-lg font-black text-blue-950">Besoin d'aide ?</h2><p className="mt-2 text-sm leading-6 text-blue-900">Notre équipe est disponible 24/7 pour vous accompagner.</p><button className="mt-5 flex h-12 items-center justify-center gap-3 rounded-lg bg-white px-6 font-black text-blue-800"><MessageCircle size={18} />Contacter le support</button></section>
        </aside>
      </div>
    </main>
  )
}

function Shell() {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sidebarHover, setSidebarHover] = useState(false)
  const location = useLocation()
  const isSettingsPage = location.pathname.startsWith('/parametres') || location.pathname.startsWith('/settings')
  const isSettingsRoute = location.pathname.startsWith('/settings')
  const sidebarOpen = sidebarHover
  const activeNavIndex = navItems.findIndex(({ to }) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)))

  if (isSettingsPage) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
        <main className="p-5 lg:p-8"><AnimatedRoutes /></main>
      </div>
    )
  }

  return (
    <div className="app-shell min-h-screen bg-slate-50 text-slate-950">
      <AnimatePresence>
        {settingsOpen && (
          <motion.div className="settings-modal-layer fixed inset-0 z-[90] grid place-items-center px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <motion.button
              type="button"
              aria-label="Fermer les paramètres"
              className="settings-modal-backdrop absolute inset-0"
              onClick={() => setSettingsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <SettingsHubWindow onClose={() => setSettingsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <aside
        onMouseEnter={() => setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
        className={`shell-sidebar fixed inset-y-0 left-0 z-50 overflow-hidden bg-[#061b47] text-white shadow-2xl shadow-slate-950/30 ${sidebarOpen ? 'is-open' : ''}`}
      >
        <div className="flex h-full min-h-0 flex-col p-4">
          <div className="sidebar-header flex h-14 items-center gap-3">
            <div className="rail-menu-button grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white" aria-hidden="true">
              <img src="/studyway-menu-logo.jpeg" alt="" className="h-10 w-10 rounded-xl object-cover" />
            </div>
            <div className="sidebar-brand min-w-0">
              <div>
                <div className="text-2xl font-black tracking-tight text-white">Study<span className="text-blue-300">Way</span></div>
                <div className="text-[11px] font-medium text-blue-100">Votre avenir, notre mission</div>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav mt-8 min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden pr-1">
            {navItems.map(({ label, icon: Icon, to, badge }, index) => {
              const isActive = index === activeNavIndex
              return (
                <NavLink key={label} to={to} className={`shell-nav-link flex h-12 items-center gap-3 rounded-2xl px-3 text-sm font-bold ${isActive ? 'is-active' : 'text-blue-50'}`}>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="shell-nav-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.82 }}
                    />
                  )}
                  <span className="shell-nav-icon-wrap">
                    <Icon className="shell-nav-icon" size={22} />
                  </span>
                  <span className="shell-nav-label flex-1 whitespace-nowrap">{label}</span>
                  {badge && <span className="shell-nav-badge grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-xs">{badge}</span>}
                </NavLink>
              )
            })}
          </nav>
          <div className="sidebar-scroll-cue grid place-items-center text-blue-100"><ChevronDown size={22} /></div>
          <div className="sidebar-help mt-6 shrink-0 rounded-2xl border border-white/10 bg-blue-600/20 p-5">
            <div className="font-black">Besoin d'aide ?</div>
            <p className="mt-2 text-sm text-blue-100">Notre équipe est disponible 24h/7j.</p>
            <Link to="/messages" className="message-menu-button mt-4 flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 text-sm font-bold"><span>Message</span><span className="message-menu-badge">3</span></Link>
          </div>
        </div>
      </aside>
      <div className={`shell-content ${sidebarOpen ? 'is-compressed' : ''}`}>
        <header className="sticky top-0 z-30 grid h-20 grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-200 bg-slate-100/95 px-5 backdrop-blur lg:px-8">
          <div className="mx-auto hidden h-12 w-full max-w-[520px] items-center gap-3 rounded-lg bg-slate-200/80 px-4 text-slate-500 md:flex"><span className="flex-1 text-sm font-semibold">Rechercher un service...</span><Search size={19} className="text-slate-600" /></div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button type="button" onClick={() => setLanguageOpen((value) => !value)} className="flex h-10 items-center gap-1 rounded-lg px-2 text-blue-950 hover:bg-slate-100" aria-label="Changer de langue"><Globe2 size={22} /><ChevronDown size={15} /></button>
              {languageOpen && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200">
                  {['Français', 'English', 'Español', 'Deutsch'].map((language) => <button key={language} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800"><Languages size={17} />{language}</button>)}
                </motion.div>
              )}
            </div>
            <button className="notification-button relative rounded-lg p-2 hover:bg-slate-100" aria-label="Notifications"><Bell className="notification-bell" /><span className="notification-badge absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white">3</span></button>
            <Link to="/account" className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-100"><img src={avatars.christelle} alt="Christelle Komi" className="h-11 w-11 rounded-full object-cover" /><div className="hidden sm:block"><div className="font-black">Christelle Komi</div><div className="text-sm text-slate-500">Étudiante</div></div><ChevronDown size={18} /></Link>
            <div className="relative z-50">
              <button type="button" onClick={() => setSettingsOpen(true)} className={`grid h-11 w-11 place-items-center rounded-lg text-blue-950 hover:bg-slate-100 ${isSettingsRoute || settingsOpen ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-100' : ''}`} aria-label="Paramètres"><Settings size={22} /></button>
            </div>
          </div>
        </header>
        <main className="p-5 lg:p-8"><AnimatedRoutes /></main>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/finance/:process" element={<FinanceProcess />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/logement" element={<Housing />} />
        <Route path="/universites" element={<Universities />} />
        <Route path="/universites/:id" element={<UniversityFormationDetail />} />
        <Route path="/guides/:slug" element={<StudentGuideDetail />} />
        <Route path="/guides" element={<StudentGuides />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/parametres" element={<ProfileSettings />} />
        <Route path="/parametres/facturation" element={<BillingSettings />} />
        <Route path="/parametres/paiement" element={<PaymentSettings />} />
        <Route path="/parametres/connexions" element={<LoginHistorySettings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/billing" element={<BillingSettings />} />
        <Route path="/settings/payment-methods" element={<PaymentSettings />} />
        <Route path="/settings/login-history" element={<LoginHistorySettings />} />
        <Route path="/accompagnement/demarrer" element={<StartSupport />} />
        <Route path="/accompagnement" element={<SupportJourney />} />
        <Route path="/visa/:country/:type/demande" element={<VisaApplication />} />
        <Route path="/visa/:country/:type" element={<Visa />} />
        <Route path="/visa" element={<Visa />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/voyage" element={<Transport />} />
        <Route path="/esim" element={<Esim />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Placeholder />} />
      </Routes>
    </motion.div>
  )
}

function PageTitle({ title, subtitle }) {
  return <div className="mb-8"><h1 className="text-3xl font-black tracking-tight">{title}</h1><p className="mt-1 text-slate-500">{subtitle}</p></div>
}

function SettingsHubWindow({ onClose }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Paramètres"
      initial={{ opacity: 0, y: 34, scale: 0.9, rotateX: -7, filter: 'blur(18px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 18, scale: 0.94, filter: 'blur(10px)' }}
      transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
      className="settings-hub-window relative w-full max-w-[430px] border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-5 px-1 pb-5">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Paramètres</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Centre de contrôle</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Choisissez une section pour continuer.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="grid h-12 w-12 place-items-center bg-blue-50 text-blue-700 shadow-inner shadow-blue-100">
            <Settings size={23} />
          </span>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {settingsItems.map(({ icon: Icon, label, to }, index) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08 + index * 0.055, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={to} onClick={onClose} className="settings-hub-button group flex min-h-[68px] items-center gap-4 border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition">
              <span className="settings-hub-icon grid h-11 w-11 shrink-0 place-items-center bg-slate-50 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-700">
                <Icon size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-slate-900">{label}</span>
                <span className="mt-1 block text-xs font-semibold text-slate-500">Ouvrir la page</span>
              </span>
              <ArrowRight className="settings-hub-arrow shrink-0 text-slate-300 transition group-hover:text-blue-600" size={19} />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SettingsPageFrame({ title, children }) {
  return (
    <div className="settings-page -m-5 min-h-screen overflow-hidden bg-[#f7f8fb] px-6 py-8 text-slate-950 lg:-m-8 lg:px-[58px]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="mb-8 flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <Link to="/" className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-md shadow-slate-200/70"><ChevronDown className="rotate-90" size={22} /></Link>
          <h1 className="text-2xl font-black tracking-tight">{title}</h1>
        </div>
        <div className="hidden items-center gap-3 text-sm font-semibold text-slate-500 lg:flex">Explorer <ChevronDown className="-rotate-90" size={16} /> <span className="text-slate-800">{title}</span></div>
      </motion.div>
      <motion.div
        className="mx-auto max-w-[1420px]"
        initial={{ opacity: 0, y: 20, scale: 0.985, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function SettingsProfileCard() {
  return (
    <motion.aside initial={{ opacity: 0, x: -28, scale: 0.985 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="min-h-[635px] rounded-xl border border-slate-200 bg-white px-8 py-9 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img src={avatars.kossi} alt="Lemouel jonadab AMAH-TCHTOUTCHOUI" className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover" />
          <span className="absolute bottom-1 right-0 grid h-10 w-10 place-items-center rounded-full bg-amber-400 text-white shadow-lg shadow-amber-200"><Camera size={18} /></span>
        </div>
        <h2 className="mt-8 max-w-[310px] text-2xl font-black leading-tight">Lemouel jonadab AMAH-TCHTOUTCHOUI</h2>
        <p className="mt-2 font-semibold text-slate-500">jaceamah14@gmail.com</p>
      </div>
      <div className="my-8 h-px bg-slate-200" />
      <div className="space-y-5 text-sm">
        <div className="flex justify-between gap-5"><span className="font-semibold text-slate-500">Membre depuis</span><b>20.05.2026</b></div>
        <div className="flex justify-between gap-5"><span className="font-semibold text-slate-500">Commandes totales</span><b>0</b></div>
      </div>
      <div className="mt-9 space-y-5 pl-3">
        <SettingsSideLink icon={WalletCards} label="Adresse de facturation" to="/settings/billing" />
        <SettingsSideLink icon={CreditCard} label="Méthodes de paiement" to="/settings/payment-methods" />
        <SettingsSideLink icon={Clock3} label="Historique de connexion" to="/settings/login-history" />
      </div>
    </motion.aside>
  )
}

function SettingsSideLink({ icon: Icon, label, to }) {
  const navigate = useNavigate()
  return <button type="button" onClick={() => navigate(to)} className="flex w-full items-center gap-4 rounded-xl px-3 py-2 text-left font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"><Icon size={20} className="text-slate-400" />{label}</button>
}

function SettingsActionCard({ icon: Icon, title, text, tone = 'blue', danger = false, index = 0 }) {
  const toneClass = danger ? 'bg-rose-50 text-rose-600' : tone === 'purple' ? 'bg-violet-50 text-violet-600' : 'bg-blue-50 text-amber-500'
  return (
    <motion.button initial={{ opacity: 0, x: 34, scale: 0.985 }} animate={{ opacity: 1, x: 0, scale: 1 }} whileHover={{ y: -4 }} transition={{ delay: 0.12 + index * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className={`flex min-h-[122px] w-full items-center gap-4 rounded-xl border p-7 text-left shadow-sm ${danger ? 'border-rose-200 bg-rose-50/70' : 'border-slate-200 bg-white'}`}>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${toneClass}`}><Icon size={23} /></span>
      <span><span className={`block text-xl font-black ${danger ? 'text-rose-700' : 'text-slate-950'}`}>{title}</span><span className={`mt-1 block text-sm font-semibold ${danger ? 'text-red-600' : 'text-slate-500'}`}>{text}</span></span>
    </motion.button>
  )
}

function ProfileSettings() {
  return (
    <SettingsPageFrame title="Paramètres du profil">
      <div className="grid gap-8 xl:grid-cols-[450px_1fr]">
        <SettingsProfileCard />
        <div className="space-y-8">
          <SettingsActionCard icon={UserRound} title="Informations personnelles" text="Mettez à jour vos informations personnelles et vos préférences de contact." index={0} />
          <SettingsActionCard icon={Lock} title="Changer le mot de passe" text="Utilisez un mot de passe fort pour sécuriser votre compte." tone="purple" index={1} />
          <SettingsActionCard icon={Trash2} title="Supprimer le compte" text="Si vous souhaitez supprimer définitivement votre compte, utilisez le bouton ci-dessous." danger index={2} />
        </div>
      </div>
    </SettingsPageFrame>
  )
}

function BillingSettings() {
  return (
    <SettingsPageFrame title="Adresses de facturation">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><h2 className="text-3xl font-black">Adresses de facturation</h2><p className="mt-3 font-semibold text-slate-500">Ajoutez, modifiez ou supprimez vos adresses de facturation.</p></div>
        <button className="flex h-14 items-center gap-3 rounded-lg bg-amber-400 px-7 font-black text-white shadow-lg shadow-amber-200"><Plus size={22} />Ajouter une adresse</button>
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 24, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.36 }} className="grid min-h-[360px] place-items-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <WalletCards className="mx-auto text-slate-300" size={68} />
          <h3 className="mt-8 text-xl font-black">Aucune adresse trouvée</h3>
          <p className="mt-4 font-semibold text-slate-500">Vous n'avez pas encore ajouté d'adresse de facturation.</p>
          <button className="mt-6 inline-flex h-12 items-center gap-3 rounded-lg bg-amber-400 px-7 font-black text-white shadow-lg shadow-amber-200"><Plus size={20} />Ajoutez votre première adresse</button>
        </div>
      </motion.section>
      <SettingsBackLink />
    </SettingsPageFrame>
  )
}

function PaymentSettings() {
  return (
    <SettingsPageFrame title="Méthodes de paiement">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-black">Méthodes de paiement</h2>
        <p className="mt-3 font-semibold text-slate-500">Gérez vos méthodes de paiement.</p>
      </motion.div>
      <div className="grid gap-7 xl:grid-cols-2">
        <PaymentMethodCard icon={CreditCard} title="Virement bancaire" text="Entrez les détails de votre compte bancaire." tone="blue" index={0} />
        <PaymentMethodCard icon={ZapIcon} title="Portefeuille crypto" text="Entrez les détails de votre portefeuille crypto." tone="orange" index={1} />
      </div>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-7">
        <div className="flex gap-5">
          <Info className="mt-1 shrink-0 text-amber-500" size={24} />
          <div><h3 className="font-black text-blue-950">Informations de versement</h3><p className="mt-3 font-semibold leading-7 text-blue-800">Vos gains sont versés selon la méthode spécifiée ici. Veuillez vous assurer que vos informations sont correctes.</p></div>
        </div>
      </motion.section>
      <SettingsBackLink />
    </SettingsPageFrame>
  )
}

function ZapIcon(props) {
  return <Send {...props} />
}

function PaymentMethodCard({ icon: Icon, title, text, tone, index = 0 }) {
  const toneClass = tone === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-amber-500'
  return (
    <motion.button initial={{ opacity: 0, y: 28, scale: 0.97, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} whileHover={{ y: -4 }} transition={{ delay: 0.1 + index * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="flex min-h-28 items-center justify-between rounded-xl border border-slate-200 bg-white p-7 text-left shadow-sm">
      <span className="flex items-center gap-4"><span className={`grid h-[60px] w-[60px] shrink-0 place-items-center rounded-lg ${toneClass}`}><Icon size={24} /></span><span><b className="text-2xl">{title}</b><span className="mt-2 block font-semibold text-slate-500">{text}</span></span></span>
      {tone !== 'orange' && <ChevronDown size={24} className="text-slate-400" />}
    </motion.button>
  )
}

function LoginHistorySettings() {
  const rows = [
    ['21.05.2026', '05:29:25', '46.193.66.49', 'Chrome 147.0.0.0 / Windows 10', 'Chrome 147.0.0.0', 'Aubervilliers, France', 'Session active'],
    ['20.05.2026', '19:02:28', '46.193.66.49', 'Chrome 147.0.0.0 / Windows 10', 'Chrome 147.0.0.0', 'Aubervilliers, France', 'Réussi'],
  ]
  const tips = [
    [CheckCircle2, 'Vérification régulière', 'Vérifiez régulièrement votre historique de connexion et identifie...', 'bg-blue-50 text-amber-500'],
    [AlertTriangle, 'Activité suspecte', 'Si vous remarquez une connexion non reconnue, changez...', 'bg-rose-50 text-rose-600'],
    [Lock, 'Mot de passe fort', 'Utilisez un mot de passe fort et unique pour protéger votre compte.', 'bg-emerald-50 text-emerald-600'],
    [LogOut, 'Déconnexion', "N'oubliez pas de vous déconnecter après avoir utilisé des apps.", 'bg-amber-50 text-amber-600'],
  ]

  return (
    <SettingsPageFrame title="Historique de connexion">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-black">Historique de connexion</h2>
        <p className="mt-3 font-semibold text-slate-500">Consultez toutes les activités de connexion de votre compte.</p>
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-blue-200 bg-blue-50 p-7">
        <h3 className="flex items-center gap-3 font-black text-blue-950"><Info className="text-amber-500" size={22} />Conseils de sécurité</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {tips.map(([Icon, title, text, tone], index) => <motion.div key={title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex gap-4 rounded-lg bg-white p-4"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tone}`}><Icon size={18} /></span><span><b className="text-sm">{title}</b><span className="mt-1 block text-sm font-semibold leading-5 text-slate-500">{text}</span></span></motion.div>)}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid min-w-[1180px] grid-cols-[190px_180px_1.25fr_1fr_1fr_140px] border-b border-slate-200 px-8 py-5 text-xs font-black uppercase tracking-wide text-slate-500">
          <span>Date / Heure</span><span>Adresse IP</span><span>Appareil</span><span>Navigateur</span><span>Localisation</span><span>Statut</span>
        </div>
        {rows.map(([date, time, ip, device, browser, location, status], index) => (
          <div key={`${date}-${time}`} className={`grid min-w-[1180px] grid-cols-[190px_180px_1.25fr_1fr_1fr_140px] items-center px-8 py-6 font-semibold ${index === 0 ? 'bg-emerald-50/40' : ''}`}>
            <span><b className="block">{date}</b><span className="text-sm text-slate-500">{time}</span></span><span>{ip}</span><span>{device}</span><span>{browser}</span><span>{location}</span><span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700">{status}</span>
          </div>
        ))}
      </motion.section>
      <SettingsBackLink />
    </SettingsPageFrame>
  )
}

function SettingsBackLink() {
  return <Link to="/settings/profile" className="mt-8 inline-flex items-center gap-3 font-semibold text-slate-500 hover:text-blue-800"><ArrowRight className="rotate-180" size={18} />Retour au profil</Link>
}

function StatCard({ icon: Icon, label, value, tone = 'blue' }) {
  const tones = { blue: 'bg-blue-50 text-blue-600', green: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600', purple: 'bg-violet-50 text-violet-600' }
  return <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-5"><div className={`grid h-14 w-14 place-items-center rounded-lg ${tones[tone]}`}><Icon size={27} /></div><div><div className="text-sm font-bold text-slate-500">{label}</div><div className="mt-1 text-2xl font-black">{value}</div></div></div></div>
}

function Dashboard() {
  const [unavailableService, setUnavailableService] = useState(null)
  const heroSlides = [
    {
      lead: 'Votre',
      rest: 'parcours étudiant,\nsimplifié de A à Z',
      title: 'Votre parcours étudiant, simplifié de A à Z',
      text: 'Visa, logement, financement, universités... Tout ce dont vous avez besoin, au même endroit.',
      image: dashboardStudentHero,
      cta: 'Commencer ma demande',
      ctaTo: '/accompagnement/demarrer',
      tone: 'from-[#061b47]/95 via-[#102a63]/72 to-transparent',
    },
    {
      lead: 'Partez',
      rest: 'étudier dans la ville qui vous attend',
      title: 'Partez étudier dans la ville qui vous attend',
      text: 'Billets, logement, assurance et accompagnement réunis dans un seul espace fluide.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
      cta: 'Préparer mon départ',
      ctaTo: '/transport',
      tone: 'from-[#061b47]/95 via-[#1e3a8a]/65 to-transparent',
    },
    {
      lead: 'Installez-vous',
      rest: 'sereinement dès votre arrivée',
      title: 'Installez-vous sereinement dès votre arrivée',
      text: 'Un conseiller, des services vérifiés, et des solutions pour chaque étape de votre projet.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
      cta: 'Voir mes services',
      ctaTo: '/accompagnement',
      tone: 'from-[#061b47]/95 via-[#0f766e]/58 to-transparent',
    },
  ]
  const [activeSlide, setActiveSlide] = useState(0)
  const services = [
    ['Traduction & Documents', FileText, 'Traduction certifiée, apostille', null],
    ['Visa & Immigration', Plane, 'Dossier complet, suivi et assistance', '/visa'],
    ['Logement Étudiant', Home, 'Résidences, studios, colocations', '/logement'],
    ['Paiement Frais Universitaires', CreditCard, 'Payez vos frais en sécurité', '/finance'],
    ['Billets & Transport', Plane, 'Vols, trains, transferts', '/transport'],
    ['Banque & Financement', Landmark, 'Compte étudiant, AVI, prêts', '/finance'],
  ]
  const serviceTones = [
    'bg-blue-600 text-white',
    'bg-blue-600 text-white',
    'bg-blue-600 text-white',
    'bg-blue-600 text-white',
    'bg-blue-600 text-white',
    'bg-blue-600 text-white',
  ]
  const offers = [
    ['Résidence Paris 15', '295 000 FCFA/mois', 'Paris, France', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80', logos.parisSaclay],
    ['Vol Lomé → Paris', '350 000 FCFA', '15 juin 2024', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80', logos.airFrance],
    ['Compte Étudiant', 'Gratuit', 'Ouverture 100% en ligne', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80', logos.societeGenerale],
    ['Assurance Santé', '79 000 FCFA/an', 'Couverture complète', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80', logos.orange],
  ]
  const partnerLogos = [
    ['Partenaire', '/image.png'],
    ['Ecobank', '/image copy.png'],
    ['Wise', '/image copy 3.png'],
    ['Ecobank', '/image copy 2.png'],
  ]

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % heroSlides.length), 5000)
    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  const slide = heroSlides[activeSlide]

  return (
    <div className="dashboard-page space-y-7">
      <div className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <div className="space-y-7">
        <section className="dashboard-hero relative min-h-[360px] overflow-hidden rounded-lg text-white shadow-sm">
          {heroSlides.map((item, index) => (
            <img key={item.title} src={item.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition duration-1000 ${activeSlide === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} />
          ))}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.tone}`} />
          <motion.div key={slide.title} initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 max-w-2xl p-10 xl:p-12">
            <h1 className="overflow-hidden text-5xl font-black leading-tight tracking-tight">
              <motion.span key={`${slide.title}-lead`} initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="block">
                {slide.lead}
              </motion.span>
              <motion.span key={`${slide.title}-rest`} initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }} className="block whitespace-pre-line">
                {slide.rest}
              </motion.span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50">{slide.text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={slide.ctaTo} className="support-start-button flex items-center gap-3 rounded-lg bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-950/20">
                {slide.cta}
                <ArrowRight className="support-start-arrow" size={18} />
              </Link>
              <Link to="/accompagnement" className="support-start-button flex items-center gap-3 rounded-lg bg-white px-7 py-4 font-black text-blue-950">
                Découvrir nos services
                <ArrowRight className="support-start-arrow" size={18} />
              </Link>
            </div>
          </motion.div>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroSlides.map((item, index) => <button key={item.title} onClick={() => setActiveSlide(index)} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/60'}`} aria-label={`Slide ${index + 1}`} />)}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black">Nos services principaux</h2>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {services.map(([label, Icon, sub, to], index) => {
              const content = (
                <>
                  <div className={`service-card-icon mx-auto grid h-14 w-14 place-items-center rounded-full ${serviceTones[index]}`}><Icon size={25} /></div>
                  <div className="mt-4 min-h-[44px] font-black leading-tight text-slate-950">{label}</div>
                  <p className="mt-2 min-h-[44px] text-sm font-medium leading-5 text-slate-500">{sub}</p>
                  <div className="service-start-link support-start-button relative z-10 mt-auto inline-flex items-center justify-center gap-2 pt-4 text-xs font-black uppercase tracking-wide text-blue-700">
                    Démarrer
                    <ArrowRight className="support-start-arrow" size={15} />
                  </div>
                </>
              )

              return (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045, duration: 0.34, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8, scale: 1.015 }} key={label}>
                {to ? (
                  <Link to={to} className="service-3d-card group relative flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">{content}</Link>
                ) : (
                  <button type="button" onClick={() => setUnavailableService(label)} className="service-3d-card group relative flex h-full w-full flex-col rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">{content}</button>
                )}
              </motion.div>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black">Offres recommandées pour vous</h2>
          <div className="grid gap-5 md:grid-cols-4">{offers.map(([title, price, location, image, logo], index) => <DashboardOffer key={title} title={title} price={price} location={location} image={image} logo={logo} index={index} />)}</div>
        </section>

        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex justify-between"><h2 className="text-xl font-black">Mon statut</h2><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-600">Actif</span></div><div className="font-black">Dossier Visa France</div><div className="text-sm text-slate-500">Étudiant</div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/5 rounded-full bg-blue-600" /></div><div className="mt-4 flex justify-between text-sm"><span className="text-amber-600">En cours d'examen</span><button className="font-black text-blue-700">Voir détails</button></div></section>
          <section className="rounded-lg bg-[#061b47] p-6 text-white shadow-sm"><div className="text-lg font-black">Mon portefeuille</div><div className="mt-5 text-sm text-blue-100">Solde disponible</div><div className="mt-1 text-3xl font-black">485 600 FCFA</div><button className="mt-6 h-12 w-full rounded-lg bg-blue-600 font-black">Ajouter de l'argent</button></section>
          <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h2 className="mb-4 text-xl font-black">Raccourcis rapides</h2>{['Uploader un document', 'Réserver un logement', 'Prendre rendez-vous', 'Demander une AVI', 'Ouvrir un compte bancaire'].map((item) => <div key={item} className="flex items-center gap-3 py-3 text-sm font-semibold text-slate-600"><FileText size={17} />{item}</div>)}</section>
          <section className="mt-6 rounded-lg bg-[#061b47] p-6 text-white shadow-sm"><h2 className="text-xl font-black">Parrainez un ami 🎁</h2><p className="mt-2 text-blue-50">Gagnez jusqu'à <b className="text-amber-300">20 000 FCFA</b></p><button className="mt-5 flex h-12 w-full items-center justify-between rounded-lg bg-blue-600 px-5 font-black text-white">Parrainer maintenant <ArrowRight size={18} /></button></section>
        </aside>
      </div>

      <section className="-mr-5 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm lg:-mr-8">
        <h2 className="mb-7 text-2xl font-black">Ils nous font confiance</h2>
        <div className="mx-auto grid max-w-4xl items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">{partnerLogos.map(([name, src]) => <PartnerLogo key={`${name}-${src}`} name={name} src={src} />)}</div>
      </section>
      {unavailableService && <UnavailableServiceModal service={unavailableService} onClose={() => setUnavailableService(null)} />}
    </div>
  )
}

function DashboardOffer({ title, price, location, image, logo, index }) {
  const [favorite, setFavorite] = useState(false)

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-36 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
        <button type="button" onClick={() => setFavorite((value) => !value)} className={`favorite-button absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md ${favorite ? 'is-favorite text-rose-600' : 'text-slate-800'}`} aria-label="Ajouter aux favoris">
          <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
        </button>
        {logo && <BrandLogo src={logo} name={title} className="absolute bottom-3 left-3 h-10 w-10 rounded-lg bg-white object-contain p-1 shadow" />}
      </div>
      <div className="p-4"><h3 className="font-black">{title}</h3><p className="mt-1 text-sm text-slate-500">{location}</p><div className="mt-4 flex items-center justify-between"><span className="text-xl font-black text-emerald-700">{price}</span><span className="text-sm font-bold text-amber-500">★ 4.{index + 5}</span></div></div>
    </motion.article>
  )
}

function BrandLogo({ src, name, className }) {
  const [broken, setBroken] = useState(false)
  const initials = name.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()

  if (broken) {
    return <div className={`${className} grid place-items-center object-none text-xs font-black text-blue-700`}>{initials}</div>
  }

  return <img src={src} alt={name} onError={() => setBroken(true)} className={className} />
}

function PartnerLogo({ name, src }) {
  const [broken, setBroken] = useState(false)

  return (
    <div className="mx-auto flex h-16 w-full max-w-40 items-center justify-center">
      {broken ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-black text-slate-700">{name}</div>
      ) : (
        <img src={src} alt={name} onError={() => setBroken(true)} className="max-h-14 max-w-40 object-contain" />
      )}
    </div>
  )
}

function UnavailableServiceModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-lg border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-950/20">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-700"><Languages size={23} /></div>
            <h2 className="mt-5 text-xl font-black text-slate-950">{service}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Ce service n’est pas encore disponible dans votre espace. L’équipe StudyWay le prépare et il sera activé prochainement.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="Fermer"><X size={18} /></button>
        </div>
        <button type="button" onClick={onClose} className="mt-6 h-12 w-full rounded-lg bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20">Compris</button>
      </motion.div>
    </div>
  )
}

function AnimatedStatValue({ value }) {
  const parsed = useMemo(() => {
    const match = String(value).match(/^([+]?)(\d+)(.*)$/)
    if (!match) return null
    return {
      prefix: match[1],
      target: Number(match[2]),
      suffix: match[3],
    }
  }, [value])
  const [count, setCount] = useState(parsed ? 0 : value)

  useEffect(() => {
    if (!parsed) {
      setCount(value)
      return undefined
    }

    const duration = 1100
    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const nextCount = progress === 1 ? parsed.target : Math.round(parsed.target * eased)
      setCount(nextCount)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [parsed, value])

  if (!parsed) return <>{value}</>

  return <>{parsed.prefix}{count}{parsed.suffix}</>
}

function Finance() {
  const quickServices = [
    [Landmark, 'Ouvrir un compte bancaire', 'Compte étudiant 100% en ligne', '/finance/compte'],
    [CreditCard, "Transfert d'argent international", 'Frais réduits & rapide vers 150+ pays', '/finance/transfert'],
    [GraduationCap, 'Financement étudiant', 'Prêts étudiants et solutions sur mesure', '/finance/financement'],
    [ShieldCheck, 'Assurance & Protection', 'Assurance santé, habitation et responsabilité civile', '/finance/assurance'],
  ]
  const stats = [
    [Landmark, '+25', 'Banques partenaires'],
    [Globe2, '150+', 'Pays couverts'],
    [CircleDollarSign, '0 FCFA', "Frais d'ouverture"],
    [ShieldCheck, 'Sécurisé', 'Données protégées'],
    [Users, 'Rapide', 'Ouverture en 24-48h'],
  ]
  const banks = [
    ['BNP Paribas', '/finance-bnp.png', 'Populaire', ['Carte bancaire internationale', 'Application mobile', 'Découvert autorisé']],
    ['Société Générale', '/finance-societe-generale.jpeg', 'Partenaire', ['Offres étudiants exclusives', 'Assurance incluse', 'Retraits sans frais zone SEPA']],
    ['Crédit Mutuel', '/finance-credit-mutuel.png', 'Recommandé', ['Carte Mastercard/Visa', 'Conseiller dédié', 'Solutions épargne']],
    ['N26', '/finance-n26.png', 'Digital', ['Ouverture rapide en 8 min', 'Carte virtuelle incluse', "Zéro frais à l'étranger"]],
    ['Revolut', '/finance-revolut.png', 'Flexible', ['Multi-devises', 'Transferts instantanés', "Contrôle total depuis l'app"]],
  ]
  const financing = [
    [Landmark, 'Prêt étudiant', 'Financez vos études avec des taux avantageux et des conditions adaptées.'],
    [GraduationCap, "Bourse d'études", 'Trouvez des bourses et aides financières pour soutenir votre parcours.'],
    [CircleDollarSign, 'Financement participatif', 'Lancez votre projet étudiant et obtenez le soutien de la communauté.'],
    [ShieldCheck, 'Garantie bancaire', 'Obtenez une garantie pour vos démarches visa, logement et inscription.'],
  ]

  return (
    <div className="finance-page grid gap-7 xl:grid-cols-[1fr_360px]">
      <div className="space-y-7">
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }} className="finance-hero-banner relative min-h-[560px] overflow-hidden rounded-lg border border-slate-200 bg-[#f8fbff] p-8 shadow-sm xl:p-10">
          <img src={financeHero} alt="" className="finance-hero-bg absolute inset-0 h-full w-full object-contain object-right-bottom" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,.98)_0%,rgba(248,251,255,.9)_42%,rgba(248,251,255,.22)_58%,rgba(248,251,255,0)_74%)]" />
          <div className="relative z-10 text-sm font-semibold text-slate-500">Accueil <span className="mx-2">›</span> Banque & Finance</div>
          <div className="relative z-10 mt-8 max-w-[620px] xl:max-w-[50%] xl:min-w-[520px]">
            <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-950">Banque & Finance pour étudiants internationaux</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Ouvrez un compte bancaire, transférez de l'argent, gérez votre budget et explorez des solutions de financement adaptées à votre parcours.</p>
          </div>
          <div className="relative z-10 mt-12 grid gap-4 lg:grid-cols-4">
            {quickServices.map(([Icon, title, text, to], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.07, duration: 0.34, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -14 }}>
              <Link to={to} className="finance-quick-card group block h-full rounded-lg border p-5 text-white shadow-lg shadow-blue-950/15 backdrop-blur transition duration-300 hover:shadow-xl hover:shadow-blue-950/10">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-700 shadow-sm shadow-blue-950/10 transition duration-300 group-hover:bg-blue-50 group-hover:text-blue-800"><Icon size={22} /></div>
                <h3 className="font-black leading-tight text-white transition duration-300 group-hover:text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-blue-100 transition duration-300 group-hover:text-slate-500">{text}</p>
                <span className="finance-quick-arrow mt-3 inline-grid h-8 w-8 place-items-center rounded-full text-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight size={18} />
                </span>
              </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-5">
          {stats.map(([Icon, value, label]) => (
            <div key={`${value}-${label}`} className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={21} /></div>
              <div><div className="text-lg font-black text-slate-950"><AnimatedStatValue value={value} /></div><div className="text-sm font-semibold text-slate-500">{label}</div></div>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-950">Nos banques partenaires</h2>
            <Link to="/finance/compte" className="flex items-center gap-2 text-sm font-black text-blue-800">Voir toutes les banques <ArrowRight size={17} /></Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-5">
            {banks.map(([bank, logo, tag, perks], index) => (
              <motion.article key={bank} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }} whileHover={{ y: -15 }} className="finance-bank-card flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex min-h-12 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-blue-100">
                    <BrandLogo src={logo} name={bank} className="finance-bank-logo h-full w-full object-contain p-2" />
                  </span>
                  <h3 className="text-base font-black leading-tight text-slate-950">{bank}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold"><span className="finance-student-badge rounded-lg px-3 py-1 text-blue-800">Compte étudiant</span><span className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700">{tag}</span></div>
                <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  {perks.map((perk) => <div key={perk} className="flex gap-2"><CheckCircle2 className="shrink-0 text-emerald-600" size={16} />{perk}</div>)}
                </div>
                <div className="mt-auto border-t border-blue-200 pt-4"><Link to="/finance/compte" className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-sm shadow-blue-600/20">Ouverture en ligne</Link></div>
              </motion.article>
            ))}
          </div>
        </section>

      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Convertisseur de devises</h2>
          <div className="mt-6 text-sm font-bold text-slate-500">Vous envoyez</div>
          <div className="mt-2 flex h-14 items-center justify-between rounded-lg border border-slate-200 px-4">
            <span className="text-lg font-black text-slate-950">1 000</span>
            <span className="flex items-center gap-2 font-black text-slate-700"><img src={logos.europe} alt="" className="h-6 w-6 rounded-full" /> EUR <ChevronDown size={16} /></span>
          </div>
          <div className="my-5 flex justify-center"><div className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 font-black text-blue-800">↕</div></div>
          <div className="text-sm font-bold text-slate-500">Le bénéficiaire reçoit</div>
          <div className="mt-2 flex h-14 items-center justify-between rounded-lg border border-slate-200 px-4">
            <span className="text-lg font-black text-slate-950">655 957</span>
            <span className="flex items-center gap-2 font-black text-slate-700"><img src="https://flagcdn.com/w40/tg.png" alt="" className="h-6 w-6 rounded-full" /> XOF <ChevronDown size={16} /></span>
          </div>
          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-600">
            <div className="font-black text-slate-950">Taux de change</div>
            <div className="mt-2">1 EUR = 655.957 XOF</div>
            <div className="mt-2 text-xs text-emerald-600">Mis à jour : aujourd'hui, 10:30</div>
          </div>
          <Link to="/finance/transfert" className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-800 font-black text-white shadow-lg shadow-blue-900/20"><Send size={18} />Envoyer de l'argent</Link>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Besoin d'aide ?</h2>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Nos conseillers sont disponibles pour vous accompagner dans vos démarches bancaires et financières.</p>
          <div className="mt-5 divide-y divide-slate-100">
            {[
              [MessageCircle, 'Discuter en ligne', 'Disponible 7j/7'],
              [Phone, 'Appeler un conseiller', '+33 1 84 80 47 89'],
              [MessageCircle, 'WhatsApp', '+33 6 12 34 56 78'],
            ].map(([Icon, title, text]) => (
              <div key={title} className="flex items-center gap-4 py-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={20} /></div>
                <div><div className="font-black text-slate-950">{title}</div><div className="text-sm font-medium text-slate-500">{text}</div></div>
              </div>
            ))}
          </div>
          <button className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-blue-800 font-black text-blue-800"><CalendarDays size={18} />Prendre rendez-vous</button>
        </section>
      </aside>

      <section className="-mr-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:-mr-8 xl:col-span-2">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">Solutions de financement</h2>
          <button className="flex items-center gap-2 text-sm font-black text-blue-800">Voir toutes les solutions <ArrowRight size={17} /></button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {financing.map(([Icon, title, text]) => (
            <motion.article key={title} whileHover={{ y: -6 }} className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={22} /></div>
              <h3 className="font-black text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{text}</p>
              <Link to="/finance/financement" className="mt-5 flex items-center gap-2 text-sm font-black text-blue-800">Découvrir <ArrowRight size={16} /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="-mr-5 grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:-mr-8 md:grid-cols-4 xl:col-span-2">
        {[
          [ShieldCheck, '100% sécurisé', 'Vos données sont cryptées et protégées'],
          [Landmark, 'Partenaires de confiance', 'Nous travaillons avec des banques agréées et reconnues'],
          [CreditCard, 'Tarifs transparents', 'Aucun frais caché, des tarifs clairs et compétitifs'],
          [UserRound, 'Accompagnement personnalisé', 'Un conseiller dédié à chaque étudiant'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={21} /></div>
            <div><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-500">{text}</p></div>
          </div>
        ))}
      </section>
    </div>
  )
}

function FinanceProcess() {
  const { process = 'compte' } = useParams()
  const processes = {
    compte: {
      icon: Landmark,
      title: 'Ouvrir un compte bancaire',
      subtitle: 'Préparez votre dossier, choisissez une banque adaptée et lancez votre ouverture de compte étudiant.',
      badge: 'Ouverture accompagnée',
      steps: ['Profil étudiant', 'Téléphone & SIM', 'Documents', 'Banque', 'Validation'],
      sidebar: ['Carte SIM active obligatoire', 'Passeport ou titre d’identité', 'Email personnel', 'Justificatif d’étude', 'Adresse ou hébergement'],
    },
    transfert: {
      icon: CreditCard,
      title: "Transfert d'argent international",
      subtitle: 'Envoyez ou recevez de l’argent avec un parcours clair, sécurisé et adapté aux familles.',
      badge: 'Transfert sécurisé',
      steps: ['Montant', 'Pays', 'Bénéficiaire', 'Mode de réception', 'Validation'],
      sidebar: ['Taux visible avant validation', 'Frais affichés en FCFA', 'Suivi du transfert', 'Reçu disponible'],
    },
    financement: {
      icon: GraduationCap,
      title: 'Solutions de financement',
      subtitle: 'Explorez les prêts, bourses, garanties et plans de paiement pour financer votre projet d’études.',
      badge: 'Analyse personnalisée',
      steps: ['Besoin', 'Budget', 'Documents', 'Options', 'Plan conseillé'],
      sidebar: ['Bourse d’études', 'Prêt étudiant', 'Garantie bancaire', 'Paiement échelonné'],
    },
    assurance: {
      icon: ShieldCheck,
      title: 'Assurance & Protection',
      subtitle: 'Comparez les protections utiles pour votre visa, votre logement, votre santé et votre responsabilité civile.',
      badge: 'Protection complète',
      steps: ['Situation', 'Pays', 'Besoins', 'Offres', 'Souscription'],
      sidebar: ['Assurance santé', 'Responsabilité civile', 'Habitation', 'Voyage & rapatriement'],
    },
  }
  const config = processes[process] || processes.compte
  const Icon = config.icon

  return (
    <div className="finance-process-page space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Banque & Finance <span className="mx-2">›</span> {config.title}</div>
          <div className="mt-5 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Icon size={27} /></div>
            <div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{config.badge}</span>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{config.title}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-600">{config.subtitle}</p>
        </div>
        <Link to="/finance" className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-black text-blue-800 shadow-sm">Retour finance</Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-5">
        {config.steps.map((step, index) => (
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</div>
            <div className="mt-3 font-black text-slate-950">{step}</div>
          </motion.div>
        ))}
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {process === 'compte' && <BankAccountProcess />}
          {process === 'transfert' && <MoneyTransferProcess />}
          {process === 'financement' && <StudentFundingProcess />}
          {process === 'assurance' && <InsuranceProcess />}
        </motion.section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">À prévoir</h2>
            <div className="mt-5 space-y-3">
              {config.sidebar.map((item) => <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-600"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={16} />{item}</div>)}
            </div>
          </section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Besoin d’aide ?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Un conseiller StudyWay peut vérifier votre dossier avant l’envoi.</p>
            <Link to="/messages" className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-white font-black text-blue-800"><MessageCircle size={17} />Parler à un conseiller</Link>
          </section>
        </aside>
      </div>
    </div>
  )
}

function BankAccountProcess() {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Démarrer l’ouverture de compte</h2>
      <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-black text-blue-950">Carte SIM obligatoire</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Pour ouvrir un compte bancaire en ligne, vous devez avoir un numéro de téléphone actif. La banque l’utilise pour vérifier votre identité, recevoir les codes de sécurité et finaliser l’ouverture du compte.</p>
        <Link to="/esim" className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 font-black text-white shadow-lg shadow-blue-600/20"><Smartphone size={18} />Acheter une carte SIM</Link>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FormInput label="Nom complet" placeholder="Votre nom tel qu’indiqué sur le passeport" />
        <FormInput label="Email" placeholder="votre@email.com" />
        <FormInput label="Téléphone" placeholder="+228 90 12 34 56" />
        <FormSelect label="Pays de résidence actuel" placeholder="Sélectionner le pays" />
        <FormSelect label="Banque souhaitée" placeholder="Nickel, BNP Paribas, Société Générale, N26..." />
        <FormSelect label="Situation logement" placeholder="Adresse disponible, hébergé, en recherche..." />
      </div>
      <FinanceDocumentChecklist docs={['Passeport', 'Visa ou récépissé', 'Lettre d’admission', 'Justificatif de domicile ou hébergement', 'Numéro de téléphone actif']} />
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="support-start-button flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Soumettre ma demande <ArrowRight className="support-start-arrow" size={18} /></button>
        <Link to="/esim" className="flex h-12 items-center gap-3 rounded-lg border border-blue-200 px-7 font-black text-blue-800"><Smartphone size={18} />Je n’ai pas encore de SIM</Link>
      </div>
    </div>
  )
}

function MoneyTransferProcess() {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Préparer un transfert</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormInput label="Montant à envoyer" placeholder="350 000 FCFA" />
        <FormSelect label="Devise d’arrivée" placeholder="XOF, EUR, CAD..." />
        <FormSelect label="Pays du bénéficiaire" placeholder="Togo, France, Canada..." />
        <FormInput label="Nom du bénéficiaire" placeholder="Nom complet" />
        <FormSelect label="Mode de réception" placeholder="Compte bancaire, portefeuille mobile, retrait..." />
        <FormInput label="Motif du transfert" placeholder="Loyer, frais universitaires, aide familiale..." />
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 p-5">
        <h3 className="font-black text-slate-950">Estimation claire</h3>
        <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4"><div>Frais estimés</div><b className="text-blue-700">À confirmer</b></div>
          <div className="rounded-lg bg-slate-50 p-4"><div>Délai</div><b className="text-blue-700">Instantané à 48h</b></div>
          <div className="rounded-lg bg-slate-50 p-4"><div>Reçu</div><b className="text-blue-700">Disponible</b></div>
        </div>
      </div>
      <button className="support-start-button mt-6 flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Continuer <ArrowRight className="support-start-arrow" size={18} /></button>
    </div>
  )
}

function StudentFundingProcess() {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Découvrir les solutions de financement</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          ['Prêt étudiant', 'Analyse du montant nécessaire, durée, garant et capacité de remboursement.'],
          ['Bourse d’études', 'Recherche de bourses selon pays, école, niveau et domaine d’études.'],
          ['Garantie bancaire', 'Dossier pour visa, logement ou inscription universitaire.'],
          ['Plan de paiement', 'Organisation des frais par échéances claires.'],
        ].map(([title, text]) => <div key={title} className="rounded-lg border border-slate-200 p-5"><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p></div>)}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FormSelect label="Besoin principal" placeholder="Frais scolaires, logement, visa, installation..." />
        <FormInput label="Budget estimé" placeholder="1 500 000 FCFA" />
        <FormSelect label="Pays d’étude" placeholder="France, Canada, Belgique..." />
        <FormSelect label="Niveau d’études" placeholder="Licence, Master, Doctorat..." />
      </div>
      <button className="support-start-button mt-6 flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Obtenir mon plan de financement <ArrowRight className="support-start-arrow" size={18} /></button>
    </div>
  )
}

function InsuranceProcess() {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Choisir une protection</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormSelect label="Pays de destination" placeholder="France, Allemagne, Canada..." />
        <FormSelect label="Type de protection" placeholder="Santé, habitation, voyage, responsabilité civile..." />
        <FormInput label="Date d’arrivée" placeholder="Sélectionner une date" icon={CalendarDays} />
        <FormSelect label="Durée souhaitée" placeholder="3 mois, 6 mois, 1 an..." />
      </div>
      <FinanceDocumentChecklist docs={['Passeport', 'Lettre d’admission', 'Adresse de logement si disponible', 'Date de départ', 'Contact d’urgence']} />
      <button className="support-start-button mt-6 flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Comparer les offres <ArrowRight className="support-start-arrow" size={18} /></button>
    </div>
  )
}

function FinanceDocumentChecklist({ docs }) {
  return (
    <div className="mt-6">
      <h3 className="font-black text-slate-950">Documents à préparer</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {docs.map((doc) => <div key={doc} className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-black text-slate-700"><FileText className="text-blue-700" size={18} />{doc}</div>)}
      </div>
    </div>
  )
}

function Housing() {
  const housingImages = [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
  ]
  const homes = [
    ['Studio cosy - Montparnasse', 'Paris 14e, France', '492 000 FCFA', 'Studio', '20 m²', 'Meublé', 'Disponible dès le 15 juin', 'Coup de cœur'],
    ['Appartement - Lyon Part-Dieu', 'Lyon, France', '446 000 FCFA', 'T2', '35 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre - Résidence étudiante', 'Toulouse, France', '295 000 FCFA', 'Chambre', '15 m²', 'Meublé', 'Disponible dès le 1er juillet', 'Vérifié'],
    ['Studio - La Defense', 'Courbevoie, France', '525 000 FCFA', 'Studio', '22 m²', 'Meublé', 'Disponible maintenant', 'Coup de cœur'],
    ['T2 lumineux - Paris', 'Paris 11e, France', '472 000 FCFA', 'T2', '32 m²', 'Équipé', 'Disponible bientôt', 'Vérifié'],
    ['Colocation meublee', 'Lille, France', '341 000 FCFA', 'Colocation', '18 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre calme - Centre', 'Bordeaux, France', '387 000 FCFA', 'Chambre', '17 m²', 'Wi-Fi', 'Disponible maintenant', 'Vérifié'],
    ['Studio moderne - Nantes', 'Nantes, France', '400 000 FCFA', 'Studio', '24 m²', 'Meublé', 'Disponible en août', 'Vérifié'],
  ]
  const why = [
    [ShieldCheck, 'Logements vérifiés', 'Chaque logement est vérifié manuellement par notre équipe'],
    [Lock, 'Paiement sécurisé', 'Payez en toute sécurité via notre plateforme protégée'],
    [MessageCircle, 'Accompagnement', "Aide pour l'installation et toutes vos démarches"],
    [Users, 'Communauté étudiante', "Rejoignez une communauté d'étudiants comme vous"],
  ]

  return (
    <div className="housing-page -mx-5 space-y-8 lg:-mx-8">
      <div className="px-5 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="typewriter-title text-4xl font-black tracking-tight text-slate-950">Trouvez votre logement</h1>
            <p className="mt-3 text-base font-medium text-slate-500">Des milliers de logements vérifiés pour étudiants dans toute l'Europe.</p>
          </div>
          <button className="flex h-12 items-center gap-3 rounded-lg bg-blue-400 px-6 font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-500">
            <MessageCircle size={20} />
            Parler à un conseiller
          </button>
        </div>

        <div className="mt-8 grid items-start gap-8 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1.15fr_1.05fr_1fr_1fr_auto]">
              <HousingSearchItem icon={MapPin} label="Ville ou pays" value="Paris, France" />
              <HousingSearchItem label="Type de logement" value="Tous les types" select />
              <HousingSearchItem label="Budget max." value="525 000 FCFA" select />
              <HousingSearchItem label="Disponibilité" value="Dès maintenant" select />
              <button className="flex h-14 items-center justify-center gap-3 rounded-lg bg-[#082f7a] px-7 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                Rechercher <Search size={19} />
              </button>
            </motion.section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">Affiner les résultats</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
                <div>
                  <div className="font-bold text-slate-900">Prix</div>
                  <div className="mt-3 flex justify-between text-sm font-semibold text-slate-600"><span>0 FCFA</span><span>656 000+ FCFA</span></div>
                  <input type="range" defaultValue="78" className="mt-3 w-full accent-blue-800" />
                </div>
                <HousingChecks title="Type de logement" items={['Studio (342)', 'Appartement (523)', 'Chambre (689)', 'Colocation (215)']} compact />
                <HousingChecks title="Équipements" items={['Wi-Fi', 'Meublé']} compact />
              </div>
            </section>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">Rechercher sur la carte</h3>
            <p className="mt-2 text-sm font-medium text-slate-500">Voir les logements autour de vous</p>
            <div className="relative mt-5 h-36 overflow-hidden rounded-lg bg-blue-50">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,.08)_1px,transparent_1px),linear-gradient(rgba(37,99,235,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="absolute left-[43%] top-[43%] rounded-full bg-white px-4 py-2 text-xl font-black text-blue-950 shadow-lg">Paris</div>
              {[
                ['426k', 'left-[34%] top-[15%]'], ['459k', 'right-[14%] top-[23%]'], ['597k', 'left-[18%] top-[37%]'],
                ['197k', 'left-[49%] top-[55%]'], ['525k', 'right-[9%] bottom-[18%]'], ['394k', 'left-[7%] top-[48%]'],
              ].map(([price, pos]) => <span key={`${price}-${pos}`} className={`absolute ${pos} rounded-lg bg-blue-700 px-3 py-1 text-xs font-black text-white shadow-md`}>{price}</span>)}
            </div>
            <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#082f7a] font-black text-white"><MapPin size={18} />Voir sur la carte</button>
          </section>
        </div>
      </div>

      <div className="px-5 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-950">Logements disponibles <span className="font-bold text-slate-400">(1,248)</span></h2>
            <label className="flex items-center gap-3 text-sm font-bold text-slate-600">
              Trier par :
              <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-900">Recommandés <ChevronDown size={16} /></span>
            </label>
          </div>
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {homes.map((home, index) => <HousingCard key={home[0]} home={home} image={housingImages[index]} index={index} />)}
          </div>
        </section>
      </div>

        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.28, once: true }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="housing-why-section -mb-5 overflow-hidden rounded-t-2xl px-5 py-14 text-white lg:-mb-8 lg:px-8"
        >
          <div className="mx-auto max-w-6xl text-center">
            <span className="housing-why-pill inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-white ring-1 ring-white/15">Logements étudiants vérifiés</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white">Pourquoi choisir nos logements ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-blue-50/85">Une sélection sécurisée, un paiement protégé et un accompagnement pensé pour arriver sereinement.</p>
          </div>
          <div className="mx-auto mt-9 grid max-w-6xl gap-5 md:grid-cols-4">
            {why.map(([Icon, title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.45, once: true }}
                transition={{ delay: index * 0.09, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="housing-why-card rounded-lg border border-white/15 p-5 text-left shadow-lg shadow-blue-950/10 backdrop-blur"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-blue-700 shadow-lg shadow-blue-950/15"><Icon size={24} /></div>
                <div className="mt-5 font-black text-white">{title}</div>
                <p className="mt-2 text-sm font-medium leading-6 text-blue-50/82">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
    </div>
  )
}

function HousingSearchItem({ icon: Icon, label, value, select = false }) {
  return (
    <div className="flex min-h-14 items-center gap-4 border-slate-100 md:border-r md:pr-5">
      {Icon && <Icon size={22} className="text-blue-900" />}
      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold text-slate-500">{label}</div>
        <div className="mt-1 flex items-center justify-between gap-3 font-black text-slate-950">
          <span className="truncate">{value}</span>
          {select && <ChevronDown size={17} className="shrink-0 text-slate-600" />}
        </div>
      </div>
    </div>
  )
}

function HousingCard({ home, image, index }) {
  const [title, place, price, type, size, furnished, availability, badge] = home
  const isFavorite = badge === 'Coup de cœur'
  const [favorite, setFavorite] = useState(false)

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }} whileHover={{ y: -6 }} className="housing-card overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className={`absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-black text-white shadow-sm ${isFavorite ? 'bg-blue-800' : 'bg-emerald-500'}`}>
          {isFavorite ? '♡ Coup de cœur' : '♡ Vérifié'}
        </span>
        <button type="button" onClick={() => setFavorite((value) => !value)} className={`favorite-button absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md ${favorite ? 'is-favorite text-rose-600' : 'text-slate-800'}`} aria-label="Ajouter aux favoris">
          <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="truncate text-lg font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{place}</p>
        <div className="mt-5 text-xl font-black text-slate-950">{price} <span className="text-sm font-semibold text-slate-600">/ mois</span></div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-2"><Building2 size={15} />{type}</span>
          <span className="flex items-center gap-2"><Home size={15} />{size}</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={15} />{furnished}</span>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600"><CheckCircle2 size={16} />{availability}</div>
      </div>
    </motion.article>
  )
}

function HousingChecks({ title, items, compact = false }) {
  return (
    <div className="mt-6">
      <div className="font-bold text-slate-900">{title}</div>
      <div className={`mt-3 ${compact ? 'grid gap-3 sm:grid-cols-2' : 'space-y-3'}`}>
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-800" />
            {item}
          </label>
        ))}
      </div>
    </div>
  )
}

function Universities() {
  const [filters, setFilters] = useState({ q: '', city: '', specialization: '', formation_type: '', admission_rate: '' })
  const [perPage, setPerPage] = useState(12)
  const debouncedFilters = useDebouncedValue(filters, 380)
  const params = new URLSearchParams(Object.entries(debouncedFilters).filter(([, value]) => value))
  params.set('per_page', String(perPage))
  const { data, isLoading } = useQuery({
    queryKey: ['parcoursup-formations', debouncedFilters, perPage],
    queryFn: () => fetchJson(`/api/v1/parcoursup/search?${params.toString()}`),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
  const { data: statsData } = useQuery({
    queryKey: ['parcoursup-stats'],
    queryFn: () => fetchJson('/api/v1/parcoursup/stats'),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  })
  useEffect(() => {
    setPerPage(12)
  }, [debouncedFilters])
  const isFallback = !data?.data?.length
  const formations = isFallback ? parcoursupFallbackFormations : data.data
  const totalResults = data?.meta?.total ?? formations.length
  const canShowMore = !isFallback && formations.length < totalResults
  const realStats = statsData?.data ?? {}
  const stats = [
    [Landmark, formatCompactNumber(realStats.formations ?? totalResults), 'Formations importées'],
    [Globe2, formatCompactNumber(realStats.regions), 'Régions référencées'],
    [GraduationCap, formatCompactNumber(realStats.domains), 'Domaines recensés'],
    [Building2, formatCompactNumber(realStats.establishments), 'Établissements'],
  ]
  const domains = ['Informatique', 'Droit', 'Santé', 'Commerce', 'Ingénierie', 'Arts']

  return (
    <div className="university-page -mx-5 space-y-8 lg:-mx-8">
      <div className="relative grid gap-8 px-5 lg:px-8 xl:grid-cols-[1fr_330px]">
        <section className="university-hero relative min-h-[430px] overflow-visible rounded-lg bg-[#f4f8ff] p-8 md:p-10">
          <img src={universityHero} alt="Étudiante avec cahier" className="university-hero-image absolute inset-y-0 right-0 h-full w-full rounded-lg object-cover" />
          <div className="absolute inset-0 rounded-lg bg-[linear-gradient(90deg,rgba(244,248,255,.92)_0%,rgba(244,248,255,.72)_38%,rgba(244,248,255,.08)_70%,rgba(244,248,255,0)_100%)]" />
          <div className="relative z-10 text-sm font-semibold text-slate-500">Accueil <span className="mx-2">›</span> Universités</div>
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 mt-8 max-w-[600px]">
            <h1 className="university-title text-4xl font-black leading-tight tracking-tight text-slate-950 xl:text-5xl">Explorez les formations<br />Parcoursup</h1>
            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-slate-600 xl:text-xl">Recherchez les formations officielles, comparez les statistiques et préparez votre orientation avec StudyWay.</p>
          </motion.div>
          <div className="absolute right-8 top-14 hidden w-56 rounded-lg bg-white/95 p-5 shadow-xl shadow-blue-100 2xl:block">
            <div className="flex items-center gap-4"><Landmark className="text-blue-800" /><div><div className="text-xl font-black">+ 1200</div><div className="text-sm font-semibold text-slate-500">Universités partenaires</div></div></div>
          </div>
          <div className="absolute right-20 top-44 hidden w-52 rounded-lg bg-white/95 p-5 shadow-xl shadow-blue-100 2xl:block">
            <div className="flex items-center gap-4"><Globe2 className="text-blue-800" /><div><div className="text-xl font-black">+ 50</div><div className="text-sm font-semibold text-slate-500">Pays couverts</div></div></div>
          </div>
        </section>
        <div className="scroll-cue absolute -bottom-6 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-white/90 text-blue-800 shadow-lg shadow-blue-100">
          <ChevronDown size={26} />
        </div>

        <aside className="space-y-6">
          <motion.section initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="career-help-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">Besoin d'aide pour choisir ?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Nos conseillers sont là pour vous aider à trouver la formation idéale.</p>
            <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="career-help-cta mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#082f7a] font-black text-white"><MessageCircle size={18} />Parler à un conseiller</motion.button>
            <div className="mt-6 text-sm font-semibold text-slate-500">Où contactez-nous</div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[MessageCircle, Phone, Mail].map((Icon, index) => <motion.button initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.16 + index * 0.08, type: 'spring', stiffness: 280, damping: 20 }} whileHover={{ y: -4 }} className="career-help-contact grid h-12 place-items-center rounded-lg bg-blue-50 text-blue-800" key={index}><Icon size={20} /></motion.button>)}
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">Guide étudiant</h3>
            <div className="mt-4 space-y-4 text-sm font-semibold text-slate-600">
              {['Comment choisir son université ?', "Préparer son dossier d'admission", 'Demande de visa étudiant'].map((item, index) => <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.08 }} key={item}><Link to="/guides" className="flex items-center gap-3 hover:text-blue-800"><FileText size={17} />{item}</Link></motion.div>)}
            </div>
            <Link to="/guides" className="mt-6 inline-flex font-black text-blue-800">Voir tous les guides →</Link>
          </motion.section>
        </aside>
      </div>

      <div className="space-y-7 px-5 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <label>
              <span className="text-sm font-black text-slate-950">Formation, université, ville</span>
              <span className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-slate-400"><Search size={18} /><input value={filters.q} onChange={(event) => setFilters((current) => ({ ...current, q: event.target.value }))} className="w-full border-none bg-transparent text-sm font-semibold text-slate-700 outline-none" placeholder="Ex: Informatique, Sorbonne, Lyon..." /></span>
            </label>
            <UniversityInput label="Ville" value={filters.city} placeholder="Paris" onChange={(value) => setFilters((current) => ({ ...current, city: value }))} />
            <UniversityInput label="Domaine" value={filters.specialization} placeholder="Informatique" onChange={(value) => setFilters((current) => ({ ...current, specialization: value }))} />
            <UniversityInput label="Type" value={filters.formation_type} placeholder="Licence, BTS, BUT..." onChange={(value) => setFilters((current) => ({ ...current, formation_type: value }))} />
            <button onClick={() => setFilters({ q: '', city: '', specialization: '', formation_type: '', admission_rate: '' })} className="mt-7 flex h-12 items-center justify-center gap-3 rounded-lg bg-[#082f7a] px-7 font-black text-white">Réinitialiser <Search size={18} /></button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
            Recherches populaires :
            {domains.map((item) => <button onClick={() => setFilters((current) => ({ ...current, specialization: item }))} className="rounded-lg bg-blue-50 px-4 py-2 font-bold text-blue-900" key={item}>{item}</button>)}
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
          {stats.map(([Icon, value, label]) => (
            <div key={label} className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={24} /></div>
              <div><div className="text-xl font-black text-slate-950">{value}</div><div className="text-sm font-semibold text-slate-500">{label}</div></div>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Parcourir par domaine d'études</h2>
            <button className="font-black text-blue-800">Voir tous les domaines →</button>
          </div>
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {domains.map((label) => <button onClick={() => setFilters((current) => ({ ...current, specialization: label }))} key={label} className="flex h-20 items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 font-black shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><GraduationCap className="text-blue-700" size={23} />{label}</button>)}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.18, once: true }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Formations disponibles</h2>
            <span className="font-black text-blue-800">{isLoading ? 'Recherche...' : `${totalResults} résultats`}</span>
          </div>
          {isFallback && (
            <div className="mb-5 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
              Données de démonstration affichées : démarrez l’API Laravel pour charger les milliers de formations officielles.
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {formations.map((formation, index) => <UniversityResultCard key={formation.id ?? formation.formation_id} formation={formation} index={index} />)}
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            {!isFallback && <div className="text-sm font-bold text-slate-500">Affichage de {formations.length} formations sur {totalResults}</div>}
            {canShowMore && (
              <motion.button
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPerPage((value) => value + 12)}
                className="support-start-button flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-8 font-black text-white shadow-lg shadow-blue-600/20"
              >
                Afficher plus <ArrowRight className="support-start-arrow" size={18} />
              </motion.button>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function UniversityInput({ label, value, placeholder, onChange }) {
  return (
    <label>
      <span className="whitespace-nowrap text-sm font-black text-slate-950">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 flex h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50" placeholder={placeholder} />
    </label>
  )
}

function UniversityResultCard({ formation, index }) {
  const [favorite, setFavorite] = useState(false)
  const rate = formation.admission_rate ? `${Math.round(formation.admission_rate)}%` : 'À vérifier'
  const type = formation.formation_type ?? 'Parcoursup'
  const domain = formation.specialization ?? 'Domaine à vérifier'
  const city = formation.city ?? 'France'
  const universityImage = getUniversityCardImage(formation)
  const shouldAnimateOnScroll = index < 4

  return (
    <motion.article initial={shouldAnimateOnScroll ? { opacity: 0, y: 38, filter: 'blur(6px)' } : false} whileInView={shouldAnimateOnScroll ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined} viewport={shouldAnimateOnScroll ? { amount: 0.22, once: true } : undefined} transition={shouldAnimateOnScroll ? { delay: index * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] } : undefined} whileHover={{ y: -8 }} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70">
      <div className="relative min-h-[168px] overflow-hidden border-b border-slate-100 bg-slate-100 p-5">
        <img
          src={universityImage}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = universityHero
          }}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,45,.12)_0%,rgba(8,20,45,.18)_45%,rgba(8,20,45,.66)_100%)]" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-800 shadow-sm"><img src={logos.france} alt="" className="h-4 w-6 rounded object-cover" />{formation.country ?? 'France'}</span>
            <span className="rounded-full bg-blue-600/95 px-3 py-1.5 text-xs font-black text-white shadow-sm">{type}</span>
          </div>
          <button type="button" onClick={() => setFavorite((value) => !value)} className={`favorite-button grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-md transition group-hover:scale-105 ${favorite ? 'is-favorite text-rose-600' : 'text-slate-700'}`}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white text-blue-700 shadow-lg shadow-slate-900/20"><GraduationCap size={24} /></div>
          <div className="min-w-0">
            <div className="line-clamp-1 text-sm font-black text-white">{domain}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-white/85"><MapPin size={13} />{city}</div>
          </div>
        </div>
      </div>
      <div className="flex min-h-[285px] flex-col p-5">
        <h3 className="line-clamp-3 min-h-[66px] font-black leading-snug text-slate-950">{formation.formation_name}</h3>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-500">{formation.university_name ?? 'Établissement français'}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600"><Building2 size={15} />{formation.region ?? 'Région non communiquée'}</div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-black">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-800"><div className="text-sm">{rate}</div><span className="font-semibold text-blue-500">admission</span></div>
          <div className="rounded-lg bg-slate-50 p-3 text-slate-700"><div className="text-sm">{formation.duration ?? '—'}</div><span className="font-semibold text-slate-500">durée</span></div>
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700"><div className="text-sm">{formation.capacity ?? '—'}</div><span className="font-semibold text-emerald-500">places</span></div>
        </div>
        <Link to={`/universites/${formation.id ?? formation.formation_id}`} className="support-start-button mt-auto flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Voir détails <ArrowRight className="support-start-arrow" size={17} /></Link>
      </div>
    </motion.article>
  )
}

function UniversityFormationDetail() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['parcoursup-formation', id],
    queryFn: () => fetchJson(`/api/v1/parcoursup/formations/${id}`),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })
  const formation = data?.data ?? parcoursupFallbackFormations.find((item) => String(item.id) === String(id)) ?? parcoursupFallbackFormations[0]
  const rate = formation.admission_rate ? `${Math.round(formation.admission_rate)}%` : 'Non communiqué'
  const capacity = formation.capacity ?? 'Non communiqué'
  const duration = formation.duration ?? 'Selon formation'
  const formationType = formation.formation_type ?? 'Formation Parcoursup'
  const specialization = formation.specialization ?? 'Domaine à vérifier'
  const location = [formation.city, formation.region, formation.country ?? 'France'].filter(Boolean).join(', ')
  const dossierItems = [
    "Relevés de notes et derniers bulletins",
    "Passeport ou pièce d’identité",
    "Projet de formation motivé",
    "CV étudiant et expériences",
    "Attestations de langue si demandées",
  ]
  const supportSteps = [
    ['1', 'Analyse du profil', 'Vérification de la cohérence entre votre parcours, vos notes et cette formation.'],
    ['2', 'Préparation du dossier', 'Organisation des documents, du projet motivé et des pièces à traduire.'],
    ['3', 'Plan admission', 'Comparaison des chances d’accès et proposition de formations alternatives.'],
    ['4', 'Départ étudiant', 'Visa, logement, assurance, banque et installation après admission.'],
  ]

  return (
    <div className="space-y-7">
      <Link to="/universites" className="inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Retour aux formations</Link>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-7 lg:grid-cols-[1fr_330px]">
          <div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{formation.specialization ?? formation.formation_type ?? 'Parcoursup'}</span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950">{formation.formation_name}</h1>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{formation.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/accompagnement/demarrer" className="support-start-button flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Commencer mon accompagnement <ArrowRight className="support-start-arrow" size={18} /></Link>
              <Link to="/messages" className="flex h-12 items-center gap-3 rounded-lg border border-blue-200 px-7 font-black text-blue-800">Parler à un conseiller</Link>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-5">
            <h2 className="font-black text-slate-950">Statistiques</h2>
            <div className="mt-5 space-y-4 text-sm font-semibold text-slate-600">
              <div className="flex justify-between"><span>Taux admission</span><b className="text-blue-700">{rate}</b></div>
              <div className="flex justify-between"><span>Capacité</span><b>{capacity}</b></div>
              <div className="flex justify-between"><span>Durée</span><b>{duration}</b></div>
              <div className="flex justify-between"><span>Coûts estimés</span><b>{formation.tuition ? `${formation.tuition} FCFA` : 'À vérifier'}</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <UniversityDetailMetric icon={GraduationCap} label="Type de formation" value={formationType} />
        <UniversityDetailMetric icon={Languages} label="Domaine" value={specialization} />
        <UniversityDetailMetric icon={CalendarDays} label="Durée estimée" value={duration} />
        <UniversityDetailMetric icon={Users} label="Places indicatives" value={String(capacity)} />
      </section>

      <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
        <div className="space-y-7">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Informations complètes</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoLine label="Université" value={formation.university_name ?? 'Établissement français'} />
              <InfoLine label="Formation" value={formation.formation_name} />
              <InfoLine label="Type" value={formationType} />
              <InfoLine label="Domaine" value={specialization} />
              <InfoLine label="Ville" value={formation.city ?? 'France'} />
              <InfoLine label="Région" value={formation.region ?? 'Non communiqué'} />
              <InfoLine label="Pays" value={formation.country ?? 'France'} />
              <InfoLine label="Référence Parcoursup" value={formation.formation_id ?? 'Non communiqué'} />
            </div>
            {formation.website && (
              <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
                Source publique Parcoursup enregistrée dans StudyWay. La consultation se fait ici, sans quitter la plateforme.
              </div>
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Admission & dossier</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4"><div className="text-sm font-bold text-blue-600">Taux indicatif</div><div className="mt-2 text-2xl font-black text-blue-900">{rate}</div></div>
              <div className="rounded-lg bg-emerald-50 p-4"><div className="text-sm font-bold text-emerald-600">Capacité</div><div className="mt-2 text-2xl font-black text-emerald-900">{capacity}</div></div>
              <div className="rounded-lg bg-slate-50 p-4"><div className="text-sm font-bold text-slate-500">Durée</div><div className="mt-2 text-2xl font-black text-slate-900">{duration}</div></div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {dossierItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-3 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="text-emerald-500" size={18} />{item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Université & localisation</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">{location}</p>
            <div className="relative mt-6 h-64 overflow-hidden rounded-lg bg-blue-50">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,.09)_1px,transparent_1px),linear-gradient(rgba(37,99,235,.09)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30"><MapPin size={30} /></div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-950 shadow">{formation.city ?? 'Localisation'}{formation.latitude ? ` · ${formation.latitude}, ${formation.longitude}` : ''}</div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Accompagnement StudyWay</h2>
            <div className="mt-5 space-y-4">
              {supportSteps.map(([step, title, text]) => (
                <div key={step} className="flex gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-sm font-black text-white">{step}</div>
                  <div><div className="font-black text-blue-950">{title}</div><p className="mt-1 text-sm font-semibold leading-6 text-blue-900">{text}</p></div>
                </div>
              ))}
            </div>
            <Link to="/accompagnement/demarrer" className="support-start-button mt-6 flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 font-black text-white">Démarrer avec cette formation <ArrowRight className="support-start-arrow" size={18} /></Link>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">Coûts à prévoir</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
              <div className="flex justify-between"><span>Frais StudyWay</span><b>Selon formule</b></div>
              <div className="flex justify-between"><span>Frais universitaires</span><b>{formation.tuition ? `${formation.tuition} FCFA` : 'À confirmer'}</b></div>
              <div className="flex justify-between"><span>Traductions / légalisation</span><b>Si nécessaire</b></div>
              <div className="flex justify-between"><span>Visa, logement, assurance</span><b>Après admission</b></div>
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Important</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-blue-900">StudyWay utilise les données publiques Parcoursup pour l’orientation uniquement. Le module ne crée pas de compte Parcoursup, ne dépose pas de candidature et n’automatise aucun vœu officiel.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

function UniversityDetailMetric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700"><Icon size={22} /></div>
      <div>
        <div className="text-sm font-bold text-slate-500">{label}</div>
        <div className="mt-1 line-clamp-2 font-black text-slate-950">{value}</div>
      </div>
    </div>
  )
}

function useDebouncedValue(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

async function fetchJson(path) {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
  const response = await fetch(`${apiBaseUrl}${path}`)

  if (!response.ok) {
    throw new Error('API unavailable')
  }

  return response.json()
}

function formatCompactNumber(value) {
  const number = Number(value ?? 0)

  if (!number) {
    return '0'
  }

  return new Intl.NumberFormat('fr-FR', {
    notation: number >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(number)
}

const universityCardImages = [
  universityHero,
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=900&q=80',
  parisPackBackground,
]

function getUniversityCardImage(formation) {
  const key = `${formation.university_name ?? ''}-${formation.city ?? ''}-${formation.formation_id ?? formation.id ?? ''}`
  const hash = Array.from(key).reduce((total, character) => total + character.charCodeAt(0), 0)

  return universityCardImages[hash % universityCardImages.length]
}

const parcoursupFallbackFormations = [
  {
    id: 'demo-licence-info',
    formation_id: 'demo-licence-info',
    formation_name: 'Licence Informatique',
    university_name: 'Université Paris Cité',
    city: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    formation_type: 'Licence',
    specialization: 'Informatique',
    duration: '3 ans',
    admission_rate: 62,
    capacity: 180,
    description: 'Formation universitaire en informatique pour construire des bases solides en algorithmique, développement, bases de données et mathématiques.',
  },
  {
    id: 'demo-but-gea',
    formation_id: 'demo-but-gea',
    formation_name: 'BUT Gestion des entreprises et administrations',
    university_name: 'IUT de Lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    country: 'France',
    formation_type: 'BUT',
    specialization: 'Gestion',
    duration: '3 ans',
    admission_rate: 48,
    capacity: 120,
    description: 'Parcours professionnalisant pour préparer les étudiants à la gestion, la comptabilité, le management et l’administration.',
  },
  {
    id: 'demo-bts-commerce',
    formation_id: 'demo-bts-commerce',
    formation_name: 'BTS Commerce international',
    university_name: 'Lycée Jean Lurçat',
    city: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    formation_type: 'BTS',
    specialization: 'Commerce',
    duration: '2 ans',
    admission_rate: 55,
    capacity: 35,
    description: 'Formation courte orientée import-export, négociation internationale, logistique et relation client à l’étranger.',
  },
  {
    id: 'demo-cpge-mpsi',
    formation_id: 'demo-cpge-mpsi',
    formation_name: 'CPGE MPSI',
    university_name: 'Lycée Louis-le-Grand',
    city: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    formation_type: 'CPGE',
    specialization: 'Mathématiques',
    duration: '2 ans',
    admission_rate: 28,
    capacity: 48,
    description: 'Classe préparatoire scientifique exigeante pour préparer les concours d’écoles d’ingénieurs.',
  },
  {
    id: 'demo-licence-droit',
    formation_id: 'demo-licence-droit',
    formation_name: 'Licence Droit',
    university_name: 'Université de Bordeaux',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    country: 'France',
    formation_type: 'Licence',
    specialization: 'Droit',
    duration: '3 ans',
    admission_rate: 70,
    capacity: 420,
    description: 'Formation générale en droit privé, droit public, méthodologie juridique et institutions.',
  },
  {
    id: 'demo-pass-sante',
    formation_id: 'demo-pass-sante',
    formation_name: 'PASS Santé',
    university_name: 'Université de Montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    country: 'France',
    formation_type: 'PASS',
    specialization: 'Santé',
    duration: '1 an',
    admission_rate: 34,
    capacity: 620,
    description: 'Parcours d’accès spécifique santé pour préparer médecine, pharmacie, odontologie, maïeutique ou kinésithérapie.',
  },
  {
    id: 'demo-but-info',
    formation_id: 'demo-but-info',
    formation_name: 'BUT Informatique',
    university_name: 'IUT de Lille',
    city: 'Lille',
    region: 'Hauts-de-France',
    country: 'France',
    formation_type: 'BUT',
    specialization: 'Informatique',
    duration: '3 ans',
    admission_rate: 44,
    capacity: 104,
    description: 'Formation professionnalisante en développement logiciel, systèmes, bases de données et gestion de projet.',
  },
  {
    id: 'demo-licence-eco',
    formation_id: 'demo-licence-eco',
    formation_name: 'Licence Économie et gestion',
    university_name: 'Université Toulouse Capitole',
    city: 'Toulouse',
    region: 'Occitanie',
    country: 'France',
    formation_type: 'Licence',
    specialization: 'Économie',
    duration: '3 ans',
    admission_rate: 66,
    capacity: 300,
    description: 'Parcours universitaire pour acquérir les bases en économie, gestion, statistiques et analyse financière.',
  },
  {
    id: 'demo-bts-compta',
    formation_id: 'demo-bts-compta',
    formation_name: 'BTS Comptabilité et gestion',
    university_name: 'Lycée La Martinière Duchère',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    country: 'France',
    formation_type: 'BTS',
    specialization: 'Comptabilité',
    duration: '2 ans',
    admission_rate: 58,
    capacity: 32,
    description: 'Formation courte orientée comptabilité, fiscalité, gestion financière et outils professionnels.',
  },
  {
    id: 'demo-licence-arts',
    formation_id: 'demo-licence-arts',
    formation_name: 'Licence Arts plastiques',
    university_name: 'Université Rennes 2',
    city: 'Rennes',
    region: 'Bretagne',
    country: 'France',
    formation_type: 'Licence',
    specialization: 'Arts',
    duration: '3 ans',
    admission_rate: 61,
    capacity: 95,
    description: 'Formation en création artistique, histoire de l’art, pratiques plastiques et culture visuelle.',
  },
  {
    id: 'demo-bts-electro',
    formation_id: 'demo-bts-electro',
    formation_name: 'BTS Électrotechnique',
    university_name: 'Lycée Diderot',
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d’Azur',
    country: 'France',
    formation_type: 'BTS',
    specialization: 'Ingénierie',
    duration: '2 ans',
    admission_rate: 52,
    capacity: 30,
    description: 'Formation technique en énergie électrique, automatismes, maintenance et installations industrielles.',
  },
]

function StudentGuides() {
  const [activeCategory, setActiveCategory] = useState('Orientation')
  const guides = [
    {
      slug: 'choisir-universite',
      title: 'Comment choisir son université ?',
      category: 'Orientation',
      time: '8 min',
      icon: Building2,
      color: 'bg-blue-50 text-blue-700',
      intro: 'Comparez les programmes, la ville, le budget, la reconnaissance du diplôme et les opportunités après les études.',
      steps: ['Définir votre objectif professionnel', 'Comparer les programmes et accréditations', 'Évaluer le coût total de la ville', 'Vérifier les prérequis et dates limites'],
    },
    {
      slug: 'preparer-dossier-admission',
      title: "Préparer son dossier d'admission",
      category: 'Admission',
      time: '12 min',
      icon: ClipboardList,
      color: 'bg-emerald-50 text-emerald-700',
      intro: 'Organisez vos diplômes, relevés, CV, lettre de motivation et recommandations pour déposer un dossier clair.',
      steps: ['Créer une checklist par université', 'Traduire et certifier les documents', 'Adapter la lettre de motivation', 'Relire et déposer avant la date limite'],
    },
    {
      slug: 'demande-visa-etudiant',
      title: 'Demande de visa étudiant',
      category: 'Visa',
      time: '10 min',
      icon: Plane,
      color: 'bg-violet-50 text-violet-700',
      intro: 'Préparez les preuves financières, l’admission, le logement et l’assurance pour éviter les retards.',
      steps: ['Vérifier le type de visa', 'Préparer les justificatifs financiers', 'Réserver le rendez-vous consulaire', 'Suivre la demande après dépôt'],
    },
    {
      slug: 'trouver-logement-securise',
      title: 'Trouver un logement sécurisé',
      category: 'Installation',
      time: '7 min',
      icon: Home,
      color: 'bg-amber-50 text-amber-700',
      intro: 'Repérez les quartiers adaptés, évitez les arnaques et préparez votre dossier locatif.',
      steps: ['Définir votre budget', 'Comparer résidence, studio et colocation', 'Vérifier le contrat', 'Préparer caution et assurance'],
    },
  ]
  const categories = ['Orientation', 'Admission', 'Visa', 'Installation']
  const filteredGuides = guides.filter((guide) => guide.category === activeCategory)
  const checklist = ['Passeport valide', 'Diplôme et relevés', 'CV académique', 'Lettre de motivation', 'Preuve de ressources', 'Attestation de logement']

  return (
    <div className="guides-page space-y-7">
      <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Guides étudiant</div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">Guide étudiant</h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">Des guides clairs pour choisir votre université, préparer votre admission, réussir votre visa et organiser votre installation.</p>
          </div>
          <label className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-500">
            <Search size={19} />
            <input className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400" placeholder="Rechercher un guide..." />
          </label>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`h-12 rounded-lg font-black shadow-sm transition ${category === activeCategory ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800'}`}>{category}</button>)}
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <section className="grid gap-5 md:grid-cols-2">
          {filteredGuides.map(({ slug, title, category, time, icon: Icon, color, intro, steps }, index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className={`grid h-12 w-12 place-items-center rounded-lg ${color}`}><Icon size={23} /></div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{time}</span>
              </div>
              <div className="mt-5 text-sm font-black text-blue-700">{category}</div>
              <h2 className="mt-2 text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{intro}</p>
              <div className="mt-5 space-y-3">
                {steps.map((step, stepIndex) => <div key={step} className="flex gap-3 text-sm font-semibold text-slate-600"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700">{stepIndex + 1}</span>{step}</div>)}
              </div>
              <Link to={`/guides/${slug}`} className="mt-6 flex items-center gap-2 font-black text-blue-800">Lire le guide <ArrowRight size={17} /></Link>
            </motion.article>
          ))}
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">Checklist départ</h2>
            <div className="mt-5 space-y-3">
              {checklist.map((item, index) => <label key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-600"><input type="checkbox" defaultChecked={index < 3} className="h-4 w-4 rounded border-slate-300 accent-blue-700" />{item}</label>)}
            </div>
          </section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Besoin d’un avis personnalisé ?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Un conseiller peut analyser votre projet et vous proposer une feuille de route.</p>
            <Link to="/accompagnement/demarrer" className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Démarrer <ArrowRight size={17} /></Link>
          </section>
        </aside>
      </div>
    </div>
  )
}

function StudentGuideDetail() {
  const { slug } = useParams()
  const guides = {
    'choisir-universite': {
      title: 'Comment choisir son université ?',
      category: 'Orientation',
      icon: Building2,
      color: 'bg-blue-50 text-blue-700',
      intro: 'Choisir une université ne dépend pas seulement du classement. Il faut aligner votre projet, votre budget, les conditions d’admission et la ville où vous allez vivre.',
      sections: [
        ['Clarifier votre objectif', 'Commencez par votre objectif professionnel : métier visé, secteur, pays où vous souhaitez travailler, niveau de diplôme attendu.'],
        ['Comparer les programmes', 'Regardez les matières, stages, alternance, langue d’enseignement, accréditations et partenariats entreprises.'],
        ['Évaluer le budget réel', 'Ajoutez frais de scolarité, logement, transport, assurance, nourriture, visa et frais d’installation.'],
        ['Vérifier les conditions d’admission', 'Notez les prérequis, niveau de langue, documents, dates limites et éventuels entretiens.'],
      ],
      checklist: ['Programme cohérent avec mon projet', 'Budget annuel estimé', 'Prérequis vérifiés', 'Ville et logement étudiés', 'Dates limites notées'],
    },
    'preparer-dossier-admission': {
      title: "Préparer son dossier d'admission",
      category: 'Admission',
      icon: ClipboardList,
      color: 'bg-emerald-50 text-emerald-700',
      intro: 'Un bon dossier doit être clair, complet et adapté à chaque établissement. L’objectif est de rassurer l’université sur votre niveau, votre motivation et votre sérieux.',
      sections: [
        ['Créer une checklist par école', 'Chaque université peut demander des documents différents. Séparez vos listes pour éviter les oublis.'],
        ['Préparer les documents officiels', 'Diplômes, relevés, attestations, passeport et traductions doivent être lisibles et cohérents.'],
        ['Adapter votre motivation', 'La lettre doit expliquer pourquoi cette formation, cette université et ce projet ont du sens.'],
        ['Relire avant dépôt', 'Vérifiez noms, dates, formats PDF, poids des fichiers et délais de soumission.'],
      ],
      checklist: ['Passeport', 'Diplômes', 'Relevés', 'CV', 'Lettre de motivation', 'Recommandations'],
    },
    'demande-visa-etudiant': {
      title: 'Demande de visa étudiant',
      category: 'Visa',
      icon: Plane,
      color: 'bg-violet-50 text-violet-700',
      intro: 'La demande de visa demande de la rigueur. Le dossier doit prouver votre admission, vos ressources, votre logement et votre intention d’étudier sérieusement.',
      sections: [
        ['Identifier le bon visa', 'Vérifiez le visa adapté à votre pays, la durée de vos études et votre situation.'],
        ['Rassembler les preuves', 'Admission, ressources, logement, assurance, passeport et photos doivent être prêts avant le rendez-vous.'],
        ['Préparer le rendez-vous', 'Classez vos documents, imprimez les justificatifs et préparez des réponses simples.'],
        ['Suivre le dossier', 'Gardez les reçus, numéros de dossier et messages officiels jusqu’à la décision.'],
      ],
      checklist: ['Admission', 'Passeport valide', 'Preuve de ressources', 'Logement', 'Assurance', 'Rendez-vous consulaire'],
    },
    'trouver-logement-securise': {
      title: 'Trouver un logement sécurisé',
      category: 'Installation',
      icon: Home,
      color: 'bg-amber-50 text-amber-700',
      intro: 'Le logement doit être anticipé tôt. Un bon choix réduit le stress à l’arrivée et facilite souvent la demande de visa.',
      sections: [
        ['Définir le budget', 'Incluez loyer, charges, dépôt de garantie, assurance, transport et frais d’installation.'],
        ['Choisir le type de logement', 'Résidence étudiante, studio ou colocation : comparez sécurité, distance et conditions.'],
        ['Éviter les arnaques', 'Ne payez pas sans contrat clair, justificatif, adresse vérifiable et interlocuteur fiable.'],
        ['Préparer le dossier', 'Préparez pièce d’identité, admission, garant, justificatifs financiers et assurance.'],
      ],
      checklist: ['Budget validé', 'Quartier vérifié', 'Contrat relu', 'Garant ou caution', 'Assurance logement'],
    },
  }
  const guide = guides[slug] || guides['choisir-universite']
  const Icon = guide.icon

  return (
    <div className="guide-detail-page space-y-7">
      <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Guides étudiant <span className="mx-2">›</span> {guide.category}</div>
            <div className={`mt-6 grid h-14 w-14 place-items-center rounded-lg ${guide.color}`}><Icon size={27} /></div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">{guide.title}</h1>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{guide.intro}</p>
          </div>
          <Link to="/guides" className="rounded-lg border border-slate-200 px-5 py-3 font-black text-blue-800 hover:bg-blue-50">Tous les guides</Link>
        </div>
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_340px]">
        <section className="space-y-5">
          {guide.sections.map(([title, text], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 font-black text-white">{index + 1}</span>
                <div>
                  <h2 className="text-xl font-black text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">Checklist du guide</h2>
            <div className="mt-5 space-y-3">
              {guide.checklist.map((item, index) => <label key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-600"><input type="checkbox" defaultChecked={index < 2} className="h-4 w-4 rounded border-slate-300 accent-blue-700" />{item}</label>)}
            </div>
          </section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Besoin d’aide sur ce guide ?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Un conseiller peut transformer ce guide en plan d’action personnalisé.</p>
            <Link to="/accompagnement/demarrer" className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Démarrer mon accompagnement <ArrowRight size={17} /></Link>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Profile() {
  return <div className="grid gap-6 xl:grid-cols-[1fr_420px]"><div className="space-y-6"><Panel title="Mon enfant"><div className="flex flex-wrap items-center gap-8"><img src={avatars.kossi} alt="Koffi M. Lucas" className="h-32 w-32 rounded-full object-cover" /><div className="grid flex-1 gap-3 md:grid-cols-2"><h1 className="col-span-full text-2xl font-black">Koffi M. Lucas <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">Actif</span></h1><InfoLine label="ID Étudiant" value="EDU-582941" /><InfoLine label="Email" value="lucas.koffi@email.com" /><InfoLine label="Université" value="Université Paris-Saclay" /><InfoLine label="Statut actuel" value="Étudiant" /></div><button className="rounded-lg border border-blue-700 px-6 py-3 font-black text-blue-800">Voir le profil complet</button></div></Panel><div className="grid gap-4 md:grid-cols-4"><StatCard icon={WalletCards} label="Paiements totaux" value="1 607 000 FCFA" /><StatCard icon={CheckCircle2} label="Paiements effectués" value="1 378 000 FCFA" tone="green" /><StatCard icon={CircleDollarSign} label="Paiements à venir" value="230 000 FCFA" tone="amber" /><StatCard icon={FileText} label="Documents" value="12" tone="purple" /></div><Panel title="Suivi des services"><List items={['Logement - Résidence Les Estudines, Paris - Actif', 'Université - Licence Informatique L1 - Inscrit', 'Compte bancaire - Boursorama - Actif', 'Assurance - habitation - Actif', 'Forfait mobile eSIM - Orange 50Go - Actif']} /></Panel></div><div className="space-y-5"><Panel title="Dernières activités"><List items={['Paiement loyer -361 000 FCFA', 'Document ajouté - Attestation de scolarité', 'Paiement université -984 000 FCFA']} /></Panel><Panel title="Actions rapides"><List items={['Effectuer un paiement', "Envoyer de l'argent", 'Télécharger un document', 'Contacter le support']} /></Panel><div className="rounded-lg bg-blue-50 p-6"><h3 className="font-black">Besoin d'aide ?</h3><p className="mt-2 text-slate-600">Notre équipe est disponible 24/7.</p><button className="mt-5 rounded-lg bg-white px-6 py-3 font-black text-blue-800">Contacter le support</button></div></div></div>
}

function SupportJourney() {
  const steps = [
    [FileText, 'Conseil & Orientation', 'Nous analysons votre profil et vous orientons vers les meilleures universités et pays adaptés à vos objectifs.'],
    [ClipboardList, 'Préparation du dossier', 'Nous vous aidons a rassembler et vérifier tous les documents nécessaires pour votre admission et votre visa.'],
    [FileText, 'Demande de visa', 'Nous vous accompagnons dans la prise de rendez-vous, la soumission du dossier et le suivi auprès du consulat.'],
    [Home, 'Logement & réservation', 'Nous vous aidons à trouver un logement sécurisé et à effectuer votre réservation avant votre arrivée.'],
    [Plane, 'Départ & installation', 'Nous organisons votre voyage et vous accompagnons à votre arrivée pour une installation sereine.'],
  ]
  const guarantees = [
    [UserRound, 'Experts certifiés', 'Une équipe expérimentée à votre service'],
    [ShieldCheck, 'Sécurité garantie', 'Vos données sont protégées à 100%'],
    [CreditCard, 'Paiement sécurisé', 'Transactions 100% sécurisées et transparentes'],
    [Users, 'Suivi personnalisé', 'Un conseiller dédié à chaque étudiant'],
  ]

  return (
    <div className="support-page -mx-5 space-y-8 lg:-mx-8">
      <motion.section initial={{ opacity: 0, y: 18, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden bg-white px-5 py-10 lg:px-8 xl:min-h-[520px]">
        <div className="absolute right-[7%] top-10 h-[430px] w-[560px] rounded-full bg-blue-50" />
        <div className="absolute right-[10%] top-16 h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.12),transparent_68%)]" />
        <img src={supportHero} alt="Étudiant accompagne" className="absolute bottom-0 right-[7%] z-10 hidden h-[500px] w-[520px] object-contain xl:block" />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.36, ease: [0.22, 1, 0.36, 1] }} className="relative z-20 max-w-xl">
          <div className="text-sm font-semibold text-slate-500">Accueil <span className="mx-2">›</span> Accompagnement</div>
          <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-slate-950">Accompagnement<br />personnalisé</h1>
          <p className="mt-7 text-xl font-medium leading-9 text-slate-700">Nous vous accompagnons à chaque étape de votre projet d'études à l'étranger. De la préparation du dossier à votre installation, vous n'êtes jamais seul.</p>
          <div className="mt-9 flex flex-wrap gap-5">
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.42, duration: 0.28, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5, scale: 1.02 }}><Link to="/accompagnement/demarrer" className="support-start-button flex h-14 items-center gap-3 rounded-lg bg-blue-800 px-8 font-black text-white shadow-lg shadow-blue-800/20">Démarrer mon accompagnement <ArrowRight className="support-start-arrow" size={19} /></Link></motion.div>
            <motion.button initial={{ opacity: 0, x: 54, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.56, duration: 0.32, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3 }} className="flex h-14 items-center gap-3 rounded-lg border border-blue-800 px-8 font-black text-blue-800"><Video size={19} />Voir la vidéo</motion.button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="absolute right-[32%] top-[235px] z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Users className="text-emerald-600" /><div><div className="text-xl font-black">98%</div><div className="text-sm text-slate-500">Taux de satisfaction</div></div></div></motion.div>
        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="absolute right-10 top-24 z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Users className="text-blue-700" /><div><div className="text-xl font-black">+ 1500</div><div className="text-sm text-slate-500">Étudiants accompagnés</div></div></div></motion.div>
        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="absolute bottom-20 right-20 z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Globe2 className="text-blue-700" /><div><div className="text-xl font-black">+ 50</div><div className="text-sm text-slate-500">Pays partenaires</div></div></div></motion.div>
      </motion.section>

      <div className="grid gap-8 px-5 lg:px-8 xl:grid-cols-[1fr_330px]">
        <div className="space-y-7">
          <div><h2 className="text-3xl font-black text-slate-950">Nos étapes d'accompagnement</h2><p className="mt-2 text-lg font-medium text-slate-500">Un parcours clair et complet pour réussir votre départ.</p></div>
          <section className="support-steps-track relative grid gap-6 md:grid-cols-5">
            {steps.map(([Icon, title, text], index) => <motion.div initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -10 }} transition={{ delay: 0.12 + index * 0.055, duration: 0.36, ease: [0.22, 1, 0.36, 1] }} key={title} className="support-step-card relative rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">{index < steps.length - 1 && <span className="support-step-connector" />}<div className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-blue-800 font-black text-white">{index + 1}</div><div className="mx-auto mt-5 grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={28} /></div><h3 className="mt-5 font-black text-slate-950">{title}</h3><p className="mt-4 text-sm leading-6 text-slate-600">{text}</p></motion.div>)}
          </section>
          <section className="flex gap-5 rounded-lg border border-blue-100 bg-blue-50 p-6"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white text-blue-800"><ShieldCheck size={26} /></div><div><h3 className="font-black text-blue-950">Important</h3><p className="mt-2 leading-7 text-blue-950">Nous accompagnons nos étudiants dans toutes les démarches administratives. Cependant, la décision finale d'octroi du visa appartient exclusivement aux autorités consulaires.</p></div></section>
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-black">Besoin d'aide ?</h3><p className="mt-3 leading-7 text-slate-600">Nos conseillers sont disponibles pour répondre à toutes vos questions.</p><div className="mt-6 space-y-5">{[[MessageCircle, 'Chat en direct', 'Disponible 24h/7j'], [Phone, 'WhatsApp', '+228 90 12 34 56'], [Mail, 'Email', 'contact@studyway.com']].map(([Icon, title, text]) => <div className="flex items-center gap-4" key={title}><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={22} /></div><div><b>{title}</b><div className="text-sm text-slate-500">{text}</div></div></div>)}</div><button className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-800 font-black text-white"><CalendarDays size={18} />Prendre rendez-vous</button></aside>
      </div>

      <section className="grid gap-6 px-5 pb-8 lg:px-8 md:grid-cols-4">
        {guarantees.map(([Icon, title, text]) => <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm" key={title}><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={23} /></div><div><h3 className="font-black">{title}</h3><p className="text-sm text-slate-500">{text}</p></div></div>)}
      </section>
    </div>
  )
}

function StartSupport() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState(['Admission université', 'Visa étudiant', 'Logement'])
  const [uploadedDocs, setUploadedDocs] = useState(['Passeport', "Dernier diplôme"])
  const steps = [
    ['Profil étudiant', 'Identité, contact et parcours'],
    ['Projet d’études', 'Destination, rentrée et formation'],
    ['Services & documents', 'Besoins, fichiers et rendez-vous'],
    ['Validation', 'Résumé, paiement et lancement'],
  ]
  const journey = [
    ['Conseil & Orientation', 'Nous analysons votre profil et vos objectifs.'],
    ['Préparation du dossier', 'Nous rassemblons et vérifions tous vos documents.'],
    ['Logement & réservation', 'Nous vous aidons à trouver un logement sécurisé.'],
    ['Demande de visa', 'Nous soumettons votre dossier et assurons le suivi.'],
    ['Départ & installation', "Nous vous accompagnons jusqu'à votre arrivée."],
  ]
  const services = ['Admission université', 'Visa étudiant', 'Logement', 'Assurance', 'Compte bancaire', 'Billets & arrivée']
  const docs = ['Passeport', "Dernier diplôme", 'Relevés de notes', 'CV', 'Lettre de motivation', 'Preuve de ressources']
  const progress = Math.round(((step + 1) / steps.length) * 100)

  const nextStep = () => setStep((value) => Math.min(value + 1, steps.length - 1))
  const previousStep = () => setStep((value) => Math.max(value - 1, 0))
  const toggleService = (service) => setSelectedServices((items) => items.includes(service) ? items.filter((item) => item !== service) : [...items, service])
  const toggleDoc = (doc) => setUploadedDocs((items) => items.includes(doc) ? items.filter((item) => item !== doc) : [...items, doc])

  if (submitted) {
    return (
      <div className="start-support-page space-y-7">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
          <div className="grid gap-8 p-8 xl:grid-cols-[1fr_360px]">
            <div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={34} /></div>
              <h1 className="mt-6 text-3xl font-black text-slate-950">Votre accompagnement est lancé</h1>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600">Votre dossier `SW-AC-2026-0148` a été créé. Un conseiller va vérifier vos informations et vous contacter pour finaliser votre feuille de route.</p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  ['Aujourd’hui', 'Dossier créé'],
                  ['Sous 24h', 'Analyse conseiller'],
                  ['Prochaine étape', 'Rendez-vous orientation'],
                ].map(([label, value]) => <div key={label} className="rounded-lg border border-slate-200 p-5"><div className="text-sm font-bold text-slate-500">{label}</div><div className="mt-2 font-black text-slate-950">{value}</div></div>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/messages" className="flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-6 font-black text-white shadow-lg shadow-blue-600/20"><MessageCircle size={18} />Ouvrir la conversation</Link>
                <Link to="/accompagnement" className="flex h-12 items-center gap-3 rounded-lg border border-blue-200 px-6 font-black text-blue-800">Retour accompagnement</Link>
              </div>
            </div>
            <aside className="rounded-lg bg-slate-50 p-6">
              <h2 className="font-black text-slate-950">Résumé du dossier</h2>
              <div className="mt-5 space-y-4 text-sm font-semibold text-slate-600">
                <div className="flex justify-between gap-4"><span>Pack choisi</span><b className="text-slate-950">Essentiel Plus</b></div>
                <div className="flex justify-between gap-4"><span>Services</span><b className="text-slate-950">{selectedServices.length}</b></div>
                <div className="flex justify-between gap-4"><span>Documents</span><b className="text-slate-950">{uploadedDocs.length}/{docs.length}</b></div>
                <div className="flex justify-between gap-4"><span>Statut</span><b className="text-emerald-600">En analyse</b></div>
              </div>
            </aside>
          </div>
        </motion.section>
      </div>
    )
  }

  return (
    <div className="start-support-page space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Accompagnement <span className="mx-2">›</span> Démarrer mon accompagnement</div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">Démarrer mon accompagnement</h1>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">Remplissez les informations ci-dessous pour commencer votre accompagnement personnalisé. Vous pourrez compléter les détails manquants avec votre conseiller.</p>
          <div className="mt-5 h-2 max-w-xl rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-2 rounded-full bg-blue-600" /></div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <WalletCards className="text-amber-600" size={22} />
          <div>
            <div className="text-xs font-bold text-slate-500">Mon portefeuille</div>
            <div className="text-lg font-black text-emerald-600">820 000 FCFA</div>
          </div>
        </div>
      </div>

      <section>
        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map(([title], index) => (
            <button key={title} type="button" onClick={() => setStep(index)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left transition ${index === step ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-50'}`}>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${index === step ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span>
              <span className="min-w-0">
                <span className="block text-sm font-black">{title}</span>
                <span className="mt-1 block text-xs font-semibold text-slate-400">{steps[index][1]}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
        <motion.section key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {step === 0 && <PersonalInfoStep />}
          {step === 1 && <ProjectInfoStep />}
          {step === 2 && <PreferencesStep services={services} selectedServices={selectedServices} toggleService={toggleService} docs={docs} uploadedDocs={uploadedDocs} toggleDoc={toggleDoc} />}
          {step === 3 && <ReviewStep selectedServices={selectedServices} uploadedDocs={uploadedDocs} docs={docs} />}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button type="button" onClick={previousStep} className="h-11 rounded-lg border border-slate-200 px-6 font-black text-slate-600 hover:bg-slate-50">{step === 0 ? 'Annuler' : 'Retour'}</button>
            <button type="button" onClick={step === steps.length - 1 ? () => setSubmitted(true) : nextStep} className="support-start-button flex h-11 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">{step === steps.length - 1 ? 'Valider et lancer' : 'Continuer'} <ArrowRight className="support-start-arrow" size={18} /></button>
          </div>
        </motion.section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Votre accompagnement</h2>
            <div className="mt-6 space-y-0">
              {journey.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[34px_1fr] gap-4 pb-5 last:pb-0">
                  <div className="relative">
                    {index < journey.length - 1 && <span className="absolute left-1/2 top-9 h-full w-px -translate-x-1/2 bg-slate-200" />}
                    <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full text-sm font-black ${index <= Math.min(step + 1, journey.length - 1) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="relative overflow-hidden rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="max-w-[190px]">
              <h2 className="font-black text-blue-950">Besoin d'aide ?</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-blue-900">Discutez avec un conseiller pour toute question sur votre accompagnement.</p>
              <Link to="/messages" className="mt-5 flex h-11 w-fit items-center gap-3 rounded-lg bg-white px-5 text-sm font-black text-blue-800 shadow-sm"><MessageCircle size={18} />Parler à un conseiller</Link>
            </div>
            <UserRound className="absolute -bottom-5 right-4 text-blue-200" size={120} />
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-800"><Lock size={20} /></div>
              <div><h2 className="font-black text-slate-950">Sécurité & confidentialité</h2><p className="mt-2 text-sm font-medium leading-6 text-slate-500">Vos informations sont 100% sécurisées et ne seront jamais partagées.</p></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function PersonalInfoStep() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-slate-950">Informations personnelles</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FormInput label="Prénom(s)" placeholder="Christelle" />
          <FormRadio label="Genre" options={['Homme', 'Femme']} />
          <FormInput label="Nom" placeholder="Komi" />
          <FormSelect label="État civil" placeholder="Sélectionner votre état civil" />
          <FormInput label="Date de naissance" placeholder="Sélectionner une date" icon={CalendarDays} />
          <FormSelect label="Pièce d'identité" placeholder="Sélectionner le type" />
          <FormSelect label="Nationalité" placeholder="Sélectionner votre nationalité" />
          <FormInput label="Numéro de pièce d'identité" placeholder="Entrez le numéro" />
          <FormSelect label="Pays de résidence actuel" placeholder="Sélectionner votre pays" />
          <FormTextarea label="Adresse actuelle" placeholder="Entrez votre adresse complète" />
          <FormInput label="Téléphone" placeholder="+228    90 12 34 56" />
          <FormInput label="Email" placeholder="christelle.komi@email.com" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-950">Informations académiques</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <FormSelect label="Niveau d'études actuel" placeholder="Sélectionner votre niveau" />
          <FormInput label="Dernier diplôme obtenu" placeholder="Entrez votre dernier diplôme" />
          <FormInput label="Filière / Domaine d'études" placeholder="Entrez votre filière" />
          <FormInput label="Établissement actuel" placeholder="Entrez le nom de votre établissement" />
        </div>
      </div>
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-4"><Info className="shrink-0 text-blue-700" size={22} /><p className="text-sm font-semibold leading-6 text-blue-950">Ces informations servent à préparer votre dossier étudiant, vos candidatures et les démarches administratives. Vous pourrez les modifier avec votre conseiller.</p></div>
      </section>
    </div>
  )
}

function ProjectInfoStep() {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Informations sur le projet</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormSelect label="Pays souhaité" placeholder="France, Canada, Belgique..." />
        <FormSelect label="Rentrée visée" placeholder="Septembre 2026" />
        <FormInput label="Formation recherchée" placeholder="Licence, Master, BTS..." />
        <FormInput label="Ville préférée" placeholder="Paris, Lyon, Montréal..." />
        <FormTextarea label="Objectif du projet" placeholder="Décrivez votre projet d'études et vos attentes." />
        <FormTextarea label="Situation actuelle" placeholder="Expliquez où vous en êtes dans vos démarches." />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          [GraduationCap, 'Admission', 'Choix des formations et constitution du dossier'],
          [ShieldCheck, 'Visa', 'Préparation des justificatifs et suivi consulaire'],
          [Home, 'Installation', 'Logement, assurance, banque et arrivée'],
        ].map(([Icon, title, text]) => <div key={title} className="rounded-lg border border-slate-200 p-5"><div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon size={22} /></div><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm font-medium leading-6 text-slate-500">{text}</p></div>)}
      </div>
    </div>
  )
}

function PreferencesStep({ services, selectedServices, toggleService, docs, uploadedDocs, toggleDoc }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-slate-950">Services à activer</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {services.map((service) => {
            const selected = selectedServices.includes(service)
            return <button key={service} type="button" onClick={() => toggleService(service)} className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${selected ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'}`}><span className={`grid h-6 w-6 place-items-center rounded-full ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{selected && <CheckCircle2 size={15} />}</span><span className="font-black">{service}</span></button>
          })}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-950">Documents disponibles</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {docs.map((doc) => {
            const uploaded = uploadedDocs.includes(doc)
            return <button key={doc} type="button" onClick={() => toggleDoc(doc)} className={`flex items-center justify-between rounded-lg border p-4 text-left transition ${uploaded ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:bg-slate-50'}`}><span className="flex items-center gap-3"><FileText size={18} /><span className="font-black">{doc}</span></span><span className={`rounded-full px-3 py-1 text-xs font-black ${uploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{uploaded ? 'Ajouté' : 'À ajouter'}</span></button>
          })}
        </div>
        <button type="button" className="mt-5 flex h-12 items-center gap-3 rounded-lg border border-dashed border-blue-300 px-5 font-black text-blue-800 hover:bg-blue-50"><Upload size={18} />Importer un nouveau document</button>
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-950">Préférences pratiques</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FormSelect label="Budget mensuel logement" placeholder="260 000 - 460 000 FCFA" />
          <FormSelect label="Besoin de financement" placeholder="À discuter avec un conseiller" />
          <FormSelect label="Disponibilité conseiller" placeholder="Après-midi ou soir" />
          <FormSelect label="Canal préféré" placeholder="Messages StudyWay" />
          <FormTextarea label="Notes pour le conseiller" placeholder="Ajoutez toute information utile." />
        </div>
      </div>
    </div>
  )
}

function ReviewStep({ selectedServices, uploadedDocs, docs }) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">Vérification & validation</h2>
      <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-black text-blue-950">Votre demande est prête à être envoyée</h3>
        <p className="mt-2 text-sm font-medium leading-6 text-blue-900">Après validation, un conseiller StudyWay analysera vos informations et vous contactera pour compléter votre dossier.</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ['Services activés', `${selectedServices.length} services`, MessageCircle],
          ['Documents reçus', `${uploadedDocs.length}/${docs.length} documents`, FileText],
          ['Rendez-vous', 'Créneau à confirmer', CalendarDays],
        ].map(([item, value, Icon], index) => <div key={item} className="rounded-lg border border-slate-200 p-5"><div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white"><Icon size={19} /></div><h3 className="mt-4 font-black">{item}</h3><p className="mt-2 text-sm font-bold text-slate-500">{value}</p><p className="mt-2 text-sm font-medium text-slate-500">Inclus dans votre accompagnement personnalisé.</p></div>)}
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 p-5">
        <h3 className="font-black text-slate-950">Pack recommandé : Essentiel Plus</h3>
        <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 md:grid-cols-2">
          <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={17} />Conseiller dédié</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={17} />Plan d'action personnalisé</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={17} />Suivi documents et visa</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={17} />Messagerie prioritaire</div>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 px-5 py-4"><span className="font-black text-slate-950">Frais de lancement</span><span className="text-xl font-black text-blue-700">32 000 FCFA</span></div>
      </div>
    </div>
  )
}

function FormInput({ label, placeholder, icon: Icon }) {
  return <label className="block text-sm font-black text-slate-700">{label}<span className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50"><input className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" placeholder={placeholder} />{Icon && <Icon size={17} />}</span></label>
}

function FormSelect({ label, placeholder }) {
  return <label className="block text-sm font-black text-slate-700">{label}<span className="mt-2 flex h-11 items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50">{placeholder}<ChevronDown size={17} /></span></label>
}

function FormTextarea({ label, placeholder }) {
  return <label className="block text-sm font-black text-slate-700">{label}<textarea className="mt-2 min-h-24 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50" placeholder={placeholder} /></label>
}

function FormRadio({ label, options }) {
  return <div className="block text-sm font-black text-slate-700">{label}<div className="mt-3 flex h-11 items-center gap-7">{options.map((option, index) => <label key={option} className="flex items-center gap-2 font-semibold text-slate-700"><span className={`grid h-4 w-4 place-items-center rounded-full border ${index === 0 ? 'border-blue-600' : 'border-slate-300'}`}>{index === 0 && <span className="h-2 w-2 rounded-full bg-blue-600" />}</span>{option}</label>)}</div></div>
}

function Visa() {
  const { country, type } = useParams()
  const [activeVisaTab, setActiveVisaTab] = useState('Aperçu')
  const countries = [
    ['france', 'France', logos.france, 'Paris', 'EUR', '/visa-france-real.jpeg', 'Passeports français, carte et avion', 'from-blue-50 to-white', 'object-cover object-center'],
    ['allemagne', 'Allemagne', logos.germany, 'Berlin', 'EUR', '/visa-germany-real.jpeg', 'Avion au roulage sur une piste', 'from-amber-50 to-red-50', 'object-cover object-center'],
    ['belgique', 'Belgique', logos.belgium, 'Bruxelles', 'EUR', '/visa-belgium-real.jpeg', 'Avions stationnés devant un terminal', 'from-yellow-50 to-slate-50', 'object-cover object-center'],
    ['suisse', 'Suisse', logos.swiss, 'Berne', 'CHF', '/visa-switzerland-real.jpeg', 'Bagages devant un avion à l’aéroport', 'from-red-50 to-sky-50', 'object-cover object-center'],
    ['canada', 'Canada', logos.canada, 'Ottawa', 'CAD', '/visa-canada-real.jpeg', 'Cabine avion avant le départ', 'from-red-50 to-blue-50', 'object-cover object-center'],
  ]
  const visaTypes = [
    {
      type: 'etudiant',
      title: 'Visa étudiant',
      icon: GraduationCap,
      description: 'Pour études supérieures, formations, échanges universitaires et rentrée académique.',
      badge: 'Le plus demandé',
      delay: '4 à 8 semaines',
      success: 'Taux de succès élevé',
      objective: 'Études',
      validity: 'Durée des études',
      cost: 198,
      documents: ["Lettre d'admission", 'Preuve de ressources financières', 'Assurance voyage / santé', 'Justificatif de logement'],
      eligibility: ['Être admis dans un établissement reconnu', 'Avoir des ressources financières suffisantes', 'Avoir un passeport valide', 'Fournir tous les documents requis'],
    },
    {
      type: 'tourisme',
      title: 'Visa tourisme',
      icon: Plane,
      description: 'Pour visiter un pays, participer à un court séjour, voir la famille ou découvrir une destination.',
      badge: 'Court séjour',
      delay: '2 à 6 semaines',
      success: 'Dossier simplifié',
      objective: 'Tourisme',
      validity: '30 à 90 jours',
      cost: 129,
      documents: ['Réservation hôtel ou attestation accueil', 'Billet aller-retour', 'Preuve de ressources', 'Assurance voyage'],
      eligibility: ['Présenter un motif de séjour clair', 'Prouver les moyens financiers', 'Avoir une assurance voyage', 'Garantir le retour au pays de résidence'],
    },
  ]
  const selectedCountry = countries.find(([slug]) => slug === country) || countries[0]
  const selectedVisa = visaTypes.find((visa) => visa.type === type)

  if (!country || !type || !selectedVisa) {
    return (
      <div className="visa-page space-y-7">
        <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Visa & Immigration</div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">Visa & Immigration</h1>
              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">Choisissez un pays, puis sélectionnez le visa étudiant ou tourisme adapté à votre projet. Chaque fiche détaille documents, coûts, délais et étapes.</p>
            </div>
            <Link to="/messages" className="flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-6 font-black text-white shadow-lg shadow-blue-600/20"><MessageCircle size={18} />Parler à un conseiller</Link>
          </div>
        </section>

        <section className="grid gap-5">
          {countries.map(([slug, name, flag, capital, currency], countryIndex) => (
            <motion.article key={slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: countryIndex * 0.05 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img src={flag} alt="" className="h-12 w-16 rounded-lg object-cover shadow-sm" />
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">{name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">Ambassade : {capital} · Devise : {currency}</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">2 types de visa</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {visaTypes.map((visa) => {
                  const Icon = visa.icon
                  return (
                    <Link key={visa.type} to={`/visa/${slug}/${visa.type}`} className="group rounded-lg border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-lg hover:shadow-blue-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"><Icon size={24} /></div>
                          <div><h3 className="text-lg font-black text-slate-950">{visa.title}</h3><p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{visa.description}</p></div>
                        </div>
                        <ArrowRight className="mt-2 text-blue-700 transition group-hover:translate-x-1" size={19} />
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2 text-xs font-black"><span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{visa.badge}</span><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{visa.delay}</span><span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">Rendez-vous dès 30 000 FCFA</span></div>
                    </Link>
                  )
                })}
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    )
  }

  const [, countryName, flag, capital, currency, countryImage, countryImageAlt, countryImageTone, countryImageFit] = selectedCountry
  const Icon = selectedVisa.icon
  const keyInfo = [
    ['Type de visa', selectedVisa.type === 'etudiant' ? 'Visa de long séjour' : 'Visa court séjour'],
    ['Objectif', selectedVisa.objective],
    ['Entrées', selectedVisa.type === 'etudiant' ? 'Multiples' : 'Simple ou multiples'],
    ['Renouvelable', selectedVisa.type === 'etudiant' ? 'Oui' : 'Selon le pays'],
    ['Durée de validité', selectedVisa.validity],
    ['Durée de traitement', selectedVisa.delay],
    ['Entretien', selectedVisa.type === 'etudiant' ? 'Oui' : 'Si requis'],
    ['Pays concerné', countryName],
  ]
  const progress = [
    ['Choisissez le type de visa', 'Sélectionnez le visa adapté à votre situation.'],
    ['Préparez vos documents', 'Consultez la liste des documents requis.'],
    ['Remplissez le formulaire', 'Remplissez votre demande en ligne.'],
    ['Prenez rendez-vous', 'Réservez un rendez-vous au centre de visa.'],
    ['Suivez votre dossier', 'Suivez l’état d’avancement en temps réel.'],
  ]
  const allDocuments = ['Passeport valide', ...selectedVisa.documents, 'Photo d’identité']
  const timelineItems = ['Dépôt de la demande', 'Traitement consulaire', 'Entretien si requis', 'Décision', 'Réception du visa']
  const costRows = [
    ['Frais consulaires', `À régler au centre en ${currency}`],
    ['Prise de rendez-vous StudyWay', '30 000 FCFA'],
    ['Agent StudyWay optionnel', '+30 000 FCFA'],
    ['Premium Capago optionnel', '+19 000 FCFA'],
  ]

  return (
    <div className="visa-page space-y-6">
      <Link to="/visa" className="inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Retour à la liste des visas</Link>
      <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px] lg:items-center">
              <div className="flex gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon size={34} /></div>
                <div>
                  <div className="flex flex-wrap items-center gap-3"><img src={flag} alt="" className="h-7 w-10 rounded object-cover" /><span className="font-black text-slate-500">{countryName}</span></div>
                  <h1 className="mt-3 text-3xl font-black text-slate-950">{selectedVisa.title}</h1>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{selectedVisa.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-black"><span className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700">{selectedVisa.badge}</span><span className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700">Délai moyen : {selectedVisa.delay}</span><span className="rounded-lg bg-violet-50 px-3 py-2 text-violet-700">{selectedVisa.success}</span></div>
                  <Link to={`/visa/${country}/${type}/demande`} className="mt-5 inline-flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20">Démarrer ma demande <ArrowRight size={18} /></Link>
                </div>
              </div>
              <div className={`visa-country-visual rounded-lg bg-gradient-to-br ${countryImageTone} p-2`}>
                <img src={countryImage} alt={countryImageAlt} className={`h-40 w-full rounded-lg shadow-sm ${countryImageFit}`} />
              </div>
            </div>
            <div className="grid border-t border-slate-100 text-sm font-black text-slate-600 md:grid-cols-6">
              {['Aperçu', 'Documents requis', 'Étapes', 'Coûts', 'Délai & traitement', 'FAQ'].map((tab) => <button type="button" key={tab} onClick={() => setActiveVisaTab(tab)} className={`h-14 border-b-2 transition ${activeVisaTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent hover:text-blue-700'}`}>{tab}</button>)}
            </div>
          </section>

          <motion.div key={activeVisaTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>
            {activeVisaTab === 'Aperçu' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-black text-slate-950">Description du visa</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Le {selectedVisa.title.toLowerCase()} pour {countryName} accompagne les voyageurs dans la constitution d’un dossier clair, complet et adapté aux exigences du pays.</p>
                  <div className="mt-6 border-t border-slate-100 pt-5"><h3 className="font-black text-slate-950">Conditions d’éligibilité</h3><div className="mt-4 space-y-3">{selectedVisa.eligibility.map((item) => <div key={item} className="flex gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="shrink-0 text-emerald-600" size={17} />{item}</div>)}</div></div>
                </section>
                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-black text-slate-950">Informations clés</h2>
                  <div className="mt-5 divide-y divide-slate-100">{keyInfo.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 py-3 text-sm"><span className="font-bold text-slate-600">{label}</span><b className="text-right text-slate-950">{value}</b></div>)}</div>
                </section>
              </div>
            )}
            {activeVisaTab === 'Documents requis' && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Documents requis</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">{allDocuments.map((doc, index) => <div key={doc} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-4 text-sm font-semibold text-slate-600"><span className="flex items-center gap-3"><FileText size={18} className="text-blue-700" />{doc}</span><span className={`rounded-full px-3 py-1 text-xs font-black ${index < 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{index < 4 ? 'Requis' : 'Optionnel'}</span></div>)}</div>
              </section>
            )}
            {activeVisaTab === 'Étapes' && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Étapes de la demande</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-5">{progress.map(([title, text], index) => <div key={title} className="rounded-lg border border-slate-200 p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 font-black text-white">{index + 1}</span><h3 className="mt-4 font-black text-slate-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p></div>)}</div>
              </section>
            )}
            {activeVisaTab === 'Coûts' && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Coûts associés</h2>
                <div className="mt-5 divide-y divide-slate-100">{costRows.map(([label, value], index) => <div key={label} className={`flex justify-between gap-5 py-4 text-sm font-semibold ${index === costRows.length - 1 ? 'text-blue-800' : 'text-slate-600'}`}><span>{label}</span><b>{value}</b></div>)}</div>
                <Link to={`/visa/${country}/${type}/demande`} className="mt-6 inline-flex h-12 items-center rounded-lg bg-blue-600 px-8 font-black text-white shadow-lg shadow-blue-600/20">Démarrer ma demande</Link>
              </section>
            )}
            {activeVisaTab === 'Délai & traitement' && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Délai & traitement</h2>
                <div className="mt-6 space-y-4">{timelineItems.map((item, index) => <div key={item} className="grid grid-cols-[36px_1fr_auto] items-center gap-4 rounded-lg border border-slate-100 p-4 text-sm font-semibold text-slate-600"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700">{index + 1}</span><span>{item}</span><b>{index === 0 ? 'Jour 1' : index === 1 ? selectedVisa.delay : 'Selon dossier'}</b></div>)}</div>
              </section>
            )}
            {activeVisaTab === 'FAQ' && (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Questions fréquentes</h2>
                <div className="mt-5 space-y-4">{[
                  ['Quand commencer la demande ?', 'Le plus tôt possible, idéalement 2 à 3 mois avant votre départ.'],
                  ['StudyWay garantit-il le visa ?', 'Non, la décision appartient aux autorités consulaires. Nous vous aidons à préparer un dossier solide.'],
                  ['Puis-je ajouter des documents après dépôt ?', 'Oui, si le centre de visa ou le conseiller vous le demande.'],
                ].map(([question, answer]) => <div key={question} className="rounded-lg border border-slate-100 p-5"><h3 className="font-black text-slate-950">{question}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{answer}</p></div>)}</div>
              </section>
            )}
          </motion.div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Votre progression</h2>
            <div className="mt-6 space-y-0">{progress.map(([title, text], index) => <div key={title} className="grid grid-cols-[34px_1fr] gap-4 pb-5 last:pb-0"><div className="relative">{index < progress.length - 1 && <span className="absolute left-1/2 top-9 h-full w-px -translate-x-1/2 bg-slate-200" />}<span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full text-sm font-black ${index === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span></div><div><h3 className="text-sm font-black text-slate-950">{title}</h3><p className="mt-1 text-sm font-medium leading-6 text-slate-500">{text}</p></div></div>)}</div>
          </section>
          <section className="relative overflow-hidden rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Besoin d’aide ?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Nos conseillers sont disponibles pour vous accompagner à chaque étape.</p>
            <Link to="/messages" className="mt-5 flex h-11 w-fit items-center gap-3 rounded-lg bg-white px-5 text-sm font-black text-blue-800 shadow-sm"><MessageCircle size={18} />Parler à un conseiller</Link>
            <UserRound className="absolute -bottom-5 right-4 text-blue-200" size={110} />
          </section>
        </aside>
      </div>
    </div>
  )
}

function OptionPriceBadge({ active, children }) {
  return <span className={`shrink-0 rounded-lg px-4 py-2 text-sm font-black shadow-sm transition ${active ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-blue-50 text-blue-700'}`}>{children}</span>
}

function AdditionalApplicantsFields({ applicants }) {
  if (applicants <= 1) return null

  return (
    <div className="mt-8 space-y-5 border-t border-slate-100 pt-6">
      <div>
        <h3 className="text-lg font-black text-slate-950">Informations des autres demandeurs</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Ajoutez les informations de chaque personne rattachée à cette demande : enfant, parent, conjoint, tuteur légal ou autre.</p>
      </div>
      {Array.from({ length: applicants - 1 }, (_, index) => (
        <div key={index} className="rounded-lg border border-slate-200 bg-slate-50/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-black text-slate-950">Demandeur {index + 2}</h4>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">À compléter</span>
          </div>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <FormInput label="Nom complet" placeholder={`Nom du demandeur ${index + 2}`} />
            <FormSelect label="Lien avec le demandeur principal" placeholder="Parent, enfant, conjoint, autre..." />
            <FormInput label="Date de naissance" placeholder="Sélectionner une date" icon={CalendarDays} />
            <FormSelect label="Type de demandeur" placeholder="Adulte, mineur, parent, tuteur légal..." />
            <FormInput label="Numéro passeport" placeholder="Entrez le numéro" />
            <FormInput label="Téléphone / email de contact" placeholder="Si différent du demandeur principal" />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisaApplication() {
  const { country = 'france', type = 'etudiant' } = useParams()
  const [step, setStep] = useState(0)
  const [serviceMode, setServiceMode] = useState('standard')
  const [agentSupport, setAgentSupport] = useState('no')
  const [applicants, setApplicants] = useState(1)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const countryNames = {
    france: ['France', logos.france],
    allemagne: ['Allemagne', logos.germany],
    belgique: ['Belgique', logos.belgium],
    suisse: ['Suisse', logos.swiss],
    canada: ['Canada', logos.canada],
  }
  const [countryName, flag] = countryNames[country] || countryNames.france
  const visaTitle = type === 'tourisme' ? 'Visa tourisme' : 'Visa étudiant'
  const steps = ['Informations', 'Documents', 'Rendez-vous Capago', 'Paiement & validation']
  const documents = type === 'tourisme'
    ? ['Passeport valide', 'Réservation logement', 'Billet aller-retour', 'Preuve de ressources', 'Assurance voyage', 'Photo d’identité']
    : ['Passeport valide', "Lettre d’admission", 'Preuve de ressources', 'Assurance santé', 'Justificatif logement', 'Photo d’identité']
  const appointmentRequestFee = 30000
  const agentFee = agentSupport === 'yes' ? 30000 : 0
  const premiumFee = serviceMode === 'premium' ? 19000 : 0
  const studywayTotal = appointmentRequestFee + agentFee + premiumFee
  const formatCfa = (amount) => `${amount.toLocaleString('fr-FR')} FCFA`
  const capagoServiceLabel = serviceMode === 'premium' ? `Premium Capago : ${formatCfa(premiumFee)}` : 'Service Standard Capago'

  const nextStep = () => setStep((value) => Math.min(value + 1, steps.length - 1))
  const previousStep = () => setStep((value) => Math.max(value - 1, 0))

  if (submitted) {
    return (
      <div className="visa-application-page space-y-7">
        <section className="rounded-lg border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={34} /></div>
              <h1 className="mt-6 text-3xl font-black text-slate-950">Votre demande de visa est lancée</h1>
              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">Votre dossier `SW-VISA-2026-0924` a été créé pour le {visaTitle.toLowerCase()} {countryName}. Notre équipe vérifie les informations et prépare la réservation du rendez-vous.</p>
              <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
                <h2 className="font-black text-blue-950">Communication importante sur les créneaux Capago</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">StudyWay ne dispose pas en temps réel des disponibilités Capago. Après réservation de votre rendez-vous, les créneaux disponibles vous seront envoyés clairement afin que vous puissiez confirmer le meilleur horaire.</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link to="/messages" className="flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-6 font-black text-white shadow-lg shadow-blue-600/20"><MessageCircle size={18} />Suivre avec un conseiller</Link>
                <Link to={`/visa/${country}/${type}`} className="flex h-12 items-center gap-3 rounded-lg border border-blue-200 px-6 font-black text-blue-800">Retour fiche visa</Link>
              </div>
            </div>
            <aside className="rounded-lg bg-slate-50 p-6">
              <h2 className="font-black text-slate-950">Résumé</h2>
              <div className="mt-5 space-y-4 text-sm font-semibold text-slate-600">
                <div className="flex justify-between gap-4"><span>Pays</span><b className="text-slate-950">{countryName}</b></div>
                <div className="flex justify-between gap-4"><span>Visa</span><b className="text-slate-950">{visaTitle}</b></div>
                <div className="flex justify-between gap-4"><span>Service Capago</span><b className="text-slate-950">{serviceMode === 'premium' ? 'Premium optionnel' : 'Standard'}</b></div>
                <div className="flex justify-between gap-4"><span>Agent StudyWay</span><b className="text-slate-950">{agentSupport === 'yes' ? `+${formatCfa(agentFee)}` : 'Non choisi'}</b></div>
                <div className="flex justify-between gap-4"><span>Demandeurs</span><b className="text-slate-950">{applicants}</b></div>
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-4"><span>Prise de rendez-vous</span><b className="text-blue-700">{formatCfa(studywayTotal)}</b></div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="visa-application-page space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Visa & Immigration <span className="mx-2">›</span> Demande</div>
          <div className="mt-4 flex items-center gap-4"><img src={flag} alt="" className="h-10 w-14 rounded-lg object-cover" /><h1 className="text-3xl font-black tracking-tight text-slate-950">Démarrer ma demande - {visaTitle}</h1></div>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">Complétez votre dossier, choisissez le type d’accompagnement et préparez la réservation du rendez-vous Capago.</p>
        </div>
        <Link to={`/visa/${country}/${type}`} className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-black text-blue-800 shadow-sm">Retour fiche visa</Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        {steps.map((label, index) => <button key={label} type="button" onClick={() => setStep(index)} className={`flex items-center gap-3 rounded-lg p-4 text-left transition ${step === index ? 'bg-blue-50 text-blue-800 shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-50'}`}><span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${step === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span><span className="font-black">{label}</span></button>)}
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
        <motion.section key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-950">Informations du demandeur principal</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <FormInput label="Nom complet" placeholder="Christelle Komi" />
                <FormInput label="Email" placeholder="christelle.komi@email.com" />
                <FormInput label="Téléphone" placeholder="+228 90 12 34 56" />
                <FormSelect label="Nationalité" placeholder="Sélectionner votre nationalité" />
                <FormInput label="Numéro passeport" placeholder="Entrez le numéro" />
                <FormInput label="Date d’expiration passeport" placeholder="Sélectionner une date" icon={CalendarDays} />
              </div>
              <AdditionalApplicantsFields applicants={applicants} />
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-black text-slate-950">Documents du dossier</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {documents.map((doc, index) => <div key={doc} className="flex items-center justify-between rounded-lg border border-slate-200 p-4"><span className="flex items-center gap-3 text-sm font-black text-slate-700"><FileText className="text-blue-700" size={18} />{doc}</span><span className={`rounded-full px-3 py-1 text-xs font-black ${index < 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{index < 3 ? 'Ajouté' : 'À ajouter'}</span></div>)}
              </div>
              <button type="button" className="mt-5 flex h-12 items-center gap-3 rounded-lg border border-dashed border-blue-300 px-5 font-black text-blue-800 hover:bg-blue-50"><Upload size={18} />Importer un document</button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-7">
              <div>
                <h2 className="text-xl font-black text-slate-950">Rendez-vous Capago</h2>
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-5">
                  <h3 className="font-black text-blue-950">Information importante sur les créneaux</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">En remplissant ce formulaire, vous soumettez une demande de rendez-vous. StudyWay ne dispose pas des disponibilités Capago en temps réel : après prise en compte de votre demande, les créneaux disponibles vous seront envoyés par email afin que vous puissiez confirmer votre rendez-vous.</p>
                </div>
              </div>
              <div>
                <h3 className="font-black text-slate-950">Sélectionnez le niveau d’assistance Capago</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">Ces options sont facultatives et se choisissent pendant le processus.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[['standard', 'Service Standard', 'Faire ma demande de visa en autonomie. Accès à une salle d’attente où vous serez appelé par numéro de ticket pour déposer votre dossier.', 'Inclus'], ['premium', 'Service Premium optionnel', 'Service VIP conçu pour une expérience fluide, rapide et confortable : accompagnement personnalisé, espace calme, collations, internet, photocopies et impressions gratuites.', `+${formatCfa(19000)}`]].map(([key, title, text, price]) => <button key={key} type="button" onClick={() => setServiceMode(key)} className={`rounded-lg border p-5 text-left transition ${serviceMode === key ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}><div className="flex items-center justify-between gap-3"><h4 className="font-black text-slate-950">{title}</h4><OptionPriceBadge active={serviceMode === key}>{price}</OptionPriceBadge></div><p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p></button>)}
                </div>
                <div className="mt-3 rounded-lg bg-slate-50 p-4 text-xs font-semibold leading-5 text-slate-600">Tarifs Premium Capago : 19 000 FCFA, 9 500 FCFA pour les enfants de 6 à 12 ans, gratuit pour les enfants de moins de 6 ans.</div>
              </div>
              <div>
                <h3 className="font-black text-slate-950">Accompagnement StudyWay au rendez-vous</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">Optionnel : vous pouvez choisir d’être accompagné par un agent StudyWay ou de vous présenter seul.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[['no', 'Sans agent StudyWay', 'Vous vous présentez seul au rendez-vous avec les instructions StudyWay.', 'Inclus'], ['yes', 'Avec agent StudyWay', 'Un agent vous accompagne et vous aide à vous orienter le jour du rendez-vous.', `+${formatCfa(30000)}`]].map(([key, title, text, price]) => <button key={key} type="button" onClick={() => setAgentSupport(key)} className={`rounded-lg border p-5 text-left transition ${agentSupport === key ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}><div className="flex items-center justify-between gap-3"><h4 className="font-black text-slate-950">{title}</h4><OptionPriceBadge active={agentSupport === key}>{price}</OptionPriceBadge></div><p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p></button>)}
                </div>
              </div>
              <div>
                <h3 className="font-black text-slate-950">Nombre de demandeurs</h3>
                <div className="mt-4 flex w-fit items-center gap-4 rounded-lg border border-slate-200 p-3"><button type="button" onClick={() => setApplicants((value) => Math.max(1, value - 1))} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 font-black">-</button><span className="w-10 text-center font-black">{applicants}</span><button type="button" onClick={() => setApplicants((value) => value + 1)} className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 font-black text-white">+</button></div>
                {applicants >= 7 && <p className="mt-3 rounded-lg bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">Processus de groupe dédié : pour 7 demandeurs ou plus, nous vous recommandons de contacter StudyWay afin de bénéficier du processus dédié.</p>}
                <AdditionalApplicantsFields applicants={applicants} />
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-black text-slate-950">Validation de la demande de rendez-vous</h2>
              <div className="mt-5 divide-y divide-slate-100 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-600"><span>Prise de rendez-vous StudyWay</span><b>{formatCfa(appointmentRequestFee)}</b></div>
                <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-600"><span>Agent StudyWay au rendez-vous</span><b>{agentSupport === 'yes' ? `+${formatCfa(agentFee)}` : 'Non choisi'}</b></div>
                <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-600"><span>Service Capago sélectionné</span><b>{capagoServiceLabel}</b></div>
                <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-blue-800"><span>Total à régler</span><b>{formatCfa(studywayTotal)}</b></div>
              </div>
              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-5">
                <h3 className="font-black text-blue-950">Informations importantes</h3>
                <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-blue-900">
                  <p>En remplissant ce formulaire, vous soumettez une demande de rendez-vous. Un email de confirmation vous sera envoyé dès sa prise en compte.</p>
                  <p>Lorsque votre créneau est attribué, vous recevez un email vous invitant à confirmer votre rendez-vous sous trois jours en réglant les frais de service en ligne par carte bancaire. Sans paiement dans ce délai, votre rendez-vous sera annulé automatiquement.</p>
                  <p>Une fois le paiement effectué, un dernier email vous sera envoyé pour confirmer définitivement votre rendez-vous.</p>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-slate-200 p-5">
                <h3 className="font-black text-slate-950">Consulat Général de France à Lomé</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Vous êtes sur le point de remplir une demande de rendez-vous pour déposer un dossier auprès du Consulat de France à Lomé.</p>
              </div>
              <div className="mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5">
                <h3 className="font-black text-amber-900">Méfiez-vous des intermédiaires frauduleux</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">Capago International est la société officielle mandatée par le gouvernement français pour recevoir les demandes de visa. Soyez prudent dans toute transaction avec des entreprises prétendant garantir l’obtention d’un visa.</p>
              </div>
              <div className="mt-5 rounded-lg border border-slate-200 p-5">
                <h3 className="font-black text-slate-950">Enfants mineurs</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Lors du dépôt de la demande, les enfants mineurs doivent obligatoirement être accompagnés par l’un des parents ou le tuteur légal. Une décision du tribunal doit être présentée lors du rendez-vous en cas de tutelle.</p>
              </div>
              <label className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 p-4 text-sm font-semibold text-slate-700"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-700" />J’ai lu et j’accepte les Conditions générales de Capago et la Politique de Confidentialité.</label>
            </div>
          )}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button type="button" onClick={previousStep} className="h-11 rounded-lg border border-slate-200 px-6 font-black text-slate-600 hover:bg-slate-50">{step === 0 ? 'Annuler' : 'Retour'}</button>
            <button type="button" disabled={step === steps.length - 1 && !acceptedTerms} onClick={step === steps.length - 1 ? () => setSubmitted(true) : nextStep} className="support-start-button flex h-11 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">{step === steps.length - 1 ? 'Soumettre la demande de rendez-vous' : 'Continuer'} <ArrowRight className="support-start-arrow" size={18} /></button>
          </div>
        </motion.section>
        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">Résumé demande</h2>
            <div className="mt-5 space-y-4 text-sm font-semibold text-slate-600">
              <div className="flex justify-between"><span>Pays</span><b>{countryName}</b></div>
              <div className="flex justify-between"><span>Visa</span><b>{visaTitle}</b></div>
              <div className="flex justify-between"><span>Assistance Capago</span><b>{serviceMode === 'premium' ? 'Premium optionnel' : 'Standard'}</b></div>
              <div className="flex justify-between"><span>Agent StudyWay</span><b>{agentSupport === 'yes' ? `+${formatCfa(agentFee)}` : 'Non choisi'}</b></div>
              <div className="flex justify-between"><span>Demandeurs</span><b>{applicants}</b></div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-blue-800"><span>Total</span><b>{formatCfa(studywayTotal)}</b></div>
            </div>
          </section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Communication claire</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Les créneaux Capago vous seront envoyés après réservation du rendez-vous, car les disponibilités ne sont pas accessibles en temps réel.</p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Transport() {
  const transportModes = [['Avion', Plane], ['Train', Train], ['Bus', Bus], ['Tram / Métro', Train], ['Chauffeur (Uber)', Car]]
  const flights = [
    ['Air France', 'AF 753', logos.airFrance, '23:45', '6h 45m', 'Direct', '07:30', '295 000 FCFA', 'text-emerald-600'],
    ['Ethiopian Airlines', 'ET 920', logos.ethiopian, '15:20', '11h 15m', '1 escale (ADD)', '07:35', '252 000 FCFA', 'text-amber-600'],
    ['Turkish Airlines', 'TK 569', logos.turkish, '09:10', '9h 50m', '1 escale (IST)', '19:00', '276 000 FCFA', 'text-amber-600'],
    ['RwandAir', 'WB 704', logos.rwandair, '13:30', '8h 20m', '1 escale (KGL)', '21:50', '244 000 FCFA', 'text-amber-600'],
  ]

  return (
    <div className="transport-page space-y-7">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-5">
        <div><h1 className="text-4xl font-black tracking-tight">Billets & Transport</h1><p className="mt-2 text-lg font-medium text-slate-500">Réservez vos billets d'avion, train, bus, tram ou chauffeur en toute simplicité.</p></div>
        <div className="ml-auto rounded-lg border border-slate-200 bg-white px-6 py-3 shadow-sm"><div className="text-xs font-semibold text-slate-500">Mon portefeuille</div><div className="font-black text-emerald-600">820 000 FCFA</div></div>
      </motion.div>

      <section className="flex flex-wrap gap-4 border-b border-slate-200 pb-6">
        {transportModes.map(([label, Icon], index) => <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.055, duration: 0.26, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3 }} key={label} className={`transport-tab flex h-14 min-w-[138px] items-center justify-center gap-3 rounded-lg border px-6 font-black shadow-sm ${index === 0 ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-700'}`}><Icon size={22} />{label}</motion.button>)}
      </section>

      <div className="grid gap-7 xl:grid-cols-[1fr_360px]">
        <div className="space-y-7">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_1fr_auto]">
              <TravelField label="De" value="Lomé (LFW)" sub="Togo" />
              <button className="grid h-11 w-11 place-items-center rounded-full bg-slate-50 text-blue-800"><ArrowRight className="rotate-180" size={18} /></button>
              <TravelField label="Vers" value="Paris (CDG)" sub="France" />
              <TravelField label="Date aller" value="25 juin 2025" icon={CalendarDays} />
              <TravelField label="Date retour" value="10 août 2025" icon={CalendarDays} />
              <TravelField label="Passagers" value="1 Passager" icon={ChevronDown} />
              <button className="h-12 rounded-lg bg-blue-700 px-8 font-black text-white shadow-lg shadow-blue-700/20">Rechercher</button>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6"><h2 className="text-2xl font-black">Vols disponibles <span className="text-sm font-bold text-slate-500">42 vols trouvés</span></h2><label className="flex items-center gap-3 text-sm font-semibold text-slate-500">Trier par : <span className="rounded-lg border border-slate-200 px-4 py-2 font-bold text-slate-800">Prix (croissant)⌄</span></label></div>
            <div className="divide-y divide-slate-100">
              {flights.map((flight, index) => <FlightRow key={flight[1]} flight={flight} index={index} />)}
            </div>
            <div className="m-5 flex items-center justify-between rounded-lg bg-amber-50 px-5 py-4 text-sm font-semibold text-slate-600"><span className="flex items-center gap-3"><ShieldCheck className="text-amber-500" />Bagages, repas et conditions peuvent varier selon la compagnie.</span><button className="rounded-lg bg-white px-5 py-3 font-black text-blue-800">Voir les conditions</button></div>
          </section>

        </div>

        <aside className="space-y-5">
          <section className="transport-side-card transport-trip-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-black">Mon voyage</h2>
              <span className="transport-card-visual grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-700"><Plane size={34} /></span>
            </div>
            <div className="mt-5 grid grid-cols-[22px_1fr] gap-4">
              <div className="relative pt-1">
                <Plane className="relative z-10 rounded-full bg-white text-blue-700" size={18} />
                <span className="absolute left-[8px] top-7 h-28 w-px bg-blue-100" />
                <span className="absolute left-[5px] top-[94px] h-2.5 w-2.5 rounded-full bg-blue-700 ring-4 ring-blue-50" />
              </div>
              <div>
                <div className="font-black">Aller</div>
                <div className="text-sm font-semibold text-slate-500">25 juin 2025</div>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div><div className="text-xl font-black">23:45</div><div className="font-bold">LFW</div><div className="text-sm text-slate-500">Lomé</div></div>
                  <div className="text-center text-sm font-bold"><span className="block text-slate-500">6h 45m</span><span className="text-emerald-600">Direct</span></div>
                  <div className="text-right"><div className="text-xl font-black">07:30</div><div className="font-bold">CDG</div><div className="text-sm text-slate-500">Paris</div></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <UserRound className="text-slate-600" size={21} />
              <div><b>Passager</b><div className="text-sm text-slate-500">1 Adulte</div></div>
            </div>
            <button className="mt-6 h-12 w-full rounded-lg bg-blue-700 font-black text-white">Continuer vers la réservation</button>
          </section>
          <section className="transport-side-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Transport sur place</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Réservez votre trajet à l'arrivée</p>
            <div className="mt-5 divide-y divide-slate-100">
              {[[Train, 'Train / RER', "Rejoindre Paris depuis l'aéroport", 'text-blue-700 bg-blue-50'], [Train, 'Tram / Métro', 'Déplacements en ville', 'text-indigo-700 bg-indigo-50'], [Bus, 'Bus', 'Lignes régulières', 'text-emerald-700 bg-emerald-50'], [Car, 'Chauffeur (Uber)', 'Trajet privé avec chauffeur', 'text-slate-900 bg-slate-100']].map(([Icon, title, sub, tone]) => (
                <button className="group flex w-full items-center justify-between py-4 text-left first:pt-0 last:pb-0" key={title}>
                  <span className="flex min-w-0 items-center gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tone}`}><Icon size={21} /></span>
                    <span className="min-w-0"><b>{title}</b><span className="mt-1 block text-sm font-semibold text-slate-500">{sub}</span></span>
                  </span>
                  <ChevronDown className="-rotate-90 text-slate-400 transition group-hover:text-blue-700" size={18} />
                </button>
              ))}
            </div>
          </section>
          <section className="transport-side-card transport-secure-card relative overflow-hidden rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <div className="relative z-10 grid grid-cols-[1fr_auto] gap-4">
              <div>
                <h2 className="text-xl font-black">Réservation sécurisée</h2>
                <div className="mt-5 space-y-3">
                  {['Paiement 100% sécurisé', 'Support 24/7', 'Billet envoyé par email'].map((item) => <div className="flex items-center gap-3 text-sm font-semibold text-slate-600" key={item}><CheckCircle2 className="text-emerald-600" size={18} />{item}</div>)}
                </div>
              </div>
              <div className="secure-visual relative hidden h-36 w-28 sm:block">
                <div className="absolute right-0 top-4 grid h-24 w-24 place-items-center rounded-[28px] bg-blue-700 text-white shadow-lg shadow-blue-700/25"><Lock size={34} /></div>
                <ShieldCheck className="absolute right-7 top-0 text-blue-900" size={34} />
                <CreditCard className="absolute bottom-0 left-0 rounded-2xl bg-white p-2 text-blue-700 shadow-md" size={46} />
              </div>
            </div>
          </section>
        </aside>

        <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.35, once: false }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="transport-arrival-pack relative overflow-hidden rounded-lg border border-blue-100 bg-[#f3f7ff] px-6 py-5 text-blue-950 shadow-sm xl:col-span-2">
          <img src={parisPackBackground} alt="" className="arrival-pack-bg absolute inset-0 h-full w-full object-contain" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[300px_auto_1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-black">Pack Arrivée France</h2>
              <p className="mt-1 text-sm font-black text-blue-950">Vol + Train + eSIM + Chauffeur + Logement</p>
              <p className="mt-3 text-sm font-semibold text-slate-600">Tout ce qu'il vous faut pour une arrivée sans stress.</p>
            </div>
            <div className="arrival-pack-icons flex flex-wrap items-center gap-3 text-blue-950 lg:justify-self-start">
              {[[Plane, 'Vol'], [Train, 'Train'], [Smartphone, 'eSIM'], [Car, 'Chauffeur'], [Home, 'Logement']].map(([Icon, label], index) => (
                <div className="flex items-center gap-3" key={label}>
                  <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.35, once: false }} transition={{ delay: index * 0.045, duration: 0.24 }} className="arrival-pack-icon grid h-11 w-11 place-items-center rounded-full bg-blue-700 text-white shadow-sm" title={label}>
                    <Icon size={21} />
                  </motion.span>
                  {index < 4 && <span className="text-lg font-black text-slate-400">+</span>}
                </div>
              ))}
            </div>
            <div className="hidden lg:block" aria-hidden="true" />
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="h-12 rounded-lg border-2 border-blue-200 bg-white/80 px-7 font-black text-blue-950 shadow-sm">Découvrir les packs</motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function TravelField({ label, value, sub, icon: Icon }) {
  return <div className="border-r border-slate-100 pr-4"><div className="text-xs font-bold text-slate-500">{label}</div><div className="mt-2 flex items-center justify-between gap-3 font-black">{value}{Icon && <Icon size={18} className="text-slate-500" />}</div>{sub && <div className="mt-1 text-sm text-slate-500">{sub}</div>}</div>
}

function FlightRow({ flight, index }) {
  const [name, code, logo, départ, duration, stop, arrival, price, tone] = flight
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="grid items-center gap-5 p-6 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.8fr_auto]">
      <div className="flex items-center gap-4"><img src={logo} alt={name} className="h-16 w-16 rounded-lg border border-slate-100 object-contain p-2" /><div><div className="font-black">{name}</div><div className="text-sm text-slate-500">{code}</div></div></div>
      <div><div className="text-2xl font-black">{départ}</div><div className="font-bold">LFW</div><div className="text-sm text-slate-500">Lomé</div></div>
      <div className="text-center"><div className="font-bold">{duration}</div><div className={`mt-2 text-sm font-bold ${tone}`}>{stop}</div></div>
      <div><div className="text-2xl font-black">{arrival} <span className="text-sm text-rose-500">+1</span></div><div className="font-bold">CDG</div><div className="text-sm text-slate-500">Paris (Charles de Gaulle)</div></div>
      <div><div className="text-2xl font-black text-blue-800">{price}</div><div className="text-sm text-slate-500">Aller simple</div></div>
      <div className="space-y-3"><button className="h-11 rounded-lg bg-blue-700 px-8 font-black text-white">Choisir</button><button className="block w-full text-sm font-black text-blue-800">Détails⌄</button></div>
    </motion.div>
  )
}

function Esim() {
  const planScroller = useRef(null)
  const plans = [
    ['Europe', '10 Go', '30 jours', '15 000 FCFA', logos.europe],
    ['Europe', '20 Go', '30 jours', '25 000 FCFA', logos.europe],
    ['Europe', '50 Go', '30 jours', '45 000 FCFA', logos.europe],
    ['Monde', '5 Go', '15 jours', '15 000 FCFA', 'https://flagcdn.com/w80/un.png'],
    ['Monde', '20 Go', '30 jours', '40 000 FCFA', 'https://flagcdn.com/w80/un.png'],
  ]
  const esimRows = [
    [logos.europe, 'Europe 10 Go', 'Active', "Valable jusqu'au 25 juin 2024", '10 Go / 10 Go', '100%', 'bg-emerald-50 text-emerald-600'],
    ['https://flagcdn.com/w80/us.png', 'USA 5 Go', 'Expirée', 'Expirée le 10 mai 2024', '5 Go / 5 Go', '100%', 'bg-slate-100 text-slate-500'],
  ]
  const advantages = [
    [Wifi, 'Activation instantanée', 'Recevez votre eSIM en quelques secondes.'],
    [Plane, "Aucun frais d'itinérance", "Évitez les frais élevés à l'étranger."],
    [ShieldCheck, 'Réseaux de qualité', 'Connexion rapide et sécurisée partout.'],
    [MessageCircle, 'Support 24h/7j', 'Notre équipe vous accompagne à chaque étape.'],
  ]

  return (
    <div className="esim-page space-y-7">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black tracking-tight text-slate-950">eSIM & Forfait</h1>
        <p className="mt-2 text-lg font-medium text-slate-500">Restez connecté dès votre arrivée à l'étranger</p>
      </motion.div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="esim-hero relative min-h-[300px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,#eef3ff_0%,#f8fbff_48%,#dfeaff_100%)] p-8 shadow-sm">
          <div className="absolute inset-0 soft-grid opacity-70" />
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-8 hidden h-full w-[48%] md:block">
            <img src={esimPhoneHero} alt="Téléphone eSIM" className="absolute bottom-0 right-10 h-[300px] w-[260px] rotate-[-8deg] rounded-[2rem] object-cover object-left shadow-2xl shadow-blue-300/40" />
            {['left-[12%] top-[28%]', 'left-[38%] top-[20%]', 'right-[10%] top-[36%]', 'left-[28%] bottom-[22%]'].map((pos) => <MapPin key={pos} className={`absolute ${pos} text-blue-600`} size={24} />)}
          </div>
          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-blue-800 shadow-sm"><Wifi size={17} />Connexion internationale</div>
            <h2 className="text-3xl font-black leading-tight text-slate-950">Internet partout dans le monde</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Activation instantanée', 'Pas de carte physique', 'Forfaits flexibles et sans engagement', 'Réseaux fiables et sécurisés'].map((item) => <div key={item} className="flex items-center gap-3 rounded-lg bg-white/85 px-4 py-3 font-bold text-slate-700 shadow-sm"><CheckCircle2 className="text-blue-600" size={20} />{item}</div>)}
            </div>
          </div>
          <div className="absolute right-6 top-7 grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200"><Plane size={22} /></div>
        </section>

        <section className="current-esim-card rounded-lg bg-[#061b47] p-6 text-white shadow-sm">
          <div className="flex items-center justify-between"><h2 className="text-lg font-black">Mon eSIM actuelle</h2><span className="esim-active-pill rounded-full bg-emerald-500 px-3 py-1 text-xs font-black">Active</span></div>
          <div className="mt-7 flex items-center gap-4"><img src={logos.europe} alt="Europe" className="h-12 w-12 rounded-full" /><div><div className="text-xl font-black">Europe 10 Go</div><div className="text-sm text-blue-100">Valable jusqu'au 25 juin 2024</div></div></div>
          <div className="mt-7 flex items-end justify-between"><div><div className="text-xl font-black">10 Go / 10 Go</div><div className="text-sm text-blue-100">Consommation</div></div><span className="text-sm font-bold">100%</span></div>
          <div className="mt-3 h-2 rounded-full bg-white/20"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="h-2 rounded-full bg-cyan-300" /></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_auto]"><div><div className="text-sm text-blue-100">Numéro</div><div className="font-black">+33 7 12 34 56 78</div></div><button className="rounded-lg bg-white px-6 py-3 font-black text-[#061b47] shadow-lg shadow-blue-950/20">Voir les détails</button></div>
        </section>
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black">Nos forfaits populaires</h2><button className="font-black text-blue-800">Voir tous les forfaits →</button></div>
          <button type="button" onClick={() => planScroller.current?.scrollBy({ left: -360, behavior: 'smooth' })} className="absolute left-4 top-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-800 shadow-lg shadow-slate-200" aria-label="Forfaits précédents"><ChevronDown className="rotate-90" /></button>
          <button type="button" onClick={() => planScroller.current?.scrollBy({ left: 360, behavior: 'smooth' })} className="absolute right-4 top-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-800 shadow-lg shadow-slate-200" aria-label="Forfaits suivants"><ChevronDown className="-rotate-90" /></button>
          <div ref={planScroller} className="esim-plan-rail flex gap-5 overflow-x-auto scroll-smooth px-10 pb-3">
            {plans.map((plan, index) => <EsimPlan key={`${plan[0]}-${plan[1]}`} plan={plan} index={index} />)}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Comment ça marche ?</h2>
          <div className="mt-6 space-y-6">
            {['Choisissez votre forfait', 'Achetez et recevez votre eSIM', 'Scannez le QR code', "Profitez d'internet"].map((step, index) => <div key={step} className="grid grid-cols-[34px_1fr] gap-4"><div className="grid h-8 w-8 place-items-center rounded-full border-2 border-blue-600 text-sm font-black text-blue-700">{index + 1}</div><div><div className="font-black">{step}</div><p className="mt-1 text-sm text-slate-500">{['Sélectionnez le forfait adapté à votre destination.', 'Vous recevez un QR code par email.', 'Scannez le QR code dans les réglages.', 'Vous êtes connecté dès votre arrivée !'][index]}</p></div></div>)}
          </div>
          <button className="mt-7 flex h-12 w-full items-center justify-between rounded-lg bg-slate-50 px-5 font-black text-blue-900"><span className="flex items-center gap-3"><FileText size={18} />Voir le guide d'installation</span>→</button>
        </section>
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black">Mes eSIM</h2><button className="font-black text-blue-800">Voir toutes mes eSIM →</button></div>
          <div className="space-y-5">
            {esimRows.map(([flag, name, status, sub, usage, percent, tone]) => <div key={name} className="grid items-center gap-4 rounded-lg border border-slate-100 p-4 md:grid-cols-[1fr_170px_1fr_auto]"><div className="flex items-center gap-4"><img src={flag} alt="" className="h-10 w-10 rounded-full" /><div><b>{name}</b> <span className={`ml-2 rounded-full px-3 py-1 text-xs font-black ${tone}`}>{status}</span><div className="text-sm text-slate-500">{sub}</div></div></div><div className="font-bold">{usage}</div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: percent }} /></div><ChevronDown className="-rotate-90 text-slate-400" /></div>)}
          </div>
        </section>

        <section className="rounded-lg bg-[#082f7a] p-6 text-white shadow-sm">
          <h2 className="text-xl font-black">Parrainez un ami</h2>
          <p className="mt-3 text-blue-50">Gagnez 2 000 FCFA pour chaque ami parrainé.</p>
          <div className="mt-7 flex items-end justify-between gap-4">
            <button className="rounded-lg bg-white px-6 py-3 font-black text-blue-800">Parrainer maintenant</button>
            <div className="relative grid h-24 w-32 place-items-center">
              <div className="absolute h-20 w-24 rounded-lg bg-violet-400 shadow-2xl shadow-blue-950/20" />
              <div className="absolute h-20 w-5 rounded-md bg-pink-300" />
              <div className="absolute h-5 w-24 rounded-md bg-pink-300" />
              <div className="absolute -top-1 left-9 h-8 w-8 rotate-[-28deg] rounded-full border-[8px] border-pink-300" />
              <div className="absolute -top-1 right-9 h-8 w-8 rotate-[28deg] rounded-full border-[8px] border-pink-300" />
              <Gift className="relative z-10 text-white" size={32} />
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Avantages StudyWay eSIM</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {advantages.map(([Icon, title, text]) => <div key={title} className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon size={21} /></div><div><div className="font-black">{title}</div><p className="text-sm text-slate-500">{text}</p></div></div>)}
          </div>
        </section>
        <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-black">Besoin d'aide pour choisir votre forfait ?</h2><p className="mt-1 text-sm text-slate-500">Notre équipe est disponible pour vous conseiller le meilleur forfait selon votre destination.</p></div><div className="flex gap-3"><button className="rounded-lg border border-emerald-200 px-5 py-3 font-black text-emerald-700">Discuter sur WhatsApp</button><button className="rounded-lg border border-blue-200 px-5 py-3 font-black text-blue-800">Contacter le support</button></div></div>
        </section>
      </div>
    </div>
  )
}

function EsimPlan({ plan, index }) {
  const [region, data, duration, price, flag] = plan
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.012 }} className="group relative min-w-[280px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-600 hover:ring-2 hover:ring-blue-100">
      <div className="flex items-center gap-3"><img src={flag} alt="" className="h-8 w-8 rounded-full" /><span className="font-black">{region}</span></div>
      <div className="mt-4 text-2xl font-black">{data}</div>
      <div className="mt-4 space-y-2 text-sm font-medium text-slate-500"><div>{duration}</div><div>Appels illimités</div><div>SMS illimités</div></div>
      <div className="mt-5 text-lg font-black">{price}</div>
      <button className="mt-4 h-11 w-full rounded-lg bg-blue-50 font-black text-blue-800 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">Choisir</button>
    </motion.article>
  )
}

function Messages() {
  const initialThreads = [
    {
      id: 'support',
      title: 'Support StudyWay',
      preview: "N'hésitez pas si vous avez d'autres questions.",
      time: '10:33',
      unread: 2,
      avatar: 'SW',
      tone: 'blue',
      online: true,
      messages: [
        {
          id: 1,
          side: 'left',
          text: "Bonjour Christelle,\n\nNous avons bien reçu tous vos documents pour votre demande de visa étudiant.\n\nVotre dossier est en cours de vérification par notre équipe.\n\nNous reviendrons vers vous dans les prochaines 24h avec une réponse.\n\nCordialement,\nL'équipe StudyWay",
          time: '10:30',
        },
        {
          id: 2,
          side: 'right',
          text: "Bonjour,\nMerci beaucoup pour l'information.\nJ'attends votre retour avec impatience.\nBonne journée 😊",
          time: '10:32',
        },
        {
          id: 3,
          side: 'left',
          text: "Avec plaisir 😊\nN'hésitez pas si vous avez d'autres questions.",
          time: '10:33',
        },
      ],
    },
    {
      id: 'visa-agent',
      title: 'Agent - Visa France',
      preview: 'Merci pour les documents fournis.',
      time: '09:15',
      unread: 1,
      image: avatars.koffi,
      messages: [
        { id: 1, side: 'left', text: 'Bonjour Christelle, il manque uniquement votre attestation de logement.', time: '09:02' },
        { id: 2, side: 'right', text: 'Je viens de la téléverser dans mon espace.', time: '09:10' },
        { id: 3, side: 'left', text: 'Merci pour les documents fournis. Je transmets votre dossier au centre visa.', time: '09:15' },
      ],
    },
    {
      id: 'residence',
      title: 'Résidence Paris 15',
      preview: 'Appartement disponible à partir du...',
      time: 'Hier',
      unread: 1,
      icon: Building2,
      tone: 'sky',
      messages: [
        { id: 1, side: 'left', text: 'Bonjour, un studio meublé est disponible à partir du 2 juin.', time: 'Hier' },
        { id: 2, side: 'right', text: 'Merci, est-ce que les charges sont incluses ?', time: 'Hier' },
      ],
    },
    {
      id: 'paris-group',
      title: 'Groupe - Étudiants Paris',
      preview: 'Sarah: Bonjour à tous 👋',
      time: 'Hier',
      icon: Users,
      tone: 'violet',
      group: true,
      messages: [
        { id: 1, side: 'left', text: 'Sarah: Bonjour à tous 👋', time: 'Hier' },
        { id: 2, side: 'left', text: 'Yao: Qui arrive à Paris cette semaine ?', time: 'Hier' },
      ],
    },
    {
      id: 'finance',
      title: 'Service Finance',
      preview: 'Votre paiement a été confirmé.',
      time: 'Lun.',
      icon: Landmark,
      tone: 'emerald',
      messages: [
        { id: 1, side: 'left', text: 'Votre paiement a été confirmé. Le reçu est disponible dans vos documents.', time: 'Lun.' },
      ],
    },
    {
      id: 'mom',
      title: 'Maman ❤️',
      preview: 'Prends bien soin de toi ma chérie.',
      time: 'Lun.',
      image: avatars.parent,
      online: true,
      messages: [
        { id: 1, side: 'left', text: 'Prends bien soin de toi ma chérie.', time: 'Lun.' },
        { id: 2, side: 'right', text: "Oui maman, je t'appelle ce soir ❤️", time: 'Lun.' },
      ],
    },
    {
      id: 'travel',
      title: 'Support Voyage',
      preview: 'Rappel: Vol dans 3 jours ✈️',
      time: 'Dim.',
      icon: Plane,
      tone: 'cyan',
      messages: [
        { id: 1, side: 'left', text: 'Rappel: votre vol est prévu dans 3 jours. Pensez à vérifier vos bagages.', time: 'Dim.' },
      ],
    },
    {
      id: 'saclay',
      title: 'Université Paris-Saclay',
      preview: 'Votre admission est confirmée.',
      time: 'Sam.',
      image: logos.parisSaclay,
      messages: [
        { id: 1, side: 'left', text: 'Félicitations, votre admission est confirmée pour la rentrée prochaine.', time: 'Sam.' },
      ],
    },
  ]
  const [threads, setThreads] = useState(initialThreads)
  const [activeThreadId, setActiveThreadId] = useState(initialThreads[0].id)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const messagesListRef = useRef(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const activeThread = threads.find((thread) => thread.id === activeThreadId) || threads[0]
  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase()
    return threads.filter((thread) => {
      const matchesFilter = filter === 'all' || (filter === 'unread' && thread.unread) || (filter === 'groups' && thread.group)
      const matchesSearch = !query || `${thread.title} ${thread.preview}`.toLowerCase().includes(query)
      return matchesFilter && matchesSearch
    })
  }, [filter, search, threads])
  const unreadCount = threads.reduce((total, thread) => total + (thread.unread || 0), 0)
  const groupCount = threads.filter((thread) => thread.group).length

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const list = messagesListRef.current
      if (list) {
        list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [activeThreadId, activeThread.messages.length])

  const selectThread = (threadId) => {
    setActiveThreadId(threadId)
    setDraft('')
    setAttachment(null)
    setEmojiOpen(false)
    setThreads((items) => items.map((thread) => thread.id === threadId ? { ...thread, unread: 0 } : thread))
  }

  const handleAttachment = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setAttachment({
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      url: URL.createObjectURL(file),
    })
    event.target.value = ''
  }

  const sendMessage = () => {
    const cleanDraft = draft.trim()
    if (!cleanDraft && !attachment) return
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const messageText = cleanDraft || (attachment ? `Pièce jointe: ${attachment.name}` : '')
    setThreads((items) => items.map((thread) => thread.id === activeThreadId ? {
      ...thread,
      preview: attachment ? `📎 ${attachment.name}` : messageText,
      time: now,
      messages: [...thread.messages, { id: Date.now(), side: 'right', text: messageText, time: now, attachment }],
    } : thread))
    setDraft('')
    setAttachment(null)
    setEmojiOpen(false)
  }

  return (
    <div className="messages-page service-client-page min-h-screen bg-slate-50">
      <div className="-mx-6 -mb-6 -mt-6 lg:-mx-8 lg:-mb-8 lg:-mt-8">
        <section className="messaging-shell grid h-[calc(100vh-5rem)] min-h-[780px] overflow-hidden border-y border-slate-200 bg-white shadow-sm xl:grid-cols-[430px_1fr]">
          <aside className="flex min-h-0 flex-col overflow-hidden border-r border-slate-200 bg-white">
          <div className="grid shrink-0 grid-cols-3 gap-3 border-b border-slate-100 p-5">
            {[
              ['all', 'Toutes', threads.length],
              ['unread', 'Non lues', unreadCount],
              ['groups', 'Groupes', groupCount],
            ].map(([key, label, count]) => (
              <button type="button" key={key} onClick={() => setFilter(key)} className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-black ${filter === key ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
                {label}
                <span className={`grid h-7 w-7 place-items-center rounded-full text-xs ${filter === key ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>{count}</span>
              </button>
            ))}
          </div>
          <div className="grid shrink-0 grid-cols-[1fr_48px] gap-3 border-b border-slate-100 p-5">
            <label className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-500 shadow-sm">
              <Search size={19} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400" placeholder="Rechercher un message..." />
            </label>
            <button type="button" className="grid h-12 place-items-center rounded-lg border border-slate-200 text-slate-600 shadow-sm hover:bg-blue-50 hover:text-blue-700" aria-label="Filtrer les messages"><SlidersHorizontal size={21} /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredThreads.map((thread) => (
              <button type="button" key={thread.id} onClick={() => selectThread(thread.id)} className={`flex w-full items-center gap-4 border-b border-slate-100 px-5 py-5 text-left transition ${thread.id === activeThreadId ? 'bg-blue-50/70 shadow-[inset_3px_0_0_#2563eb]' : 'hover:bg-slate-50'}`}>
                <ThreadAvatar thread={thread} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-black text-blue-950">{thread.title}</span>
                  <span className="mt-1 block truncate text-sm font-semibold text-slate-600">{thread.preview}</span>
                </span>
                <span className="flex flex-col items-end gap-3">
                  <span className="text-xs font-semibold text-slate-500">{thread.time}</span>
                  {thread.unread && <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">{thread.unread}</span>}
                </span>
              </button>
            ))}
            {!filteredThreads.length && <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500">Aucune conversation trouvée.</div>}
          </div>
        </aside>

        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-0 flex-col overflow-hidden bg-white">
          <header className="flex h-24 shrink-0 items-center justify-between border-b border-slate-200 px-7">
            <div className="flex items-center gap-4">
              <ThreadAvatar thread={activeThread} large />
              <div>
                <h2 className="text-lg font-black text-slate-950">{activeThread.title}</h2>
                <div className={`mt-1 flex items-center gap-2 text-sm font-bold ${activeThread.online ? 'text-emerald-600' : 'text-slate-500'}`}><span className={`h-2.5 w-2.5 rounded-full ${activeThread.online ? 'bg-emerald-500' : 'bg-slate-300'}`} /> {activeThread.online ? 'En ligne' : 'Hors ligne'}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {[Phone, Video, Info].map((Icon, index) => (
                <button type="button" key={index} className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-blue-700 shadow-sm hover:bg-blue-50" aria-label="Action conversation">
                  <Icon size={22} />
                </button>
              ))}
            </div>
          </header>

          <div ref={messagesListRef} className="messages-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-10 lg:px-20">
            <div className="mx-auto mb-8 w-fit rounded-lg bg-slate-100 px-5 py-3 text-xs font-black text-slate-500 shadow-sm">Aujourd'hui</div>
            <div className="space-y-7">
              {activeThread.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.045, duration: 0.26 }}
                  className={`flex items-end gap-4 ${message.side === 'right' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.side === 'left' && <ThreadAvatar thread={activeThread} compact />}
                  <div className={`message-bubble relative max-w-[720px] whitespace-pre-line rounded-lg px-8 py-6 text-base font-semibold leading-8 ${message.side === 'right' ? 'message-out bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'message-in border border-slate-200 bg-slate-50 text-slate-950 shadow-sm'}`}>
                    {message.text}
                    {message.attachment && (
                      <div className={`mt-4 overflow-hidden rounded-lg border ${message.side === 'right' ? 'border-white/25 bg-white/10' : 'border-slate-200 bg-white'}`}>
                        {message.attachment.type.startsWith('image/') ? (
                          <img src={message.attachment.url} alt={message.attachment.name} className="max-h-64 w-full object-cover" />
                        ) : (
                          <div className="flex items-center gap-3 p-4">
                            <div className={`grid h-11 w-11 place-items-center rounded-lg ${message.side === 'right' ? 'bg-white/15 text-white' : 'bg-blue-50 text-blue-700'}`}><FileText size={22} /></div>
                            <div className="min-w-0">
                              <div className="truncate font-black">{message.attachment.name}</div>
                              <div className={`text-xs ${message.side === 'right' ? 'text-blue-100' : 'text-slate-500'}`}>{Math.max(1, Math.round(message.attachment.size / 1024))} Ko</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <span className={`ml-4 inline-flex items-center gap-1 text-xs font-bold ${message.side === 'right' ? 'text-blue-100' : 'text-slate-500'}`}>
                      {message.time}
                      {message.side === 'right' && <CheckCheck size={14} />}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            className="grid shrink-0 grid-cols-[1fr_64px] gap-4 border-t border-slate-100 p-6"
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage()
            }}
          >
            <div className="relative flex min-h-16 items-center gap-4 rounded-lg border border-slate-200 bg-white px-6 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50">
              <input ref={fileInputRef} type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" className="hidden" onChange={handleAttachment} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="text-slate-500 hover:text-blue-700" aria-label="Joindre une image, un PDF ou un document">
                <Paperclip size={23} />
              </button>
              <div className="min-w-0 flex-1">
                {attachment && (
                  <div className="mb-2 flex w-fit max-w-full items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-black text-blue-800">
                    <Paperclip size={14} />
                    <span className="truncate">{attachment.name}</span>
                    <button type="button" onClick={() => setAttachment(null)} className="text-blue-500 hover:text-blue-900" aria-label="Retirer la pièce jointe"><X size={14} /></button>
                  </div>
                )}
                <input value={draft} onChange={(event) => setDraft(event.target.value)} className="w-full min-w-0 border-none bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400" placeholder="Écrire un message..." />
              </div>
              <button type="button" onClick={() => setEmojiOpen((value) => !value)} className="text-slate-500 hover:text-blue-700" aria-label="Ajouter un emoji">
                <Smile size={23} />
              </button>
              {emojiOpen && (
                <div className="absolute bottom-20 right-0 z-20 grid w-[420px] grid-cols-8 gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300">
                  {['😊', '😂', '😍', '🙏', '👍', '🎉', '❤️', '👋', '😎', '😅', '🤝', '📚', '✈️', '🏠', '💳', '✅', '🔥', '⭐', '💬', '📎', '🇫🇷', '🇨🇦', '🇩🇪', '🇧🇪'].map((emoji) => (
                    <button type="button" key={emoji} onClick={() => { setDraft((value) => `${value}${emoji}`); setEmojiOpen(false) }} className="grid h-11 w-11 place-items-center rounded-lg text-2xl hover:bg-blue-50" aria-label={`Ajouter ${emoji}`}>{emoji}</button>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="grid h-16 w-16 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700" aria-label="Envoyer le message">
              <Send size={24} />
            </button>
          </form>
        </motion.section>
        </section>
      </div>
    </div>
  )
}

function ThreadAvatar({ thread, large = false, compact = false }) {
  const size = large ? 'h-14 w-14 text-xl' : compact ? 'h-10 w-10 text-sm' : 'h-14 w-14 text-lg'
  const tones = {
    blue: 'bg-[#06245a] text-white',
    sky: 'bg-blue-100 text-blue-700',
    violet: 'bg-violet-100 text-violet-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    cyan: 'bg-cyan-100 text-blue-700',
  }
  const Icon = thread.icon

  return (
    <span className="relative shrink-0">
      {thread.image ? (
        <img src={thread.image} alt={thread.title} className={`${size} rounded-full object-cover shadow-sm`} />
      ) : (
        <span className={`grid ${size} place-items-center rounded-full font-black shadow-sm ${tones[thread.tone] || tones.blue}`}>
          {Icon ? <Icon size={compact ? 19 : 25} /> : thread.avatar}
        </span>
      )}
      {thread.online && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />}
    </span>
  )
}

function InfoLine({ label, value }) {
  return <div><div className="text-sm text-slate-500">{label}</div><div className="mt-1 font-black">{value}</div></div>
}

function Panel({ title, children }) {
  return <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.32 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-black">{title}</h2><button className="text-sm font-bold text-blue-600">Voir tout</button></div>{children}</motion.section>
}

function List({ items }) {
  return <div className="divide-y divide-slate-100">{items.map((item, index) => <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }} className="flex items-center gap-3 py-4 text-sm font-bold text-slate-700" key={item}><div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600"><FileText size={18} /></div>{item}</motion.div>)}</div>
}

function ProcessLine({ steps, activeIndex = 0, icons = [] }) {
  const progress = steps.length > 1 ? `${(activeIndex / (steps.length - 1)) * 100}%` : '0%'

  return (
    <div className="process-line mt-6 grid gap-5" style={{ '--progress': progress, gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step, index) => {
        const Icon = icons[index] || CheckCircle2
        const isDone = index < activeIndex
        const isActive = index === activeIndex

        return (
          <motion.div
            key={step}
            className="process-step rounded-lg border bg-white p-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full font-black ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'pulse-dot bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {isDone ? <CheckCircle2 /> : <Icon size={22} />}
            </div>
            <h3 className="font-black">{step}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{isDone ? 'Complete' : isActive ? 'En cours' : 'À venir'}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

function VerticalTimeline({ items, activeIndex = 0 }) {
  return (
    <div className="relative space-y-0 pl-8 before:absolute before:left-[19px] before:top-5 before:h-[calc(100%-40px)] before:w-0.5 before:bg-slate-200">
      {items.map((item, index) => {
        const isDone = index < activeIndex
        const isActive = index === activeIndex

        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="relative pb-6"
          >
            <span className={`absolute -left-[25px] top-1 grid h-7 w-7 place-items-center rounded-full border-4 border-white ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'pulse-dot bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {isDone ? <CheckCircle2 size={15} /> : <ArrowRight size={14} />}
            </span>
            <div className="font-black text-slate-900">{item}</div>
            <div className="mt-1 text-sm text-slate-500">{isDone ? 'Terminé' : isActive ? 'Action en cours de traitement' : 'Prochaine étape'}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

function Placeholder() {
  const location = useLocation()
  const title = useMemo(() => location.pathname.replace('/', '') || 'Module', [location.pathname])
  return <><PageTitle title={title.charAt(0).toUpperCase() + title.slice(1)} subtitle="Module premium preparé dans l'architecture frontend StudyWay." /><Panel title="Interface en préparation"><p className="text-slate-500">La route est prête pour recevoir les composants métier et les données API.</p></Panel></>
}

export default App
