// Runs inline before paint to set the initial theme class.
// Prevents the light→dark flash (FOUC) on page load.

const script = `(function(){try{
  var pref = localStorage.getItem('theme');
  var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var dark = pref === 'dark' || (!pref && sys);
  if(dark) document.documentElement.classList.add('dark');
}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
