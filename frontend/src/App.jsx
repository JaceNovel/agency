import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowLeftRight, ArrowRight, Bell, Building2, CheckCircle2, ChevronDown, CircleDollarSign,
  ClipboardList, CreditCard, FileText, GraduationCap, Home, LayoutDashboard,
  Lock, Mail, MessageCircle, Plane, Search, Send, Settings,
  ShieldCheck, UserRound, Users, WalletCards, Globe2, Heart, MapPin, Gift,
  CalendarDays, Phone, Info, Upload, Smartphone, Bus,
  Train, Car, Star, Languages, Wifi, Landmark, Paperclip, Smile, CheckCheck,
  X, Video, SlidersHorizontal, LogOut, Camera, Plus, Trash2, Clock3, AlertTriangle, Download, Award,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import universityHero from './assets/university-student-hero.png'
import supportHero from './assets/support-student-hero.png'
import dashboardStudentHero from './assets/dashboard-african-student.png'
import esimPhoneHero from './assets/esim-phone-hero.png'
import financeHero from './assets/finance-student-hero.png'
import parisPackBackground from './assets/paris-pack-background.png'
import settingsPasswordHero from './assets/settings-password-hero.png'
import settingsProfileHero from './assets/settings-profile-hero.png'

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
            <h1 className="text-4xl font-black leading-tight">Étudiez à l’étranger en toute sérénité</h1>
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
            <p className="mt-3 text-slate-500">{isRegister ? "Rejoignez StudyWay et lancez votre projet d’études à l’étranger" : 'Connectez-vous à votre compte StudyWay'}</p>
          </div>
          <form className="rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
            {isRegister && <div className="grid gap-4 sm:grid-cols-2"><Field icon={UserRound} label="Prénom" placeholder="Votre prénom" /><Field icon={UserRound} label="Nom" placeholder="Votre nom" /></div>}
            <Field icon={Mail} label="Adresse email" placeholder="votre@email.com" />
            {isRegister && <Field icon={UserRound} label="Numéro de téléphone" placeholder="+228 90 12 34 56" />}
            <Field icon={Lock} label="Mot de passe" placeholder={isRegister ? 'Creez un mot de passe' : 'Votre mot de passe'} type="password" />
            {isRegister && <Field icon={Lock} label="Confirmer le mot de passe" placeholder="Confirmez votre mot de passe" type="password" />}
            {isRegister && <label className="mt-4 block text-sm font-bold text-slate-700">Vous êtes...<select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-600 outline-none focus:border-blue-500"><option>Étudiant</option><option>Parent / Tuteur</option><option>École partenaire</option></select></label>}
            <button type="button" className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">{isRegister ? 'Créer mon compte' : 'Se connecter'} <ArrowRight size={18} /></button>
            <div className="mt-6 text-center text-sm text-slate-500">{isRegister ? 'Vous avez déjà un compte ? ' : "Vous n’avez pas de compte ? "}<Link className="font-bold text-blue-600" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Se connecter' : 'Créer un compte'}</Link></div>
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
    [Home, 'Logement', 'Résidence Les Estudines, Paris', 'Actif', "Loyer payé jusqu’au 31 mai 2025", 'bg-blue-50 text-blue-700', '/logement'],
    [GraduationCap, 'Université', 'Licence Informatique - L1', 'Inscrit', 'Année académique 2024-2025', 'bg-blue-50 text-blue-700', '/universites'],
    [Landmark, 'Compte bancaire', 'Compte ouvert - Boursorama', 'Actif', 'Compte vérifié', 'bg-violet-50 text-violet-700', '/finance'],
    [ShieldCheck, 'Assurance', 'Assurance habitation', 'Actif', 'Valide jusqu au 12/09/2025', 'bg-emerald-50 text-emerald-700', '/finance/assurance'],
    [Smartphone, 'Forfait mobile (eSIM)', 'Orange 50Go', 'Actif', 'Expire le 12/06/2025', 'bg-amber-50 text-amber-700', '/esim'],
  ]
  const activities = [
    [CheckCircle2, 'Paiement loyer', 'Mai 2025', '10 mai 2025', '- 361 000 FCFA', 'text-emerald-600'],
    [FileText, 'Document ajouté', 'Attestation de scolarité', '8 mai 2025', '', 'text-blue-600'],
    [Landmark, 'Paiement université', "Frais d’inscription", '5 mai 2025', '- 984 000 FCFA', 'text-violet-600'],
  ]
  const actions = [
    [WalletCards, 'Effectuer un paiement', "Payer le loyer, l’université, etc.", 'text-amber-600', '/finance/transfert'],
    [CreditCard, "Envoyer de l’argent", "Recharger le portefeuille de votre enfant", 'text-blue-600', '/finance/transfert'],
    [Upload, 'Télécharger un document', 'Ajouter un nouveau document', 'text-violet-600', '/documents'],
    [MessageCircle, 'Contacter le support', "Obtenir de l’aide rapidement", 'text-emerald-600', '/messages'],
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
                <Link to="/profil" className="flex h-12 w-full items-center justify-center rounded-lg border border-blue-700 font-black text-blue-800">Voir le profil complet</Link>
                <div className="text-sm text-slate-500">Derniere connexion<br /><b className="mt-1 block text-base text-slate-900">12 mai 2025 a 14:32</b></div>
                <div className="text-sm text-slate-500">Compte lie le<br /><b className="mt-1 block text-base text-slate-900">10 mars 2025</b></div>
                <Link to="/settings/profile" className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 font-black text-blue-800"><Lock size={17} />Gerer l’acces</Link>
              </div>
            </div>
          </motion.section>

          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-black">Vue d’ensemble</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-4">
              {overview.map(([Icon, label, value, sub, tone]) => <div key={label} className={`flex items-center gap-4 rounded-lg p-5 ${tone}`}><Icon size={34} /><div><div className="text-sm font-bold text-slate-700">{label}</div><div className="text-2xl font-black text-slate-950">{value}</div><div className="text-sm font-medium text-slate-500">{sub}</div></div></div>)}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <h2 className="border-b border-slate-100 p-6 text-xl font-black">Suivi des services</h2>
            <div className="divide-y divide-slate-100 px-6">
              {services.map(([Icon, title, sub, status, detail, tone, to]) => <div key={title} className="grid items-center gap-4 py-5 lg:grid-cols-[1fr_120px_1fr_130px]"><div className="flex items-center gap-4"><div className={`grid h-12 w-12 place-items-center rounded-lg ${tone}`}><Icon size={24} /></div><div><b>{title}</b><div className="text-sm text-slate-500">{sub}</div></div></div><span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-600">{status}</span><span className="text-sm font-medium text-slate-500">{detail}</span><Link to={to} className="flex h-10 items-center justify-center rounded-lg border border-slate-200 font-black text-blue-800">Voir détails</Link></div>)}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><h2 className="mb-4 text-xl font-black">Dernières activités</h2>{activities.map(([Icon, title, sub, date, amount, tone]) => <div key={title} className="flex items-center justify-between border-b border-slate-100 py-5 last:border-0"><div className="flex items-center gap-4"><div className={`grid h-12 w-12 place-items-center rounded-full bg-slate-50 ${tone}`}><Icon size={24} /></div><div><b>{title}</b><div className="text-sm">{sub}</div><div className="text-sm text-slate-500">{date}</div></div></div><b className={tone}>{amount}</b></div>)}<Link to="/messages" className="mt-4 flex w-full justify-center font-black text-blue-800">Voir toutes les activités</Link></section>
          <section className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"><h2 className="mb-5 text-xl font-black">Actions rapides</h2>{actions.map(([Icon, title, sub, tone, to]) => <Link key={title} to={to} className="flex gap-4 py-4 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition"><div className={`grid h-11 w-11 place-items-center rounded-lg bg-slate-50 ${tone}`}><Icon size={22} /></div><div><b>{title}</b><p className="text-sm text-slate-500">{sub}</p></div></Link>)}</section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-7 shadow-sm"><h2 className="text-lg font-black text-blue-950">Besoin d’aide ?</h2><p className="mt-2 text-sm leading-6 text-blue-900">Notre équipe est disponible 24/7 pour vous accompagner.</p><Link to="/messages" className="mt-5 flex h-12 items-center justify-center gap-3 rounded-lg bg-white px-6 font-black text-blue-800"><MessageCircle size={18} />Contacter le support</Link></section>
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
  const navigate = useNavigate()
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
            <div className="font-black">Besoin d’aide ?</div>
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
              <button type="button" onClick={() => navigate('/settings/profile')} className={`grid h-11 w-11 place-items-center rounded-lg text-blue-950 hover:bg-slate-100 ${isSettingsRoute ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-100' : ''}`} aria-label="Paramètres"><Settings size={22} /></button>
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
        <Route path="/universites/:id/postuler" element={<UniversityApplication />} />
        <Route path="/universites/:id" element={<UniversityFormationDetail />} />
        <Route path="/documents" element={<StudentRequests />} />
        <Route path="/guides/:slug" element={<StudentGuideDetail />} />
        <Route path="/guides" element={<StudentGuides />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/parametres" element={<ProfileSettings />} />
        <Route path="/parametres/informations" element={<PersonalInformationSettings />} />
        <Route path="/parametres/mot-de-passe" element={<PasswordSettings />} />
        <Route path="/parametres/facturation" element={<BillingSettings />} />
        <Route path="/parametres/paiement" element={<PaymentSettings />} />
        <Route path="/parametres/connexions" element={<LoginHistorySettings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/personal-info" element={<PersonalInformationSettings />} />
        <Route path="/settings/password" element={<PasswordSettings />} />
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
        <Route path="/contact/conseiller" element={<AdvisorContact />} />
        <Route path="/contact/email" element={<EmailContact />} />
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
  const navigate = useNavigate()
  return (
    <div className="settings-page -m-5 min-h-screen overflow-hidden bg-[#f7f8fb] px-6 py-8 text-slate-950 lg:-m-8 lg:px-[58px]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="mb-8 flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)} className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-md shadow-slate-200/70"><ChevronDown className="rotate-90" size={22} /></button>
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

function SettingsActionCard({ icon: Icon, title, text, tone = 'blue', danger = false, index = 0, onClick }) {
  const toneClass = danger ? 'bg-rose-50 text-rose-600' : tone === 'purple' ? 'bg-violet-50 text-violet-600' : 'bg-blue-50 text-amber-500'
  return (
    <motion.button type="button" onClick={onClick} initial={{ opacity: 0, x: 34, scale: 0.985 }} animate={{ opacity: 1, x: 0, scale: 1 }} whileHover={{ y: -4 }} transition={{ delay: 0.12 + index * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className={`flex min-h-[122px] w-full items-center gap-4 rounded-xl border p-7 text-left shadow-sm ${danger ? 'border-rose-200 bg-rose-50/70' : 'border-slate-200 bg-white'}`}>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${toneClass}`}><Icon size={23} /></span>
      <span><span className={`block text-xl font-black ${danger ? 'text-rose-700' : 'text-slate-950'}`}>{title}</span><span className={`mt-1 block text-sm font-semibold ${danger ? 'text-red-600' : 'text-slate-500'}`}>{text}</span></span>
    </motion.button>
  )
}

function ProfileSettings() {
  const navigate = useNavigate()
  return (
    <SettingsPageFrame title="Paramètres du profil">
      <div className="grid gap-8 xl:grid-cols-[450px_1fr]">
        <SettingsProfileCard />
        <div className="space-y-8">
          <SettingsActionCard icon={UserRound} title="Informations personnelles" text="Mettez à jour votre identité, votre adresse, votre date de naissance et votre parcours." index={0} onClick={() => navigate('/settings/personal-info')} />
          <SettingsActionCard icon={Lock} title="Changer le mot de passe" text="Modifiez votre mot de passe actuel et renforcez la sécurité de votre compte." tone="purple" index={1} onClick={() => navigate('/settings/password')} />
          <SettingsActionCard icon={Trash2} title="Supprimer le compte" text="Si vous souhaitez supprimer définitivement votre compte, utilisez le bouton ci-dessous." danger index={2} onClick={() => navigate('/messages')} />
        </div>
      </div>
    </SettingsPageFrame>
  )
}

function PersonalInformationSettings() {
  const profileFields = [
    ['Nom complet', 'Lemouel jonadab AMAH-TCHTOUTCHOUI', UserRound],
    ['Date de naissance', '14 février 2004', CalendarDays],
    ['Email étudiant', 'jaceamah14@gmail.com', Mail],
    ['Téléphone', '+228 90 12 34 56', Phone],
    ['Adresse étudiant', '12 rue des Étudiants, 75013 Paris', MapPin],
    ['Dernier diplôme', 'Baccalauréat série C - Mention Bien', Award],
  ]
  const timeline = [
    ['Identité validée', 'Passeport et coordonnées principales confirmés.'],
    ['Adresse à vérifier', 'Ajoutez votre justificatif dès que le bail est signé.'],
    ['Parcours académique', 'Dernier diplôme renseigné pour les démarches université et visa.'],
  ]

  return (
    <SettingsPageFrame title="Informations personnelles">
      <div className="personal-settings-page space-y-8">
        <motion.section initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }} className="personal-settings-hero overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="grid min-h-[360px] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-700"><ShieldCheck size={16} />Profil vérifié</span>
              <h2 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-slate-950">Gardez un dossier étudiant clair, complet et prêt pour vos démarches.</h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">Ces informations alimentent vos demandes StudyWay : logement, visa, université, assurance et accompagnement administratif.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['6', 'infos clés'],
                  ['92%', 'profil complété'],
                  ['3', 'pièces à suivre'],
                ].map(([value, label], index) => (
                  <motion.div key={label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 + index * 0.07 }} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <b className="block text-2xl font-black text-blue-800">{value}</b>
                    <span className="mt-1 block text-xs font-black uppercase tracking-wide text-slate-500">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden">
              <img src={settingsProfileHero} alt="Documents de profil étudiant" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/0 to-white/12" />
            </div>
          </div>
        </motion.section>

        <div className="grid items-start gap-8 xl:grid-cols-[1fr_360px]">
          <motion.section initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.42 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="text-2xl font-black text-slate-950">Détails du profil</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">Modifiez les informations utilisées pour vos services.</p>
              </div>
              <button type="button" className="flex h-11 items-center gap-3 rounded-lg bg-blue-700 px-5 font-black text-white shadow-lg shadow-blue-700/20"><CheckCircle2 size={18} />Enregistrer</button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {profileFields.map(([label, value, Icon], index) => (
                <motion.label key={label} initial={{ opacity: 0, x: index % 2 ? 18 : -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 + index * 0.045, duration: 0.32 }} className={label === 'Adresse étudiant' ? 'md:col-span-2' : ''}>
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><Icon size={17} className="text-blue-700" />{label}</span>
                  <input defaultValue={value} className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </motion.label>
              ))}
            </div>
          </motion.section>

          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.42 }} className="space-y-5">
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="font-black text-blue-950">Suivi du dossier</h3>
              <div className="mt-5 space-y-4">
                {timeline.map(([title, text], index) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-blue-700 shadow-sm">{index + 1}</span>
                    <span><b className="block text-sm text-slate-950">{title}</b><span className="mt-1 block text-sm font-semibold leading-5 text-blue-900/75">{text}</span></span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <h3 className="font-black text-emerald-950">Conseil StudyWay</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-emerald-900">Gardez une adresse et un diplôme à jour : ce sont deux informations souvent demandées pour les réservations logement et les dossiers visa.</p>
            </section>
          </motion.aside>
        </div>
      </div>
    </SettingsPageFrame>
  )
}

function PasswordSettings() {
  const passwordRules = [
    ['8 caractères minimum', true],
    ['Une majuscule et une minuscule', true],
    ['Un chiffre ou symbole', false],
    ['Différent de l’ancien mot de passe', false],
  ]

  return (
    <SettingsPageFrame title="Changer le mot de passe">
      <div className="password-settings-page grid min-h-[720px] gap-8 xl:grid-cols-[1fr_430px]">
        <motion.section initial={{ opacity: 0, y: 28, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="password-settings-hero relative min-h-[260px] overflow-hidden">
            <img src={settingsPasswordHero} alt="Sécurité du mot de passe" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/82 via-blue-900/48 to-transparent" />
            <div className="relative z-10 max-w-xl p-8 text-white lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-wide ring-1 ring-white/20"><Lock size={16} />Sécurité du compte</span>
              <h2 className="mt-6 text-4xl font-black tracking-tight">Un mot de passe solide protège tout votre parcours.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-blue-50/88">Mettez à jour votre accès StudyWay et gardez vos documents, paiements et réservations sous contrôle.</p>
            </div>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_300px] lg:p-8">
            <motion.form initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.38 }} className="space-y-5">
              <PasswordField label="Mot de passe actuel" placeholder="Entrez votre mot de passe actuel" />
              <button type="button" className="-mt-2 text-sm font-black text-blue-700 hover:text-blue-900">Mot de passe oublié ?</button>
              <PasswordField label="Nouveau mot de passe" placeholder="Créez un nouveau mot de passe" />
              <PasswordField label="Confirmer le nouveau mot de passe" placeholder="Confirmez le nouveau mot de passe" />
              <div className="flex flex-wrap gap-3 pt-3">
                <button type="button" className="flex h-12 items-center gap-3 rounded-lg bg-blue-700 px-6 font-black text-white shadow-lg shadow-blue-700/20"><ShieldCheck size={18} />Mettre à jour</button>
                <button type="button" className="h-12 rounded-lg border border-slate-200 px-6 font-black text-slate-700 hover:bg-slate-50">Annuler</button>
              </div>
            </motion.form>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22, duration: 0.38 }} className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="font-black text-blue-950">Force recommandée</h3>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <span className="block h-full w-[64%] rounded-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500" />
              </div>
              <div className="mt-5 space-y-3">
                {passwordRules.map(([rule, done]) => (
                  <div key={rule} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className={`grid h-6 w-6 place-items-center rounded-full ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-400'}`}><CheckCircle2 size={14} /></span>
                    {rule}
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </motion.section>

        <motion.aside initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16, duration: 0.44 }} className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-black text-slate-950">Protection active</h3>
            <div className="mt-5 space-y-4">
              {[
                [ShieldCheck, 'Connexion sécurisée', 'Votre session actuelle est protégée.'],
                [Clock3, 'Dernier changement', 'Aucun changement récent enregistré.'],
                [AlertTriangle, 'Rappel utile', 'Évitez de réutiliser un mot de passe bancaire ou email.'],
              ].map(([Icon, title, text], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 + index * 0.07 }} className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><Icon size={21} /></span>
                  <span><b className="block text-sm text-slate-950">{title}</b><span className="mt-1 block text-sm font-semibold leading-5 text-slate-500">{text}</span></span>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-violet-100 bg-violet-50 p-6 shadow-sm">
            <h3 className="font-black text-violet-950">Astuce sécurité</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-violet-900">Utilisez une phrase facile à retenir, avec des chiffres et symboles, puis gardez-la uniquement pour StudyWay.</p>
          </section>
        </motion.aside>
      </div>
    </SettingsPageFrame>
  )
}

function PasswordField({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><Lock size={17} className="text-blue-700" />{label}</span>
      <input type="password" placeholder={placeholder} className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
    </label>
  )
}

function BillingSettings() {
  return (
    <SettingsPageFrame title="Adresses de facturation">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><h2 className="text-3xl font-black">Adresses de facturation</h2><p className="mt-3 font-semibold text-slate-500">Ajoutez, modifiez ou supprimez vos adresses de facturation.</p></div>
        <button type="button" className="flex h-14 items-center gap-3 rounded-lg bg-amber-400 px-7 font-black text-white shadow-lg shadow-amber-200"><Plus size={22} />Ajouter une adresse</button>
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 24, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.36 }} className="grid min-h-[360px] place-items-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <WalletCards className="mx-auto text-slate-300" size={68} />
          <h3 className="mt-8 text-xl font-black">Aucune adresse trouvée</h3>
          <p className="mt-4 font-semibold text-slate-500">Vous n’avez pas encore ajouté d’adresse de facturation.</p>
          <button type="button" className="mt-6 inline-flex h-12 items-center gap-3 rounded-lg bg-amber-400 px-7 font-black text-white shadow-lg shadow-amber-200"><Plus size={20} />Ajoutez votre première adresse</button>
        </div>
      </motion.section>
    </SettingsPageFrame>
  )
}

function PaymentSettings() {
  const [openMethods, setOpenMethods] = useState({ bank: false, mobile: false })
  const countryDialOptions = [
    ['🇹🇬', '+228', 'Togo'],
    ['🇫🇷', '+33', 'France'],
    ['🇧🇯', '+229', 'Bénin'],
    ['🇨🇮', '+225', "Côte d'Ivoire"],
    ['🇸🇳', '+221', 'Sénégal'],
    ['🇨🇲', '+237', 'Cameroun'],
    ['🇬🇭', '+233', 'Ghana'],
    ['🇳🇬', '+234', 'Nigeria'],
    ['🇲🇱', '+223', 'Mali'],
    ['🇧🇫', '+226', 'Burkina Faso'],
    ['🇳🇪', '+227', 'Niger'],
    ['🇬🇳', '+224', 'Guinée'],
    ['🇨🇩', '+243', 'RDC'],
    ['🇨🇬', '+242', 'Congo'],
    ['🇬🇦', '+241', 'Gabon'],
    ['🇲🇦', '+212', 'Maroc'],
    ['🇹🇳', '+216', 'Tunisie'],
    ['🇩🇿', '+213', 'Algérie'],
    ['🇧🇪', '+32', 'Belgique'],
    ['🇨🇦', '+1', 'Canada'],
    ['🇺🇸', '+1', 'États-Unis'],
    ['🇬🇧', '+44', 'Royaume-Uni'],
    ['🇩🇪', '+49', 'Allemagne'],
    ['🇪🇸', '+34', 'Espagne'],
    ['🇮🇹', '+39', 'Italie'],
    ['🇨🇭', '+41', 'Suisse'],
  ]
  const mobileMoneyNumbers = [
    ['🇹🇬', 'Flooz', '+228 90 12 34 56', 'Christelle Komi'],
    ['🇹🇬', 'TMoney', '+228 99 45 67 10', 'Koffi Lucas'],
  ]

  return (
    <SettingsPageFrame title="Méthodes de paiement">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-black">Méthodes de paiement</h2>
        <p className="mt-3 font-semibold text-slate-500">Gérez vos méthodes de paiement.</p>
      </motion.div>
      <div className="grid items-start gap-7 xl:grid-cols-2">
        <PaymentMethodCard icon={CreditCard} title="Virement bancaire" text="Entrez les détails de votre compte bancaire." tone="blue" index={0} open={openMethods.bank} onToggle={() => setOpenMethods((value) => ({ ...value, bank: !value.bank }))}>
          <div className="grid gap-4 md:grid-cols-2">
            <PaymentField label="Nom" placeholder="KOMI" />
            <PaymentField label="Prénom" placeholder="Christelle" />
            <PaymentField label="IBAN" placeholder="FR76 3000 6000 0112 3456 7890 189" className="md:col-span-2" />
          </div>
          <button type="button" className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 font-black text-white">
            <Plus size={19} />Enregistrer le compte bancaire
          </button>
        </PaymentMethodCard>
        <PaymentMethodCard icon={Smartphone} title="Mobile money" text="Ajoutez les numéros autorisés pour les paiements." tone="orange" index={1} open={openMethods.mobile} onToggle={() => setOpenMethods((value) => ({ ...value, mobile: !value.mobile }))}>
          <div className="space-y-3">
            {mobileMoneyNumbers.map(([flag, provider, phone, owner]) => (
              <div key={`${provider}-${phone}`} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{flag}</span>
                  <span><b className="block text-slate-950">{provider}</b><span className="text-sm font-semibold text-slate-500">{owner}</span></span>
                </div>
                <b className="text-sm text-blue-800">{phone}</b>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <PaymentField label="Nom" placeholder="AMAH" />
            <PaymentField label="Prénom" placeholder="Jonadab" />
            <label className="block text-sm font-black text-slate-700">
              Code du pays
              <select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800 outline-none focus:border-blue-500">
                {countryDialOptions.map(([flag, code, country]) => <option key={`${country}-${code}`} value={code}>{flag} {country} {code}</option>)}
              </select>
            </label>
            <PaymentField label="Numéro" placeholder="90 12 34 56" />
          </div>
          <button type="button" className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-5 font-black text-white">
            <Plus size={19} />Ajouter le numéro
          </button>
        </PaymentMethodCard>
      </div>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-7">
        <div className="flex gap-5">
          <Info className="mt-1 shrink-0 text-amber-500" size={24} />
          <div><h3 className="font-black text-blue-950">Informations de versement</h3><p className="mt-3 font-semibold leading-7 text-blue-800">Vos gains sont versés selon la méthode spécifiée ici. Veuillez vous assurer que vos informations sont correctes.</p></div>
        </div>
      </motion.section>
    </SettingsPageFrame>
  )
}

function PaymentField({ label, placeholder, className = '' }) {
  return (
    <label className={`block text-sm font-black text-slate-700 ${className}`}>
      {label}
      <input className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500" placeholder={placeholder} />
    </label>
  )
}

function PaymentMethodCard({ icon: Icon, title, text, tone, index = 0, open = false, onToggle, children }) {
  const toneClass = tone === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-amber-500'
  return (
    <motion.section initial={{ opacity: 0, y: 28, scale: 0.97, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} transition={{ delay: 0.1 + index * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={onToggle} className="flex min-h-28 w-full items-center justify-between gap-5 p-7 text-left">
        <span className="flex items-center gap-4"><span className={`grid h-[60px] w-[60px] shrink-0 place-items-center rounded-lg ${toneClass}`}><Icon size={24} /></span><span><b className="text-2xl">{title}</b><span className="mt-2 block font-semibold text-slate-500">{text}</span></span></span>
        <ChevronDown size={24} className={`shrink-0 text-slate-400 transition ${open ? 'rotate-180 text-blue-700' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <div className="border-t border-slate-100 p-7 pt-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
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
    [LogOut, 'Déconnexion', "N’oubliez pas de vous déconnecter après avoir utilisé des apps.", 'bg-amber-50 text-amber-600'],
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
    </SettingsPageFrame>
  )
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
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex justify-between"><h2 className="text-xl font-black">Mon statut</h2><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-600">Actif</span></div><div className="font-black">Dossier Visa France</div><div className="text-sm text-slate-500">Étudiant</div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/5 rounded-full bg-blue-600" /></div><div className="mt-4 flex justify-between text-sm"><span className="text-amber-600">En cours d’examen</span><Link to="/documents" className="font-black text-blue-700">Voir détails</Link></div></section>
          <section className="rounded-lg bg-[#061b47] p-6 text-white shadow-sm"><div className="text-lg font-black">Mon portefeuille</div><div className="mt-5 text-sm text-blue-100">Solde disponible</div><div className="mt-1 text-3xl font-black">485 600 FCFA</div><Link to="/finance/transfert" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Ajouter de l’argent</Link></section>
          <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-black">Raccourcis rapides</h2>
            {[
              [Upload, 'Uploader un document', '/documents'],
              [Home, 'Réserver un logement', '/logement'],
              [CalendarDays, 'Prendre rendez-vous', '/contact/conseiller'],
              [ShieldCheck, 'Demander une AVI', '/visa'],
              [Landmark, 'Ouvrir un compte bancaire', '/finance'],
            ].map(([Icon, label, to]) => (
              <Link key={label} to={to} className="flex items-center gap-3 py-3 text-sm font-semibold text-slate-600 hover:text-blue-700 transition">
                <Icon size={17} className="text-blue-600 shrink-0" />{label}
              </Link>
            ))}
          </section>
          <section className="mt-6 rounded-lg bg-[#061b47] p-6 text-white shadow-sm"><h2 className="text-xl font-black">Parrainez un ami 🎁</h2><p className="mt-2 text-blue-50">Gagnez jusqu’à <b className="text-amber-300">20 000 FCFA</b></p><Link to="/messages" className="mt-5 flex h-12 w-full items-center justify-between rounded-lg bg-blue-600 px-5 font-black text-white">Parrainer maintenant <ArrowRight size={18} /></Link></section>
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
  const [financeUnavailableModal, setFinanceUnavailableModal] = useState(null)
  const quickServices = [
    [Landmark, 'Ouvrir un compte bancaire', 'Compte étudiant 100% en ligne', null, 'compte'],
    [CreditCard, "Transfert d’argent international", 'Frais réduits & rapide vers 150+ pays', '/finance/transfert', null],
    [GraduationCap, 'Financement étudiant', 'Prêts étudiants et solutions sur mesure', null, 'financement'],
    [ShieldCheck, 'Assurance & Protection', 'Assurance santé, habitation et responsabilité civile', '/finance/assurance', null],
  ]
  const stats = [
    [Landmark, '+25', 'Banques partenaires'],
    [Globe2, '150+', 'Pays couverts'],
    [CircleDollarSign, '0 FCFA', "Frais d’ouverture"],
    [ShieldCheck, 'Sécurisé', 'Données protégées'],
    [Users, 'Rapide', 'Ouverture en 24-48h'],
  ]
  const banks = [
    ['BNP Paribas', '/finance-bnp.png', 'Populaire', ['Carte bancaire internationale', 'Application mobile', 'Découvert autorisé']],
    ['Société Générale', '/finance-societe-generale.jpeg', 'Partenaire', ['Offres étudiants exclusives', 'Assurance incluse', 'Retraits sans frais zone SEPA']],
    ['Crédit Mutuel', '/finance-credit-mutuel.png', 'Recommandé', ['Carte Mastercard/Visa', 'Conseiller dédié', 'Solutions épargne']],
    ['N26', '/finance-n26.png', 'Digital', ['Ouverture rapide en 8 min', 'Carte virtuelle incluse', "Zéro frais à l’étranger"]],
    ['Revolut', '/finance-revolut.png', 'Flexible', ['Multi-devises', 'Transferts instantanés', "Contrôle total depuis l’app"]],
  ]
  const financing = [
    [Landmark, 'Prêt étudiant', 'Financez vos études avec des taux avantageux et des conditions adaptées.'],
    [GraduationCap, "Bourse d’études", 'Trouvez des bourses et aides financières pour soutenir votre parcours.'],
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
            <p className="mt-5 text-lg leading-8 text-slate-600">Ouvrez un compte bancaire, transférez de l’argent, gérez votre budget et explorez des solutions de financement adaptées à votre parcours.</p>
          </div>
          <div className="relative z-10 mt-12 grid gap-4 lg:grid-cols-4">
            {quickServices.map(([Icon, title, text, to, unavailableKey], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.07, duration: 0.34, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -14 }}>
              {unavailableKey ? (
                <button type="button" onClick={() => setFinanceUnavailableModal(unavailableKey)} className="finance-quick-card group block h-full w-full rounded-lg border p-5 text-left text-white shadow-lg shadow-blue-950/15 backdrop-blur transition duration-300 hover:shadow-xl hover:shadow-blue-950/10">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-700 shadow-sm shadow-blue-950/10 transition duration-300 group-hover:bg-blue-50 group-hover:text-blue-800"><Icon size={22} /></div>
                  <h3 className="font-black leading-tight text-white transition duration-300 group-hover:text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-blue-100 transition duration-300 group-hover:text-slate-500">{text}</p>
                  <span className="finance-quick-arrow mt-3 inline-grid h-8 w-8 place-items-center rounded-full text-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={18} />
                  </span>
                </button>
              ) : (
                <Link to={to} className="finance-quick-card group block h-full rounded-lg border p-5 text-white shadow-lg shadow-blue-950/15 backdrop-blur transition duration-300 hover:shadow-xl hover:shadow-blue-950/10">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-700 shadow-sm shadow-blue-950/10 transition duration-300 group-hover:bg-blue-50 group-hover:text-blue-800"><Icon size={22} /></div>
                  <h3 className="font-black leading-tight text-white transition duration-300 group-hover:text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-blue-100 transition duration-300 group-hover:text-slate-500">{text}</p>
                  <span className="finance-quick-arrow mt-3 inline-grid h-8 w-8 place-items-center rounded-full text-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              )}
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
            <button type="button" onClick={() => setFinanceUnavailableModal('compte')} className="flex items-center gap-2 text-sm font-black text-blue-800">Voir toutes les banques <ArrowRight size={17} /></button>
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
                <div className="mt-auto border-t border-blue-200 pt-4"><button type="button" onClick={() => setFinanceUnavailableModal('compte')} className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-sm shadow-blue-600/20">Ouverture en ligne</button></div>
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
            <div className="mt-2 text-xs text-emerald-600">Mis à jour : aujourd’hui, 10:30</div>
          </div>
          <Link to="/finance/transfert" className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-800 font-black text-white shadow-lg shadow-blue-900/20"><Send size={18} />Envoyer de l’argent</Link>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Besoin d’aide ?</h2>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Nos conseillers sont disponibles pour vous accompagner dans vos démarches bancaires et financières.</p>
          <div className="mt-5 divide-y divide-slate-100">
            <Link to="/messages" className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-1 px-1 rounded-lg transition">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-800"><MessageCircle size={20} /></div>
              <div><div className="font-black text-slate-950">Discuter en ligne</div><div className="text-sm font-medium text-slate-500">Disponible 7j/7</div></div>
            </Link>
            <a href="tel:+33688639294" className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-1 px-1 rounded-lg transition">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-800"><Phone size={20} /></div>
              <div><div className="font-black text-slate-950">Appeler un conseiller</div><div className="text-sm font-medium text-slate-500">+33 6 88 63 92 94</div></div>
            </a>
            <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-1 px-1 rounded-lg transition">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700"><MessageCircle size={20} /></div>
              <div><div className="font-black text-slate-950">WhatsApp</div><div className="text-sm font-medium text-slate-500">+33 6 88 63 92 94</div></div>
            </a>
          </div>
          <Link to="/contact/conseiller" className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-blue-800 font-black text-blue-800 hover:bg-blue-50 transition"><CalendarDays size={18} />Prendre rendez-vous</Link>
        </section>
      </aside>

      <section className="-mr-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:-mr-8 xl:col-span-2">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">Solutions de financement</h2>
          <button type="button" onClick={() => setFinanceUnavailableModal('financement')} className="flex items-center gap-2 text-sm font-black text-blue-800">Voir toutes les solutions <ArrowRight size={17} /></button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {financing.map(([Icon, title, text]) => (
            <motion.article key={title} whileHover={{ y: -6 }} className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={22} /></div>
              <h3 className="font-black text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{text}</p>
              <button type="button" onClick={() => setFinanceUnavailableModal('financement')} className="mt-5 flex items-center gap-2 text-sm font-black text-blue-800">Découvrir <ArrowRight size={16} /></button>
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
      {financeUnavailableModal && <FinanceUnavailableModal type={financeUnavailableModal} onClose={() => setFinanceUnavailableModal(null)} />}
    </div>
  )
}

function FinanceUnavailableModal({ type, onClose }) {
  const isCompte = type === 'compte'
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-lg rounded-lg border border-blue-100 bg-white p-7 shadow-2xl shadow-blue-950/20">
        <div className="flex items-start justify-between gap-5">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-50 text-amber-600">
            {isCompte ? <Landmark size={26} /> : <GraduationCap size={26} />}
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><X size={18} /></button>
        </div>
        <h2 className="mt-5 text-xl font-black text-slate-950">{isCompte ? 'Ouverture de compte bancaire' : 'Financement étudiant'}</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          {isCompte
            ? "L’ouverture de compte bancaire en ligne n’est pas encore disponible sur la plateforme. Notre équipe prépare activement ce service. En attendant, contactez un conseiller pour être accompagné dans votre démarche."
            : "Le service de financement étudiant n’est pas encore disponible sur la plateforme. Nos conseillers peuvent néanmoins vous orienter vers les options adaptées à votre situation."}
        </p>
        <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
          <span className="font-black">Service bientôt disponible —</span> Pour toute demande urgente, contactez-nous directement.
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href="tel:+33688639294" className="flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20"><Phone size={18} />+33 6 88 63 92 94</a>
          <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 font-black text-emerald-700"><MessageCircle size={18} />WhatsApp</a>
        </div>
        <button type="button" onClick={onClose} className="mt-3 flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Fermer</button>
      </motion.div>
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
      title: "Transfert d’argent international",
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
          {process === 'compte' && <ServiceUnavailableBlock title="Ouverture de compte bancaire en ligne" description="L’ouverture de compte bancaire en ligne n’est pas encore disponible sur StudyWay. Nos partenaires bancaires sont en cours d’intégration. Contactez un conseiller pour être accompagné dès maintenant." />}
          {process === 'transfert' && <MoneyTransferProcess />}
          {process === 'financement' && <ServiceUnavailableBlock title="Financement étudiant" description="Le service de financement étudiant n’est pas encore disponible sur la plateforme. Notre équipe prépare des solutions de prêts et bourses adaptées. Contactez un conseiller pour explorer les options disponibles." />}
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

function ServiceUnavailableBlock({ title, description }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-amber-50 text-amber-500">
        <AlertTriangle size={38} />
      </div>
      <h2 className="mt-6 text-2xl font-black text-slate-950">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-600">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-5 py-2 text-sm font-black text-amber-700 ring-1 ring-amber-200">
        Service bientôt disponible
      </div>
      <div className="mt-8 grid w-full max-w-sm gap-3">
        <a href="tel:+33688639294" className="flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20"><Phone size={18} />+33 6 88 63 92 94</a>
        <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 font-black text-emerald-700"><MessageCircle size={18} />Contacter via WhatsApp</a>
        <Link to="/messages" className="flex h-12 items-center justify-center gap-3 rounded-lg border border-slate-200 font-black text-blue-800 hover:bg-blue-50"><MessageCircle size={18} />Parler à un conseiller</Link>
        <Link to="/finance" className="flex h-11 items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800"><ArrowLeft size={17} />Retour Banque & Finance</Link>
      </div>
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
  const [housingMode, setHousingMode] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState(0)
  const displayPrice = (amount) => `${Math.round(amount * 1.15).toLocaleString('fr-FR')} FCFA`
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
  const hotelImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
  ]
  const homes = [
    ['Studio cosy - Montparnasse', 'Paris 14e, France', displayPrice(492000), 'Studio', '20 m²', 'Meublé', 'Disponible dès le 15 juin', 'Coup de cœur'],
    ['Appartement - Lyon Part-Dieu', 'Lyon, France', displayPrice(446000), 'T2', '35 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre - Résidence étudiante', 'Toulouse, France', displayPrice(295000), 'Chambre', '15 m²', 'Meublé', 'Disponible dès le 1er juillet', 'Vérifié'],
    ['Studio - La Defense', 'Courbevoie, France', displayPrice(525000), 'Studio', '22 m²', 'Meublé', 'Disponible maintenant', 'Coup de cœur'],
    ['T2 lumineux - Paris', 'Paris 11e, France', displayPrice(472000), 'T2', '32 m²', 'Équipé', 'Disponible bientôt', 'Vérifié'],
    ['Colocation meublee', 'Lille, France', displayPrice(341000), 'Colocation', '18 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre calme - Centre', 'Bordeaux, France', displayPrice(387000), 'Chambre', '17 m²', 'Wi-Fi', 'Disponible maintenant', 'Vérifié'],
    ['Studio moderne - Nantes', 'Nantes, France', displayPrice(400000), 'Studio', '24 m²', 'Meublé', 'Disponible en août', 'Vérifié'],
  ]
  const why = [
    [ShieldCheck, 'Logements vérifiés', 'Chaque logement est vérifié manuellement par notre équipe'],
    [Lock, 'Paiement sécurisé', 'Payez en toute sécurité via notre plateforme protégée'],
    [MessageCircle, 'Accompagnement', "Aide pour l’installation et toutes vos démarches"],
    [Users, 'Communauté étudiante', "Rejoignez une communauté d’étudiants comme vous"],
  ]
  const hotelQuery = useQuery({
    queryKey: ['duffel-stays-hotels', 'Paris'],
    queryFn: () => fetchJson('/api/v1/stays/hotels?city=Paris&rooms=1&adults=1&radius=8'),
    enabled: housingMode === 'hotel',
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })
  const hotelResults = housingMode === 'hotel' && hotelQuery.data?.data?.length ? hotelQuery.data.data : []
  const activeHotel = hotelResults[selectedHotel] ?? hotelResults[0]

  if (!housingMode) {
    return (
      <div className="housing-page -mx-5 space-y-8 px-5 lg:-mx-8 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 34, scale: 0.985, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="housing-landing-replica grid gap-7 xl:grid-cols-[1.85fr_.9fr]"
        >
          <div className="housing-landing-hero relative rounded-[28px] bg-[#102c85] p-8 text-white lg:p-10">
            <div className="relative z-10 grid min-h-[480px] gap-8 lg:grid-cols-[1.25fr_.72fr]">
              <motion.div initial={{ opacity: 0, x: -26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.48, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/70 px-5 py-3 text-sm font-black text-blue-50 shadow-lg shadow-blue-950/20 ring-1 ring-white/10">
                    <Home size={16} />Logement étudiant
                  </span>
                  <h1 className="mt-8 max-w-[560px] text-[44px] font-black leading-[1.1] tracking-tight text-white lg:text-[54px]">Choisissez votre solution d’hébergement</h1>
                  <p className="mt-6 max-w-[650px] text-lg font-semibold leading-8 text-blue-50/90">StudyWay vous accompagne pour réserver une adresse fiable, que ce soit pour une installation étudiante ou un séjour hôtelier à l’arrivée.</p>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[[ShieldCheck, 'Logements vérifiés', 'Qualité garantie'], [MessageCircle, 'Accompagnement', 'À chaque étape'], [Lock, 'Paiement sécurisé', '100% sécurisé']].map(([Icon, title, text], index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 + index * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="housing-hero-proof flex items-center gap-3 rounded-2xl p-4"
                  >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/12 text-white"><Icon size={21} /></span>
                      <span><b className="block text-sm">{title}</b><small className="text-xs font-semibold text-blue-50/80">{text}</small></span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 34, rotate: 1.2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: 0.2, duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="housing-hero-photo-stage">
                <span className="housing-hero-image-glow" />
                <img src={housingImages[0]} alt="Appartement étudiant lumineux" className="housing-hero-slide housing-hero-slide-student" />
                <img src={hotelImages[0]} alt="Chambre d’hôtel confortable" className="housing-hero-slide housing-hero-slide-hotel" />
                <div className="housing-hero-rating-card">
                  <Star className="fill-amber-400 text-amber-400" size={18} />
                  <b>4.8/5</b>
                  <small>+1200 avis positif</small>
                </div>
                <div className="housing-hero-social-card">
                  <span className="housing-avatar-stack"><i /><i /><i /></span>
                  <b>+1200 étudiants</b>
                  <small>logés avec succès</small>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="housing-choice-panel grid gap-7">
            {[
              ['student', Home, 'Logements étudiants', 'Résidences, studios, chambres et colocations pour une installation durable près du campus.', ['Bail étudiant', 'Dossier accompagné', 'Quartiers vérifiés'], 'blue'],
              ['hotel', Building2, 'Hôtels', 'Hôtels disponibles pour arrivée, rendez-vous visa, séjour court ou transition avant le logement final.', ['Réservation rapide', 'Avantages inclus', 'Détails transparents'], 'emerald'],
            ].map(([mode, Icon, title, text, chips, tone], index) => (
              <motion.button
                key={mode}
                type="button"
                onClick={() => setHousingMode(mode)}
                initial={{ opacity: 0, x: 38, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.22 + index * 0.1, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="housing-choice-card group flex min-h-[236px] flex-col items-start justify-between rounded-[26px] border border-slate-200 bg-white p-7 text-left shadow-sm"
              >
                <span className={`housing-choice-corner-arrow ${tone === 'blue' ? 'housing-choice-corner-arrow-blue' : 'housing-choice-corner-arrow-emerald'}`} aria-hidden="true"><ArrowRight size={22} /></span>
                <span className={`grid h-14 w-14 place-items-center rounded-2xl ${tone === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}><Icon size={27} /></span>
                <span>
                  <span className="block text-2xl font-black text-slate-950">{title}</span>
                  <span className="mt-3 block max-w-[360px] text-sm font-semibold leading-6 text-slate-500">{text}</span>
                  <span className="mt-5 flex flex-wrap gap-2">
                    {chips.map((chip) => <span key={chip} className={`housing-choice-chip rounded-full px-3 py-2 text-xs font-black ${tone === 'blue' ? 'housing-choice-chip-blue' : 'housing-choice-chip-emerald'}`}>{chip}</span>)}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>
        <div className="hidden">
        <div className="px-5 lg:px-8">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid min-h-[520px] lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative flex flex-col justify-between bg-[#061b47] p-8 text-white lg:p-10">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,.48),transparent_45%),linear-gradient(180deg,#061b47,#082f7a)]" />
                <div className="relative">
                  <span className="inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-wide ring-1 ring-white/15">Séjour & installation</span>
                  <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight lg:text-5xl">Choisissez votre solution d’hébergement</h1>
                  <p className="mt-4 max-w-lg text-base font-medium leading-7 text-blue-50/90">StudyWay vous accompagne pour réserver une adresse fiable, que ce soit pour une installation étudiante ou un séjour hôtelier à l’arrivée.</p>
                </div>
                <div className="relative mt-10 grid gap-4 text-sm font-bold sm:grid-cols-3">
                  {[[ShieldCheck, 'Vérifié'], [CreditCard, 'Paiement sécurisé'], [MessageCircle, 'Conseiller dédié']].map(([Icon, label]) => (
                    <div key={label} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><Icon size={20} />{label}</div>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 p-6 lg:p-8">
                <button type="button" onClick={() => setHousingMode('student')} className="group grid min-h-[220px] gap-5 rounded-lg border border-slate-200 bg-white p-6 text-left hover:border-blue-200 md:grid-cols-[180px_1fr_auto]">
                  <img src={housingImages[0]} alt="Logement étudiant" className="h-44 w-full rounded-lg object-cover md:h-full" />
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><Home size={25} /></div>
                    <h2 className="mt-5 text-2xl font-black text-slate-950">Logements étudiants</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Résidences, studios, chambres et colocations pour une installation durable près du campus.</p>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-slate-600">
                      {['Bail étudiant', 'Dossier accompagné', 'Quartiers vérifiés'].map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1">{item}</span>)}
                    </div>
                  </div>
                  <span className="self-center rounded-lg bg-blue-700 p-3 text-white"><ArrowRight size={20} /></span>
                </button>
                <button type="button" onClick={() => setHousingMode('hotel')} className="group grid min-h-[220px] gap-5 rounded-lg border border-slate-200 bg-white p-6 text-left hover:border-blue-200 md:grid-cols-[180px_1fr_auto]">
                  <img src={hotelImages[0]} alt="Hôtel" className="h-44 w-full rounded-lg object-cover md:h-full" />
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Building2 size={25} /></div>
                    <h2 className="mt-5 text-2xl font-black text-slate-950">Hôtels</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Hôtels disponibles pour arrivée, rendez-vous visa, séjour court ou transition avant le logement final.</p>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-slate-600">
                      {['Réservation rapide', 'Avantages inclus', 'Détails transparents'].map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1">{item}</span>)}
                    </div>
                  </div>
                  <span className="self-center rounded-lg bg-emerald-600 p-3 text-white"><ArrowRight size={20} /></span>
                </button>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className="housing-page -mx-5 space-y-8 lg:-mx-8">
      <div className="px-5 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex min-w-0 items-start gap-4">
            <button type="button" onClick={() => setHousingMode(null)} className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50" aria-label="Retour aux catégories logement">
              <ArrowLeft size={22} />
            </button>
            <div className="min-w-0">
              <button type="button" onClick={() => setHousingMode(null)} className="mb-4 text-sm font-black text-blue-800">Changer de catégorie</button>
              <h1
                className="typewriter-title text-4xl font-black tracking-tight text-slate-950"
                style={{
                  '--typewriter-width': housingMode === 'hotel' ? '17ch' : '32ch',
                  '--typewriter-steps': housingMode === 'hotel' ? 17 : 32,
                }}
              >
                {housingMode === 'hotel' ? 'Réserver un hôtel' : 'Trouvez votre logement étudiant'}
              </h1>
              <p className="mt-3 text-base font-medium text-slate-500">{housingMode === 'hotel' ? 'Sélection d’hôtels disponibles, avantages inclus et confirmation accompagnée par StudyWay.' : "Des milliers de logements vérifiés pour étudiants dans toute l’Europe."}</p>
            </div>
          </div>
          <Link to="/contact/conseiller" className="flex h-12 items-center gap-3 rounded-lg bg-blue-400 px-6 font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-500">
            <MessageCircle size={20} />
            Parler à un conseiller
          </Link>
        </div>

        <div className="mt-8 grid items-start gap-8 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1.15fr_1.05fr_1fr_1fr_auto]">
              <HousingSearchItem icon={MapPin} label="Ville ou pays" value={housingMode === 'hotel' ? 'Paris, France' : 'Paris, France'} />
              <HousingSearchItem label={housingMode === 'hotel' ? 'Type d’hôtel' : 'Type de logement'} value={housingMode === 'hotel' ? 'Tous les hôtels' : 'Tous les types'} select />
              <HousingSearchItem label="Budget max." value={housingMode === 'hotel' ? '150 000 FCFA' : '605 000 FCFA'} select />
              <HousingSearchItem label={housingMode === 'hotel' ? 'Dates' : 'Disponibilité'} value={housingMode === 'hotel' ? '2 nuits' : 'Dès maintenant'} select />
              <button className="flex h-14 items-center justify-center gap-3 rounded-lg bg-[#082f7a] px-7 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                Rechercher <Search size={19} />
              </button>
            </motion.section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">Affiner les résultats</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
                <div>
                  <div className="font-bold text-slate-900">Prix</div>
                  <div className="mt-3 flex justify-between text-sm font-semibold text-slate-600"><span>0 FCFA</span><span>{housingMode === 'hotel' ? '175 000+ FCFA' : '656 000+ FCFA'}</span></div>
                  <input type="range" defaultValue="78" className="mt-3 w-full accent-blue-800" />
                </div>
                <HousingChecks title={housingMode === 'hotel' ? 'Catégorie' : 'Type de logement'} items={housingMode === 'hotel' ? ['Premium (12)', 'Confort (38)', 'Famille (19)', 'Affaires (21)'] : ['Studio (342)', 'Appartement (523)', 'Chambre (689)', 'Colocation (215)']} compact />
                <HousingChecks title="Équipements" items={housingMode === 'hotel' ? ['Petit-déjeuner', 'Parking', 'Salle de sport', 'Annulation flexible'] : ['Wi-Fi', 'Meublé']} compact />
              </div>
            </section>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">{housingMode === 'hotel' ? 'Hôtels proches' : 'Rechercher sur la carte'}</h3>
            <p className="mt-2 text-sm font-medium text-slate-500">{housingMode === 'hotel' ? 'Comparer les quartiers et accès' : 'Voir les logements autour de vous'}</p>
            <div className="relative mt-5 h-36 overflow-hidden rounded-lg bg-blue-50">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,.08)_1px,transparent_1px),linear-gradient(rgba(37,99,235,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="absolute left-[43%] top-[43%] rounded-full bg-white px-4 py-2 text-xl font-black text-blue-950 shadow-lg">Paris</div>
              {(housingMode === 'hotel'
                ? [['97k', 'left-[34%] top-[15%]'], ['136k', 'right-[14%] top-[23%]'], ['88k', 'left-[18%] top-[37%]'], ['112k', 'left-[49%] top-[55%]'], ['82k', 'right-[9%] bottom-[18%]'], ['102k', 'left-[7%] top-[48%]']]
                : [['566k', 'left-[34%] top-[15%]'], ['513k', 'right-[14%] top-[23%]'], ['604k', 'left-[18%] top-[37%]'], ['339k', 'left-[49%] top-[55%]'], ['604k', 'right-[9%] bottom-[18%]'], ['392k', 'left-[7%] top-[48%]']]
              ).map(([price, pos]) => <span key={`${price}-${pos}`} className={`absolute ${pos} rounded-lg bg-blue-700 px-3 py-1 text-xs font-black text-white shadow-md`}>{price}</span>)}
            </div>
            <button type="button" className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#082f7a] font-black text-white"><MapPin size={18} />Voir sur la carte</button>
          </section>
        </div>
      </div>

      <div className="px-5 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-950">{housingMode === 'hotel' ? 'Hôtels disponibles' : 'Logements disponibles'} <span className="font-bold text-slate-400">({housingMode === 'hotel' ? hotelResults.length : '1,248'})</span></h2>
            <label className="flex items-center gap-3 text-sm font-bold text-slate-600">
              Trier par :
              <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-900">Recommandés <ChevronDown size={16} /></span>
            </label>
          </div>
          {housingMode === 'hotel' ? (
            <div className="grid gap-7 xl:grid-cols-[1fr_390px]">
              <div className="grid gap-7 md:grid-cols-2">
                {hotelQuery.isLoading && <div className="col-span-full rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm font-black text-blue-900">Recherche des hôtels disponibles...</div>}
                {hotelQuery.isError && <HotelEmptyState title="Hôtels non disponibles" text={hotelQuery.error?.message || "Les hôtels réels ne peuvent pas être chargés pour le moment. Vérifiez l’accès fournisseur côté serveur puis relancez la recherche."} />}
                {!hotelQuery.isLoading && !hotelQuery.isError && hotelResults.length === 0 && <HotelEmptyState title="Aucun hôtel trouvé" text="Aucun hôtel n’a été retourné pour cette ville et ces dates. Essayez une autre période ou un rayon plus large." />}
                {hotelResults.map((hotel, index) => <HotelCard key={hotel.id ?? hotel.name} hotel={hotel} image={hotel.image ?? hotelImages[index % hotelImages.length]} index={index} active={selectedHotel === index} onSelect={() => setSelectedHotel(index)} />)}
              </div>
              {activeHotel && <HotelDetails hotel={activeHotel} image={activeHotel.image ?? hotelImages[selectedHotel % hotelImages.length]} />}
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {homes.map((home, index) => <HousingCard key={home[0]} home={home} image={housingImages[index]} index={index} />)}
            </div>
          )}
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
            <span className="housing-why-pill inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-white ring-1 ring-white/15">{housingMode === 'hotel' ? 'Hôtels sélectionnés' : 'Logements étudiants vérifiés'}</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{housingMode === 'hotel' ? 'Un séjour réservé avec le sérieux d’une agence' : 'Pourquoi choisir nos logements ?'}</h2>
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

function HotelCard({ hotel, image, index, active, onSelect }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045 }}
      whileHover={{ y: -5 }}
      className={`housing-card overflow-hidden rounded-lg border bg-white shadow-sm ${active ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200'}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={image} alt={hotel.name} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-lg bg-white px-3 py-1 text-xs font-black text-blue-950 shadow-sm">{hotel.category}</span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-blue-700 px-3 py-1 text-xs font-black text-white shadow-sm"><Star size={13} fill="currentColor" />{hotel.rating}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black text-slate-950">{hotel.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500"><MapPin size={15} />{hotel.location}</p>
          </div>
          <b className="shrink-0 text-right text-xl font-black text-slate-950">{hotel.price}<span className="block text-xs font-bold text-slate-500">/ nuit</span></b>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-2 rounded-lg bg-slate-50 p-3"><Building2 size={15} />{hotel.room}</span>
          <span className="flex items-center gap-2 rounded-lg bg-slate-50 p-3"><Train size={15} />{hotel.distance}</span>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600"><CheckCircle2 size={16} />{hotel.availability}</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {hotel.benefits.slice(0, 3).map((benefit) => <span key={benefit} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800">{benefit}</span>)}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={onSelect} className="h-11 rounded-lg border border-blue-200 font-black text-blue-800">Voir détails</button>
          <button type="button" className="h-11 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/15">Réserver</button>
        </div>
      </div>
    </motion.article>
  )
}

function HotelEmptyState({ title, text }) {
  return (
    <div className="col-span-full rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-white text-blue-800 shadow-sm"><Building2 size={28} /></div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-slate-500">{text}</p>
      <button type="button" className="mt-6 inline-flex h-11 items-center gap-3 rounded-lg bg-blue-700 px-6 font-black text-white"><Search size={17} />Relancer la recherche</button>
    </div>
  )
}

function HotelDetails({ hotel, image }) {
  return (
    <aside className="sticky top-6 h-fit overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={hotel.name} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-5 text-white">
          <div className="flex items-center gap-2 text-sm font-black"><Star size={16} fill="currentColor" />{hotel.rating} · {hotel.category}</div>
          <h3 className="mt-1 text-xl font-black">{hotel.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500"><MapPin size={15} />{hotel.location}</p>
            <p className="mt-2 text-sm font-bold text-emerald-600">{hotel.availability}</p>
          </div>
          <b className="text-right text-2xl font-black text-slate-950">{hotel.price}<span className="block text-xs font-bold text-slate-500">/ nuit</span></b>
        </div>
        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <h4 className="font-black text-blue-950">Avantages inclus</h4>
          <div className="mt-4 grid gap-3">
            {hotel.benefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 text-sm font-bold text-blue-950"><CheckCircle2 size={17} className="text-emerald-600" />{benefit}</div>)}
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-black text-slate-950">Détails du séjour</h4>
          <div className="mt-4 grid gap-3">
            {hotel.details.map((detail) => <div key={detail} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600"><Info size={17} className="mt-1 shrink-0 text-blue-700" />{detail}</div>)}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-4 text-sm">
          <div><span className="font-semibold text-slate-500">Chambre</span><b className="mt-1 block text-slate-950">{hotel.room}</b></div>
          <div><span className="font-semibold text-slate-500">Accès</span><b className="mt-1 block text-slate-950">{hotel.distance}</b></div>
        </div>
        <button type="button" className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/20">Réserver cet hôtel <ArrowRight size={18} /></button>
        <button type="button" className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 font-black text-blue-800"><MessageCircle size={18} />Demander conseil</button>
      </div>
    </aside>
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
            <h3 className="text-lg font-black text-slate-950">Besoin d’aide pour choisir ?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Nos conseillers sont là pour vous aider à trouver la formation idéale.</p>
            <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact/conseiller" className="career-help-cta mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#082f7a] font-black text-white"><MessageCircle size={18} />Parler à un conseiller</Link>
            </motion.div>
            <div className="mt-6 text-sm font-semibold text-slate-500">Où contactez-nous</div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                [MessageCircle, '/contact/conseiller'],
                [Phone, 'tel:+33688639294'],
                [Mail, '/contact/email'],
              ].map(([Icon, to], index) => <motion.div initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.16 + index * 0.08, type: 'spring', stiffness: 280, damping: 20 }} whileHover={{ y: -4 }} key={String(to)}><Link to={to} className="career-help-contact grid h-12 place-items-center rounded-lg bg-blue-50 text-blue-800"><Icon size={20} /></Link></motion.div>)}
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">Guide étudiant</h3>
            <div className="mt-4 space-y-4 text-sm font-semibold text-slate-600">
              {['Comment choisir son université ?', "Préparer son dossier d’admission", 'Demande de visa étudiant'].map((item, index) => <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.08 }} key={item}><Link to="/guides" className="flex items-center gap-3 hover:text-blue-800"><FileText size={17} />{item}</Link></motion.div>)}
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
            <h2 className="text-2xl font-black text-slate-950">Parcourir par domaine d’études</h2>
            <button type="button" onClick={() => document.querySelector('.university-results')?.scrollIntoView({ behavior: 'smooth' })} className="font-black text-blue-800">Voir tous les domaines →</button>
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
  const detailImage = getUniversityCardImage(formation)
  const mapImage = getUniversityMapImage(formation)
  const googleMapsUrl = getUniversityGoogleMapsUrl(formation)
  const hasApplied = getStoredApplications().some((application) => String(application.formationId) === String(formation.id ?? formation.formation_id))
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
      <section className="relative min-h-[360px] overflow-hidden rounded-lg border border-slate-200 bg-slate-900 shadow-sm">
        <img
          src={detailImage}
          alt=""
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = universityHero
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,.86)_0%,rgba(15,23,42,.64)_48%,rgba(15,23,42,.32)_100%)]" />
        <div className="relative grid min-h-[360px] items-end gap-6 p-7 lg:grid-cols-[1fr_330px] lg:items-center">
          <div>
            <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-black text-blue-700">{formation.specialization ?? formation.formation_type ?? 'Parcoursup'}</span>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight text-white drop-shadow-sm">{formation.formation_name}</h1>
            <p className="mt-4 max-w-5xl text-base font-semibold leading-7 text-white/88">{formation.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={hasApplied ? '/documents' : `/universites/${formation.id ?? formation.formation_id}/postuler`} className={`support-start-button flex h-12 items-center gap-3 rounded-lg px-7 font-black text-white shadow-lg ${hasApplied ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-blue-600 shadow-blue-600/20'}`}>{hasApplied ? 'Déjà postulé' : 'Postuler'} <ArrowRight className="support-start-arrow" size={18} /></Link>
              <Link to="/messages" className="flex h-12 items-center gap-3 rounded-lg border border-white/50 bg-white/95 px-7 font-black text-blue-800">Parler à un conseiller</Link>
            </div>
          </div>
          <div className="rounded-lg bg-white/95 p-5 shadow-xl shadow-slate-950/20 backdrop-blur">
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
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="relative mt-6 block h-64 overflow-hidden rounded-lg bg-slate-100">
              <img
                src={mapImage}
                alt=""
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = detailImage
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/10" />
              <div className="absolute right-4 top-4 rounded-lg bg-white/95 px-4 py-2 text-xs font-black text-blue-700 shadow">Ouvrir dans Google Maps</div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-950 shadow">{formation.city ?? 'Localisation'}{formation.latitude ? ` · ${formation.latitude}, ${formation.longitude}` : ''}</div>
            </a>
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
            <Link to={hasApplied ? '/documents' : `/universites/${formation.id ?? formation.formation_id}/postuler`} className={`support-start-button mt-6 flex h-12 items-center justify-center gap-3 rounded-lg font-black text-white ${hasApplied ? 'bg-emerald-600' : 'bg-blue-600'}`}>{hasApplied ? 'Voir ma demande' : 'Postuler'} <ArrowRight className="support-start-arrow" size={18} /></Link>
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
            <p className="mt-3 text-sm font-semibold leading-6 text-blue-900">StudyWay prépare votre dossier, dépose la candidature pour vous sur le site officiel concerné, suit la réponse de l’établissement et ajoute l’attestation d’admission dans votre espace dès qu’elle est disponible.</p>
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

function UniversityApplication() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['parcoursup-formation', id],
    queryFn: () => fetchJson(`/api/v1/parcoursup/formations/${id}`),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })
  const formation = data?.data ?? parcoursupFallbackFormations.find((item) => String(item.id) === String(id)) ?? parcoursupFallbackFormations[0]
  const formationId = formation.id ?? formation.formation_id
  const [submitted, setSubmitted] = useState(() => getStoredApplications().some((application) => String(application.formationId) === String(formationId)))
  const storedProfile = getStoredAcademicProfile()
  const [cvService, setCvService] = useState(false)
  const [files, setFiles] = useState(() => storedProfile.documents ?? {})
  const [profile, setProfile] = useState(() => storedProfile.profile ?? {})
  const storedApplications = getStoredApplications()
  const hasReachedApplicationLimit = storedApplications.length >= 5 && !storedApplications.some((application) => String(application.formationId) === String(formationId))
  const hasSavedAcademicProfile = Boolean(storedProfile.savedAt)
  const documentGroups = getParcoursupDocumentGroups(formation, profile, hasSavedAcademicProfile)
  const completedDocuments = new Set(Object.entries(files).filter(([documentId, items]) => documentGroups.some((document) => document.id === documentId) && items.length).map(([documentId]) => documentId))
  const detailImage = getUniversityCardImage(formation)
  const mapImage = getUniversityMapImage(formation)
  const googleMapsUrl = getUniversityGoogleMapsUrl(formation)
  const location = [formation.city, formation.region, formation.country ?? 'France'].filter(Boolean).join(', ')

  if (cvService) {
    completedDocuments.add('cv')
  }

  const requiredDocuments = documentGroups.filter((document) => document.required)
  const uploadedCount = requiredDocuments.filter((document) => completedDocuments.has(document.id)).length
  const requiredCount = requiredDocuments.length
  const hasAcademicProfile = Boolean(profile.studyLevel && profile.bacStatus && profile.lastDiploma && profile.school)
  const canSubmit = hasAcademicProfile && uploadedCount >= requiredCount && !hasReachedApplicationLimit

  function updateProfile(field, value) {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  function handleFilesChange(documentId, selectedFiles) {
    const nextFiles = Array.from(selectedFiles ?? []).map((file) => ({
      id: `${documentId}-${file.name}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }))

    if (!nextFiles.length) return
    setFiles((current) => ({ ...current, [documentId]: [...(current[documentId] ?? []), ...nextFiles] }))
  }

  function removeFile(documentId, fileId) {
    setFiles((current) => {
      const nextItems = (current[documentId] ?? []).filter((file) => file.id !== fileId)
      return { ...current, [documentId]: nextItems }
    })
  }

  function submitApplication() {
    const application = {
      id: `SW-POST-${Date.now()}`,
      formationId,
      formationName: formation.formation_name,
      universityName: formation.university_name ?? 'Établissement français',
      city: formation.city ?? 'France',
      region: formation.region ?? 'Région non communiquée',
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      cvService,
      profile,
      documents: Object.fromEntries(Object.entries(files).map(([documentId, items]) => [documentId, items.map((item) => item.name)])),
      attestationUrl: '',
    }

    saveAcademicProfile({ profile, documents: files })
    saveStoredApplication(application)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-7">
        <Link to={`/universites/${formationId}`} className="inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Retour à la formation</Link>
        <section className="rounded-lg border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-700">Déjà postulé</span>
              <h1 className="mt-5 text-3xl font-black text-emerald-950">Candidature envoyée, en attente de décision</h1>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-emerald-900">StudyWay récupère votre dossier, vérifie les pièces et effectue la candidature pour vous sur le site officiel. Vous suivrez la réponse dans Mes demandes.</p>
            </div>
            <Link to="/documents" className="flex h-12 items-center justify-center gap-3 rounded-lg bg-emerald-600 px-7 font-black text-white shadow-lg shadow-emerald-600/20">Voir mes demandes <ArrowRight size={18} /></Link>
          </div>
        </section>
        <ApplicationProcessPreview status="submitted" />
      </div>
    )
  }

  return (
    <div className="university-application-page space-y-7">
      <Link to={`/universites/${formationId}`} className="university-application-back inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Retour à la formation</Link>
      <motion.section initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} className="university-application-hero overflow-hidden rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_310px] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700"><GraduationCap size={16} />Postuler</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-slate-950">{formation.formation_name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold leading-6 text-slate-500"><span>{formation.university_name ?? 'Établissement français'}</span><span>·</span><MapPin size={15} />{location}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">Dossier guidé</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">CV optimisé</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">Suivi StudyWay</span>
            </div>
          </div>
          <div className="university-application-mini-cv hidden rounded-2xl bg-white p-5 shadow-xl shadow-blue-950/10 lg:block">
            <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600 font-black text-white">CV</span><div><b className="block text-slate-950">CV formation</b><span className="text-sm font-semibold text-slate-500">Adapté à votre vœu</span></div></div>
            <div className="mt-5 space-y-2"><span /><span /><span /></div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-7 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Profil académique</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{hasSavedAcademicProfile ? 'Votre dossier académique StudyWay est déjà enregistré. Vous pouvez le modifier si une information a changé.' : 'Renseignez votre situation actuelle pour que StudyWay adapte le dossier : bac récent, étudiant en L1/L2, reprise d’études ou diplôme déjà obtenu.'}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ApplicationField as="select" label="Niveau d’étude actuel" value={profile.studyLevel ?? ''} onChange={(value) => updateProfile('studyLevel', value)} options={['Terminale / Bac en cours', 'Bac obtenu récemment', 'Licence 1', 'Licence 2', 'Licence 3', 'BTS / DUT', 'Autre diplôme supérieur', 'Reprise d’études']} />
              <ApplicationField label="Dernier diplôme obtenu ou préparé" placeholder="Baccalauréat, Licence 1, BTS..." value={profile.lastDiploma ?? ''} onChange={(value) => updateProfile('lastDiploma', value)} />
              <ApplicationField label="Filière / série / spécialité" placeholder="Série D, sciences, économie, droit..." value={profile.field ?? ''} onChange={(value) => updateProfile('field', value)} />
              <ApplicationField label="Établissement actuel ou dernier établissement" placeholder="Nom de votre lycée ou université" value={profile.school ?? ''} onChange={(value) => updateProfile('school', value)} />
              <ApplicationField label="Pays d’obtention du diplôme" placeholder="Togo, Bénin, Cameroun..." value={profile.studyCountry ?? ''} onChange={(value) => updateProfile('studyCountry', value)} />
              <ApplicationField label="Année d’obtention ou année en cours" placeholder="2025, 2026..." value={profile.studyYear ?? ''} onChange={(value) => updateProfile('studyYear', value)} />
              <ApplicationField label="Moyenne générale indicative" placeholder="Ex : 13,5/20" value={profile.average ?? ''} onChange={(value) => updateProfile('average', value)} />
              <ApplicationField as="select" label="Situation du bac" value={profile.bacStatus ?? ''} onChange={(value) => updateProfile('bacStatus', value)} options={['Bac déjà obtenu', 'Bac en cours', 'Équivalence / diplôme étranger', 'Études supérieures déjà commencées']} />
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Dossier demandé</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{hasSavedAcademicProfile ? 'Votre dossier académique général est réutilisé. Pour ce nouveau vœu, ajoutez seulement les éléments spécifiques à la formation.' : 'La liste ci-dessous s’adapte automatiquement au profil académique renseigné : bac en cours, bac obtenu, études supérieures commencées ou reprise d’études.'}</p>
            {!profile.studyLevel ? (
              <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm font-bold leading-6 text-blue-900">Sélectionnez d’abord votre niveau d’étude actuel pour afficher les pièces à déposer.</div>
            ) : (
              <div className="mt-6 grid gap-4">
                {documentGroups.map((document) => (
                  <ApplicationDocumentUpload key={document.id} document={document} files={files[document.id] ?? []} onChange={(selectedFiles) => handleFilesChange(document.id, selectedFiles)} onRemove={(fileId) => removeFile(document.id, fileId)} />
                ))}
              </div>
            )}
          </motion.section>
        </div>

        <aside className="space-y-5">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="relative block h-40 bg-slate-100">
              <img src={mapImage} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = detailImage }} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="absolute right-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-[11px] font-black text-blue-700 shadow">Google Maps</div>
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 px-4 py-3 text-sm font-black text-slate-950 shadow"><MapPin size={16} className="mr-2 inline text-blue-700" />{location}</div>
            </a>
            <div className="p-5">
              <h2 className="font-black text-slate-950">Localisation</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{formation.university_name ?? 'Établissement français'}</p>
            </div>
          </section>

          <section className="university-cv-card overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-[1fr_118px]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-blue-700 shadow-sm"><Award size={14} />Option recommandée</span>
                <h2 className="mt-4 text-xl font-black text-blue-950">CV adapté à la formation</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">StudyWay transforme votre parcours en CV clair, ciblé et cohérent avec cette formation.</p>
              </div>
              <div className="university-cv-preview">
                <span className="cv-photo" />
                <span className="cv-line wide" />
                <span className="cv-line" />
                <span className="cv-section" />
                <span className="cv-line wide" />
                <span className="cv-line short" />
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm font-bold text-blue-950">
              {['Mise en page professionnelle', 'Compétences alignées à la formation', 'Texte relu par un conseiller'].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" />{item}</span>)}
            </div>
            <button type="button" onClick={() => setCvService((value) => !value)} className={`university-cv-button mt-5 flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${cvService ? 'border-blue-600 bg-white text-blue-900 shadow-lg shadow-blue-200/60' : 'border-blue-200 bg-white/80 text-slate-700'}`}>
              <span className="font-black">{cvService ? 'CV StudyWay activé' : 'Créer mon CV avec StudyWay'}</span>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-black text-white">5 €</span>
            </button>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">Progression</h2>
            {hasReachedApplicationLimit && <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-800">Vous avez déjà 5 candidatures en cours. Attendez une décision ou contactez StudyWay pour remplacer un vœu.</div>}
            <div className="mt-4 flex justify-between text-sm font-semibold text-slate-600"><span>Documents requis</span><b>{Math.min(uploadedCount, requiredCount)}/{requiredCount}</b></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, (uploadedCount / requiredCount) * 100)}%` }} /></div>
            <button type="button" disabled={!canSubmit} onClick={submitApplication} className={`support-start-button university-submit-button mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl font-black text-white ${canSubmit ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'cursor-not-allowed bg-slate-300'}`}>Postuler <ArrowRight className="support-start-arrow" size={18} /></button>
            {!canSubmit && !hasReachedApplicationLimit && <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{hasAcademicProfile ? 'Ajoutez toutes les pièces obligatoires pour envoyer la candidature.' : 'Complétez d’abord le profil académique pour déterminer le dossier à demander.'}</p>}
          </section>
        </aside>
      </div>
    </div>
  )
}

function ApplicationField({ label, value, onChange, placeholder, as, options = [] }) {
  if (as === 'select') {
    return (
      <label className="block text-sm font-black text-slate-700">
        {label}
        <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50">
          <option value="">Sélectionner</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
    )
  }

  return (
    <label className="block text-sm font-black text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50" placeholder={placeholder} />
    </label>
  )
}

function ApplicationDocumentUpload({ document, files, onChange, onRemove }) {
  const hasFiles = files.length > 0
  const canUploadMultiple = document.multiple

  return (
    <div className="rounded-lg border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
      <div className="flex items-center justify-between gap-4">
        <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${hasFiles ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{hasFiles ? <CheckCircle2 size={20} /> : <Upload size={20} />}</span>
          <span className="min-w-0">
            <span className="block font-black text-slate-950">{document.label}</span>
            <span className="mt-1 block text-sm font-semibold text-slate-500">{hasFiles ? `${files.length} fichier${files.length > 1 ? 's' : ''} ajouté${files.length > 1 ? 's' : ''}` : document.help}</span>
          </span>
          <input type="file" multiple={canUploadMultiple} className="hidden" onChange={(event) => onChange(event.target.files)} />
        </label>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${document.required ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{document.required ? 'Obligatoire' : 'Si demandé'}</span>
      </div>

      {hasFiles && (
        <div className="mt-4 grid gap-2">
          {files.map((file) => (
            <div key={file.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <span className="min-w-0 truncate">{file.name}</span>
              <span className="flex shrink-0 items-center gap-2">
                <a href={file.url} target="_blank" rel="noreferrer" className="rounded-lg bg-white px-3 py-2 text-xs font-black text-blue-700 shadow-sm">Visualiser</a>
                <button type="button" onClick={() => onRemove(file.id)} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-rose-600 shadow-sm">Supprimer</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getParcoursupDocumentGroups(formation, profile = {}, hasSavedAcademicProfile = false) {
  const specialization = (formation.specialization ?? formation.formation_type ?? '').toLowerCase()
  const studyLevel = (profile.studyLevel ?? '').toLowerCase()
  const bacStatus = (profile.bacStatus ?? '').toLowerCase()
  const isBacInProgress = studyLevel.includes('terminale') || bacStatus.includes('en cours')
  const isRecentBac = studyLevel.includes('bac obtenu') || bacStatus.includes('déjà obtenu') || bacStatus.includes('deja obtenu')
  const hasHigherStudies = ['licence', 'bts', 'dut', 'supérieur', 'superieur', 'reprise'].some((value) => studyLevel.includes(value)) || bacStatus.includes('supérieures') || bacStatus.includes('superieures')
  const documents = [
    ['motivation-letter', 'Lettre de motivation / projet de formation motivé', 'Texte ou PDF adapté à ce vœu', true, false],
    ['cv', 'CV étudiant', 'CV personnel ou CV préparé par StudyWay', true, false],
    ['complementary', 'Pièces complémentaires demandées par la formation', 'Portfolio, justificatif de niveau, certificat ou autre', false, true],
  ]

  if (hasSavedAcademicProfile) {
    if (specialization.includes('droit')) {
      documents.push(['law-self-assessment', 'Attestation questionnaire Droit', 'Attestation Parcoursup pour les licences de droit', true, false])
    }

    if (specialization.includes('art')) {
      documents.push(['portfolio', 'Portfolio artistique', 'Travaux, créations ou dossier personnel', true, true])
    }

    return documents.map(([id, label, help, required, multiple]) => ({ id, label, help, required, multiple }))
  }

  documents.unshift(['identity', 'Pièce d’identité ou passeport', 'PDF, JPG ou PNG lisible', true, false])
  documents.splice(3, 0, ['activities', 'Activités et centres d’intérêt', 'Engagements, expériences, stages, sport, culture', true, false])

  if (!profile.studyLevel) {
    return documents.map(([id, label, help, required, multiple]) => ({ id, label, help, required, multiple }))
  }

  if (isBacInProgress) {
    documents.splice(1, 0,
      ['transcripts-premiere', 'Bulletins de Première', 'Ajoutez les 3 bulletins ou semestres disponibles', true, true],
      ['transcripts-terminale', 'Bulletins de Terminale', 'Ajoutez les bulletins disponibles de Terminale', true, true],
      ['bac-grades', 'Notes du bac disponibles', 'Épreuves anticipées ou contrôle continu si disponible', false, true],
      ['future-sheet', 'Fiche avenir ou appréciations du lycée', 'À fournir si disponible dans votre pays ou établissement', false, false],
    )
  }

  if (isRecentBac && !hasHigherStudies) {
    documents.splice(1, 0,
      ['transcripts-premiere', 'Bulletins de Première', 'Ajoutez les 3 bulletins ou semestres disponibles', true, true],
      ['transcripts-terminale', 'Bulletins de Terminale', 'Ajoutez les 3 bulletins ou semestres disponibles', true, true],
      ['bac-grades', 'Relevé de notes du baccalauréat', 'Relevé final ou attestation officielle des notes', true, true],
      ['diploma', 'Diplôme ou attestation de réussite au bac', 'Bac, équivalent ou attestation provisoire', true, true],
      ['future-sheet', 'Fiche avenir ou appréciations du lycée', 'À fournir si disponible dans votre pays ou établissement', false, false],
    )
  }

  if (hasHigherStudies) {
    documents.splice(1, 0,
      ['higher-transcripts', 'Relevés de notes d’études supérieures', 'L1, L2, BTS, DUT ou autre parcours commencé', true, true],
      ['higher-certificate', 'Certificat de scolarité ou attestation universitaire', 'Document récent de votre établissement supérieur', true, true],
      ['bac-grades', 'Relevé de notes du baccalauréat', 'Relevé final ou équivalent', true, true],
      ['diploma', 'Diplôme ou attestation de réussite', 'Bac et dernier diplôme obtenu si disponible', true, true],
      ['transcripts-terminale', 'Bulletins de Terminale', 'Souvent utiles pour compléter le dossier', false, true],
    )
  }

  if (specialization.includes('droit')) {
    documents.push(['law-self-assessment', 'Attestation questionnaire Droit', 'Attestation Parcoursup pour les licences de droit', true, false])
  }

  if (specialization.includes('art')) {
    documents.push(['portfolio', 'Portfolio artistique', 'Travaux, créations ou dossier personnel', true, true])
  }

  return documents.map(([id, label, help, required, multiple]) => ({ id, label, help, required, multiple }))
}

function ApplicationProcessPreview({ status }) {
  const activeIndex = status === 'submitted' ? 0 : status === 'admission' ? 1 : status === 'admitted' ? 2 : 3

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">Processus de candidature</h2>
      <ProcessLine steps={applicationProcessSteps} activeIndex={activeIndex} icons={[ClipboardList, GraduationCap, Award, FileText]} />
    </section>
  )
}

function StudentRequests() {
  const [applications, setApplications] = useState(getStoredApplications)
  const displayedApplications = applications.length ? applications : demoApplications

  function updateStatus(applicationId, status) {
    const updated = displayedApplications.map((application) => application.id === applicationId ? { ...application, status } : application)
    setApplications(updated)
    window.localStorage.setItem(STUDYWAY_APPLICATIONS_KEY, JSON.stringify(updated))
  }

  return (
    <div className="space-y-7">
      <PageTitle title="Mes demandes" subtitle="Suivez vos candidatures StudyWay, les admissions reçues et les attestations disponibles." />
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Candidatures', displayedApplications.length, ClipboardList, 'blue'],
          ['En admission', displayedApplications.filter((application) => application.status === 'admission').length, GraduationCap, 'blue'],
          ['Admis', displayedApplications.filter((application) => application.status === 'admitted').length, Award, 'green'],
          ['Attestations', displayedApplications.filter((application) => application.status === 'attestation').length, FileText, 'purple'],
        ].map(([label, value, Icon, tone]) => <StatCard key={label} icon={Icon} label={label} value={String(value)} tone={tone} />)}
      </section>

      <section className="grid gap-6">
        {displayedApplications.map((application) => <StudentRequestCard key={application.id} application={application} onUpdateStatus={updateStatus} />)}
      </section>
    </div>
  )
}

function StudentRequestCard({ application, onUpdateStatus }) {
  const activeIndex = applicationStatusIndex(application.status)
  const submittedDate = application.submittedAt ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(application.submittedAt)) : 'Enregistrée'

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${applicationStatusBadge(application.status)}`}>{applicationStatusLabel(application.status)}</span>
              <h2 className="mt-4 text-xl font-black text-slate-950">{application.formationName}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">{application.universityName} · {application.city}</p>
            </div>
            <div className="text-right text-sm font-semibold text-slate-500">Déposée le<br /><b className="text-slate-800">{submittedDate}</b></div>
          </div>
          <ProcessLine steps={applicationProcessSteps} activeIndex={activeIndex} icons={[ClipboardList, GraduationCap, Award, FileText]} />
        </div>

        <aside className="rounded-lg bg-slate-50 p-5">
          <h3 className="font-black text-slate-950">Actions</h3>
          <div className="mt-4 space-y-3">
            {application.status === 'submitted' && <button type="button" onClick={() => onUpdateStatus(application.id, 'admission')} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Marquer en admission <ArrowRight size={17} /></button>}
            {application.status === 'admission' && <button type="button" onClick={() => onUpdateStatus(application.id, 'admitted')} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 font-black text-white">École acceptée <CheckCircle2 size={17} /></button>}
            {application.status === 'admitted' && <button type="button" onClick={() => onUpdateStatus(application.id, 'attestation')} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-black text-white">Choisir cette admission <Award size={17} /></button>}
            {application.status === 'attestation' ? (
              <a href={application.attestationUrl || '#'} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 font-black text-white"><Download size={17} />Télécharger l’attestation</a>
            ) : (
              <button type="button" disabled className="flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-200 font-black text-slate-500"><Download size={17} />Attestation en attente</button>
            )}
          </div>
          <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">Quand l’école accepte, StudyWay finalise le choix officiel selon votre décision, récupère l’attestation et la rend disponible ici.</p>
        </aside>
      </div>
    </article>
  )
}

const STUDYWAY_APPLICATIONS_KEY = 'studyway-university-applications'
const STUDYWAY_ACADEMIC_PROFILE_KEY = 'studyway-academic-profile'
const applicationProcessSteps = ['Postulé', 'Admission', 'Admis', "Attestation d’admission"]

const demoApplications = [
  {
    id: 'SW-POST-DEMO-1',
    formationId: 'demo-licence-info',
    formationName: 'Licence Informatique',
    universityName: 'Université Paris Cité',
    city: 'Paris',
    region: 'Île-de-France',
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    attestationUrl: '',
  },
]

function getStoredApplications() {
  try {
    return JSON.parse(window.localStorage.getItem(STUDYWAY_APPLICATIONS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveStoredApplication(application) {
  const current = getStoredApplications()
  const withoutDuplicate = current.filter((item) => String(item.formationId) !== String(application.formationId))
  window.localStorage.setItem(STUDYWAY_APPLICATIONS_KEY, JSON.stringify([application, ...withoutDuplicate].slice(0, 5)))
}

function getStoredAcademicProfile() {
  try {
    return JSON.parse(window.localStorage.getItem(STUDYWAY_ACADEMIC_PROFILE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveAcademicProfile(payload) {
  window.localStorage.setItem(STUDYWAY_ACADEMIC_PROFILE_KEY, JSON.stringify({ ...payload, savedAt: new Date().toISOString() }))
}

function applicationStatusIndex(status) {
  return status === 'submitted' ? 0 : status === 'admission' ? 1 : status === 'admitted' ? 2 : 3
}

function applicationStatusLabel(status) {
  return status === 'submitted' ? 'Postulé - en attente de décision' : status === 'admission' ? 'Admission reçue' : status === 'admitted' ? 'Admis - choix à confirmer' : "Attestation d’admission disponible"
}

function applicationStatusBadge(status) {
  return status === 'submitted' ? 'bg-blue-50 text-blue-700' : status === 'admission' ? 'bg-amber-50 text-amber-700' : status === 'admitted' ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'
}

function useDebouncedValue(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

function apiUrl(path) {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

  return `${apiBaseUrl}${path}`
}

async function fetchJson(path) {
  const response = await fetch(apiUrl(path))

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.meta?.message || 'API unavailable')
  }

  return response.json()
}

async function postJson(path, payload) {
  const response = await fetch(apiUrl(path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.meta?.message || errorPayload?.message || 'API unavailable')
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

function getUniversityCardImage(formation) {
  if (formation.image_url) {
    return formation.image_url
  }

  const mapImage = getUniversityMapImage(formation)

  if (mapImage) {
    return mapImage
  }

  return getFallbackCampusImage(formation)
}

function getUniversityMapImage(formation) {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (googleMapsApiKey) {
    const location = getUniversityMapLocation(formation)

    if (location) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=17&size=900x500&scale=2&maptype=satellite&markers=color:blue%7C${location}&key=${googleMapsApiKey}`
    }
  }

  return null
}

function getUniversityMapLocation(formation) {
  if (formation.latitude && formation.longitude) {
    return encodeURIComponent(`${formation.latitude},${formation.longitude}`)
  }

  const address = [
    formation.university_name,
    formation.city,
    formation.region,
    formation.country ?? 'France',
  ].filter(Boolean).join(', ')

  return address ? encodeURIComponent(address) : null
}

function getUniversityGoogleMapsUrl(formation) {
  const query = getUniversityMapLocation(formation)

  return query ? `https://www.google.com/maps/search/?api=1&query=${query}` : 'https://www.google.com/maps'
}

function getFallbackCampusImage(formation) {
  const domain = (formation.specialization ?? formation.formation_type ?? '').toLowerCase()
  const city = (formation.city ?? '').toLowerCase()

  if (domain.includes('hôtellerie') || domain.includes('hotellerie') || domain.includes('tourisme')) {
    return 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80'
  }

  if (domain.includes('santé') || domain.includes('sante') || domain.includes('pass')) {
    return 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=80'
  }

  if (domain.includes('art')) {
    return 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80'
  }

  if (city.includes('paris')) {
    return parisPackBackground
  }

  return universityHero
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
      title: "Préparer son dossier d’admission",
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
      title: "Préparer son dossier d’admission",
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
  const location = useLocation()
  const navigate = useNavigate()
  const initialTab = new URLSearchParams(location.search).get('tab') === 'reservations' ? 'reservations' : 'overview'
  const [activeTab, setActiveTab] = useState(initialTab)
  const reservationsQuery = useQuery({
    queryKey: ['flight-reservations'],
    queryFn: () => fetchJson('/api/v1/flight-reservations'),
    enabled: activeTab === 'reservations',
    staleTime: 1000 * 30,
  })
  const reservations = reservationsQuery.data?.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <button type="button" onClick={() => navigate(-1)} className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50" aria-label="Retour à la page précédente">
            <ArrowLeft size={21} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Profil</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">Identité, services, réservations et documents de voyage.</p>
          </div>
        </div>
        <div className="profile-tab-buttons flex rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setActiveTab('overview')} className={`profile-tab-button h-11 rounded-lg px-5 text-sm font-black ${activeTab === 'overview' ? 'profile-tab-button-active' : 'text-slate-600'}`}><FileText size={17} />Résumé</button>
          <button type="button" onClick={() => setActiveTab('reservations')} className={`profile-tab-button h-11 rounded-lg px-5 text-sm font-black ${activeTab === 'reservations' ? 'profile-tab-button-active' : 'text-slate-600'}`}><Plane size={17} />Mes réservations</button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <Panel title="Mon enfant"><div className="flex flex-wrap items-center gap-8"><img src={avatars.kossi} alt="Koffi M. Lucas" className="h-32 w-32 rounded-full object-cover" /><div className="grid flex-1 gap-3 md:grid-cols-2"><h1 className="col-span-full text-2xl font-black">Koffi M. Lucas <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">Actif</span></h1><InfoLine label="ID Étudiant" value="EDU-582941" /><InfoLine label="Email" value="lucas.koffi@email.com" /><InfoLine label="Université" value="Université Paris-Saclay" /><InfoLine label="Statut actuel" value="Étudiant" /></div><button className="rounded-lg border border-blue-700 px-6 py-3 font-black text-blue-800">Voir le profil complet</button></div></Panel>
            <div className="grid gap-4 md:grid-cols-4"><StatCard icon={WalletCards} label="Paiements totaux" value="1 607 000 FCFA" /><StatCard icon={CheckCircle2} label="Paiements effectués" value="1 378 000 FCFA" tone="green" /><StatCard icon={CircleDollarSign} label="Paiements à venir" value="230 000 FCFA" tone="amber" /><StatCard icon={FileText} label="Documents" value="12" tone="purple" /></div>
            <Panel title="Suivi des services"><List items={['Logement - Résidence Les Estudines, Paris - Actif', 'Université - Licence Informatique L1 - Inscrit', 'Compte bancaire - Boursorama - Actif', 'Assurance - habitation - Actif', 'Forfait mobile eSIM - Orange 50Go - Actif']} /></Panel>
          </div>
          <div className="space-y-5">
            <Panel title="Dernières activités"><List items={['Paiement loyer -361 000 FCFA', 'Document ajouté - Attestation de scolarité', 'Paiement université -984 000 FCFA']} /></Panel>
            <Panel title="Actions rapides"><List items={['Effectuer un paiement', "Envoyer de l’argent", 'Télécharger un document', 'Contacter le support']} /></Panel>
            <div className="rounded-lg bg-blue-50 p-6"><h3 className="font-black">Besoin d’aide ?</h3><p className="mt-2 text-slate-600">Notre équipe est disponible 24/7.</p><button className="mt-5 rounded-lg bg-white px-6 py-3 font-black text-blue-800">Contacter le support</button></div>
          </div>
        </div>
      ) : (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Mes réservations</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">Retrouvez vos billets et documents de voyage StudyWay.</p>
            </div>
            <Link to="/transport" className="flex h-11 items-center gap-3 rounded-lg bg-blue-700 px-5 font-black text-white"><Plane size={18} />Réserver un billet</Link>
          </div>

          {reservationsQuery.isLoading ? (
            <div className="p-10 text-center text-sm font-bold text-slate-500">Chargement des réservations...</div>
          ) : reservations.length ? (
            <div className="divide-y divide-slate-100">
              {reservations.map((reservation) => (
                <article key={reservation.id} className="grid items-center gap-5 p-6 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800">{reservation.status_label}</span>
                      <span className="text-xs font-bold text-slate-400">{reservation.reference}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black text-slate-950">{reservation.provider || 'Compagnie'} {reservation.ticket_code || ''}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{reservation.origin || 'Départ'} → {reservation.destination || 'Arrivée'} · {reservation.cabin_class || 'Cabine à confirmer'}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    <div><b className="text-slate-950">Départ :</b> {reservation.departure || '--:--'}</div>
                    <div className="mt-1"><b className="text-slate-950">Arrivée :</b> {reservation.arrival || '--:--'}</div>
                    <div className="mt-1"><b className="text-slate-950">Bagage :</b> {reservation.baggage || '-'}</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    <div><b className="text-slate-950">Réservation :</b> {reservation.booking_reference || 'En cours'}</div>
                    <div className="mt-1"><b className="text-slate-950">E-ticket :</b> {reservation.ticket_number || 'En attente'}</div>
                    <div className="mt-1 text-xl font-black text-blue-800">{reservation.price_label}</div>
                  </div>
                  <a href={apiUrl(`/api/v1/flight-reservations/${reservation.id}/ticket`)} className="flex h-11 items-center justify-center gap-3 rounded-lg bg-slate-950 px-5 font-black text-white">
                    <Download size={18} />Télécharger PDF
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-blue-50 text-blue-800"><Plane size={28} /></div>
              <h3 className="mt-5 text-xl font-black text-slate-950">Aucune réservation pour le moment</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-slate-500">Après un paiement validé et une commande confirmée, le billet apparaîtra ici avec son PDF.</p>
              <Link to="/transport" className="mt-6 inline-flex h-11 items-center gap-3 rounded-lg bg-blue-700 px-6 font-black text-white">Chercher un billet <ArrowRight size={18} /></Link>
            </div>
          )}
        </section>
      )}
    </div>
  )
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
          <p className="mt-7 text-xl font-medium leading-9 text-slate-700">Nous vous accompagnons à chaque étape de votre projet d’études à l’étranger. De la préparation du dossier à votre installation, vous n’êtes jamais seul.</p>
          <div className="mt-9 flex flex-wrap gap-5">
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.42, duration: 0.28, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5, scale: 1.02 }}><Link to="/accompagnement/demarrer" className="support-start-button flex h-14 items-center gap-3 rounded-lg bg-blue-800 px-8 font-black text-white shadow-lg shadow-blue-800/20">Démarrer mon accompagnement <ArrowRight className="support-start-arrow" size={19} /></Link></motion.div>
            <motion.button type="button" initial={{ opacity: 0, x: 54, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.56, duration: 0.32, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3 }} className="flex h-14 items-center gap-3 rounded-lg border border-blue-800 px-8 font-black text-blue-800"><Video size={19} />Voir la vidéo</motion.button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="absolute right-[32%] top-[235px] z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Users className="text-emerald-600" /><div><div className="text-xl font-black">98%</div><div className="text-sm text-slate-500">Taux de satisfaction</div></div></div></motion.div>
        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="absolute right-10 top-24 z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Users className="text-blue-700" /><div><div className="text-xl font-black">+ 1500</div><div className="text-sm text-slate-500">Étudiants accompagnés</div></div></div></motion.div>
        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="absolute bottom-20 right-20 z-30 hidden rounded-lg bg-white p-5 shadow-xl shadow-blue-100 xl:block"><div className="flex items-center gap-4"><Globe2 className="text-blue-700" /><div><div className="text-xl font-black">+ 50</div><div className="text-sm text-slate-500">Pays partenaires</div></div></div></motion.div>
      </motion.section>

      <div className="grid gap-8 px-5 lg:px-8 xl:grid-cols-[1fr_330px]">
        <div className="space-y-7">
          <div><h2 className="text-3xl font-black text-slate-950">Nos étapes d’accompagnement</h2><p className="mt-2 text-lg font-medium text-slate-500">Un parcours clair et complet pour réussir votre départ.</p></div>
          <section className="support-steps-track relative grid gap-6 md:grid-cols-5">
            {steps.map(([Icon, title, text], index) => <motion.div initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -10 }} transition={{ delay: 0.12 + index * 0.055, duration: 0.36, ease: [0.22, 1, 0.36, 1] }} key={title} className="support-step-card relative rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">{index < steps.length - 1 && <span className="support-step-connector" />}<div className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-blue-800 font-black text-white">{index + 1}</div><div className="mx-auto mt-5 grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-800"><Icon size={28} /></div><h3 className="mt-5 font-black text-slate-950">{title}</h3><p className="mt-4 text-sm leading-6 text-slate-600">{text}</p></motion.div>)}
          </section>
          <section className="flex gap-5 rounded-lg border border-blue-100 bg-blue-50 p-6"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white text-blue-800"><ShieldCheck size={26} /></div><div><h3 className="font-black text-blue-950">Important</h3><p className="mt-2 leading-7 text-blue-950">Nous accompagnons nos étudiants dans toutes les démarches administratives. Cependant, la décision finale d’octroi du visa appartient exclusivement aux autorités consulaires.</p></div></section>
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-black">Besoin d’aide ?</h3><p className="mt-3 leading-7 text-slate-600">Nos conseillers sont disponibles pour répondre à toutes vos questions.</p><div className="mt-6 space-y-5"><a href="tel:+33688639294" className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Phone size={22} /></div><div><b>Appeler</b><div className="text-sm text-slate-500">+33 6 88 63 92 94</div></div></a><a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><MessageCircle size={22} /></div><div><b>WhatsApp</b><div className="text-sm text-slate-500">+33 6 88 63 92 94</div></div></a><div className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-800"><Mail size={22} /></div><div><b>Email</b><div className="text-sm text-slate-500">contact@studyway.com</div></div></div></div><Link to="/contact/conseiller" className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-800 font-black text-white"><CalendarDays size={18} />Prendre rendez-vous</Link></aside>
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
    ['Départ & installation', "Nous vous accompagnons jusqu’à votre arrivée."],
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
              <h2 className="font-black text-blue-950">Besoin d’aide ?</h2>
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
          <FormSelect label="Pièce d’identité" placeholder="Sélectionner le type" />
          <FormSelect label="Nationalité" placeholder="Sélectionner votre nationalité" />
          <FormInput label="Numéro de pièce d’identité" placeholder="Entrez le numéro" />
          <FormSelect label="Pays de résidence actuel" placeholder="Sélectionner votre pays" />
          <FormTextarea label="Adresse actuelle" placeholder="Entrez votre adresse complète" />
          <FormInput label="Téléphone" placeholder="+228    90 12 34 56" />
          <FormInput label="Email" placeholder="christelle.komi@email.com" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-950">Informations académiques</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <FormSelect label="Niveau d’études actuel" placeholder="Sélectionner votre niveau" />
          <FormInput label="Dernier diplôme obtenu" placeholder="Entrez votre dernier diplôme" />
          <FormInput label="Filière / Domaine d’études" placeholder="Entrez votre filière" />
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
        <FormTextarea label="Objectif du projet" placeholder="Décrivez votre projet d’études et vos attentes." />
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
          <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={17} />Plan d’action personnalisé</div>
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
      documents: ["Lettre d’admission", 'Preuve de ressources financières', 'Assurance voyage / santé', 'Justificatif de logement'],
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
      <motion.div
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="text-sm font-bold text-slate-500">Accueil <span className="mx-2">›</span> Visa & Immigration <span className="mx-2">›</span> Demande</div>
          <div className="mt-4 flex items-center gap-4"><img src={flag} alt="" className="h-10 w-14 rounded-lg object-cover" /><h1 className="text-3xl font-black tracking-tight text-slate-950">Démarrer ma demande - {visaTitle}</h1></div>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">Complétez votre dossier, choisissez le type d’accompagnement et préparez la réservation du rendez-vous Capago.</p>
        </div>
        <Link to={`/visa/${country}/${type}`} className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-black text-blue-800 shadow-sm">Retour fiche visa</Link>
      </motion.div>

      <motion.section initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }} className="grid gap-4 lg:grid-cols-4">
        {steps.map((label, index) => (
          <motion.button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            variants={{ hidden: { opacity: 0, y: 18, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-3 rounded-lg p-4 text-left transition ${step === index ? 'bg-blue-50 text-blue-800 shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${step === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span><span className="font-black">{label}</span>
          </motion.button>
        ))}
      </motion.section>

      <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
        <motion.section key={step} initial={{ opacity: 0, y: 26, scale: 0.985, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
        <motion.aside initial={{ opacity: 0, x: 28, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.18, duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="space-y-5">
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.34 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">Résumé demande</h2>
            <div className="mt-5 space-y-4 text-sm font-semibold text-slate-600">
              <div className="flex justify-between"><span>Pays</span><b>{countryName}</b></div>
              <div className="flex justify-between"><span>Visa</span><b>{visaTitle}</b></div>
              <div className="flex justify-between"><span>Assistance Capago</span><b>{serviceMode === 'premium' ? 'Premium optionnel' : 'Standard'}</b></div>
              <div className="flex justify-between"><span>Agent StudyWay</span><b>{agentSupport === 'yes' ? `+${formatCfa(agentFee)}` : 'Non choisi'}</b></div>
              <div className="flex justify-between"><span>Demandeurs</span><b>{applicants}</b></div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-blue-800"><span>Total</span><b>{formatCfa(studywayTotal)}</b></div>
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.34 }} className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="font-black text-blue-950">Communication claire</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-900">Les créneaux Capago vous seront envoyés après réservation du rendez-vous, car les disponibilités ne sont pas accessibles en temps réel.</p>
          </motion.section>
        </motion.aside>
      </div>
    </div>
  )
}

function Transport() {
  const location = useLocation()
  const paymentSearchParams = new URLSearchParams(location.search)
  const isPaymentReturn = paymentSearchParams.get('payment') === 'moneroo' || paymentSearchParams.has('paymentStatus')
  const [tripType] = useState('Aller simple')
  const [cabinClass] = useState('Economy')
  const [origin, setOrigin] = useState('Paris')
  const [destination, setDestination] = useState('Lome')
  const [departureDate, setDepartureDate] = useState('mai 25')
  const [useMiles, setUseMiles] = useState(false)
  const [bluebiz, setBluebiz] = useState(false)
  const [carNoticeOpen, setCarNoticeOpen] = useState(false)

  function swapCities() {
    setOrigin(destination)
    setDestination(origin)
  }

  function showCarNotice() {
    setCarNoticeOpen(true)
    window.setTimeout(() => setCarNoticeOpen(false), 2600)
  }

  return (
    <div className="airfrance-page -m-5 min-h-screen bg-white text-[#071333] lg:-m-8">
      {isPaymentReturn && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-lg border border-blue-100 bg-white p-7 shadow-2xl">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={30} /></div>
            <h2 className="mt-5 text-2xl font-black text-slate-950">Paiement reçu</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Veuillez télécharger votre billet dans votre profil, section Mes réservations. Le document est mis à jour dès que la commande est confirmée.</p>
            <Link to="/profil?tab=reservations" className="mt-6 flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/20">
              Voir mes réservations <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      )}

      <main>
        <section className="airfrance-hero">
          <motion.img initial={{ opacity: 0, scale: 1.08, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} src="/airplane-banner.png" alt="Avion en vol au-dessus des nuages" className="airfrance-hero-image" />

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="airfrance-booking-shell">
            <div className="airfrance-tabs">
              <motion.button initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.36 }} type="button" className="is-active"><Plane size={20} />Acheter un billet</motion.button>
              <motion.button initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26, duration: 0.36 }} type="button" onClick={showCarNotice}><Car size={20} />Voiture</motion.button>
            </div>

            <motion.div initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.18, duration: 0.54, ease: [0.22, 1, 0.36, 1] }} className="airfrance-search-card">
              <div className="airfrance-select-row">
                <button type="button">{tripType} <ChevronDown size={16} /></button>
                <button type="button">{cabinClass} <ChevronDown size={16} /></button>
              </div>

              <div className="airfrance-fields">
                <label>
                  <span>À partir de</span>
                  <input value={origin} onChange={(event) => setOrigin(event.target.value)} />
                  <b>PAR</b>
                </label>
                <button type="button" className="airfrance-swap" onClick={swapCities} aria-label="Inverser départ et arrivée"><ArrowLeftRight size={23} /></button>
                <label>
                  <span>À</span>
                  <input value={destination} onChange={(event) => setDestination(event.target.value)} />
                  <b>LFW</b>
                </label>
                <label>
                  <span>Date de départ</span>
                  <input value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} />
                  <CalendarDays size={23} />
                </label>
                <label>
                  <span />
                  <input value="1 adulte" readOnly />
                  <UserRound size={24} />
                </label>
              </div>

              <div className="airfrance-options">
                <AirFranceToggle checked={useMiles} onClick={() => setUseMiles((value) => !value)} label="Utiliser des Miles" />
                <AirFranceToggle checked={bluebiz} onClick={() => setBluebiz((value) => !value)} label="Je veux réserver avec bluebiz ou un accord d'entreprise" />
                <button type="button" className="airfrance-search-button">Rechercher les vols</button>
              </div>
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {carNoticeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="airfrance-car-notice"
              >
                <span><Car size={22} /></span>
                <div><b>Voiture bientôt disponible</b><small>La réservation de voiture arrive prochainement.</small></div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="airfrance-info">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="airfrance-help">
            <h2><Phone size={20} />BESOIN D'AIDE POUR VOTRE RÉSERVATION ?</h2>
            <p>Air France Service Line: <strong>+33 9 69 39 36 54</strong></p>
            <a href="#frais">Frais d'émission et de service plus élevés par téléphone, en savoir plus</a>
            <p>Prix d'un appel local vers : France</p>
            <p><strong>Langues parlées :</strong> Français - Anglais</p>
            <p><strong>Horaires d'ouverture :</strong> Aujourd'hui (08:00 - 22:00) <ChevronDown size={15} /></p>
            <a href="#contact">Voir les autres manières de nous contacter</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.45 }} className="airfrance-security">
            <h2><Lock size={21} />SÉCURITÉ ET CONFIDENTIALITÉ</h2>
            <p>Nous mettons tout en œuvre pour garantir la sécurité et la confidentialité de vos données personnelles.</p>
            <a href="#confidentialite">Politique de confidentialité d'Air France</a>
          </motion.div>
        </section>

        <footer className="airfrance-footer">
          {['Plan du site', 'Informations légales', 'Politique de confidentialité', 'Accessibilité : non conforme', 'Gestion des cookies'].map((item) => <a key={item} href={`#${item}`}>{item}</a>)}
        </footer>
      </main>

      <div className="airfrance-floating">
        <button type="button" aria-label="Chat"><MessageCircle size={30} /></button>
        <button type="button" aria-label="Assistant"><Smile size={23} /></button>
      </div>
    </div>
  )
}

function AirFranceToggle({ checked, onClick, label }) {
  return (
    <button type="button" onClick={onClick} className={`airfrance-toggle ${checked ? 'is-on' : ''}`}>
      <span />
      {label}
    </button>
  )
}

function TransportSelect({ label, value, onChange, options }) {
  return (
    <label className="block rounded-lg border border-slate-200 px-4 py-3">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full border-0 bg-transparent p-0 font-black text-slate-950 outline-none">
        {options.map(([optionValue, labelValue]) => <option key={optionValue} value={optionValue}>{labelValue}</option>)}
      </select>
    </label>
  )
}

function FilterChip({ active, children }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>{children}</span>
}

function TransportEmptyState({ title, text, onReset }) {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-slate-50 text-blue-800"><Search size={28} /></div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-slate-500">{text}</p>
      <button type="button" onClick={onReset} className="mt-6 h-11 rounded-lg bg-blue-700 px-6 font-black text-white">Réinitialiser la recherche</button>
    </div>
  )
}

function TransportReservationPanel({ ticket, onClose }) {
  const currency = 'XOF'
  const [firstName, setFirstName] = useState('Christelle')
  const [lastName, setLastName] = useState('Komi')
  const [email, setEmail] = useState('christelle@email.com')
  const [phone, setPhone] = useState('+22890123456')
  const [title, setTitle] = useState('ms')
  const [bornOn, setBornOn] = useState('1998-05-15')
  const [gender] = useState('f')
  const [nationality, setNationality] = useState('Togolaise')
  const [passportNumber, setPassportNumber] = useState('A12345678')
  const [passportExpiry, setPassportExpiry] = useState('2030-06-12')
  const [baggageOption, setBaggageOption] = useState('none')
  const [seatOption, setSeatOption] = useState('standard')
  const [selectedSeat, setSelectedSeat] = useState('')
  const [airportAssistance, setAirportAssistance] = useState(false)
  const [error, setError] = useState('')
  const [isPaying, setIsPaying] = useState(false)

  const offerDetailsQuery = useQuery({
    queryKey: ['flight-offer-details', ticket.id],
    queryFn: () => fetchJson(`/api/v1/flights/offers/${ticket.id}`),
    staleTime: 1000 * 60 * 4,
    retry: 1,
  })
  const seatMapsQuery = useQuery({
    queryKey: ['flight-seat-maps', ticket.id],
    queryFn: () => fetchJson(`/api/v1/flights/offers/${ticket.id}/seat-maps`),
    staleTime: 1000 * 60 * 4,
    retry: 1,
  })

  const liveTicket = offerDetailsQuery.data?.data || ticket
  const availableBagServices = (liveTicket.available_services ?? []).filter((service) => service.type === 'baggage')
  const selectedBaggageService = availableBagServices.find((service) => service.id === baggageOption)
  const seatMaps = seatMapsQuery.data?.data ?? []
  const seatElements = flattenSeatMapElements(seatMaps).filter((seat) => seat.type === 'seat')
  const selectableSeats = seatElements.filter((seat) => seat.available)
  const selectedSeatElement = seatElements.find((seat) => seat.designator === selectedSeat)
  const selectedSeatService = seatOption === 'preferred' ? selectedSeatElement?.available_services?.[0] : null
  const basePrice = Math.round(Number(liveTicket.price ?? ticket.price ?? 0))
  const baggagePrice = Math.round(Number(selectedBaggageService?.price ?? 0))
  const seatPrice = Math.round(Number(selectedSeatService?.price ?? 0))
  const airportAssistancePrice = airportAssistance ? 25000 : 0
  const optionTotal = baggagePrice + seatPrice + airportAssistancePrice
  const totalPrice = basePrice + optionTotal
  const routeDate = ticket.date || 'Date confirmée après paiement'
  const cabinOption = liveTicket.className || 'Économique'
  const selectedServices = [
    selectedBaggageService ? { id: selectedBaggageService.id, quantity: 1, type: 'baggage' } : null,
    selectedSeatService ? { id: selectedSeatService.id, quantity: 1, type: 'seat', seat: selectedSeat } : null,
  ].filter(Boolean)

  useEffect(() => {
    if (!selectableSeats.length) return
    if (!selectableSeats.some((seat) => seat.designator === selectedSeat)) {
      setSelectedSeat(selectableSeats[0].designator)
    }
  }, [selectableSeats, selectedSeat])

  function optionPriceLabel(price) {
    if (!price) return 'Inclus'
    return `+ ${formatTicketPrice({ price, currency })}`
  }

  async function startPayment() {
    setError('')

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !bornOn) {
      setError('Renseignez le prénom, le nom, l’email et la date de naissance du passager.')
      return
    }

    setIsPaying(true)

    try {
      const payment = await postJson('/api/v1/payments/moneroo/initialize', {
        amount: totalPrice,
        currency,
        description: `Billet ${liveTicket.provider} ${liveTicket.code}`,
        offer_id: liveTicket.id,
        provider: liveTicket.provider,
        code: liveTicket.code,
        origin: liveTicket.origin,
        destination: liveTicket.destination,
        departure: liveTicket.departure,
        arrival: liveTicket.arrival,
        duration: liveTicket.duration,
        baggage: selectedBaggageService?.name || liveTicket.baggage,
        cabin_class: cabinOption,
        ticket: {
          ...liveTicket,
          selected_options: {
            fare: cabinOption,
            baggage: selectedBaggageService || null,
            seat: selectedSeatService || null,
            selected_seat: selectedSeatElement?.designator || null,
            airport_assistance: airportAssistance ? {
              name: 'Accompagnement aéroport StudyWay',
              price: airportAssistancePrice,
              currency: 'XOF',
            } : null,
            selected_services: selectedServices,
          },
          total_price: totalPrice,
        },
        customer: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          born_on: bornOn,
          gender,
          title,
          nationality,
          passport_number: passportNumber,
          passport_expiry: passportExpiry,
        },
      })

      if (!payment.data?.checkout_url) {
        throw new Error('Moneroo n’a pas renvoyé de lien de paiement.')
      }

      window.location.href = payment.data.checkout_url
    } catch (paymentError) {
      setError(paymentError.message)
      setIsPaying(false)
    }
  }

  return (
    <div className="transport-page -mx-5 space-y-8 bg-white px-5 py-2 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-100 pb-6">
        <div className="flex items-start gap-4">
          <button type="button" onClick={onClose} className="mt-1 grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"><ArrowLeft size={22} /></button>
          <div><div className="flex items-center gap-2 text-xl font-black text-blue-800"><Plane size={22} />StudyWay</div><p className="mt-1 text-xs font-bold text-slate-400">Réservation de voyage</p></div>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-slate-600"><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-50"><Phone size={17} /></span><span><span className="block text-xs text-slate-400">Besoin d’aide ?</span>+33 1 84 80 80 80</span></div>
      </div>

      <div className="grid grid-cols-5 items-center gap-3 text-xs font-black text-slate-400">
        {['Recherche', 'Sélection', 'Détails', 'Paiement', 'Confirmation'].map((step, index) => <div key={step} className="flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-full ${index === 2 ? 'bg-blue-700 text-white' : index < 2 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>{index + 1}</span><span className={index === 2 ? 'text-slate-950' : ''}>{step}</span>{index < 4 && <span className="h-px flex-1 bg-slate-200" />}</div>)}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_390px]">
        <main className="space-y-8">
          <div><h1 className="text-3xl font-black text-slate-950">Détails de la réservation</h1><p className="mt-2 text-sm font-semibold text-slate-500">Personnalisez votre voyage</p></div>

          <section>
            <h2 className="text-xl font-black text-slate-950">1. Choisissez votre tarif</h2>
            <div className="mt-5 space-y-4">
              <FareChoice active onClick={() => {}} title={cabinOption} subtitle="Tarif confirmé pour cette offre" price={formatTicketPrice({ price: basePrice, currency })} features={[liveTicket.baggage || 'Bagage selon tarif', liveTicket.refundable ? 'Remboursement possible' : 'Conditions selon tarif', availableBagServices.length ? 'Bagages additionnels disponibles' : 'Bagages selon offre', selectableSeats.length ? 'Sièges préférés disponibles' : 'Attribution lors de l’enregistrement']} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">2. Bagages</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-slate-700"><BriefcaseIcon /></span><div><b>Bagage en soute</b><p className="text-xs font-semibold text-slate-500">Options proposées par la compagnie pour ce billet</p></div></div></div>
              {offerDetailsQuery.isLoading && <div className="px-5 py-4 text-sm font-bold text-slate-500">Chargement des bagages disponibles...</div>}
              {!offerDetailsQuery.isLoading && [['none', 'Aucun bagage supplémentaire', 'Inclus'], ...availableBagServices.map((service) => [service.id, `${service.name}${service.description ? ` · ${service.description}` : ''}`, service.priceLabel])].map(([value, label, price]) => (
                <label key={value} className={`flex cursor-pointer items-center justify-between border-b border-slate-100 px-5 py-4 last:border-b-0 ${baggageOption === value ? 'bg-blue-50 ring-1 ring-inset ring-blue-500' : 'bg-white'}`}>
                  <span className="flex items-center gap-3"><input type="radio" checked={baggageOption === value} onChange={() => setBaggageOption(value)} className="h-4 w-4 accent-blue-700" /><b className="text-sm text-slate-800">{label}</b></span><span className="text-sm font-black text-blue-800">{price}</span>
                </label>
              ))}
              {!offerDetailsQuery.isLoading && availableBagServices.length === 0 && <div className="px-5 py-4 text-sm font-semibold text-slate-500">Aucun bagage additionnel n’est proposé pour ce billet.</div>}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">3. Siège</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">{liveTicket.origin} → {liveTicket.destination}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <SeatPreference active={seatOption === 'standard'} onClick={() => setSeatOption('standard')} title="Siège standard" subtitle="Attribution lors de l’enregistrement" price="Inclus" />
              <SeatPreference active={seatOption === 'preferred'} onClick={() => setSeatOption('preferred')} title="Siège préféré" subtitle="Choisissez un siège disponible" price={selectedSeatService?.priceLabel || 'Selon siège'} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">4. Assistance départ</h2>
            <label className={`mt-5 flex cursor-pointer items-start justify-between gap-5 rounded-lg border p-5 shadow-sm transition ${airportAssistance ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-200'}`}>
              <span className="flex gap-4">
                <input type="checkbox" checked={airportAssistance} onChange={(event) => setAirportAssistance(event.target.checked)} className="mt-1 h-5 w-5 rounded border-slate-300 accent-blue-700" />
                <span>
                  <b className="block text-slate-950">Agent StudyWay à l’aéroport</b>
                  <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">Un agent vous accompagne à l’aéroport, vous aide avant le départ, vérifie les documents et vous guide jusqu’aux formalités.</span>
                </span>
              </span>
              <span className="shrink-0 text-sm font-black text-blue-800">+ 25 000 XOF</span>
            </label>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">5. Informations des passagers</h2>
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><b>Passager 1 (Adulte)</b><button className="text-sm font-black text-blue-700">Modifier</button></div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <label className="text-xs font-bold text-slate-500">Civilité<select value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none"><option value="mr">M.</option><option value="ms">Mme</option></select></label>
                <label className="text-xs font-bold text-slate-500">Prénom<input value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Nom<input value={lastName} onChange={(event) => setLastName(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Date de naissance<input type="date" value={bornOn} onChange={(event) => setBornOn(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Nationalité<input value={nationality} onChange={(event) => setNationality(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Numéro de passeport<input value={passportNumber} onChange={(event) => setPassportNumber(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Date d’expiration<input type="date" value={passportExpiry} onChange={(event) => setPassportExpiry(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
                <label className="text-xs font-bold text-slate-500">Téléphone<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-semibold text-slate-800 outline-none" /></label>
              </div>
            </div>
          </section>

          {seatOption === 'preferred' && (
            <section>
              <h2 className="text-xl font-black text-slate-950">6. Choisissez votre siège <span className="text-sm font-bold text-slate-400">(Optionnel)</span></h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">{liveTicket.origin} → {liveTicket.destination}</p>
              <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-wrap gap-5 text-xs font-bold text-slate-500"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded border border-slate-300 bg-white" />Disponible</span><span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-blue-600" />Sélectionné</span><span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-slate-200" />Indisponible</span></div>
                {seatMapsQuery.isLoading ? <div className="rounded-lg bg-slate-50 p-8 text-center text-sm font-bold text-slate-500">Chargement du plan de cabine...</div> : selectableSeats.length ? <RealSeatMap seatMaps={seatMaps} selectedSeat={selectedSeat} onSelect={(seat) => { setSelectedSeat(seat); setSeatOption('preferred') }} /> : <div className="rounded-lg bg-slate-50 p-8 text-center"><h3 className="font-black text-slate-950">Sélection de siège indisponible</h3><p className="mt-2 text-sm font-semibold text-slate-500">La compagnie n’a pas transmis de plan de siège pour ce vol. Le siège pourra être attribué plus tard ou à l’enregistrement.</p></div>}
                <div className="mt-6 flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4"><div><div className="text-xs font-bold text-slate-500">Siège sélectionné</div><div className="mt-1 text-2xl font-black text-blue-800">{selectedSeatElement?.designator || 'Non choisi'}</div><div className="text-xs font-semibold text-slate-500">{selectedSeatService?.priceLabel || 'Selon disponibilité'}</div></div><button type="button" disabled={!selectableSeats.length} onClick={() => setSeatOption('preferred')} className="rounded-lg border border-blue-200 bg-white px-5 py-3 font-black text-blue-700 disabled:text-slate-300">Changer de siège</button></div>
              </div>
              <div className="mt-5 rounded-lg bg-blue-50 p-5 text-sm font-semibold text-slate-600"><b className="text-slate-950">Annulation gratuite sous 24h</b><br />Réservez maintenant et annulez gratuitement dans les 24 heures.</div>
            </section>
          )}
        </main>

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-5"><h2 className="flex items-center gap-3 text-lg font-black text-slate-950"><Plane className="text-blue-700" size={20} />Récapitulatif de votre voyage</h2></div>
            <div className="p-5">
              <div className="flex items-center justify-between text-sm font-black text-slate-900"><span>Vol aller</span><button type="button" onClick={onClose} className="text-blue-700">Modifier</button></div>
              <div className="mt-5 flex items-center gap-3"><img src={liveTicket.logo} alt={liveTicket.provider} className="h-10 w-10 rounded-full border border-slate-100 object-contain p-1" /><div><b>{liveTicket.provider}</b><div className="text-xs font-semibold text-slate-500">{liveTicket.className || 'Tarif sélectionné'}</div></div></div>
              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div><div className="text-2xl font-black">{liveTicket.departure}</div><div className="text-sm font-bold">{liveTicket.origin}</div></div><div className="text-center text-xs font-black text-slate-500"><span className="block h-px w-24 bg-slate-200" />{liveTicket.duration}<span className="block text-emerald-600">{liveTicket.stopLabel}</span></div><div className="text-right"><div className="text-2xl font-black">{liveTicket.arrival}</div><div className="text-sm font-bold">{liveTicket.destination}</div></div></div>
              <div className="mt-4 text-xs font-semibold text-slate-500">{routeDate}</div>
            </div>
            <div className="border-t border-slate-100 p-5">
              <h3 className="font-black text-slate-950">Détails du tarif</h3>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                <div className="flex justify-between"><span>1 x Adulte</span><b>{formatTicketPrice({ price: basePrice, currency })}</b></div>
                <div className="flex justify-between"><span>Bagage en soute</span><b>{optionPriceLabel(baggagePrice)}</b></div>
                <div className="flex justify-between"><span>Siège</span><b>{seatOption === 'standard' ? 'Attribution à l’enregistrement' : optionPriceLabel(seatPrice)}</b></div>
                <div className="flex justify-between"><span>Assistance aéroport</span><b>{airportAssistance ? '+ 25 000 XOF' : 'Non choisi'}</b></div>
                <div className="flex justify-between border-t border-slate-100 pt-4 text-lg"><span>Total</span><b className="text-2xl text-blue-800">{formatTicketPrice({ price: totalPrice, currency })}</b></div>
                <p className="text-xs text-slate-400">Prix pour 1 passager</p>
              </div>
            </div>
            {error && <div className="mx-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</div>}
            <div className="border-t border-slate-100 p-5">
              <div className="space-y-4">{[[Lock, 'Paiement sécurisé', 'Vos données sont protégées'], [ShieldCheck, 'Tarif vérifié', 'Votre tarif est confirmé avant paiement'], [MessageCircle, 'Support disponible 24/7', 'Notre équipe est là pour vous aider']].map(([Icon, titleText, sub]) => <div key={titleText} className="flex gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-700"><Icon size={17} /></span><div><b className="text-sm">{titleText}</b><p className="text-xs font-semibold text-slate-500">{sub}</p></div></div>)}</div>
              <button type="button" onClick={startPayment} disabled={isPaying} className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/20 disabled:bg-slate-300 disabled:shadow-none">{isPaying ? 'Redirection...' : 'Continuer vers le paiement'} <ArrowRight size={18} /></button>
              <p className="mt-3 text-center text-xs font-semibold text-slate-400">Vous pourrez vérifier votre commande à l’étape suivante</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function flattenSeatMapElements(seatMaps) {
  return seatMaps.flatMap((seatMap) => (seatMap.cabins ?? []).flatMap((cabin) => (cabin.rows ?? []).flatMap((row) => (row.sections ?? []).flatMap((section) => section.elements ?? []))))
}

function RealSeatMap({ seatMaps, selectedSeat, onSelect }) {
  const cabins = seatMaps.flatMap((seatMap) => seatMap.cabins ?? [])

  return (
    <div className="mx-auto max-w-2xl rounded-[50%_50%_22%_22%/10%_10%_7%_7%] bg-slate-50 px-6 py-8">
      {cabins.map((cabin, cabinIndex) => (
        <div key={cabin.id || cabinIndex} className="space-y-2">
          {cabin.rows.map((row, rowIndex) => (
            <div key={`${cabin.id || cabinIndex}-${rowIndex}`} className="flex justify-center gap-4">
              {row.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex gap-2">
                  {section.elements.map((element, elementIndex) => {
                    if (element.type !== 'seat') {
                      return <span key={`${elementIndex}-${element.type}`} className="h-9 w-9" />
                    }

                    const isSelected = selectedSeat === element.designator

                    return (
                      <button
                        key={element.designator || elementIndex}
                        type="button"
                        disabled={!element.available}
                        title={element.available_services?.[0]?.priceLabel || element.designator}
                        onClick={() => onSelect(element.designator)}
                        className={`grid h-9 w-9 place-items-center rounded-lg border text-[11px] font-black ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : element.available ? 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50' : 'border-slate-200 bg-slate-200 text-slate-400'}`}
                      >
                        {element.available ? element.designator : '×'}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function FareChoice({ active, onClick, title, subtitle, price, features }) {
  return (
    <button type="button" onClick={onClick} className={`w-full rounded-lg border p-5 text-left transition ${active ? 'border-blue-500 bg-blue-50/45 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200'}`}>
      <div className="flex items-start justify-between gap-5">
        <div className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700"><Plane size={19} /></span><div><h3 className="text-lg font-black text-slate-950">{title}</h3><p className="mt-1 text-xs font-semibold text-slate-500">{subtitle}</p></div></div>
        <div className="text-right"><div className="text-xl font-black text-slate-950">{price}</div><div className="text-xs font-semibold text-slate-500">par passager</div><span className={`mt-3 ml-auto grid h-5 w-5 place-items-center rounded-full border ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>{active && <CheckCircle2 size={14} />}</span></div>
      </div>
      <div className="mt-5 grid gap-3 text-xs font-semibold text-slate-600 md:grid-cols-5">
        {features.map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 size={14} className={item.includes('Non') || item.includes('payantes') ? 'text-slate-300' : 'text-emerald-500'} />{item}</div>)}
      </div>
    </button>
  )
}

function SeatPreference({ active, onClick, title, subtitle, price }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-lg border p-5 text-left transition ${active ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-200'}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><Plane size={17} /></span><div><b className="block text-sm text-slate-950">{title}</b><span className="mt-1 block text-xs font-semibold text-slate-500">{subtitle}</span></div></div>
        <span className="text-sm font-black text-blue-800">{price}</span>
      </div>
    </button>
  )
}

function BriefcaseIcon() {
  return <span className="text-base font-black">▣</span>
}

function DriverTransferBookingPanel({ ticket, onClose }) {
  const AIRPORTS = [
    { code: 'CDG', label: 'Paris Charles-de-Gaulle (CDG)' },
    { code: 'ORY', label: 'Paris Orly (ORY)' },
    { code: 'BVA', label: 'Paris Beauvais (BVA)' },
    { code: 'LYS', label: 'Lyon Saint-Exupéry (LYS)' },
    { code: 'MRS', label: 'Marseille Provence (MRS)' },
    { code: 'NCE', label: 'Nice Côte d\'Azur (NCE)' },
    { code: 'TLS', label: 'Toulouse Blagnac (TLS)' },
    { code: 'NTE', label: 'Nantes Atlantique (NTE)' },
    { code: 'BOD', label: 'Bordeaux Mérignac (BOD)' },
    { code: 'SXB', label: 'Strasbourg (SXB)' },
  ]
  const BAGGAGE_OPTIONS = [
    { value: '0', label: 'Aucun bagage' },
    { value: '1', label: '1 bagage' },
    { value: '2', label: '2 bagages' },
    { value: '3', label: '3 bagages' },
    { value: '4+', label: '4 bagages ou plus' },
  ]

  const [step, setStep] = useState(1)
  const [airport, setAirport] = useState('CDG')
  const [arrivalDate, setArrivalDate] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [flightNumber, setFlightNumber] = useState('')
  const [destination, setDestination] = useState('')
  const [baggage, setBaggage] = useState('2')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [stepError, setStepError] = useState('')

  const selectedAirport = AIRPORTS.find((a) => a.code === airport)

  function validateStep1() {
    if (!airport) return 'Sélectionnez un aéroport.'
    if (!arrivalDate) return 'Indiquez la date d\'arrivée.'
    if (!arrivalTime) return 'Indiquez l\'heure d\'atterrissage.'
    if (!destination.trim()) return 'Indiquez l\'adresse de destination.'
    return ''
  }

  function validateStep2() {
    if (!firstName.trim() || !lastName.trim()) return 'Renseignez votre nom complet.'
    if (!email.trim() || !email.includes('@')) return 'Email invalide.'
    if (!phone.trim()) return 'Numéro de téléphone requis.'
    return ''
  }

  function goNext() {
    const err = step === 1 ? validateStep1() : validateStep2()
    if (err) { setStepError(err); return }
    setStepError('')
    setStep((s) => s + 1)
  }

  function buildWhatsAppMessage() {
    const fmtDate = arrivalDate ? new Date(arrivalDate).toLocaleDateString('fr-FR') : ''
    return encodeURIComponent(
      `Bonjour StudyWay ! Je souhaite réserver un transfert aéroport.\n\n` +
      `🛬 Aéroport : ${selectedAirport?.label || airport}\n` +
      `📅 Date d'arrivée : ${fmtDate}\n` +
      `⏰ Heure d'atterrissage : ${arrivalTime}\n` +
      (flightNumber ? `✈️ Numéro de vol : ${flightNumber}\n` : '') +
      `📍 Destination : ${destination}\n` +
      `🧳 Bagages : ${baggage}\n` +
      `🚗 Véhicule : ${ticket.className} — ${ticket.provider}\n\n` +
      `👤 Passager : ${firstName} ${lastName}\n` +
      `📧 Email : ${email}\n` +
      `📞 Tél : ${phone}\n` +
      (notes ? `💬 Notes : ${notes}` : '')
    )
  }

  function confirm() {
    setSubmitted(true)
  }

  const stepLabels = ['Trajet', 'Passager', 'Confirmation']

  return (
    <div className="-mx-5 min-h-screen bg-slate-50 px-5 pb-20 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6 pt-6">

        <div className="flex items-center gap-4">
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-blue-700"><ChevronLeft size={20} /></button>
          <div>
            <h1 className="text-xl font-black text-slate-950">Réserver un transfert aéroport</h1>
            <p className="text-sm font-semibold text-slate-500">{ticket.provider} · {ticket.className} · Bagages acceptés</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${i + 1 < step ? 'bg-emerald-500 text-white' : i + 1 === step ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {i + 1 < step ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-black ${i + 1 === step ? 'text-slate-950' : 'text-slate-400'}`}>{label}</span>
              {i < stepLabels.length - 1 && <span className="ml-auto h-px flex-1 bg-slate-200" />}
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-black text-slate-950">Détails du trajet</h2>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Aéroport d'arrivée</label>
                  <select value={airport} onChange={(e) => setAirport(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                    {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.label}</option>)}
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-black text-slate-700">Date d'arrivée</label>
                    <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-black text-slate-700">Heure d'atterrissage</label>
                    <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Numéro de vol <span className="font-semibold text-slate-400">(facultatif)</span></label>
                  <input type="text" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder="Ex : AF 563" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Adresse de destination</label>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Ex : 12 rue de la Paix, Paris 75001" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Nombre de bagages</label>
                  <div className="flex flex-wrap gap-3">
                    {BAGGAGE_OPTIONS.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setBaggage(opt.value)} className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-black transition ${baggage === opt.value ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200'}`}>
                        <BriefcaseIcon size={15} /> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-700" />
                    <div className="text-sm font-semibold text-blue-900">Le chauffeur vous attend à la sortie des bagages avec une pancarte à votre nom. Tous les bagages sont acceptés dans ce véhicule.</div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-black text-slate-950">Informations du passager</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-black text-slate-700">Prénom</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Christelle" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-black text-slate-700">Nom</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Komi" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Téléphone (avec indicatif)</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 00 00 00 00" className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-black text-slate-700">Notes / instructions <span className="font-semibold text-slate-400">(facultatif)</span></label>
                  <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex : j'arriverai avec un grand sac à dos, appelez-moi à la sortie..." className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-950 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-black text-slate-950">Récapitulatif de la réservation</h2>

                <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-5">
                  {[
                    ['Véhicule', `${ticket.className} — ${ticket.provider}`],
                    ['Aéroport', selectedAirport?.label || airport],
                    ['Date', arrivalDate ? new Date(arrivalDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
                    ['Heure d\'atterrissage', arrivalTime || '—'],
                    flightNumber ? ['Numéro de vol', flightNumber] : null,
                    ['Destination', destination],
                    ['Bagages', baggage + (baggage === '4+' ? ' bagages ou plus' : baggage === '1' ? ' bagage' : ' bagages')],
                    ['Passager', `${firstName} ${lastName}`],
                    ['Email', email],
                    ['Téléphone', phone],
                  ].filter(Boolean).map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="font-semibold text-slate-500">{label}</span>
                      <span className="text-right font-black text-slate-950">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between rounded-xl bg-blue-700 p-5 text-white">
                  <span className="font-black">Prix estimé</span>
                  <span className="text-2xl font-black">{Number(ticket.price).toLocaleString('fr-FR')} FCFA</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`https://wa.me/33688639294?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 font-black text-white shadow-lg shadow-emerald-500/30"
                  >
                    <MessageCircle size={18} /> Confirmer via WhatsApp
                  </a>
                  <button type="button" onClick={confirm} className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/20">
                    <CheckCircle2 size={18} /> Envoyer la demande
                  </button>
                </div>

                <p className="text-center text-xs font-semibold text-slate-400">Un conseiller StudyWay vous contactera dans les 2h pour confirmer votre transfert.</p>
              </div>
            )}

            {stepError && (
              <div className="mt-4 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700">{stepError}</div>
            )}

            <div className="mt-6 flex gap-3">
              {step > 1 && (
                <button type="button" onClick={() => { setStep((s) => s - 1); setStepError('') }} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-black text-slate-700">
                  <ChevronLeft size={18} /> Retour
                </button>
              )}
              {step < 3 && (
                <button type="button" onClick={goNext} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 font-black text-white shadow-lg shadow-blue-700/20">
                  Suivant <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={32} /></div>
            <h2 className="mt-5 text-2xl font-black text-slate-950">Demande envoyée !</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-slate-600">Votre demande de transfert a bien été reçue. Un conseiller StudyWay vous contacte sous 2h pour confirmer votre chauffeur.</p>
            <div className="mt-6 space-y-3">
              <a href={`https://wa.me/33688639294?text=${buildWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 font-black text-white shadow-lg shadow-emerald-500/30"><MessageCircle size={18} /> Suivre sur WhatsApp</a>
              <button type="button" onClick={onClose} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-black text-slate-700">Retour au transport</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function TicketRow({ ticket, index, selected, onSelect }) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }} className={`overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100 ${selected ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'}`}>
      <div className="grid items-center gap-5 p-5 lg:grid-cols-[1.15fr_1.6fr_180px]">
        <div className="flex items-center gap-4">
          <img src={ticket.logo || logos.studyway} alt={ticket.provider} onError={(event) => { event.currentTarget.src = logos.studyway }} className="h-20 w-20 rounded-lg border border-slate-100 bg-white object-contain p-2 shadow-sm" />
          <div>
            {index === 0 && <span className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Meilleur choix</span>}
            <div className="font-black text-slate-950">{ticket.provider}</div>
            <div className="text-sm font-semibold text-slate-500">{ticket.code}</div>
            <div className="mt-3 flex gap-3 text-slate-400">{[BriefcaseIcon, BriefcaseIcon, BriefcaseIcon].map((Icon, iconIndex) => <span key={iconIndex} className="grid h-5 w-5 place-items-center"><Icon /></span>)}</div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="text-center lg:text-left"><div className="text-2xl font-black text-slate-950">{ticket.departure}</div><div className="text-sm font-black text-slate-700">{ticket.origin}</div></div>
          <div className="min-w-[160px] text-center">
            <div className="flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs font-black text-slate-500">{ticket.duration}</span><span className="h-px flex-1 bg-slate-200" /></div>
            <div className={`mt-2 text-sm font-black ${ticket.stops === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{ticket.stopLabel}</div>
          </div>
          <div className="text-center lg:text-left"><div className="text-2xl font-black text-slate-950">{ticket.arrival}</div><div className="text-sm font-black text-slate-700">{ticket.destination}</div></div>
        </div>
        <div className="border-t border-slate-100 pt-5 text-right lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <div className="whitespace-nowrap text-xl font-black leading-tight text-slate-950">{formatTicketPrice(ticket)}</div>
          <div className="text-xs font-semibold text-slate-500">par passager</div>
          <button type="button" onClick={onSelect} className="mt-5 h-11 rounded-lg bg-blue-700 px-7 font-black text-white shadow-lg shadow-blue-700/20">Voir les détails</button>
        </div>
      </div>
    </motion.article>
  )
}

function TransportModeIcon({ mode, ...props }) {
  const icons = { flight: Plane, train: Train, bus: Bus, local: Train, driver: Car }
  const Icon = icons[mode] || Globe2
  return <Icon {...props} />
}

function formatTicketPrice(ticket) {
  return ticket.priceLabel || `${Number(ticket.price ?? 0).toLocaleString('fr-FR')} FCFA`
}

function mergeTransportOptions(...groups) {
  const seen = new Set()
  return groups.flat().filter((item) => {
    if (!item?.id || seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

function cabinClassLabel(value) {
  return {
    economy: 'Économie',
    premium_economy: 'Premium économie',
    business: 'Business',
    first: 'Première',
  }[value] || 'Économie'
}

function getTransportIata(label, fallback) {
  return label.match(/\(([A-Z]{3})\)/)?.[1] || fallback
}

function parseDuration(duration) {
  const hours = Number(duration.match(/(\d+)h/)?.[1] ?? 0)
  const minutes = Number(duration.match(/(\d+)\s*min|h\s*(\d+)/)?.[1] ?? duration.match(/h\s*(\d+)/)?.[1] ?? 0)
  return hours * 60 + minutes
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
    [logos.europe, 'Europe 10 Go', 'Active', "Valable jusqu’au 25 juin 2024", '10 Go / 10 Go', '100%', 'bg-emerald-50 text-emerald-600'],
    ['https://flagcdn.com/w80/us.png', 'USA 5 Go', 'Expirée', 'Expirée le 10 mai 2024', '5 Go / 5 Go', '100%', 'bg-slate-100 text-slate-500'],
  ]
  const advantages = [
    [Wifi, 'Activation instantanée', 'Recevez votre eSIM en quelques secondes.'],
    [Plane, "Aucun frais d’itinérance", "Évitez les frais élevés à l’étranger."],
    [ShieldCheck, 'Réseaux de qualité', 'Connexion rapide et sécurisée partout.'],
    [MessageCircle, 'Support 24h/7j', 'Notre équipe vous accompagne à chaque étape.'],
  ]

  return (
    <div className="esim-page space-y-7">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black tracking-tight text-slate-950">eSIM & Forfait</h1>
        <p className="mt-2 text-lg font-medium text-slate-500">Restez connecté dès votre arrivée à l’étranger</p>
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
          <div className="mt-7 flex items-center gap-4"><img src={logos.europe} alt="Europe" className="h-12 w-12 rounded-full" /><div><div className="text-xl font-black">Europe 10 Go</div><div className="text-sm text-blue-100">Valable jusqu’au 25 juin 2024</div></div></div>
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
            {['Choisissez votre forfait', 'Achetez et recevez votre eSIM', 'Scannez le QR code', "Profitez d’internet"].map((step, index) => <div key={step} className="grid grid-cols-[34px_1fr] gap-4"><div className="grid h-8 w-8 place-items-center rounded-full border-2 border-blue-600 text-sm font-black text-blue-700">{index + 1}</div><div><div className="font-black">{step}</div><p className="mt-1 text-sm text-slate-500">{['Sélectionnez le forfait adapté à votre destination.', 'Vous recevez un QR code par email.', 'Scannez le QR code dans les réglages.', 'Vous êtes connecté dès votre arrivée !'][index]}</p></div></div>)}
          </div>
          <Link to="/guides" className="mt-7 flex h-12 w-full items-center justify-between rounded-lg bg-slate-50 px-5 font-black text-blue-900"><span className="flex items-center gap-3"><FileText size={18} />Voir le guide d’installation</span>→</Link>
        </section>
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black">Mes eSIM</h2><Link to="/esim" className="font-black text-blue-800">Voir toutes mes eSIM →</Link></div>
          <div className="space-y-5">
            {esimRows.map(([flag, name, status, sub, usage, percent, tone]) => <div key={name} className="grid items-center gap-4 rounded-lg border border-slate-100 p-4 md:grid-cols-[1fr_170px_1fr_auto]"><div className="flex items-center gap-4"><img src={flag} alt="" className="h-10 w-10 rounded-full" /><div><b>{name}</b> <span className={`ml-2 rounded-full px-3 py-1 text-xs font-black ${tone}`}>{status}</span><div className="text-sm text-slate-500">{sub}</div></div></div><div className="font-bold">{usage}</div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: percent }} /></div><ChevronDown className="-rotate-90 text-slate-400" /></div>)}
          </div>
        </section>

        <section className="rounded-lg bg-[#082f7a] p-6 text-white shadow-sm">
          <h2 className="text-xl font-black">Parrainez un ami</h2>
          <p className="mt-3 text-blue-50">Gagnez 2 000 FCFA pour chaque ami parrainé.</p>
          <div className="mt-7 flex items-end justify-between gap-4">
            <Link to="/messages" className="rounded-lg bg-white px-6 py-3 font-black text-blue-800">Parrainer maintenant</Link>
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
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-black">Besoin d’aide pour choisir votre forfait ?</h2><p className="mt-1 text-sm text-slate-500">Notre équipe est disponible pour vous conseiller le meilleur forfait selon votre destination.</p></div><div className="flex gap-3"><a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="rounded-lg border border-emerald-200 px-5 py-3 font-black text-emerald-700">Discuter sur WhatsApp</a><Link to="/messages" className="rounded-lg border border-blue-200 px-5 py-3 font-black text-blue-800">Contacter le support</Link></div></div>
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
      <button type="button" className="mt-4 h-11 w-full rounded-lg bg-blue-50 font-black text-blue-800 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">Choisir</button>
    </motion.article>
  )
}

function AdvisorContact() {
  const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
  const DAY_LABELS = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]
  const SUBJECTS = ["Admission universitaire","Visa étudiant","Logement étudiant","Financement & bourses","Compte bancaire","Assurance","Autre demande"]

  const [step, setStep] = useState(1)
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [booking, setBooking] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })

  const today = new Date(); today.setHours(0,0,0,0)

  function calCells(year, month) {
    const first = new Date(year, month, 1)
    const last  = new Date(year, month + 1, 0)
    let dow = first.getDay(); dow = dow === 0 ? 6 : dow - 1
    const cells = Array(dow).fill(null)
    for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(year, month, d))
    return cells
  }

  const cells = calCells(calMonth.getFullYear(), calMonth.getMonth())

  function isDisabled(d) {
    if (!d) return true
    return d < today || d.getDay() === 0 || d.getDay() === 6
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  }

  function fmtDate(d) {
    return d ? d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : ''
  }

  function isoDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  }

  function mockSlots() {
    return ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map((time, i) => ({ time, available: ![2,5].includes(i) }))
  }

  async function pickDate(d) {
    if (isDisabled(d)) return
    setSelectedDate(d); setSelectedTime(null); setSlotsLoading(true); setFormError(null)
    try {
      const res = await axios.get(`/api/v1/calendar/slots?date=${isoDate(d)}`)
      setSlots(res.data.slots?.length ? res.data.slots : mockSlots())
    } catch {
      setSlots(mockSlots())
    } finally {
      setSlotsLoading(false)
    }
    setStep(2)
  }

  function pickTime(time) { setSelectedTime(time); setStep(3) }

  async function submitForm(e) {
    e.preventDefault(); setSubmitting(true); setFormError(null)
    try {
      const res = await axios.post('/api/v1/calendar/appointments', { date: isoDate(selectedDate), time: selectedTime, ...form })
      setBooking(res.data); setStep(4)
    } catch (err) {
      if (err.response?.data?.errors) {
        const msgs = Object.values(err.response.data.errors).flat()
        setFormError(msgs.join(' '))
      } else {
        setBooking({ success: true, date: isoDate(selectedDate), time: selectedTime, name: form.name, email: form.email })
        setStep(4)
      }
    } finally {
      setSubmitting(false) }
  }

  const stepLabels = ['Date', 'Heure', 'Informations', 'Confirmation']

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Accueil</Link>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">Prendre un rendez-vous</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">Choisissez une date et un créneau pour échanger avec un conseiller StudyWay.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="tel:+33688639294" className="flex h-11 items-center gap-3 rounded-lg border border-blue-200 bg-white px-5 font-black text-blue-800"><Phone size={17} />+33 6 88 63 92 94</a>
          <Link to="/contact/email" className="flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 font-black text-slate-700"><Mail size={17} />Email</Link>
        </div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_310px]">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

          {step < 4 && (
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center">
                {stepLabels.map((label, i) => (
                  <span key={label} className="contents">
                    <button
                      type="button"
                      onClick={() => i + 1 < step && setStep(i + 1)}
                      className={`flex items-center gap-2 ${i + 1 < step ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black transition ${i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
                      </span>
                      <span className={`hidden text-sm font-black sm:block ${i + 1 === step ? 'text-blue-700' : i + 1 < step ? 'text-blue-500' : 'text-slate-400'}`}>{label}</span>
                    </button>
                    {i < stepLabels.length - 1 && <span className={`mx-2 h-px flex-1 ${i + 1 < step ? 'bg-blue-300' : 'bg-slate-200'}`} />}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 lg:p-8">
            <AnimatePresence mode="wait">

              {step === 1 && (
                <motion.div key="cal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-950">Choisissez une date</h2>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth()-1,1))} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"><ChevronDown className="rotate-90" size={17} /></button>
                      <span className="min-w-[160px] text-center text-sm font-black text-slate-950">{MONTHS[calMonth.getMonth()]} {calMonth.getFullYear()}</span>
                      <button type="button" onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth()+1,1))} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"><ChevronDown className="-rotate-90" size={17} /></button>
                    </div>
                  </div>
                  <div className="mb-2 grid grid-cols-7 text-center text-xs font-black text-slate-400">
                    {DAY_LABELS.map(d => <div key={d} className="py-1">{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((d, i) => {
                      if (!d) return <div key={`x${i}`} />
                      const disabled = isDisabled(d)
                      const selected = sameDay(d, selectedDate)
                      const isToday  = sameDay(d, today)
                      return (
                        <button key={d.toISOString()} type="button" disabled={disabled} onClick={() => pickDate(d)}
                          className={`aspect-square rounded-lg text-sm font-bold transition
                            ${selected ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : ''}
                            ${isToday && !selected ? 'border-2 border-blue-500 font-black text-blue-700' : ''}
                            ${!disabled && !selected ? 'font-black text-slate-950 opacity-100 hover:bg-blue-50 hover:text-blue-700' : ''}
                            ${disabled ? 'cursor-not-allowed bg-slate-50 text-slate-600 opacity-100' : 'cursor-pointer'}`}>
                          {d.getDate()}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-5 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-600 inline-block" />Sélectionné</span>
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-blue-500 inline-block" />Aujourd’hui</span>
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-200 inline-block" />Indisponible / Week-end</span>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="slots" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="mb-6 flex items-center gap-3">
                    <button type="button" onClick={() => setStep(1)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 transition"><ArrowLeft size={17} /></button>
                    <div>
                      <h2 className="text-lg font-black text-slate-950">Choisissez un créneau</h2>
                      <p className="text-sm font-semibold capitalize text-blue-700">{fmtDate(selectedDate)}</p>
                    </div>
                  </div>
                  {slotsLoading ? (
                    <div className="flex h-44 items-center justify-center gap-3 text-slate-400">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      Chargement des créneaux disponibles…
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="flex h-44 flex-col items-center justify-center gap-3 text-slate-400">
                      <CalendarDays size={44} className="text-slate-300" />
                      <p className="font-semibold">Aucun créneau disponible ce jour.</p>
                      <button type="button" onClick={() => setStep(1)} className="text-sm font-black text-blue-700 hover:underline">Choisir une autre date</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                      {slots.map(({ time, available }) => (
                        <button key={time} type="button" disabled={!available} onClick={() => available && pickTime(time)}
                          className={`flex h-12 items-center justify-center gap-1.5 rounded-lg text-sm font-black transition
                            ${available ? 'border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 hover:border-blue-600' : 'border border-slate-100 bg-slate-50 text-slate-300 line-through cursor-not-allowed'}`}>
                          <Clock3 size={13} className="shrink-0" />{time}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="mb-6 flex items-center gap-3">
                    <button type="button" onClick={() => setStep(2)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 transition"><ArrowLeft size={17} /></button>
                    <div>
                      <h2 className="text-lg font-black text-slate-950">Vos informations</h2>
                      <p className="text-sm font-semibold capitalize text-blue-700">{fmtDate(selectedDate)} · {selectedTime}</p>
                    </div>
                  </div>
                  <form onSubmit={submitForm} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-black text-slate-700">
                        Nom complet *
                        <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Prénom Nom" className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition" />
                      </label>
                      <label className="block text-sm font-black text-slate-700">
                        Adresse email *
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="vous@email.com" className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition" />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-black text-slate-700">
                        Téléphone *
                        <input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+228 90 12 34 56" className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition" />
                      </label>
                      <label className="block text-sm font-black text-slate-700">
                        Objet du rendez-vous *
                        <select required value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition">
                          <option value="">Choisir un objet</option>
                          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="block text-sm font-black text-slate-700">
                      Message (optionnel)
                      <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Décrivez brièvement votre situation et vos questions…" rows={3} className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition" />
                    </label>
                    {formError && (
                      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{formError}</div>
                    )}
                    <button type="submit" disabled={submitting} className="flex h-13 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60">
                      {submitting
                        ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Réservation en cours…</>
                        : <><CalendarDays size={18} />Confirmer le rendez-vous</>}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 4 && booking && (
                <motion.div key="confirm" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }} className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={44} />
                  </motion.div>
                  <h2 className="mt-6 text-2xl font-black text-slate-950">Rendez-vous confirmé !</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500">Un conseiller vous contactera à l’heure prévue.</p>
                  <div className="mt-8 w-full max-w-sm rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-left">
                    <div className="space-y-4 text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={17} className="shrink-0 text-emerald-600" />
                        <span className="capitalize">{new Date(booking.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3"><Clock3 size={17} className="shrink-0 text-emerald-600" /><span>{booking.time} — heure de Paris</span></div>
                      <div className="flex items-center gap-3"><UserRound size={17} className="shrink-0 text-emerald-600" /><span>{booking.name}</span></div>
                      <div className="flex items-center gap-3"><Mail size={17} className="shrink-0 text-emerald-600" /><span>{booking.email}</span></div>
                    </div>
                  </div>
                  <div className="mt-4 w-full max-w-sm rounded-xl border border-blue-100 bg-blue-50 p-4 text-left text-sm font-semibold leading-6 text-blue-800">
                    <span className="font-black">Confirmation par email — </span>un récapitulatif a été envoyé à <b>{booking.email}</b>.
                  </div>
                  <div className="mt-7 grid w-full max-w-sm gap-3">
                    <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 font-black text-emerald-700 hover:bg-emerald-100 transition"><MessageCircle size={18} />Contacter sur WhatsApp</a>
                    <button type="button" onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); setBooking(null); setForm({ name:'', email:'', phone:'', subject:'', message:'' }) }} className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 font-black text-slate-700 hover:bg-slate-50 transition"><CalendarDays size={17} />Nouveau rendez-vous</button>
                    <Link to="/" className="flex h-11 items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition"><ArrowLeft size={16} />Retour à l’accueil</Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-800"><UserRound size={26} /></div>
              <div><div className="font-black text-slate-950">Conseiller StudyWay</div><div className="text-sm font-semibold text-emerald-600">Disponible lun – ven</div></div>
            </div>
            <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-3"><Clock3 size={15} className="text-blue-600 shrink-0" />9h00 – 18h00 (Paris)</div>
              <div className="flex items-center gap-3"><CalendarDays size={15} className="text-blue-600 shrink-0" />Durée : 1 heure</div>
              <div className="flex items-center gap-3"><Video size={15} className="text-blue-600 shrink-0" />Appel vidéo ou téléphonique</div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-950">Contact direct</h2>
            <div className="mt-4 space-y-2">
              <a href="tel:+33688639294" className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 font-black text-slate-800 hover:bg-slate-50 transition"><Phone className="text-blue-700 shrink-0" size={18} />+33 6 88 63 92 94</a>
              <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 font-black text-slate-800 hover:bg-emerald-50 transition"><MessageCircle className="text-emerald-600 shrink-0" size={18} />WhatsApp agence</a>
              <Link to="/contact/email" className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 font-black text-slate-800 hover:bg-slate-50 transition"><Mail className="text-blue-700 shrink-0" size={18} />contact@studyway.com</Link>
              <Link to="/messages" className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 font-black text-slate-800 hover:bg-blue-50 transition"><Send className="text-violet-600 shrink-0" size={18} />Chat en direct</Link>
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-black text-blue-950">Préparez votre RDV</h2>
            <ul className="mt-4 space-y-2 text-sm font-semibold leading-7 text-blue-900">
              {['Votre projet d’études et destination visée','Vos relevés de notes et diplômes','Votre passeport (numéro et validité)','Vos questions sur le visa et les démarches'].map(item => (
                <li key={item} className="flex gap-2"><CheckCircle2 size={15} className="mt-1 shrink-0 text-blue-600" />{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}

function EmailContact() {
  return (
    <div className="space-y-7">
      <div>
        <Link to="/universites" className="inline-flex items-center gap-2 text-sm font-black text-blue-800"><ChevronDown className="rotate-90" size={18} />Retour aux formations</Link>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">Contacter StudyWay par email</h1>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">Envoyez votre demande à l’agence. Un conseiller vous répondra avec les prochaines étapes.</p>
      </div>
      <div className="grid gap-7 xl:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="Nom complet" placeholder="Christelle Komi" />
            <FormInput label="Adresse email" placeholder="christelle@email.com" />
            <FormInput label="Téléphone" placeholder="+228 90 12 34 56" />
            <FormSelect label="Objet" placeholder="Choisir une demande" />
          </div>
          <div className="mt-5">
            <FormTextarea label="Message" placeholder="Bonjour StudyWay, j’aimerais être accompagnée pour choisir mes formations et déposer mes candidatures." />
          </div>
          <button type="button" className="mt-6 flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-7 font-black text-white shadow-lg shadow-blue-600/20"><Mail size={18} />Envoyer l’email</button>
        </section>
        <aside className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h2 className="font-black text-blue-950">Coordonnées</h2>
          <div className="mt-5 space-y-4 text-sm font-semibold text-blue-900">
            <div className="flex items-center gap-3"><Mail size={18} />contact@studyway.com</div>
            <a href="tel:+33688639294" className="flex items-center gap-3 hover:text-blue-900 transition"><Phone size={18} />+33 6 88 63 92 94</a>
            <a href="https://wa.me/33688639294" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-900 transition"><MessageCircle size={18} />WhatsApp disponible</a>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Messages() {
  const initialThreads = [
    {
      id: 'support',
      title: 'Support StudyWay',
      preview: "N’hésitez pas si vous avez d’autres questions.",
      time: '10:33',
      unread: 2,
      avatar: 'SW',
      tone: 'blue',
      online: true,
      messages: [
        {
          id: 1,
          side: 'left',
          text: "Bonjour Christelle,\n\nNous avons bien reçu tous vos documents pour votre demande de visa étudiant.\n\nVotre dossier est en cours de vérification par notre équipe.\n\nNous reviendrons vers vous dans les prochaines 24h avec une réponse.\n\nCordialement,\nL’équipe StudyWay",
          time: '10:30',
        },
        {
          id: 2,
          side: 'right',
          text: "Bonjour,\nMerci beaucoup pour l’information.\nJ’attends votre retour avec impatience.\nBonne journée 😊",
          time: '10:32',
        },
        {
          id: 3,
          side: 'left',
          text: "Avec plaisir 😊\nN’hésitez pas si vous avez d’autres questions.",
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
        { id: 2, side: 'right', text: "Oui maman, je t’appelle ce soir ❤️", time: 'Lun.' },
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
            <div className="mx-auto mb-8 w-fit rounded-lg bg-slate-100 px-5 py-3 text-xs font-black text-slate-500 shadow-sm">Aujourd’hui</div>
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
  return <><PageTitle title={title.charAt(0).toUpperCase() + title.slice(1)} subtitle="Module premium preparé dans l’architecture frontend StudyWay." /><Panel title="Interface en préparation"><p className="text-slate-500">La route est prête pour recevoir les composants métier et les données API.</p></Panel></>
}

export default App
