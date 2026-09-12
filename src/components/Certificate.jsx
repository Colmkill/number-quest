import Mascot from './Mascot.jsx'

export default function Certificate({ name, onClose }) {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const displayName = name?.trim() ? name.trim() : 'Math Explorer'

  return (
    <div className="certificate-overlay">
      <div className="certificate">
        <Mascot mood="cheer" size={80} />
        <p className="certificate-eyebrow">Certificate of Achievement</p>
        <h2 className="certificate-name">{displayName}</h2>
        <p className="certificate-body">
          has completed the Number Quest adventure map, mastering Explorer, Adventurer,
          and Champion challenges along the way.
        </p>
        <p className="certificate-date">{today}</p>
        <button className="primary-btn" onClick={onClose}>Continue</button>
      </div>
    </div>
  )
}