import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, ChevronLeft, ChevronRight,
  Compass, FlaskConical, Leaf, Mail, Menu, Network, Phone, Plus, Users, X,
} from 'lucide-react'
import content from './data/siteContent.json'

const site = (path) => `https://icue.vn${path}`
const navigation = [
  { id: 'about', title: 'Về ICUE', note: 'Tư duy & tầm nhìn' },
  { id: 'services', title: 'Năng lực', note: 'Nghiên cứu & tư vấn' },
  { id: 'projects', title: 'Dự án', note: 'Từ ý tưởng đến thực tiễn' },
  { id: 'people', title: 'Con người', note: 'Chuyên gia & cộng sự' },
  { id: 'journal', title: 'Góc nhìn', note: 'Nhịp sống ICUE' },
  { id: 'contact', title: 'Kết nối', note: 'Cùng bắt đầu điều mới' },
]
const serviceLabels = ['ĐÁNH GIÁ', 'KHẢO SÁT', 'HẠ TẦNG', 'KHÔNG GIAN']
const serviceEnglish = ['Assessment', 'Survey & engineering', 'Infrastructure', 'Spatial documentation']
const values = [
  { title: 'Khoa học làm nền tảng', icon: FlaskConical, image: '/media/office.webp', alt: 'Buổi làm việc của đội ngũ ICUE cùng đối tác', text: 'Kết nối nghiên cứu khoa học với thực tiễn. Mỗi giải pháp được xây dựng từ dữ liệu, khảo sát và góc nhìn chuyên sâu về kinh tế, xây dựng và đô thị.' },
  { title: 'Cộng đồng là trung tâm', icon: Users, image: '/media/community.webp', alt: 'Không gian xanh và hoạt động cộng đồng', text: 'Không gian tốt bắt đầu từ nhu cầu của con người. Chúng tôi hướng tới những đô thị cân bằng giữa chức năng, khả năng phục hồi và đời sống cộng đồng.' },
  { title: 'Kết nối để đi xa', icon: Network, image: '/media/collaboration.webp', alt: 'ICUE tại hội thảo về không gian công cộng cùng UN-Habitat và HealthBridge', text: 'Hợp tác liên ngành, trong nước và quốc tế để chia sẻ tri thức, chuyển giao công nghệ và đưa những sáng kiến phát triển đô thị vào cuộc sống.' },
  { title: 'Hướng tới bền vững', icon: Leaf, image: '/media/survey.webp', alt: 'Cán bộ ICUE trong chuyến khảo sát thực địa', text: 'Phát triển đô thị xanh, thích ứng với biến đổi khí hậu và bảo vệ môi trường tự nhiên là định hướng xuyên suốt trong nghiên cứu và tư vấn của ICUE.' },
]

function Eyebrow({ children, number, light = false }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span className="eyebrow-dot" />{children}{number && <span className="section-number">/ {number}</span>}</div>
}

function RoundArrow({ direction = 'up', className = '' }) {
  const Icon = direction === 'down' ? ArrowDown : direction === 'right' ? ArrowRight : ArrowUpRight
  return <span className={`round-arrow ${className}`}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
}

function OrbitStamp() {
  return <a className="orbit-stamp" href="#services" aria-label="Khám phá năng lực ICUE">
    <svg viewBox="0 0 140 140" className="orbit-type" aria-hidden="true">
      <defs><path id="orbit-path" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
      <text><textPath href="#orbit-path" textLength="326">NGHIÊN CỨU · QUY HOẠCH · PHÁT TRIỂN · </textPath></text>
    </svg>
    <span><ArrowDown size={28} strokeWidth={1.5} /></span>
  </a>
}

function ArchitecturalLines() {
  return <svg className="architectural-lines" viewBox="0 0 700 900" fill="none" aria-hidden="true">
    <g transform="translate(160 530)">{Array.from({ length: 30 }, (_, i) => <rect key={i} x={-280 + i * 3} y={-280 + i * 3} width={560 - i * 6} height={560 - i * 6} rx="2" transform={`rotate(${i * 3.5})`} />)}</g>
  </svg>
}

