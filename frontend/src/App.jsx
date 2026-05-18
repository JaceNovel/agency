import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bell, Building2, CheckCircle2, ChevronDown, CircleDollarSign,
  ClipboardList, CreditCard, FileText, GraduationCap, Home, LayoutDashboard,
  Lock, Mail, Menu, MessageCircle, Plane, Search, Send, Settings,
  ShieldCheck, UserRound, Users, WalletCards, Globe2, Heart, MapPin,
  CalendarDays, Phone, Video, Info, Upload, Banknote, Smartphone, Bus,
  Train, Car, Star, Languages, Wifi, Landmark,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import heroImg from './assets/hero.png'

const queryClient = new QueryClient()

const logos = {
  studyway: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/academia.svg',
  campusFrance: 'https://logo.clearbit.com/campusfrance.org',
  parisSaclay: 'https://logo.clearbit.com/universite-paris-saclay.fr',
  edhec: 'https://logo.clearbit.com/edhec.edu',
  escp: 'https://logo.clearbit.com/escp.eu',
  societeGenerale: 'https://logo.clearbit.com/societegenerale.com',
  bnp: 'https://logo.clearbit.com/bnpparibas.com',
  bpifrance: 'https://logo.clearbit.com/bpifrance.fr',
  sorbonne: 'https://logo.clearbit.com/sorbonne-universite.fr',
  montreal: 'https://logo.clearbit.com/umontreal.ca',
  tum: 'https://logo.clearbit.com/tum.de',
  uclouvain: 'https://logo.clearbit.com/uclouvain.be',
  creditMutuel: 'https://logo.clearbit.com/creditmutuel.fr',
  n26: 'https://logo.clearbit.com/n26.com',
  revolut: 'https://logo.clearbit.com/revolut.com',
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
  { label: 'Universites', icon: Building2, to: '/universites' },
  { label: 'Visa & Immigration', icon: Plane, to: '/visa' },
  { label: 'Finance & Banque', icon: CreditCard, to: '/finance' },
  { label: 'Billets & Transport', icon: Plane, to: '/transport' },
  { label: 'Accompagnement', icon: UserRound, to: '/accompagnement' },
  { label: 'eSIM & Forfait', icon: Smartphone, to: '/esim' },
  { label: 'Messagerie', icon: MessageCircle, to: '/messages', badge: 5 },
  { label: 'Mon profil', icon: Users, to: '/profil' },
  { label: 'Parametres', icon: Settings, to: '/parametres' },
]

const weeklyData = [
  { day: '13 Mai', value: 6 }, { day: '14 Mai', value: 21 }, { day: '15 Mai', value: 18 },
  { day: '16 Mai', value: 27 }, { day: '17 Mai', value: 20 }, { day: '18 Mai', value: 38 },
  { day: '19 Mai', value: 24 },
]

