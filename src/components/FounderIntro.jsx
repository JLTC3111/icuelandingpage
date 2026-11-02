export default function FounderIntro({ founder, introduction }) {
  return <>
    <div className="founder-heading">
      <div className="eyebrow"><span className="eyebrow-dot" />{founder.eyebrow}<span className="section-number">/ 08</span></div>
      <span className="founder-lifespan">{founder.lifespan}</span>
    </div>
    <p className="founder-kicker">{founder.heading}</p>
    <h2 id="founder-heading">{founder.name}</h2>
    <p className="founder-role">{founder.honorific} · {founder.role}</p>
    <div className="founder-story"><p className="founder-lead">{founder.lead}</p>{introduction && <p>{introduction}</p>}</div>
  </>
}