function Services() {
  const [active, setActive] = useState(0)
  return <section id="services" className="services section-shell">
    <div className="section-heading">
      <div><Eyebrow number="02">NĂNG LỰC ICUE</Eyebrow><h2>TỪ HIỂU BIẾT.<br />ĐẾN GIẢI PHÁP.</h2></div>
      <p className="section-lead">Bốn nhóm dịch vụ kỹ thuật.<br />Một góc nhìn toàn diện cho dự án của bạn.</p>
    </div>
    <div className="service-list">
      {content.services.map((service, i) => {
        const open = active === i
        return <article className={`service${open ? ' is-open' : ''}`} key={service.code}>
          <h3><button className="service-trigger" aria-expanded={open} aria-controls={`service-panel-${i}`} onClick={() => setActive(open ? -1 : i)}>
            <span className="row-number">{service.num}</span>
            <span className="service-name">{serviceLabels[i]}</span>
            <span className="service-subtitle">{serviceEnglish[i]}</span>
            <span className="accordion-toggle"><Plus size={23} strokeWidth={1.2} /></span>
          </button></h3>
          <div id={`service-panel-${i}`} className="accordion-panel" aria-hidden={!open} inert={!open}>
            <div className="accordion-panel-inner">
              <div className="service-body">
                <div className="service-description"><h4>{service.title}</h4><p>{service.desc}</p></div>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <img src={service.img} alt={service.title} loading="lazy" width="420" height="280" />
              </div>
            </div>
          </div>
        </article>
      })}
    </div>
    <a className="text-link section-bottom-link" href={site('/our-work')}>Tìm hiểu phạm vi công việc <ArrowUpRight size={18} /></a>
  </section>
}

function Projects() {
  const [active, setActive] = useState(0)
  const selected = content.projects[active]
  const nextProject = (amount) => setActive((active + amount + content.projects.length) % content.projects.length)
  return <section id="projects" className="projects section-shell">
    <div className="section-heading">
      <div><Eyebrow number="03">DỰ ÁN TIÊU BIỂU</Eyebrow><h2>MỖI VÙNG ĐẤT.<br />MỘT TẦM NHÌN.</h2></div>
      <a href={site('/past-projects')} className="text-link">Tất cả dự án <ArrowUpRight size={20} /></a>
    </div>
    <div className="project-showcase">
      <div className="project-media">
        <a href={site(`/past-projects/${selected.id}`)} className={`project-image-link${selected.id === '3' ? ' project-map' : ''}`} aria-label={`Khám phá dự án: ${selected.title}`}>
          <img key={selected.id} src={selected.image} alt={selected.imageAlt} loading="lazy" width="900" height="750" />
          <span className="project-year">{selected.year} <ArrowUpRight size={17} /></span>
        </a>
        <div className="project-media-caption"><span>{selected.location}</span><div className="project-controls"><button onClick={() => nextProject(-1)} aria-label="Dự án trước"><ChevronLeft size={19} /></button><span>0{active + 1} <i>/ 03</i></span><button onClick={() => nextProject(1)} aria-label="Dự án tiếp theo"><ChevronRight size={19} /></button></div></div>
      </div>
      <div className="project-options" aria-label="Chọn dự án để khám phá">
        {content.projects.map((project, i) => <div className={`project-option${i === active ? ' is-active' : ''}`} key={project.id}>
          <h3><button onClick={() => setActive(i)} aria-expanded={i === active} aria-controls={`project-description-${project.id}`}><span className="row-number">0{i + 1}</span><span>{project.title}</span><ArrowUpRight size={23} strokeWidth={1.4} /></button></h3>
          <div className="project-description" id={`project-description-${project.id}`} hidden={i !== active}>
            <span className="project-scale">{project.scale}</span>
            <p>{project.body.split('. ')[0]}.</p>
            <a className="text-link" href={site(`/past-projects/${project.id}`)}>Khám phá dự án <ArrowRight size={17} /></a>
          </div>
        </div>)}
        <p className="project-footnote">Quy hoạch hôm nay.<br /><span>Giá trị cho những thế hệ mai sau.</span></p>
      </div>
    </div>
  </section>
}