const statusData = [
  { name: 'En cours', value: 3, color: '#2563eb' },
  { name: 'Approuves', value: 1, color: '#31c48d' },
  { name: 'En attente', value: 2, color: '#f7c948' },
  { name: 'Refuses', value: 0, color: '#ef4444' },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
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
            <h1 className="text-4xl font-black leading-tight">Etudiez a l'etranger en toute serenite</h1>
            <div className="mt-10 space-y-6 text-sm font-semibold text-blue-50">
              {['Accompagnement personnalise', 'Dossiers securises et suivis', 'Logement & installation assures', 'Support 24h/7j'].map((item) => (
                <div className="flex items-center gap-3" key={item}><ShieldCheck size={22} /> {item}</div>
              ))}
            </div>
          </div>
          <img src={avatars.kossi} alt="Etudiant StudyWay" className="h-44 w-44 rounded-full border border-white/20 object-cover shadow-2xl shadow-blue-950/40" />
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[560px]">
          <div className="mb-10 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-600 text-white"><img src={logos.studyway} alt="StudyWay" className="h-8 w-8 brightness-0 invert" /></div>
            <div><div className="text-3xl font-black text-slate-950">Study<span className="text-blue-600">Way</span></div><div className="text-xs font-semibold text-slate-500">Votre avenir, notre mission</div></div>
          </div>
          <div className="mb-8">
            <h2 className="text-4xl font-black tracking-tight text-slate-950">{isRegister ? 'Creer un compte' : 'Bienvenue de retour !'}</h2>
            <p className="mt-3 text-slate-500">{isRegister ? "Rejoignez StudyWay et lancez votre projet d'etudes a l'etranger" : 'Connectez-vous a votre compte StudyWay'}</p>
          </div>
          <form className="rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
            {isRegister && <div className="grid gap-4 sm:grid-cols-2"><Field icon={UserRound} label="Prenom" placeholder="Votre prenom" /><Field icon={UserRound} label="Nom" placeholder="Votre nom" /></div>}
            <Field icon={Mail} label="Adresse email" placeholder="votre@email.com" />
            {isRegister && <Field icon={UserRound} label="Numero de telephone" placeholder="+228 90 12 34 56" />}
            <Field icon={Lock} label="Mot de passe" placeholder={isRegister ? 'Creez un mot de passe' : 'Votre mot de passe'} type="password" />
            {isRegister && <Field icon={Lock} label="Confirmer le mot de passe" placeholder="Confirmez votre mot de passe" type="password" />}
            {isRegister && <label className="mt-4 block text-sm font-bold text-slate-700">Vous etes...<select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-600 outline-none focus:border-blue-500"><option>Etudiant</option><option>Parent / Tuteur</option><option>Ecole partenaire</option></select></label>}
            <button type="button" className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">{isRegister ? 'Creer mon compte' : 'Se connecter'} <ArrowRight size={18} /></button>
            <div className="mt-6 text-center text-sm text-slate-500">{isRegister ? 'Vous avez deja un compte ? ' : "Vous n'avez pas de compte ? "}<Link className="font-bold text-blue-600" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Se connecter' : 'Creer un compte'}</Link></div>
          </form>
        </motion.div>
      </section>
      <section className="relative hidden overflow-hidden bg-blue-50 p-10 lg:block">
        <div className="soft-grid absolute inset-0 opacity-80" />
        <div className="relative flex h-full flex-col justify-end gap-6">
          <img src={avatars.christelle} alt="Etudiante StudyWay" className="mx-auto h-80 w-80 rounded-lg object-cover shadow-2xl shadow-blue-200" />
          <InfoCard icon={ShieldCheck} title="Vos donnees sont securisees" text="Securite et confidentialite garanties" />
          <InfoCard icon={CheckCircle2} title="Support dedie" text="Notre equipe est la pour vous accompagner" />
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

function Shell() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#061b47] text-white transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col p-6">
          <Logo />
          <nav className="mt-10 space-y-2">{navItems.map(({ label, icon: Icon, to, badge }) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-bold transition ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/20' : 'text-blue-50 hover:bg-white/10'}`}><Icon size={21} /><span className="flex-1">{label}</span>{badge && <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-xs">{badge}</span>}</NavLink>)}</nav>
          <div className="mt-auto rounded-lg border border-white/10 bg-blue-600/20 p-5"><div className="font-black">Besoin d'aide ?</div><p className="mt-2 text-sm text-blue-100">Notre equipe est disponible 24h/7j.</p><button className="mt-4 h-11 w-full rounded-lg bg-blue-600 text-sm font-bold">Contacter le support</button></div>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:px-8">
          <button className="rounded-lg p-2 hover:bg-slate-100" onClick={() => setOpen(!open)}><Menu /></button>
          <div className="hidden h-12 w-[360px] items-center gap-3 rounded-lg bg-slate-100 px-4 text-slate-500 md:flex"><Search size={18} /><span className="text-sm font-semibold">Rechercher...</span></div>
          <div className="flex items-center gap-4"><button className="relative rounded-lg p-2 hover:bg-slate-100"><Bell /><span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white">3</span></button><button className="rounded-lg p-2 hover:bg-slate-100"><MessageCircle /></button><div className="flex items-center gap-3"><img src={avatars.christelle} alt="Christelle Komi" className="h-11 w-11 rounded-full object-cover" /><div className="hidden sm:block"><div className="font-black">Christelle Komi</div><div className="text-sm text-slate-500">Etudiante</div></div><ChevronDown size={18} /></div></div>
        </header>
        <main className="p-5 lg:p-8"><AnimatedRoutes /></main>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

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
  const services = [
    ['Traduction & Documents', FileText, 'Traduction certifiee, apostille'], ['Visa & Immigration', Plane, 'Dossier complet, suivi et assistance'], ['Logement Etudiant', Home, 'Residences, studios, colocations'], ['Paiement Frais Universitaires', CreditCard, 'Payez vos frais en securite'], ['Billets & Transport', Plane, 'Vols, trains, transferts'], ['Banque & Financement', Landmark, 'Compte etudiant, AVI, prets'],
  ]
  const offers = ['Residence Paris 15', 'Vol Lome - Paris', 'Compte Etudiant', 'Assurance Sante']
  const partnerLogos = [logos.campusFrance, logos.parisSaclay, logos.edhec, logos.escp, logos.societeGenerale, logos.bnp, logos.bpifrance]
  return <div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div className="space-y-6"><section className="relative overflow-hidden rounded-lg bg-[#061b47] p-10 text-white shadow-sm"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,27,71,.95),rgba(6,27,71,.45)),radial-gradient(circle_at_75%_40%,rgba(96,165,250,.35),transparent_32%)]" /><img src={avatars.kossi} alt="Etudiant a Paris" className="absolute bottom-0 right-10 h-72 w-72 rounded-lg object-cover opacity-90" /><div className="relative max-w-xl"><h1 className="text-4xl font-black leading-tight">Votre parcours etudiant, simplifie de A a Z</h1><p className="mt-5 text-lg text-blue-50">Visa, logement, financement, universites... Tout ce dont vous avez besoin, au meme endroit.</p><div className="mt-8 flex gap-4"><button className="rounded-lg bg-blue-600 px-7 py-4 font-black">Commencer ma demande</button><button className="rounded-lg bg-white px-7 py-4 font-black text-blue-950">Decouvrir nos services</button></div></div></section><section><h2 className="mb-4 text-xl font-black">Nos services principaux</h2><div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">{services.map(([label, Icon, sub]) => <div className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm" key={label}><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-600"><Icon /></div><div className="mt-4 font-black">{label}</div><p className="mt-2 text-sm text-slate-500">{sub}</p></div>)}</div></section><section><h2 className="mb-4 text-xl font-black">Offres recommandees pour vous</h2><div className="grid gap-4 md:grid-cols-4">{offers.map((offer, index) => <ProductCard key={offer} title={offer} price={index === 0 ? '450 €/mois' : index === 1 ? '350 000 FCFA' : index === 2 ? 'Gratuit' : '120 €/an'} logo={index === 1 ? logos.airFrance : index === 2 ? logos.societeGenerale : index === 3 ? logos.orange : logos.parisSaclay} />)}</div></section><Panel title="Ils nous font confiance"><div className="grid items-center gap-6 md:grid-cols-7">{partnerLogos.map((src) => <img key={src} src={src} alt="Partenaire StudyWay" className="mx-auto max-h-10 max-w-32 object-contain" />)}</div></Panel></div><div className="space-y-5"><Panel title="Mon statut"><div className="mb-3 flex justify-between"><span className="font-bold">Dossier Visa France</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-600">Actif</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-3/5 rounded-full bg-blue-600" /></div><div className="mt-2 text-right text-sm font-bold">60%</div></Panel><div className="rounded-lg bg-[#061b47] p-6 text-white"><div className="text-lg font-black">Mon portefeuille</div><div className="mt-5 text-sm text-blue-100">Solde disponible</div><div className="mt-1 text-3xl font-black">485 600 FCFA</div><button className="mt-6 h-12 w-full rounded-lg bg-blue-600 font-black">Ajouter de l'argent</button></div><Panel title="Raccourcis rapides"><List items={['Uploader un document', 'Reserver un logement', 'Prendre rendez-vous', 'Demander une AVI', 'Ouvrir un compte bancaire']} /></Panel><div className="rounded-lg bg-[#061b47] p-6 text-white"><div className="text-xl font-black">Parrainez un ami</div><p className="mt-2 text-blue-100">Gagnez jusqu'a 20 000 FCFA</p><button className="mt-5 rounded-lg bg-white/15 px-5 py-3 font-black">Parrainer maintenant</button></div></div></div>
}

