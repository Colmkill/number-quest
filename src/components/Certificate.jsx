import Mascot from './Mascot.jsx'
import RosetteBadge from './RosetteBadge.jsx'
import CertificateStarBorder from './CertificateStarBorder.jsx'
import { totalStars, MAX_STARS } from '../utils/progress.js'

export default function Certificate({ name, progress, onClose }) {
  const earnedStars = totalStars(progress)
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const displayName = name?.trim() ? name.trim() : 'Math Explorer'

  return (
    <div className="certificate-overlay">
      <div className="certificate">
        <CertificateStarBorder earned={earnedStars} total={MAX_STARS} />
        <Mascot mood="cheer" size={80} scholar />
        <p className="certificate-Title">Certificate</p>
        <p className="certificate-Title2">of Achievement</p>
        <p className="certificate-body"> This award is to certify that</p>
        <h2 className="signature-name">{displayName}</h2>
        <p className="certificate-body">
  has successfully completed the Number Quest adventure map arena, mastering Explorer, Adventurer,
  and Champion challenges along the way.
</p>
<p className="certificate-date">{today}</p>

<div className="certificate-signature">
  <RosetteBadge size={80} />
  <Mascot mood="cheer" size={36} />
  <div>
     <p className="certificate-body"> Awarded by</p>
    <p className="signature-name">Numero Uno</p>
    <p className="signature-caption">Chief Number Explorer</p>
  </div>
</div>
        <button className="primary-btn" onClick={onClose}>Continue</button>
        <button className="primary-btn" onClick={() => window.print()}>
          Print certificate
        </button>
      </div>
    </div>
  )
}