function People({ onSelect }) {
  const [group, setGroup] = useState('experts')
  const people = content.people.filter((person) => person.group === group)
  return <section id="people" className="people-section">
    <div className="people-intro">
      <ArchitecturalLines />
      <Eyebrow number="04" light>CON NGƯỜI ICUE</Eyebrow>
      <h2>CHUYÊN MÔN.<br />TẬN TÂM.<br /><span>ĐỒNG HÀNH.</span></h2>
      <p>Những chuyên gia và cộng sự cùng chia sẻ một tầm nhìn: kiến tạo các đô thị tốt đẹp hơn cho con người.</p>
      <a className="text-link" href={site('/people')}>Gặp gỡ toàn bộ đội ngũ <ArrowUpRight size={19} /></a>
      <span className="people-signature">DIVERSE MINDS. SHARED VISION.</span>
    </div>
    <div className="people-directory">
      <div className="people-directory-head"><h3>Cùng làm nên ICUE.</h3><div className="people-filters" aria-label="Nhóm nhân sự"><button aria-pressed={group === 'experts'} onClick={() => setGroup('experts')}>Chuyên gia</button><button aria-pressed={group === 'core'} onClick={() => setGroup('core')}>Cán bộ</button></div></div>
      <div className="people-grid">
        {people.map((person) => <button className="person-card" key={person.id} onClick={() => onSelect(person)} aria-label={`Xem hồ sơ ${person.name}`}>
          <span className="person-photo"><img src={person.photo} alt={person.name} loading="lazy" width="400" height="440" /><span className="person-photo-cta"><ArrowUpRight size={22} /></span></span>
          <span className="person-name">{person.name}</span>
          <span className="person-role">{person.id === 'nguyen-hong-hanh' ? 'Tiến sĩ · Viện trưởng' : `${person.honorific ? person.honorific + ' · ' : ''}${person.title}`}</span>
        </button>)}
      </div>
      <p className="directory-hint"><span /> Chạm vào chân dung để hiểu thêm về chúng tôi.</p>
    </div>
  </section>
}

function Values() {
  const [active, setActive] = useState(0)
  return <section className="values section-shell" id="approach">
    <div className="section-heading"><div><Eyebrow number="05">CÁCH CHÚNG TÔI LÀM VIỆC</Eyebrow><h2>CHUNG GIÁ TRỊ.<br />CHUNG HƯỚNG ĐI.</h2></div><p className="section-lead">Giải pháp tốt đến từ chuyên môn.<br />Tác động dài hạn đến từ cách chúng ta cùng làm.</p></div>
    <div className="values-layout">
      <div className="values-list">
        {values.map((value, i) => {
          const Icon = value.icon
          const open = active === i
          return <article className={`value${open ? ' is-open' : ''}`} key={value.title}>
            <h3><button aria-expanded={open} aria-controls={`value-${i}`} onClick={() => setActive(i)}><Icon size={30} strokeWidth={1.4} /><span>{value.title}</span><Plus size={17} strokeWidth={1.5} className="value-plus" /></button></h3>
            <div className="accordion-panel" id={`value-${i}`} aria-hidden={!open} inert={!open}><div className="accordion-panel-inner"><p>{value.text}</p></div></div>
          </article>
        })}
        <a className="text-link values-careers" href={site('/recruitment')}>Bạn cũng chia sẻ những giá trị này? <ArrowUpRight size={18} /></a>
      </div>
      <figure className="value-image"><img key={active} src={values[active].image} alt={values[active].alt} loading="lazy" width="700" height="800" /><figcaption><span>VĂN HÓA ICUE</span><span>0{active + 1} / 04</span></figcaption></figure>
    </div>
  </section>
}