function Finance() {
  const banks = [['BNP Paribas', logos.bnp], ['Societe Generale', logos.societeGenerale], ['Credit Mutuel', logos.creditMutuel], ['N26', logos.n26], ['Revolut', logos.revolut]]
  return <div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div className="space-y-6"><section className="relative rounded-lg bg-white p-10"><img src={avatars.kossi} alt="Etudiant finance" className="absolute right-8 top-4 h-60 w-60 rounded-lg object-cover" /><h1 className="max-w-2xl text-5xl font-black leading-tight">Banque & Finance pour etudiants internationaux</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Ouvrez un compte bancaire, transferez de l'argent, gerez votre budget et explorez des solutions de financement adaptees.</p><div className="mt-8 grid gap-4 md:grid-cols-4">{['Ouvrir un compte bancaire', "Transferer de l'argent", 'Financement etudiant', 'Assurance & Protection'].map((x) => <MiniService key={x} icon={Landmark} title={x} />)}</div></section><div className="grid gap-4 md:grid-cols-5">{['+25 Banques partenaires', '150+ Pays couverts', '0 € Frais ouverture', 'Securise Donnees protegees', 'Rapide 24-48h'].map((x) => <div className="rounded-lg border bg-white p-5 font-black" key={x}>{x}</div>)}</div><Panel title="Nos banques partenaires"><div className="grid gap-4 md:grid-cols-5">{banks.map(([bank, logo]) => <BankCard key={bank} title={bank} logo={logo} />)}</div></Panel><Panel title="Solutions de financement"><div className="grid gap-4 md:grid-cols-4">{['Pret etudiant', "Bourse d'etudes", 'Financement participatif', 'Garantie bancaire'].map((x) => <MiniService key={x} icon={Banknote} title={x} />)}</div></Panel></div><div className="space-y-5"><Panel title="Convertisseur de devises"><InputBox value="1 000 EUR" /><div className="my-4 text-center font-black">⇅</div><InputBox value="655 957 XOF" /><p className="mt-4 text-sm font-bold text-slate-500">1 EUR = 655.957 XOF</p><button className="mt-5 h-12 w-full rounded-lg bg-blue-700 font-black text-white">Envoyer de l'argent</button></Panel><Panel title="Besoin d'aide ?"><List items={['Discuter en ligne', 'Appeler un conseiller', 'WhatsApp', 'Prendre rendez-vous']} /></Panel></div></div>
}

