if (window.matchMedia("(min-width: 361px)").matches) {
  /* the viewport is at least 400 pixels wide */
    if (pybossaGetCookie('warnmobile') === '') {
        var msg = "Sr. Alérgeno se ve y se siente mejor en tu móvil";
        pybossaNotify(msg, true, 'warning');
        pybossaSetCookie('warnmobile', 1, 7);
    }
} 
