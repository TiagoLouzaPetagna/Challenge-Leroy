// Mark a real campaign navigation before the page's first paint. Otherwise the
// next game's ordinary start menu appears briefly while artwork is loading.
try {
  if (new URLSearchParams(location.search).has('campaign')) {
    const filename = location.pathname.split('/').pop();
    const game = !filename || filename === 'index.html' ? 'conveyor' : filename.replace(/\.html$/, '');
    const state = JSON.parse(sessionStorage.getItem('dwto-phish.campaign.v1'));
    if (state?.game === game && state.lives > 0) {
      document.documentElement.classList.add('campaign-entry');
    }
  }
} catch {}