function Journal() {
  const categories = ['SỰ KIỆN', 'HỢP TÁC QUỐC TẾ', 'CỘNG ĐỒNG']
  return <section className="journal section-shell" id="journal">
    <div className="section-heading"><div><Eyebrow number="06">TIN TỨC & GÓC NHÌN</Eyebrow><h2>NHỊP SỐNG ICUE.</h2></div><a href={site('/newsroom')} className="text-link">Đến bản tin ICUE <ArrowUpRight size={19} /></a></div>
    <div className="journal-grid">{content.news.map((article, i) => <a className="journal-card" key={article.id} href={site(`/news-archive/${article.id}`)}>
      <div className="journal-image"><img src={article.image} alt={article.imageAlt} loading="lazy" width="600" height="380" /><span><ArrowUpRight size={23} /></span></div>
      <div className="journal-category"><span>{categories[i]}</span><span>0{i + 1}</span></div>
      <h3>{article.title}</h3>
    </a>)}</div>
  </section>
}

function Faq() {
  const [active, setActive] = useState(-1)
  return <section className="faq section-shell" id="faq">
    <div><Eyebrow>CÂU HỎI THƯỜNG GẶP</Eyebrow><h2>BẠN MUỐN<br />BIẾT THÊM?</h2><a className="text-link" href={site('/faqs')}>Tất cả câu hỏi <ArrowUpRight size={18} /></a></div>
    <div className="faq-list">{content.faq.map((item, i) => <article className={`faq-item${i === active ? ' is-open' : ''}`} key={item.q}>
      <h3><button aria-expanded={i === active} aria-controls={`faq-answer-${i}`} onClick={() => setActive(i === active ? -1 : i)}>{item.q}<Plus size={19} strokeWidth={1.4} /></button></h3>
      <div className="accordion-panel" id={`faq-answer-${i}`} aria-hidden={i !== active} inert={i !== active}><div className="accordion-panel-inner"><p>{item.a}</p></div></div>
    </article>)}</div>
  </section>
}

