import charming from 'charming';
import gsap from 'gsap';

// color or CSS object
type Settings = string | Partial<gsap.TweenVars>;
const defaultSettings: gsap.TweenVars = {
  duration: 1,
  stagger: 0.05,
  color: '#000000',
};

/**
 *
 * @param selector query selector. It could be a string or dom element
 * @param settings the destination color or gsap settings
 * @returns gsap.timeline gsap timeline
 */
const SequentiallyAnimateText = (
  selector: Element | string,
  settings?: Settings,
  from?: gsap.TweenVars
) => {
  const elem: Element =
    typeof selector === 'string'
      ? document.querySelector<HTMLElement>(selector)
      : selector;

  const mergedSettings =
    typeof settings === 'string'
      ? { ...defaultSettings, color: settings ?? 'inherit' }
      : { ...defaultSettings, ...settings };

  // const elemOriginalContent = elem.innerHTML;
  let spans: NodeListOf<HTMLElement>;

  const timeline = gsap.timeline({
    yoyo: true,
    paused: true,
    onReverseComplete() {
      // Reset the color of the span. This is to avoid hover setting a specific color on links
      spans.forEach(span => span.style.color = null)
    }
  } );
  charming(elem);
  spans = elem.querySelectorAll( 'span' );
  if ( from ) {
    timeline.fromTo(spans, { ...from }, { ...mergedSettings });
  } else {
    timeline.to(spans, mergedSettings);
  }

  const play = () => {
    timeline.timeScale(1);
    timeline.play();
  };

  const reverse = () => {
    timeline.timeScale(3);
    timeline.reverse();
  };

  return {
    play,
    reverse,
  };
};

export { SequentiallyAnimateText };
