import hcSticky from 'hc-sticky';
import { SequentiallyAnimateText } from './sequential-animated-text';

// Animate header links
window.addEventListener('load', () => {
  const headerLinks = document.querySelectorAll('header nav a');
  headerLinks?.forEach((elem) => {
    const textAnimation = SequentiallyAnimateText(elem, {
      stagger: 0.1,
    });
    elem.addEventListener('mouseover', textAnimation.play);
    elem.addEventListener('mouseout', textAnimation.reverse);
  });

  let stickyHeader = new hcSticky('header', {
    stickyClass: ".sticky"
  });
});
