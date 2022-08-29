import gsap, { Back } from 'gsap/all';

let dropdown;

window.addEventListener('load', () => {
  const MenuDropdown = (() => {
    const menuDropdownBtn = document.querySelector('.js-mobile-menu-btn');
    const menuDropdown = document.querySelector('.header .mobile-menu');
    const hamburgerMenu = document.querySelector('.js-mobile-menu-btn');
    const links = menuDropdown.querySelectorAll('li');

    const playhead = gsap.timeline({
      yoyo: true,
      paused: true,
    });
    playhead
      .set(menuDropdown, { autoAlpha: 0, zIndex: 200 })
      .fromTo(
        menuDropdown,
        {
          autoAlpha: 0,
          ease: Back.easeOut,
          force3D: true,
          height: '0',
        },
        { autoAlpha: 1, height: '100vh', duration: 0.3 }
      )
      // animate pseudo element
      .fromTo(
        links,
        {
          duration: 0.1,
          autoAlpha: 0,
          translateY: '100%',
        },
        {
          autoAlpha: 1,
          translateY: '0%',
          stagger: {
            amount: 0.6,
            from: 'start',
            grid: 'auto',
          },
        }
      );

    // Event listeners
    menuDropdownBtn.addEventListener('click', toggle);

    function show() {
      document.addEventListener('keydown', enableESC);
      hamburgerMenu.classList.add('animate');
      playhead.timeScale(1);
      return playhead.play();
    }

    function hide() {
      document.removeEventListener('keydown', enableESC);
      hamburgerMenu.classList.remove('animate');
      playhead.timeScale(4);
      return playhead.reverse();
    }

    function toggle() {
      playhead.reversed() || playhead.paused() ? show() : hide();
    }

    function enableESC(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        hide();
      }
    }
  })();

  dropdown = MenuDropdown;
});

export { dropdown as MenuDropdown };
