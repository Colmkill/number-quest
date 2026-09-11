export default function Mascot({ mood = 'happy', size = 96 }) {
  // mood: 'happy' | 'cheer' | 'think'
  const eyes = {
    happy: <><circle cx="41" cy="52" r="4.5" fill="#3D3B54" /><circle cx="61" cy="52" r="4.5" fill="#3D3B54" /></>,
    cheer: <><path d="M36 52 Q41 46 46 52" stroke="#3D3B54" strokeWidth="3.5" fill="none" strokeLinecap="round" /><path d="M56 52 Q61 46 66 52" stroke="#3D3B54" strokeWidth="3.5" fill="none" strokeLinecap="round" /></>,
    think: <><circle cx="41" cy="53" r="4" fill="#3D3B54" /><circle cx="61" cy="50" r="4" fill="#3D3B54" /></>,
  }
  const mouth = {
    happy: <path d="M40 63 Q51 74 62 63" stroke="#3D3B54" strokeWidth="4" fill="none" strokeLinecap="round" />,
    cheer: <path d="M38 62 Q51 78 64 62" stroke="#3D3B54" strokeWidth="4" fill="#FFC93C" strokeLinecap="round" strokeLinejoin="round" />,
    think: <path d="M43 66 Q51 63 59 66" stroke="#3D3B54" strokeWidth="4" fill="none" strokeLinecap="round" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 20 L26 32 L14 34 Z" fill="#FFC93C" />
      <path d="M82 18 L88 32 L74 30 Z" fill="#FF6B6B" />
      <path d="M14 62 L4 70 L16 74 Z" fill="#4EC5E0" />
      <circle cx="51" cy="54" r="38" fill="#4EC5E0" />
      <circle cx="51" cy="54" r="38" fill="url(#grad)" fillOpacity="0.25" />
      {eyes[mood]}
      {mouth[mood]}
      <circle cx="33" cy="60" r="5" fill="#FF6B6B" fillOpacity="0.45" />
      <circle cx="69" cy="60" r="5" fill="#FF6B6B" fillOpacity="0.45" />
      <defs>
        <radialGradient id="grad" cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