function Housing() {
  const homes = ['Studio cosy - Montparnasse', 'Appartement - Lyon Part-Dieu', 'Chambre - Residence etudiante', 'Studio - La Defense', 'T2 lumineux - Paris', 'Colocation meublee']
  return <div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div className="space-y-6"><PageTitle title="Trouvez votre logement" subtitle="Des milliers de logements verifies pour etudiants dans toute l'Europe." /><div className="grid gap-4 rounded-lg border bg-white p-5 md:grid-cols-[1fr_1fr_1fr_1fr_auto]"><Filter label="Ville ou pays" value="Paris, France" /><Filter label="Type de logement" value="Tous les types" /><Filter label="Budget max." value="800 €" /><Filter label="Disponibilite" value="Des maintenant" /><button className="rounded-lg bg-blue-800 px-7 font-black text-white">Rechercher</button></div><div className="grid gap-4 md:grid-cols-4">{['Logements verifies', 'Paiement securise', 'Support 7j/7', 'Annulation flexible'].map((x) => <MiniService key={x} icon={ShieldCheck} title={x} />)}</div><Panel title="Logements disponibles (1,248)"><div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">{homes.map((home, i) => <HomeCard key={home} title={home} price={[750, 680, 450, 800, 720, 520][i]} />)}</div></Panel><Panel title="Pourquoi choisir nos logements ?"><div className="grid gap-4 md:grid-cols-4">{['Logements verifies', 'Paiement securise', 'Accompagnement', 'Communaute etudiante'].map((x) => <MiniService key={x} icon={ShieldCheck} title={x} />)}</div></Panel></div><div className="space-y-5"><SideImage /><Panel title="Rechercher sur la carte"><div className="grid h-56 place-items-center rounded-lg bg-blue-50 text-center font-black text-blue-800">Carte Paris<br /><span className="text-sm text-slate-500">600 € - 900 €</span></div><button className="mt-4 h-12 w-full rounded-lg bg-blue-800 font-black text-white">Voir sur la carte</button></Panel><Panel title="Affiner les resultats"><List items={['Prix 0 € - 1000+ €', 'Studio (342)', 'Appartement (523)', 'Chambre (689)', 'Wi-Fi', 'Meuble']} /></Panel></div></div>
}

