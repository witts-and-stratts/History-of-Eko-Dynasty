type animateOnScrollOptions = {
  callback(elem: HTMLElement): any;
  threshold?: number | number[];
  animateOnce?: boolean;
  root?: HTMLElement | null;
  rootMargin?: string;
};

const defaultOption: animateOnScrollOptions = {
  callback() {},
  threshold: [0],
  root: null,
  rootMargin: '0px',
};
/**
 * animateOnScroll calls a callback when the parent element intersects with the element
 * @param target target
 */
export const animateOnScroll = (
  target: HTMLElement,
  option: animateOnScrollOptions | ((elem: HTMLElement) => any)
) => {
  let settings =
    typeof option === 'function'
      ? { ...defaultOption, callback: option }
      : { ...defaultOption, ...option };

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const e: HTMLElement = entry.target as HTMLElement;

          if (typeof option === 'function') {
            option(e);
          } else {
            option?.callback(e);
            // Run animation only once
            if (option?.animateOnce === true) {
              observer.disconnect();
            }
          }
        }
      });
    },
    {
      threshold: settings.threshold,
      root: settings.root,
      rootMargin: settings.rootMargin,
    }
  );

  io.observe(target);
};