export default function App() {
  const menuDialog = useRef(null)
  const personDialog = useRef(null)
  const [person, setPerson] = useState(null)
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setCurrentSection(entry.target.id)
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (person && !personDialog.current.open) personDialog.current.showModal()
  }, [person])

  const closeMenu = () => { menuDialog.current.close(); setMenuOpen(false) }
  const openMenu = () => { menuDialog.current.showModal(); setMenuOpen(true) }
  const sectionIndex = { home: '00', about: '01', services: '02', projects: '03', people: '04', approach: '05', journal: '06', faq: '06', contact: '07' }[currentSection] || '00'

  return <>
    <a className="skip-link" href="#main-content">Tới nội dung chính</a>
    <aside className="side-rail" aria-label="Điều hướng nhanh">
      <button className="menu-button" aria-label="Mở menu điều hướng" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={openMenu}><Menu size={21} strokeWidth={1.4} /></button>
      <a className="rail-brand" href="#home" aria-label="ICUE — Về đầu trang"><img src="/media/icue-mark-light.svg" alt="" width="38" height="38" /><span>ICUE VIETNAM</span></a>
      <div className="rail-links"><a href={content.contact.facebook} aria-label="ICUE trên Facebook"><span className="facebook-glyph" aria-hidden="true">f</span></a><a href={`mailto:${content.contact.email}`} aria-label="Gửi email cho ICUE"><Mail size={18} strokeWidth={1.5} /></a><a href={`tel:${content.contact.tel}`} aria-label="Gọi điện cho ICUE"><Phone size={17} strokeWidth={1.5} /></a><span className="rail-section">{sectionIndex}</span></div>
    </aside>

    <div className="page-wrap">
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="ICUE — Trang chủ"><img src="/media/icue-mark.svg" alt="" width="43" height="43" /><span>ICUE<span className="wordmark-dot">®</span></span></a>
        <span className="header-institute">VIỆN NGHIÊN CỨU KINH TẾ<br />XÂY DỰNG VÀ ĐÔ THỊ</span>
        <nav className="header-nav" aria-label="Điều hướng chính"><a href="#about">Về ICUE</a><a href="#projects">Dự án</a><a href="#contact" className="header-contact"><span /> Cùng hợp tác <ArrowUpRight size={17} /></a></nav>
      </header>

      <main id="main-content">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-visual"><img src="/media/park-city.jpg" alt="Phối cảnh quy hoạch khu đô thị sinh thái Park City Xuân An của ICUE" width="2560" height="1440" fetchPriority="high" /><div className="hero-image-tag"><span /> QUY HOẠCH CHO MỘT NGÀY MAI TỐT HƠN</div><OrbitStamp /><div className="hero-image-caption"><span>PARK CITY XUÂN AN</span><p>KHÔNG GIAN XANH.<br />GIÁ TRỊ BỀN VỮNG.</p></div></div>
          <div className="hero-copy"><p className="hero-kicker"><span /> TƯ DUY MỚI. GIÁ TRỊ MỚI.</p><h1 id="hero-title">KIẾN TẠO<br />TƯƠNG LAI<span className="accent">.</span></h1><p className="hero-description">Kết nối nghiên cứu, quy hoạch và cộng đồng.<br />Cùng kiến tạo những đô thị bền vững,<br className="desktop-break" /> sẵn sàng cho ngày mai.</p><a className="hero-cta" href="#projects">Khám phá dự án <RoundArrow direction="right" /></a><a className="team-teaser" href="#people"><span className="avatar-stack">{content.people.slice(0, 4).map((p) => <img src={p.photo} key={p.id} alt="" width="48" height="48" />)}</span><span>Con người<br /><strong>làm nên ICUE <ArrowUpRight size={15} /></strong></span></a></div>
        </section>
        <div className="hero-bottom"><a href="#about"><ArrowDown size={14} /> CUỘN ĐỂ KHÁM PHÁ</a><span>NGHIÊN CỨU <i>/</i> QUY HOẠCH <i>/</i> PHÁT TRIỂN</span><span>HÀ NỘI, VIỆT NAM</span></div>

        <section id="about" className="about section-shell">
          <Eyebrow number="01">CHÚNG TÔI LÀ ICUE</Eyebrow>
          <div className="about-layout"><h2>TƯ DUY LIÊN NGÀNH.<br /><span>GIÁ TRỊ DÀI HẠN.</span></h2><div className="about-copy"><p>Viện Nghiên cứu Kinh tế Xây dựng và Đô thị — nơi chuyên môn, sáng kiến và trách nhiệm với cộng đồng cùng hội tụ.</p><p>Thành lập ngày 16.04.2013, trực thuộc Tổng hội Xây dựng Việt Nam, ICUE kết nối nghiên cứu khoa học với những giải pháp thực tiễn về quy hoạch, phát triển đô thị và bảo vệ môi trường.</p><a href={site('/about-us')} className="text-link">Câu chuyện của chúng tôi <ArrowUpRight size={18} /></a></div></div>
          <div className="about-facts"><div><strong>2013<span>↗</span></strong><span>NĂM THÀNH LẬP</span></div><div><strong>20<span>+</span></strong><span>CÁN BỘ & CHUYÊN VIÊN</span></div><div><strong>04<span>↗</span></strong><span>NHÓM DỊCH VỤ KỸ THUẬT</span></div><div className="about-compass"><Compass size={68} strokeWidth={0.8} /><span>GÓC NHÌN TOÀN DIỆN.<br />GIẢI PHÁP THỰC TIỄN.</span></div></div>
        </section>

        <Services />
        <Projects />
        <People onSelect={setPerson} />
        <Values />
        <Journal />
        <Faq />

        <section className="contact-section" id="contact">
          <Eyebrow number="07">BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN</Eyebrow>
          <div className="contact-title-row"><h2>CÙNG NHAU,<br />ĐI XA HƠN<span>.</span></h2><a href={site('/contact')} className="contact-big-arrow" aria-label="Liên hệ hợp tác cùng ICUE"><ArrowUpRight size={64} strokeWidth={1.1} /></a></div>
          <div className="contact-summary"><p>Bạn có một ý tưởng, một vùng đất, một tầm nhìn?<br />Hãy cùng ICUE biến điều đó thành giá trị thực.</p><a href={`mailto:${content.contact.email}`} className="contact-email">{content.contact.email}<ArrowUpRight size={25} /></a></div>
          <div className="contact-details"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact.address)}`} target="_blank" rel="noreferrer"><span>GHÉ THĂM CHÚNG TÔI</span><p>{content.contact.address}</p></a><a href={`tel:${content.contact.tel}`}><span>GỌI CHO ICUE</span><p>{content.contact.phone}</p></a><a href={site('/contact')}><span>CÙNG BẮT ĐẦU</span><p>Trao đổi về dự án <ArrowUpRight size={18} /></p></a></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#home" className="footer-brand" aria-label="ICUE — Về đầu trang"><img src="/media/icue-mark.svg" alt="" width="29" height="29" />ICUE</a><span>© {new Date().getFullYear()} ICUE. Kiến tạo giá trị bền vững.</span><nav aria-label="Thông tin pháp lý"><a href={site('/legal/privacy')}>Quyền riêng tư</a><a href={site('/recruitment')}>Tuyển dụng <ArrowUpRight size={13} /></a></nav><a href="#home" className="back-to-top" aria-label="Về đầu trang"><ArrowUp size={18} /></a></footer>
    </div>

    <dialog ref={menuDialog} className="menu-dialog" aria-label="Menu điều hướng ICUE" onClose={() => setMenuOpen(false)} onClick={(e) => { if (e.target === e.currentTarget) closeMenu() }}>
      <div className="menu-content"><div className="menu-top"><span className="wordmark">ICUE<span className="accent">.</span></span><button className="dialog-close" aria-label="Đóng menu" onClick={closeMenu}><X size={25} strokeWidth={1.3} /></button></div><div className="menu-heading"><Eyebrow>KHÁM PHÁ ICUE</Eyebrow><p>Cùng kiến tạo những điều có ý nghĩa.</p></div><nav aria-label="Toàn bộ nội dung">{navigation.map((item, i) => <a key={item.id} href={`#${item.id}`} onClick={closeMenu}><span className="row-number">0{i + 1}</span><span>{item.title}</span><small>{item.note}</small><ArrowUpRight strokeWidth={1.1} /></a>)}</nav><div className="menu-bottom"><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a><span>HÀ NỘI, VIỆT NAM</span></div></div>
    </dialog>

    <dialog ref={personDialog} className="person-dialog" onClose={() => setPerson(null)} onClick={(e) => { if (e.target === e.currentTarget) personDialog.current.close() }} aria-labelledby="person-dialog-name">
      {person && <div className="person-dialog-content"><button className="dialog-close" aria-label="Đóng hồ sơ" onClick={() => personDialog.current.close()} autoFocus><X size={24} strokeWidth={1.3} /></button><div className="person-dialog-image"><img src={person.photo} alt={person.name} width="400" height="500" /></div><div className="person-dialog-copy"><Eyebrow>CON NGƯỜI ICUE</Eyebrow><span className="person-honorific">{person.honorific}</span><h2 id="person-dialog-name">{person.name}</h2><p className="person-dialog-role">{person.title}</p><p className="person-bio">{person.bio}</p><div className="person-tags">{person.highlights.map((h) => <span key={h}>{h}</span>)}</div><a className="text-link" href={site('/people')}>Khám phá đội ngũ ICUE <ArrowUpRight size={17} /></a></div></div>}
    </dialog>
  </>
}
