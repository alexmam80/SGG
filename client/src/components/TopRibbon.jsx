import React from "react";

const SOCIALS = [
  {
    name: "Twitter",
    href: "https://twitter.com/smartgreengroup", // schimbă linkurile
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor"
          d="M23 4.8c-.8.4-1.6.7-2.5.8.9-.6 1.6-1.5 1.9-2.6-.9.6-1.9 1-3 1.2A4.36 4.36 0 0 0 12.5 8c0 .3 0 .6.1.8-3.6-.2-6.9-1.9-9-4.6-.4.7-.6 1.5-.6 2.4 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.5v.1c0 2.3 1.7 4.1 3.9 4.6-.4.1-.8.1-1.2.1-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.3A8.75 8.75 0 0 1 2 19.3 12.36 12.36 0 0 0 8.1 21c7.5 0 11.7-6.2 11.7-11.7v-.5c.8-.6 1.5-1.4 2.1-2.3z" />
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "https://facebook.com/smartgreengroup.md",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor"
          d="M13.5 22v-8h2.7l.4-3h-3.1V9c0-.9.3-1.5 1.6-1.5H17V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H8v3h2.9v8h2.6z" />
      </svg>
    )
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor"
          d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm6.9 9a15.8 15.8 0 0 0-5-.2 25.1 25.1 0 0 0-1.6-3.2A8.4 8.4 0 0 1 18.9 11zM12 3.9c2 0 3.8.7 5.2 1.8a7.1 7.1 0 0 1-3.9 2.3A22 22 0 0 0 12 3.9zM8.9 5a7.3 7.3 0 0 1 2.8-1 23.2 23.2 0 0 1 1.6 3.8A10 10 0 0 1 7 7.4 7.3 7.3 0 0 1 8.9 5zM4.5 12a7.5 7.5 0 0 1 .6-3A11.1 11.1 0 0 0 11 9c.2.4.4.8.6 1.2-3 .9-5.3 2.6-6.6 4.8A7.5 7.5 0 0 1 4.5 12zm7.5 7.5c-2.2 0-4.2-.9-5.6-2.3 1.1-2 3.1-3.5 6.1-4.2.9 2.4 1.5 4.8 1.8 6.2A7.3 7.3 0 0 1 12 19.5zm3.9-1.2c-.3-1.3-.9-3.7-1.7-5.9 1.7-.2 3.5 0 5 .3-.1 2.2-1.3 4.1-3.3 5.6z" />
      </svg>
    )
  },
  {
    name: "Flickr",
    href: "https://www.flickr.com/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <rect width="24" height="24" fill="none" />
        <circle cx="8.5" cy="12" r="3.2" fill="currentColor" />
        <circle cx="15.5" cy="12" r="3.2" fill="currentColor" opacity=".6" />
      </svg>
    )
  }
];

export default function TopRibbon() {
  return (
    <div className="top-ribbon">
      <div className="container inner">
        <div className="left">
          <a className="mini-link" href="tel:+37368965566">
            <span className="mini-ico">📞</span> +373 68965566
          </a>
          <span className="mini-sep" />
          <a className="mini-link" href="mailto:office@smartgreengroup.md">
            <span className="mini-ico">✉️</span> office@smartgreengroup.md
          </a>
        </div>

        <ul className="socials">
          {SOCIALS.map(s => (
            <li key={s.name}>
              <a href={s.href} aria-label={s.name} title={s.name}
                 target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
