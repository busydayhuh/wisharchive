export default function OrionBackground() {
  return (
    <div className="-z-1000 fixed inset-0 overflow-hidden">
      <svg
        className="block stroke-muted-foreground/20 object-cover scale-200 origin-center md:origin-top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 936 936"
        width="100%"
        height="100%"
        fill="none"
      >
        <g strokeWidth=".5" strokeDasharray="1 10">
          <circle cx="468" cy="468" r="467.75" />
          <circle cx="468" cy="468" r="467.75" />
          <circle cx="467.5" cy="483.5" r="334.25" />
          <circle cx="467.5" cy="467.5" r="103.25" />
        </g>
        <g strokeWidth=".2">
          <circle cx="468" cy="468" r="378.9" />
          <circle cx="468" cy="468" r="263.9" />
          <circle cx="468" cy="468" r="179.9" />
        </g>
        <g className="blur-[2px] fill-muted" stroke-width=".2">
          <circle cx="615.5" cy="817.5" r="12" />
          <circle cx="929" cy="376" r="6.5" />
        </g>
      </svg>
    </div>
  );
}
