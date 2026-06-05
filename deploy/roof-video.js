/* ============================================================
   Precision Roofing — roof-install video
   • Autoplays the drone re-roof clip (muted) the first time it
     scrolls into view.
   • Center Play button lets visitors start it manually if the
     browser blocks autoplay, and toggles play/pause.
   • Replay button appears when the clip ends.
   ============================================================ */
(function () {
  var stage   = document.getElementById('installStage');
  var video   = document.getElementById('roofVideo');
  var playBtn = document.getElementById('roofPlay');
  var replay  = document.getElementById('roofReplay');
  if (!stage || !video) return;

  var autoPlayed = false;

  function play() {
    var p = video.play();
    if (p && p.catch) p.catch(function () { showPlay(); });
  }
  function showPlay() { if (playBtn) playBtn.classList.remove('hide'); }
  function hidePlay() { if (playBtn) playBtn.classList.add('hide'); }
  function showReplay() { if (replay) replay.classList.add('show'); }
  function hideReplay() { if (replay) replay.classList.remove('show'); }

  // --- video state → UI ---
  video.addEventListener('play',  function () { hidePlay(); hideReplay(); });
  video.addEventListener('playing', hidePlay);
  video.addEventListener('pause', function () { if (!video.ended) showPlay(); });
  video.addEventListener('ended', function () { showReplay(); showPlay(); });

  // --- manual controls ---
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      if (video.paused || video.ended) { hideReplay(); play(); }
      else { video.pause(); }
    });
  }
  if (replay) {
    replay.addEventListener('click', function () {
      hideReplay();
      video.currentTime = 0;
      play();
    });
  }

  // --- autoplay once on scroll into view ---
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    showPlay(); // let the user choose to play
    return;
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !autoPlayed) {
          autoPlayed = true;
          io.unobserve(stage);
          if (document.hidden) {
            document.addEventListener('visibilitychange', function h() {
              if (!document.hidden) { document.removeEventListener('visibilitychange', h); play(); }
            });
          } else { play(); }
        }
      });
    }, { threshold: 0.4 });
    io.observe(stage);
  } else {
    play();
  }
})();
