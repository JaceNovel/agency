import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bell, Building2, CheckCircle2, ChevronDown, CircleDollarSign,
  ClipboardList, CreditCard, FileText, GraduationCap, Home, LayoutDashboard,
  Lock, Mail, MessageCircle, Plane, Search, Send, Settings,
  ShieldCheck, UserRound, Users, WalletCards, Globe2, Heart, MapPin, Gift,
  CalendarDays, Phone, Info, Upload, Smartphone, Bus,
  Train, Car, Star, Languages, Wifi, Landmark, Paperclip, Smile, CheckCheck,
  Menu, X, Video, SlidersHorizontal,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
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
    [WalletCards, 'Paiements totaux', '2 450 €', 'Ce mois-ci', 'bg-blue-50 text-blue-700'],
    [CheckCircle2, 'Paiements effectués', '2 100 €', 'Ce mois-ci', 'bg-emerald-50 text-emerald-700'],
    [CalendarDays, 'Paiements à venir', '350 €', 'Ce mois-ci', 'bg-amber-50 text-amber-700'],
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
    [CheckCircle2, 'Paiement loyer', 'Mai 2025', '10 mai 2025', '- 550 €', 'text-emerald-600'],
    [FileText, 'Document ajouté', 'Attestation de scolarité', '8 mai 2025', '', 'text-blue-600'],
    [Landmark, 'Paiement université', "Frais d'inscription", '5 mai 2025', '- 1 500 €', 'text-violet-600'],
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
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {open && <button type="button" className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px]" aria-label="Fermer la navigation" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 overflow-hidden rounded-r-2xl bg-[#061b47] text-white shadow-2xl shadow-slate-950/30 transition ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full min-h-0 flex-col p-6">
          <div className="flex items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg text-blue-100 hover:bg-white/10" aria-label="Fermer la navigation"><X size={22} /></button>
          </div>
          <nav className="sidebar-nav mt-10 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">{navItems.map(({ label, icon: Icon, to, badge }) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-bold transition ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/20' : 'text-blue-50 hover:bg-white/10'}`}><Icon size={21} /><span className="flex-1">{label}</span>{badge && <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-xs">{badge}</span>}</NavLink>)}</nav>
          <div className="mt-6 shrink-0 rounded-lg border border-white/10 bg-blue-600/20 p-5"><div className="font-black">Besoin d'aide ?</div><p className="mt-2 text-sm text-blue-100">Notre équipe est disponible 24h/7j.</p><Link to="/messages" onClick={() => setOpen(false)} className="message-menu-button mt-4 flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 text-sm font-bold"><span>Message</span><span className="message-menu-badge">3</span></Link></div>
        </div>
      </aside>
      <div>
        <header className="sticky top-0 z-30 grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-200 bg-slate-100/95 px-5 backdrop-blur lg:px-8">
          <div>
            <button type="button" onClick={() => setOpen(true)} className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-300 shadow-sm shadow-slate-00 transition hover:bg-slate-400/80" aria-label="Ouvrir la navigation">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-700 text-slate-100 shadow-sm">
                <Menu size={24} />
              </span>
            </button>
          </div>
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
            <Link to="/parametres" className="grid h-11 w-11 place-items-center rounded-lg text-blue-950 hover:bg-slate-100" aria-label="Paramètres"><Settings size={22} /></Link>
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
        <Route path="/finance" element={<Finance />} />
        <Route path="/logement" element={<Housing />} />
        <Route path="/universites" element={<Universities />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/accompagnement" element={<SupportJourney />} />
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

function StatCard({ icon: Icon, label, value, tone = 'blue' }) {
  const tones = { blue: 'bg-blue-50 text-blue-600', green: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600', purple: 'bg-violet-50 text-violet-600' }
  return <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-5"><div className={`grid h-14 w-14 place-items-center rounded-lg ${tones[tone]}`}><Icon size={27} /></div><div><div className="text-sm font-bold text-slate-500">{label}</div><div className="mt-1 text-2xl font-black">{value}</div></div></div></div>
}

function Dashboard() {
  const heroSlides = [
    {
      lead: 'Votre',
      rest: 'parcours étudiant,\nsimplifié de A à Z',
      title: 'Votre parcours étudiant, simplifié de A à Z',
      text: 'Visa, logement, financement, universités... Tout ce dont vous avez besoin, au même endroit.',
      image: dashboardStudentHero,
      cta: 'Commencer ma demande',
      tone: 'from-[#061b47]/95 via-[#102a63]/72 to-transparent',
    },
    {
      lead: 'Partez',
      rest: 'étudier dans la ville qui vous attend',
      title: 'Partez étudier dans la ville qui vous attend',
      text: 'Billets, logement, assurance et accompagnement réunis dans un seul espace fluide.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
      cta: 'Préparer mon départ',
      tone: 'from-[#061b47]/95 via-[#1e3a8a]/65 to-transparent',
    },
    {
      lead: 'Installez-vous',
      rest: 'sereinement dès votre arrivée',
      title: 'Installez-vous sereinement dès votre arrivée',
      text: 'Un conseiller, des services vérifiés, et des solutions pour chaque étape de votre projet.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
      cta: 'Voir mes services',
      tone: 'from-[#061b47]/95 via-[#0f766e]/58 to-transparent',
    },
  ]
  const [activeSlide, setActiveSlide] = useState(0)
  const services = [
    ['Traduction & Documents', FileText, 'Traduction certifiée, apostille'], ['Visa & Immigration', Plane, 'Dossier complet, suivi et assistance'], ['Logement Étudiant', Home, 'Résidences, studios, colocations'], ['Paiement Frais Universitaires', CreditCard, 'Payez vos frais en sécurité'], ['Billets & Transport', Plane, 'Vols, trains, transferts'], ['Banque & Financement', Landmark, 'Compte étudiant, AVI, prêts'],
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
    ['Résidence Paris 15', '450 €/mois', 'Paris, France', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80', logos.parisSaclay],
    ['Vol Lomé → Paris', '350 000 FCFA', '15 juin 2024', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80', logos.airFrance],
    ['Compte Étudiant', 'Gratuit', 'Ouverture 100% en ligne', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80', logos.societeGenerale],
    ['Assurance Santé', '120 €/an', 'Couverture complète', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80', logos.orange],
  ]
  const partnerLogos = [logos.campusFrance, logos.parisSaclay, logos.edhec, logos.escp, logos.societeGenerale, logos.bnp, logos.bpifrance]

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
            <div className="mt-8 flex flex-wrap gap-4"><button className="rounded-lg bg-blue-600 px-7 py-4 font-black shadow-lg shadow-blue-950/20">{slide.cta}</button><button className="rounded-lg bg-white px-7 py-4 font-black text-blue-950">Découvrir nos services</button></div>
          </motion.div>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroSlides.map((item, index) => <button key={item.title} onClick={() => setActiveSlide(index)} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/60'}`} aria-label={`Slide ${index + 1}`} />)}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black">Nos services principaux</h2>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {services.map(([label, Icon, sub], index) => (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045, duration: 0.34, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8, scale: 1.015 }} className="service-3d-card group relative flex flex-col rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm" key={label}>
                <div className={`service-card-icon mx-auto grid h-14 w-14 place-items-center rounded-full ${serviceTones[index]}`}><Icon size={25} /></div>
                <div className="mt-4 min-h-[44px] font-black leading-tight text-slate-950">{label}</div>
                <p className="mt-2 min-h-[44px] text-sm font-medium leading-5 text-slate-500">{sub}</p>
                {index < 4 && <div className="relative z-10 mt-auto pt-4 text-xs font-black uppercase tracking-wide text-current">Démarrer →</div>}
              </motion.div>
            ))}
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

      <section className="-mr-5 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:-mr-8">
        <h2 className="mb-7 text-2xl font-black">Ils nous font confiance</h2>
        <div className="grid items-center gap-8 md:grid-cols-7">{partnerLogos.map((src) => <img key={src} src={src} alt="Partenaire StudyWay" className="mx-auto max-h-14 max-w-40 object-contain" />)}</div>
      </section>
    </div>
  )
}

function DashboardOffer({ title, price, location, image, logo, index }) {
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-36 overflow-hidden"><img src={image} alt={title} className="h-full w-full object-cover transition duration-300 hover:scale-105" /><button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"><Heart size={18} /></button>{logo && <img src={logo} alt="" className="absolute bottom-3 left-3 h-10 w-10 rounded-lg bg-white object-contain p-1 shadow" />}</div>
      <div className="p-4"><h3 className="font-black">{title}</h3><p className="mt-1 text-sm text-slate-500">{location}</p><div className="mt-4 flex items-center justify-between"><span className="text-xl font-black text-emerald-700">{price}</span><span className="text-sm font-bold text-amber-500">★ 4.{index + 5}</span></div></div>
    </motion.article>
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
    [Landmark, 'Ouvrir un compte bancaire', 'Compte étudiant 100% en ligne'],
    [CreditCard, "Transfert d'argent international", 'Frais réduits & rapide vers 150+ pays'],
    [GraduationCap, 'Financement étudiant', 'Prêts étudiants et solutions sur mesure'],
    [ShieldCheck, 'Assurance & Protection', 'Assurance santé, habitation et responsabilité civile'],
  ]
  const stats = [
    [Landmark, '+25', 'Banques partenaires'],
    [Globe2, '150+', 'Pays couverts'],
    [CircleDollarSign, '0 €', "Frais d'ouverture"],
    [ShieldCheck, 'Sécurisé', 'Données protégées'],
    [Users, 'Rapide', 'Ouverture en 24-48h'],
  ]
  const banks = [
    ['BNP Paribas', logos.bnp, 'Populaire', ['Carte bancaire internationale', 'Application mobile', 'Découvert autorisé']],
    ['Société Générale', logos.societeGenerale, 'Partenaire', ['Offres étudiants exclusives', 'Assurance incluse', 'Retraits sans frais zone SEPA']],
    ['Crédit Mutuel', logos.creditMutuel, 'Recommandé', ['Carte Mastercard/Visa', 'Conseiller dédié', 'Solutions épargne']],
    ['N26', logos.n26, 'Digital', ['Ouverture rapide en 8 min', 'Carte virtuelle incluse', "Zéro frais à l'étranger"]],
    ['Revolut', logos.revolut, 'Flexible', ['Multi-devises', 'Transferts instantanés', "Contrôle total depuis l'app"]],
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
            {quickServices.map(([Icon, title, text], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.07, duration: 0.34, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -14 }} className="finance-quick-card group rounded-lg border p-5 text-white shadow-lg shadow-blue-950/15 backdrop-blur transition duration-300 hover:shadow-xl hover:shadow-blue-950/10">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white text-blue-700 shadow-sm shadow-blue-950/10 transition duration-300 group-hover:bg-blue-50 group-hover:text-blue-800"><Icon size={22} /></div>
                <h3 className="font-black leading-tight text-white transition duration-300 group-hover:text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-blue-100 transition duration-300 group-hover:text-slate-500">{text}</p>
                <span className="finance-quick-arrow mt-3 inline-grid h-8 w-8 place-items-center rounded-full text-blue-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight size={18} />
                </span>
              </motion.article>
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
            <button className="flex items-center gap-2 text-sm font-black text-blue-800">Voir toutes les banques <ArrowRight size={17} /></button>
          </div>
          <div className="grid gap-5 lg:grid-cols-5">
            {banks.map(([bank, logo, tag, perks], index) => (
              <motion.article key={bank} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }} whileHover={{ y: -15 }} className="finance-bank-card flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex min-h-12 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                    <img src={logo} alt="" className="h-6 w-6 object-contain" />
                  </span>
                  <h3 className="text-base font-black leading-tight text-slate-950">{bank}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold"><span className="finance-student-badge rounded-lg px-3 py-1 text-blue-800">Compte étudiant</span><span className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700">{tag}</span></div>
                <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  {perks.map((perk) => <div key={perk} className="flex gap-2"><CheckCircle2 className="shrink-0 text-emerald-600" size={16} />{perk}</div>)}
                </div>
                <div className="mt-auto border-t border-blue-200 pt-4"><span className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-sm shadow-blue-600/20">Ouverture en ligne</span></div>
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
          <button className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-800 font-black text-white shadow-lg shadow-blue-900/20"><Send size={18} />Envoyer de l'argent</button>
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
              <button className="mt-5 flex items-center gap-2 text-sm font-black text-blue-800">Découvrir <ArrowRight size={16} /></button>
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
    ['Studio cosy - Montparnasse', 'Paris 14e, France', '750 €', 'Studio', '20 m²', 'Meublé', 'Disponible dès le 15 juin', 'Coup de cœur'],
    ['Appartement - Lyon Part-Dieu', 'Lyon, France', '680 €', 'T2', '35 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre - Résidence étudiante', 'Toulouse, France', '450 €', 'Chambre', '15 m²', 'Meublé', 'Disponible dès le 1er juillet', 'Vérifié'],
    ['Studio - La Defense', 'Courbevoie, France', '800 €', 'Studio', '22 m²', 'Meublé', 'Disponible maintenant', 'Coup de cœur'],
    ['T2 lumineux - Paris', 'Paris 11e, France', '720 €', 'T2', '32 m²', 'Équipé', 'Disponible bientôt', 'Vérifié'],
    ['Colocation meublee', 'Lille, France', '520 €', 'Colocation', '18 m²', 'Meublé', 'Disponible maintenant', 'Vérifié'],
    ['Chambre calme - Centre', 'Bordeaux, France', '590 €', 'Chambre', '17 m²', 'Wi-Fi', 'Disponible maintenant', 'Vérifié'],
    ['Studio moderne - Nantes', 'Nantes, France', '610 €', 'Studio', '24 m²', 'Meublé', 'Disponible en août', 'Vérifié'],
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
              <HousingSearchItem label="Budget max." value="800 €" select />
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
                  <div className="mt-3 flex justify-between text-sm font-semibold text-slate-600"><span>0 €</span><span>1000+ €</span></div>
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
                ['650 €', 'left-[34%] top-[15%]'], ['700 €', 'right-[14%] top-[23%]'], ['910 €', 'left-[18%] top-[37%]'],
                ['300 €', 'left-[49%] top-[55%]'], ['800 €', 'right-[9%] bottom-[18%]'], ['600 €', 'left-[7%] top-[48%]'],
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

        <section className="-mb-5 rounded-t-2xl bg-slate-500 px-5 py-12 text-white lg:-mb-8 lg:px-8">
          <h2 className="mb-7 text-center text-2xl font-black">Pourquoi choisir nos logements ?</h2>
          <div className="grid gap-5 rounded-lg bg-slate-600 p-6 md:grid-cols-4">
            {why.map(([Icon, title, text], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 text-white"><Icon size={24} /></div>
                <div><div className="font-black text-white">{title}</div><p className="mt-2 text-sm leading-6 text-white/80">{text}</p></div>
              </motion.div>
            ))}
          </div>
        </section>
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
  const universities = [
    ['Sorbonne Université', 'Paris, France', 'France', logos.france, logos.sorbonne, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80', '#63', '120 Programmes', 'Français, Anglais'],
    ['Université de Montreal', 'Montreal, Canada', 'Canada', logos.canada, logos.montreal, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=80', '#111', '80 Programmes', 'Français, Anglais'],
    ['Technische Universitat Munchen', 'Munich, Allemagne', 'Allemagne', logos.germany, logos.tum, 'https://images.unsplash.com/photo-1587330979470-3016b6702d89?auto=format&fit=crop&w=900&q=80', '#52', '100 Programmes', 'Allemand, Anglais'],
    ['Université catholique de Louvain', 'Louvain-la-Neuve, Belgique', 'Belgique', logos.belgium, logos.uclouvain, 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=80', '#120', '60 Programmes', 'Français, Anglais'],
  ]
  const stats = [
    [Landmark, '1200+', 'Universités partenaires'],
    [Globe2, '50+', 'Pays couverts'],
    [GraduationCap, '8000+', 'Programmes disponibles'],
    [Users, '25k+', 'Étudiants accompagnés'],
  ]
  const domains = [
    ['Informatique', FileText, 'text-violet-600'],
    ['Business', Landmark, 'text-emerald-600'],
    ['Ingénierie', Settings, 'text-blue-600'],
    ['Santé', Heart, 'text-rose-600'],
    ['Sciences sociales', ShieldCheck, 'text-purple-600'],
    ['Arts & Design', Star, 'text-amber-600'],
  ]

  return (
    <div className="university-page -mx-5 space-y-8 lg:-mx-8">
      <div className="relative grid gap-8 px-5 lg:px-8 xl:grid-cols-[1fr_330px]">
        <section className="university-hero relative min-h-[430px] overflow-visible rounded-lg bg-[#f4f8ff] p-8 md:p-10">
          <img src={universityHero} alt="Étudiante avec cahier" className="university-hero-image absolute inset-y-0 right-0 h-full w-full rounded-lg object-cover" />
          <div className="absolute inset-0 rounded-lg bg-[linear-gradient(90deg,rgba(244,248,255,.92)_0%,rgba(244,248,255,.72)_38%,rgba(244,248,255,.08)_70%,rgba(244,248,255,0)_100%)]" />
          <div className="relative z-10 text-sm font-semibold text-slate-500">Accueil <span className="mx-2">›</span> Universités</div>
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 mt-8 max-w-[600px]">
            <h1 className="university-title text-4xl font-black leading-tight tracking-tight text-slate-950 xl:text-5xl">Trouvez l'université<br />qui vous correspond</h1>
            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-slate-600 xl:text-xl">Découvrez des milliers d'universités partenaires dans le monde et trouvez la formation idéale pour atteindre vos objectifs.</p>
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
              {['Comment choisir son université ?', "Préparer son dossier d'admission", 'Demande de visa étudiant'].map((item, index) => <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.08 }} className="flex items-center gap-3" key={item}><FileText size={17} />{item}</motion.div>)}
            </div>
            <button className="mt-6 font-black text-blue-800">Voir tous les guides →</button>
          </motion.section>
        </aside>
      </div>

      <div className="space-y-7 px-5 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <label>
              <span className="text-sm font-black text-slate-950">Que voulez-vous étudier ?</span>
              <span className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-slate-400"><Search size={18} /><input className="w-full border-none bg-transparent text-sm font-semibold text-slate-700 outline-none" placeholder="Ex: Informatique, Business..." /></span>
            </label>
            <UniversitySelect label="Niveau d'études" value="Licence" />
            <UniversitySelect label="Pays" value="Tous les pays" />
            <UniversitySelect label="Langue d'enseignement" value="Toutes les langues" />
            <button className="mt-7 flex h-12 items-center justify-center gap-3 rounded-lg bg-[#082f7a] px-7 font-black text-white">Rechercher <Search size={18} /></button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
            Recherches populaires :
            {['Informatique', 'Management', 'Ingénierie', 'Santé', 'Design', 'Droit'].map((item) => <span className="rounded-lg bg-blue-50 px-4 py-2 font-bold text-blue-900" key={item}>{item}</span>)}
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
            <h2 className="text-2xl font-black text-slate-950">Universités recommandées</h2>
            <button className="font-black text-blue-800">Voir toutes les universités →</button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {universities.map((item, index) => <UniversityResultCard key={item[0]} item={item} index={index} />)}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Parcourir par domaine d'études</h2>
            <button className="font-black text-blue-800">Voir tous les domaines →</button>
          </div>
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {domains.map(([label, Icon, tone]) => <div key={label} className="flex h-20 items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 font-black shadow-sm"><Icon className={tone} size={23} />{label}</div>)}
          </div>
        </section>
      </div>
    </div>
  )
}

function UniversitySelect({ label, value }) {
  return (
    <label>
      <span className="whitespace-nowrap text-sm font-black text-slate-950">{label}</span>
      <span className="mt-3 flex h-12 items-center justify-between rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700">{value}<ChevronDown size={17} /></span>
    </label>
  )
}

function UniversityResultCard({ item, index }) {
  const [title, place, country, flag, logo, image, rank, programs, languages] = item
  const [favorite, setFavorite] = useState(false)

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-36 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black text-slate-800"><img src={flag} alt="" className="h-4 w-6 rounded object-cover" />{country}</span>
        <button type="button" onClick={() => setFavorite((value) => !value)} className={`favorite-button absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md ${favorite ? 'is-favorite text-rose-600' : 'text-slate-800'}`}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" className="h-12 w-12 rounded-lg border border-slate-200 object-contain p-1" />
          <div><h3 className="font-black text-slate-950">{title}</h3><p className="text-sm font-medium text-slate-500">{place}</p></div>
        </div>
        <div className="mt-5 text-sm font-semibold text-slate-600"><MapPin size={15} className="mr-2 inline" />Publique</div>
        <div className="mt-3 text-sm font-bold text-slate-700">QS World Ranking : {rank}</div>
        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500"><span>{programs}</span><span>{languages}</span></div>
      </div>
    </motion.article>
  )
}

function Profile() {
  return <div className="grid gap-6 xl:grid-cols-[1fr_420px]"><div className="space-y-6"><Panel title="Mon enfant"><div className="flex flex-wrap items-center gap-8"><img src={avatars.kossi} alt="Koffi M. Lucas" className="h-32 w-32 rounded-full object-cover" /><div className="grid flex-1 gap-3 md:grid-cols-2"><h1 className="col-span-full text-2xl font-black">Koffi M. Lucas <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">Actif</span></h1><InfoLine label="ID Étudiant" value="EDU-582941" /><InfoLine label="Email" value="lucas.koffi@email.com" /><InfoLine label="Université" value="Université Paris-Saclay" /><InfoLine label="Statut actuel" value="Étudiant" /></div><button className="rounded-lg border border-blue-700 px-6 py-3 font-black text-blue-800">Voir le profil complet</button></div></Panel><div className="grid gap-4 md:grid-cols-4"><StatCard icon={WalletCards} label="Paiements totaux" value="2 450 €" /><StatCard icon={CheckCircle2} label="Paiements effectués" value="2 100 €" tone="green" /><StatCard icon={CircleDollarSign} label="Paiements à venir" value="350 €" tone="amber" /><StatCard icon={FileText} label="Documents" value="12" tone="purple" /></div><Panel title="Suivi des services"><List items={['Logement - Résidence Les Estudines, Paris - Actif', 'Université - Licence Informatique L1 - Inscrit', 'Compte bancaire - Boursorama - Actif', 'Assurance - habitation - Actif', 'Forfait mobile eSIM - Orange 50Go - Actif']} /></Panel></div><div className="space-y-5"><Panel title="Dernières activités"><List items={['Paiement loyer -550 €', 'Document ajouté - Attestation de scolarité', 'Paiement université -1 500 €']} /></Panel><Panel title="Actions rapides"><List items={['Effectuer un paiement', "Envoyer de l'argent", 'Télécharger un document', 'Contacter le support']} /></Panel><div className="rounded-lg bg-blue-50 p-6"><h3 className="font-black">Besoin d'aide ?</h3><p className="mt-2 text-slate-600">Notre équipe est disponible 24/7.</p><button className="mt-5 rounded-lg bg-white px-6 py-3 font-black text-blue-800">Contacter le support</button></div></div></div>
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
            <motion.button initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.42, duration: 0.28, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5, scale: 1.02 }} className="support-start-button flex h-14 items-center gap-3 rounded-lg bg-blue-800 px-8 font-black text-white shadow-lg shadow-blue-800/20">Démarrer mon accompagnement <ArrowRight className="support-start-arrow" size={19} /></motion.button>
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

function Visa() {
  const steps = ['Préparation dossier', 'Soumission', 'Rendez-vous', 'Entretien', 'Décision', 'Visa délivré']
  return <div className="grid gap-6 xl:grid-cols-[1fr_380px]"><div className="space-y-6"><section className="grid gap-4 md:grid-cols-4">{[['France court séjour', logos.france], ['France long séjour', logos.france], ['Canada court séjour', logos.canada], ['Canada long séjour', logos.canada]].map(([x, flag]) => <div className="rounded-lg border bg-white p-5"><img src={flag} alt="" className="h-7 w-10 rounded object-cover" /><h3 className="mt-3 font-black">{x}</h3><p className="mt-2 text-sm text-slate-500">Sélectionnez ce visa pour commencer votre dossier.</p></div>)}</section><PageTitle title="Mon dossier de visa France" subtitle="Études en France - Campus France" /><Panel title="Progression"><ProcessLine steps={steps} activeIndex={2} icons={[FileText, Upload, CalendarDays, UserRound, ClipboardList, ShieldCheck]} /></Panel><Panel title="Informations du rendez-vous"><div className="grid gap-4 md:grid-cols-4">{['05 juin 2024', '09:30', 'TLScontact Paris', 'Visa étudiant (VLS-TS)'].map((x) => <div className="font-black" key={x}>{x}</div>)}</div></Panel><Panel title="Étapes de mon dossier"><VerticalTimeline items={['Dossier créé - 12 mai 2024', 'Dossier soumis à Campus France - 20 mai 2024', 'Rendez-vous pris - 28 mai 2024', 'Entretien - À venir', 'Décision - En attente', 'Visa délivré - En attente']} activeIndex={2} /></Panel></div><div className="space-y-5"><Panel title="Mon agent"><div className="flex items-center gap-4"><img src={avatars.koffi} alt="Koffi Adjo" className="h-16 w-16 rounded-full object-cover" /><div><div className="font-black">Koffi Adjo</div><div className="text-slate-500">Agent visa</div></div></div><List items={['+228 90 12 34 56', 'Discuter sur WhatsApp', 'Envoyer un message']} /></Panel><Panel title="Documents requis"><List items={['Passeport - Valide', "Lettre d'admission - Valide", 'Preuve de ressources - Valide', 'Assurance voyage - Valide', 'Relevés bancaires - Manquant', 'Certificat de scolarité - Manquant']} /></Panel></div></div>
}

function Transport() {
  const transportModes = [['Avion', Plane], ['Train', Train], ['Bus', Bus], ['Tram / Métro', Train], ['Chauffeur (Uber)', Car]]
  const flights = [
    ['Air France', 'AF 753', logos.airFrance, '23:45', '6h 45m', 'Direct', '07:30', '450 €', 'text-emerald-600'],
    ['Ethiopian Airlines', 'ET 920', logos.ethiopian, '15:20', '11h 15m', '1 escale (ADD)', '07:35', '385 €', 'text-amber-600'],
    ['Turkish Airlines', 'TK 569', logos.turkish, '09:10', '9h 50m', '1 escale (IST)', '19:00', '420 €', 'text-amber-600'],
    ['RwandAir', 'WB 704', logos.rwandair, '13:30', '8h 20m', '1 escale (KGL)', '21:50', '372 €', 'text-amber-600'],
  ]

  return (
    <div className="transport-page space-y-7">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-5">
        <div><h1 className="text-4xl font-black tracking-tight">Billets & Transport</h1><p className="mt-2 text-lg font-medium text-slate-500">Réservez vos billets d'avion, train, bus, tram ou chauffeur en toute simplicité.</p></div>
        <div className="ml-auto rounded-lg border border-slate-200 bg-white px-6 py-3 shadow-sm"><div className="text-xs font-semibold text-slate-500">Mon portefeuille</div><div className="font-black text-emerald-600">1 250,00 €</div></div>
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
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Mon voyage</h2><div className="mt-5 border-l-2 border-blue-100 pl-5"><div className="font-black text-blue-800">Aller</div><div className="text-sm text-slate-500">25 juin 2025</div><div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div><div className="text-xl font-black">23:45</div><div className="font-bold">LFW</div><div className="text-sm text-slate-500">Lomé</div></div><div className="text-center text-sm font-bold text-emerald-600">6h 45m<br />Direct</div><div className="text-right"><div className="text-xl font-black">07:30</div><div className="font-bold">CDG</div><div className="text-sm text-slate-500">Paris</div></div></div><div className="mt-6 flex items-center gap-3"><UserRound size={18} /><div><b>Passager</b><div className="text-sm text-slate-500">1 Adulte</div></div></div></div><button className="mt-6 h-12 w-full rounded-lg bg-blue-700 font-black text-white">Continuer vers la réservation</button></section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Transport sur place</h2><p className="mt-1 text-sm text-slate-500">Réservez votre trajet à l'arrivée</p>{[[Train, 'Train / RER', "Rejoindre Paris depuis l'aéroport"], [Train, 'Tram / Métro', 'Déplacements en ville'], [Bus, 'Bus', 'Lignes régulières'], [Car, 'Chauffeur (Uber)', 'Trajet privé avec chauffeur']].map(([Icon, title, sub]) => <div className="mt-5 flex items-center justify-between" key={title}><div className="flex items-center gap-4"><Icon size={21} /><div><b>{title}</b><div className="text-sm text-slate-500">{sub}</div></div></div><ChevronDown className="-rotate-90" size={17} /></div>)}</section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Réservation sécurisée</h2><div className="mt-5 space-y-3">{['Paiement 100% sécurisé', 'Support 24/7', 'Billet envoyé par email'].map((item) => <div className="flex items-center gap-3 text-sm font-semibold text-slate-600" key={item}><CheckCircle2 className="text-emerald-600" size={18} />{item}</div>)}</div></section>
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
                  <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.35, once: false }} transition={{ delay: index * 0.045, duration: 0.24 }} className="arrival-pack-icon grid h-11 w-11 place-items-center rounded-full bg-white text-blue-900 shadow-sm" title={label}>
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