function Universities() {
  const items = [['Sorbonne Universite', logos.sorbonne, logos.france], ['Universite de Montreal', logos.montreal, logos.canada], ['Technische Universitat Munchen', logos.tum, logos.germany], ['Universite catholique de Louvain', logos.uclouvain, logos.belgium]]
  return <div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div className="space-y-6"><section className="relative overflow-hidden rounded-lg bg-blue-50 p-10"><img src={avatars.christelle} alt="Etudiante universite" className="absolute bottom-0 right-20 h-72 w-72 rounded-lg object-cover" /><h1 className="max-w-xl text-5xl font-black leading-tight">Trouvez l'universite qui vous correspond</h1><p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">Decouvrez des milliers d'universites partenaires dans le monde et trouvez la formation ideale.</p></section><div className="rounded-lg border bg-white p-5"><div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"><Filter label="Que voulez-vous etudier ?" value="Ex: Informatique, Business..." /><Filter label="Niveau d'etudes" value="Licence" /><Filter label="Pays" value="Tous les pays" /><Filter label="Langue d'enseignement" value="Toutes les langues" /><button className="rounded-lg bg-blue-800 px-8 font-black text-white">Rechercher</button></div><div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">{['Informatique', 'Management', 'Ingenierie', 'Sante', 'Design', 'Droit'].map((x) => <span className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800" key={x}>{x}</span>)}</div></div><div className="grid gap-4 md:grid-cols-4">{['1200+ Universites partenaires', '50+ Pays couverts', '8000+ Programmes disponibles', '25k+ Etudiants accompagnes'].map((x) => <div className="rounded-lg border bg-white p-5 font-black" key={x}>{x}</div>)}</div><Panel title="Universites recommandees"><div className="grid gap-5 md:grid-cols-4">{items.map(([x, logo, flag]) => <UniversityCard key={x} title={x} logo={logo} flag={flag} />)}</div></Panel><Panel title="Parcourir par domaine d'etudes"><div className="grid gap-4 md:grid-cols-5">{['Informatique', 'Business', 'Ingenierie', 'Sante', 'Arts & Design'].map((x) => <MiniService key={x} icon={GraduationCap} title={x} />)}</div></Panel></div><div className="space-y-5"><Panel title="Besoin d'aide pour choisir ?"><p className="text-slate-600">Nos conseillers sont la pour vous aider a trouver la formation ideale.</p><button className="mt-5 h-12 w-full rounded-lg bg-blue-800 font-black text-white">Parler a un conseiller</button></Panel><Panel title="Guide etudiant"><List items={['Comment choisir son universite ?', "Preparer son dossier d'admission", 'Demande de visa etudiant']} /></Panel></div></div>
}

function Profile() {
  return <div className="grid gap-6 xl:grid-cols-[1fr_420px]"><div className="space-y-6"><Panel title="Mon enfant"><div className="flex flex-wrap items-center gap-8"><img src={avatars.kossi} alt="Koffi M. Lucas" className="h-32 w-32 rounded-full object-cover" /><div className="grid flex-1 gap-3 md:grid-cols-2"><h1 className="col-span-full text-2xl font-black">Koffi M. Lucas <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">Actif</span></h1><InfoLine label="ID Etudiant" value="EDU-582941" /><InfoLine label="Email" value="lucas.koffi@email.com" /><InfoLine label="Universite" value="Universite Paris-Saclay" /><InfoLine label="Statut actuel" value="Etudiant" /></div><button className="rounded-lg border border-blue-700 px-6 py-3 font-black text-blue-800">Voir le profil complet</button></div></Panel><div className="grid gap-4 md:grid-cols-4"><StatCard icon={WalletCards} label="Paiements totaux" value="2 450 €" /><StatCard icon={CheckCircle2} label="Paiements effectues" value="2 100 €" tone="green" /><StatCard icon={CircleDollarSign} label="Paiements a venir" value="350 €" tone="amber" /><StatCard icon={FileText} label="Documents" value="12" tone="purple" /></div><Panel title="Suivi des services"><List items={['Logement - Residence Les Estudines, Paris - Actif', 'Universite - Licence Informatique L1 - Inscrit', 'Compte bancaire - Boursorama - Actif', 'Assurance - habitation - Actif', 'Forfait mobile eSIM - Orange 50Go - Actif']} /></Panel></div><div className="space-y-5"><Panel title="Dernieres activites"><List items={['Paiement loyer -550 €', 'Document ajoute - Attestation de scolarite', 'Paiement universite -1 500 €']} /></Panel><Panel title="Actions rapides"><List items={['Effectuer un paiement', "Envoyer de l'argent", 'Telecharger un document', 'Contacter le support']} /></Panel><div className="rounded-lg bg-blue-50 p-6"><h3 className="font-black">Besoin d'aide ?</h3><p className="mt-2 text-slate-600">Notre equipe est disponible 24/7.</p><button className="mt-5 rounded-lg bg-white px-6 py-3 font-black text-blue-800">Contacter le support</button></div></div></div>
}

function SupportJourney() {
  const steps = ['Conseil & Orientation', 'Preparation du dossier', 'Demande de visa', 'Logement & reservation', 'Depart & installation']
  return <div className="space-y-8"><section className="relative overflow-hidden rounded-lg bg-white p-12"><img src={avatars.kossi} alt="Conseiller StudyWay" className="absolute bottom-0 right-24 h-80 w-80 rounded-lg object-cover" /><h1 className="max-w-xl text-5xl font-black leading-tight">Accompagnement personnalise</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Nous vous accompagnons a chaque etape de votre projet d'etudes a l'etranger. De la preparation du dossier a votre installation, vous n'etes jamais seul.</p><div className="mt-8 flex gap-4"><button className="rounded-lg bg-blue-800 px-8 py-4 font-black text-white">Demarrer mon accompagnement</button><button className="rounded-lg border px-8 py-4 font-black text-blue-800">Voir la video</button></div></section><div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div><h2 className="text-2xl font-black">Nos etapes d'accompagnement</h2><ProcessLine steps={steps} activeIndex={2} icons={[UserRound, FileText, Plane, Home, MapPin]} /><div className="mt-6 rounded-lg bg-blue-50 p-5 font-bold text-blue-950">Important: la decision finale d'octroi du visa appartient exclusivement aux autorites consulaires.</div></div><Panel title="Besoin d'aide ?"><List items={['Chat en direct 24h/7j', 'WhatsApp +228 90 12 34 56', 'Email contact@studyway.com', 'Prendre rendez-vous']} /></Panel></div></div>
}

function Visa() {
  const steps = ['Preparation dossier', 'Soumission', 'Rendez-vous', 'Entretien', 'Decision', 'Visa delivre']
  return <div className="grid gap-6 xl:grid-cols-[1fr_380px]"><div className="space-y-6"><section className="grid gap-4 md:grid-cols-4">{[['France court sejour', logos.france], ['France long sejour', logos.france], ['Canada court sejour', logos.canada], ['Canada long sejour', logos.canada]].map(([x, flag]) => <div className="rounded-lg border bg-white p-5"><img src={flag} alt="" className="h-7 w-10 rounded object-cover" /><h3 className="mt-3 font-black">{x}</h3><p className="mt-2 text-sm text-slate-500">Selectionnez ce visa pour commencer votre dossier.</p></div>)}</section><PageTitle title="Mon dossier de visa France" subtitle="Etudes en France - Campus France" /><Panel title="Progression"><ProcessLine steps={steps} activeIndex={2} icons={[FileText, Upload, CalendarDays, UserRound, ClipboardList, ShieldCheck]} /></Panel><Panel title="Informations du rendez-vous"><div className="grid gap-4 md:grid-cols-4">{['05 Juin 2024', '09:30', 'TLScontact Paris', 'Visa etudiant (VLS-TS)'].map((x) => <div className="font-black" key={x}>{x}</div>)}</div></Panel><Panel title="Etapes de mon dossier"><VerticalTimeline items={['Dossier cree - 12 Mai 2024', 'Dossier soumis a Campus France - 20 Mai 2024', 'Rendez-vous pris - 28 Mai 2024', 'Entretien - A venir', 'Decision - En attente', 'Visa delivre - En attente']} activeIndex={2} /></Panel></div><div className="space-y-5"><Panel title="Mon agent"><div className="flex items-center gap-4"><img src={avatars.koffi} alt="Koffi Adjo" className="h-16 w-16 rounded-full object-cover" /><div><div className="font-black">Koffi Adjo</div><div className="text-slate-500">Agent visa</div></div></div><List items={['+228 90 12 34 56', 'Discuter sur WhatsApp', 'Envoyer un message']} /></Panel><Panel title="Documents requis"><List items={['Passeport - Valide', "Lettre d'admission - Valide", 'Preuve de ressources - Valide', 'Assurance voyage - Valide', 'Releves bancaires - Manquant', 'Certificat de scolarite - Manquant']} /></Panel></div></div>
}

function Transport() {
  const flights = [['Air France', logos.airFrance], ['Ethiopian Airlines', logos.ethiopian], ['Turkish Airlines', logos.turkish], ['RwandAir', logos.rwandair]]
  return <div className="grid gap-6 xl:grid-cols-[1fr_330px]"><div className="space-y-6"><PageTitle title="Billets & Transport" subtitle="Reservez vos billets d'avion, train, bus, tram ou chauffeur en toute simplicite." /><div className="flex gap-4">{[['Avion', Plane], ['Train', Train], ['Bus', Bus], ['Tram / Metro', Train], ['Chauffeur', Car]].map(([x, Icon]) => <button className="flex items-center gap-2 rounded-lg border bg-white px-7 py-4 font-black text-blue-800"><Icon size={18} />{x}</button>)}</div><div className="grid gap-4 rounded-lg border bg-white p-5 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"><Filter label="De" value="Lome (LFW)" /><Filter label="Vers" value="Paris (CDG)" /><Filter label="Date aller" value="25 juin 2025" /><Filter label="Date retour" value="10 aout 2025" /><Filter label="Passagers" value="1 Passager" /><button className="rounded-lg bg-blue-700 px-8 font-black text-white">Rechercher</button></div><Panel title="Vols disponibles"><div className="divide-y">{flights.map(([f, logo], i) => <div className="grid items-center gap-4 py-5 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]"><div className="flex items-center gap-4 font-black"><img src={logo} alt={f} className="h-12 w-12 rounded-lg object-contain" /><span>{f}<div className="text-sm text-slate-500">{['AF 753', 'ET 920', 'TK 569', 'WB 704'][i]}</div></span></div><div><b>{['23:45', '15:20', '09:10', '13:30'][i]}</b><div className="text-sm text-slate-500">LFW Lome</div></div><div className="text-sm font-bold text-emerald-600">{i === 0 ? 'Direct' : '1 escale'}</div><div className="text-2xl font-black text-blue-800">{[450, 385, 420, 372][i]} €</div><button className="rounded-lg bg-blue-700 px-6 py-3 font-black text-white">Choisir</button></div>)}</div></Panel><div className="rounded-lg bg-blue-50 p-6"><h2 className="text-2xl font-black">Pack Arrivee France</h2><p className="mt-2 text-slate-600">Vol + Train + eSIM + Chauffeur + Logement</p></div></div><div className="space-y-5"><Panel title="Mon voyage"><List items={['Aller 25 juin 2025', '23:45 LFW -> 07:30 CDG', 'Passager 1 Adulte']} /><button className="mt-4 h-12 w-full rounded-lg bg-blue-700 font-black text-white">Continuer vers la reservation</button></Panel><Panel title="Transport sur place"><List items={['Train / RER', 'Tram / Metro', 'Bus', 'Chauffeur (Uber)']} /></Panel><Panel title="Reservation securisee"><List items={['Paiement 100% securise', 'Support 24/7', 'Billet envoye par email']} /></Panel></div></div>
}

function Esim() {
  const plans = ['Europe 10 Go', 'Europe 20 Go', 'Europe 50 Go', 'Monde 5 Go', 'Monde 20 Go']
  return <div className="grid gap-6 xl:grid-cols-[1fr_360px]"><div className="space-y-6"><PageTitle title="eSIM & Forfait" subtitle="Restez connecte des votre arrivee a l'etranger" /><section className="relative rounded-lg bg-blue-50 p-8"><Smartphone size={120} className="absolute left-8 top-10 text-blue-300" /><div className="ml-48"><h2 className="text-2xl font-black">Internet partout dans le monde</h2><List items={['Activation instantanee', 'Pas de carte physique', 'Forfaits flexibles et sans engagement', 'Reseaux fiables et securises']} /></div></section><Panel title="Nos forfaits populaires"><div className="grid gap-4 md:grid-cols-5">{plans.map((p, i) => <motion.div whileHover={{ y: -8, scale: 1.02 }} className={`rounded-lg border bg-white p-5 ${i === 2 ? 'border-blue-600 ring-2 ring-blue-100' : ''}`}><img src={i < 3 ? logos.europe : logos.orange} alt="" className="h-9 w-9 rounded-full object-contain" /><h3 className="mt-4 text-xl font-black">{p}</h3><p className="mt-3 text-sm text-slate-500">30 jours<br />Appels illimites<br />SMS illimites</p><div className="mt-6 text-xl font-black">{[15000, 25000, 45000, 15000, 40000][i].toLocaleString('fr-FR')} FCFA</div><button className="mt-5 h-11 w-full rounded-lg bg-blue-600 font-black text-white">Choisir</button></motion.div>)}</div></Panel><Panel title="Mes eSIM"><List items={['Europe 10 Go - Active - 10 Go / 10 Go', 'USA 5 Go - Expiree - 5 Go / 5 Go']} /></Panel></div><div className="space-y-5"><div className="rounded-lg bg-[#061b47] p-6 text-white"><div className="flex justify-between"><h3 className="font-black">Mon eSIM actuelle</h3><span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-black">Active</span></div><div className="mt-5 flex items-center gap-3 text-xl font-black"><img src={logos.europe} alt="Europe" className="h-10 w-10 rounded-full" />Europe 10 Go</div><p className="text-blue-100">Valable jusqu'au 25 Juin 2024</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.1, ease: 'easeOut' }} className="h-2 rounded-full bg-cyan-300" /></div><button className="mt-6 h-12 w-full rounded-lg bg-white/10 font-black">Voir les details</button></div><Panel title="Comment ca marche ?"><VerticalTimeline items={['Choisissez votre forfait', 'Achetez et recevez votre eSIM', 'Scannez le QR code', "Profitez d'internet"]} activeIndex={3} /></Panel><div className="rounded-lg bg-blue-800 p-6 text-white"><h3 className="text-xl font-black">Parrainez un ami</h3><p className="mt-2">Gagnez 2 000 FCFA pour chaque ami parraine.</p><button className="mt-5 rounded-lg bg-white px-5 py-3 font-black text-blue-800">Parrainer maintenant</button></div></div></div>
}

function Messages() {
  const threads = ['Support StudyWay', 'Agent - Visa France', 'Residence Paris 15', 'Groupe - Etudiants Paris', 'Service Finance', 'Maman', 'Support Voyage']
  return <><PageTitle title="Messages" subtitle="Communiquez avec l'equipe StudyWay" /><div className="grid min-h-[680px] gap-5 xl:grid-cols-[420px_1fr]"><Panel title="Conversations"><div className="space-y-2">{threads.map((thread, index) => <div className={`flex items-center gap-3 rounded-lg p-4 ${index === 0 ? 'bg-blue-50' : 'hover:bg-slate-50'}`} key={thread}><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-600 font-black text-white">{thread.slice(0, 2)}</div><div className="min-w-0 flex-1"><div className="truncate font-black">{thread}</div><div className="truncate text-sm text-slate-500">Votre dossier est en verification...</div></div><span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-black text-white">1</span></div>)}</div></Panel><Panel title="Support StudyWay"><div className="flex h-[560px] flex-col"><div className="flex-1 space-y-6 overflow-auto"><Bubble align="left">Bonjour Christelle, nous avons bien recu tous vos documents pour votre demande de visa etudiant. Votre dossier est en cours de verification.</Bubble><Bubble align="right">Bonjour, merci beaucoup pour l'information. J'attends votre retour avec impatience.</Bubble><Bubble align="left">Avec plaisir. N'hesitez pas si vous avez d'autres questions.</Bubble></div><div className="mt-5 flex items-center gap-3 rounded-lg border border-slate-200 p-3"><input className="flex-1 outline-none" placeholder="Ecrire un message..." /><button className="grid h-11 w-11 place-items-center rounded-lg bg-blue-600 text-white"><Send size={20} /></button></div></div></Panel></div></>
}

function ProductCard({ title, price, logo }) {
  return <motion.div whileHover={{ y: -8, scale: 1.015 }} className="overflow-hidden rounded-lg border bg-white shadow-sm"><div className="relative h-36 bg-gradient-to-br from-blue-100 to-slate-200"><img src={heroImg} alt="" className="h-full w-full object-cover opacity-70" /><button className="absolute right-3 top-3 rounded-full bg-white p-2"><Heart size={18} /></button>{logo && <img src={logo} alt={title} className="absolute bottom-3 left-3 h-10 w-10 rounded-lg bg-white object-contain p-1 shadow" />}</div><div className="p-4"><h3 className="font-black">{title}</h3><p className="mt-1 text-sm text-slate-500">Paris, France</p><div className="mt-4 flex items-center justify-between"><span className="text-xl font-black text-emerald-700">{price}</span><span className="text-sm font-bold text-amber-500">★ 4.8</span></div></div></motion.div>
}

function MiniService({ icon: Icon, title }) {
  return <motion.div whileHover={{ y: -6 }} className="rounded-lg border border-slate-200 bg-white p-5"><div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon size={20} /></div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">Service premium StudyWay, suivi par nos conseillers.</p></motion.div>
}

function BankCard({ title, logo }) {
  return <div className="rounded-lg border bg-white p-5"><img src={logo} alt={title} className="mb-4 h-10 max-w-36 object-contain" /><h3 className="text-xl font-black">{title}</h3><p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800">Compte etudiant</p><ul className="mt-4 space-y-3 text-sm font-semibold text-slate-600"><li>✓ Carte bancaire internationale</li><li>✓ Application mobile</li><li>✓ Ouverture en ligne</li></ul></div>
}

function InputBox({ value }) {
  return <div className="rounded-lg border bg-white px-4 py-3 text-xl font-black">{value}</div>
}

function Filter({ label, value }) {
  return <div><div className="text-xs font-bold text-slate-500">{label}</div><div className="mt-2 font-black">{value}</div></div>
}

function HomeCard({ title, price }) {
  return <motion.div whileHover={{ y: -8, scale: 1.015 }} className="overflow-hidden rounded-lg border bg-white shadow-sm"><div className="relative h-44 bg-gradient-to-br from-stone-200 to-blue-100"><img src={heroImg} alt="" className="h-full w-full object-cover opacity-60" /><span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">Verifie</span><button className="absolute right-3 top-3 rounded-full bg-white p-2"><Heart size={18} /></button></div><div className="p-4"><h3 className="font-black">{title}</h3><p className="text-sm text-slate-500">Paris, France</p><div className="mt-4 text-xl font-black">{price} € <span className="text-sm font-medium">/ mois</span></div><p className="mt-3 text-sm font-bold text-emerald-600">Disponible maintenant</p></div></motion.div>
}

function UniversityCard({ title, logo, flag }) {
  return <motion.div whileHover={{ y: -8, scale: 1.015 }} className="overflow-hidden rounded-lg border bg-white shadow-sm"><div className="relative h-40 bg-blue-100"><img src={heroImg} alt="" className="h-full w-full object-cover opacity-70" /><span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-black"><img src={flag} alt="" className="h-4 w-6 rounded object-cover" />Pays</span><button className="absolute right-3 top-3 rounded-full bg-white p-2"><Heart size={18} /></button></div><div className="p-4"><div className="flex items-center gap-3"><img src={logo} alt={title} className="h-11 w-11 rounded-lg object-contain" /><h3 className="font-black">{title}</h3></div><p className="mt-2 text-sm text-slate-500">Paris, France</p><p className="mt-4 text-sm font-bold text-slate-500">QS World Ranking : #63</p><div className="mt-4 flex justify-between text-sm text-slate-500"><span>120 Programmes</span><span>Francais, Anglais</span></div></div></motion.div>
}

function SideImage() {
  return <div className="overflow-hidden rounded-lg border bg-white"><img src={heroImg} alt="" className="h-40 w-full object-cover" /><div className="p-5"><h3 className="font-black">Besoin d'aide ?</h3><p className="mt-2 text-sm text-slate-500">Nos conseillers sont la pour vous aider</p><button className="mt-4 h-11 w-full rounded-lg bg-blue-50 font-black text-blue-800">Parler a un conseiller</button></div></div>
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

function FundingTimeline() {
  return <div className="rounded-lg bg-emerald-50 p-5"><div className="text-2xl font-black">3 500 000 XOF</div><div className="mt-1 text-sm font-bold text-emerald-700">Financement etudiant approuve</div><div className="mt-6 grid grid-cols-4 gap-3 text-center text-xs font-bold text-slate-600">{['Demande', 'Etude dossier', 'Approuve', 'Deblocage'].map((item, i) => <div key={item}><div className={`mx-auto mb-2 h-3 w-3 rounded-full ${i < 3 ? 'bg-emerald-500' : 'bg-slate-300'}`} />{item}</div>)}</div></div>
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
            <p className="mt-3 text-sm leading-6 text-slate-600">{isDone ? 'Complete' : isActive ? 'En cours' : 'A venir'}</p>
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
            <div className="mt-1 text-sm text-slate-500">{isDone ? 'Termine' : isActive ? 'Action en cours de traitement' : 'Prochaine etape'}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

function Bubble({ align, children }) {
  return <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-lg rounded-lg p-5 text-sm leading-7 shadow-sm ${align === 'right' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>{children}</div></div>
}

function Placeholder() {
  const location = useLocation()
  const title = useMemo(() => location.pathname.replace('/', '') || 'Module', [location.pathname])
  return <><PageTitle title={title.charAt(0).toUpperCase() + title.slice(1)} subtitle="Module premium prepare dans l'architecture frontend StudyWay." /><Panel title="Interface en preparation"><p className="text-slate-500">La route est prete pour recevoir les composants metier et les donnees API.</p></Panel></>
}

export default App
