const defaultSliderDurations: SliderDuration = {
  auto: 5000,
  slide: 1400,
};

const defaultSettings: SliderSettings = {
  autoSpeed: 5000,
  slideSpeed: 1400,
  arrowClass: '.arrow',
  showDots: false,
};

export class Slider {
  durations: SliderDuration;
  length: number;
  current: number;
  next: number;
  isAuto: boolean;
  working: boolean;
  auto: NodeJS.Timeout;
  settings: SliderSettings;
  slides: NodeListOf<HTMLElement> | HTMLElement[];
  currentSlide: HTMLElement;
  arrowClass: NodeListOf<HTMLElement> | HTMLElement[];
  nextSlide: HTMLElement;
  dotsWrappers: HTMLElement;
  dots: HTMLElement[];

  constructor(
    public selector: string | HTMLElement | NodeListOf<HTMLElement>,
    options?: SliderSettings
  ) {
    this.slides =
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : selector instanceof HTMLElement
        ? [selector]
        : selector;

    // Exit if we don't have a valid selector
    if (!this.slides || this.slides.length <= 0) {
      throw new Error('No valid selector chosen for the slider');
    }

    this.settings = { ...defaultSettings, ...options };
    this.arrowClass =
      typeof this.settings.arrowClass === 'string'
        ? document.querySelectorAll(this.settings.arrowClass)
        : this.settings.arrowClass;

    this.length = 0;
    this.current = 0;
    this.next = 0;
    this.isAuto = true;
    this.working = false;
    this.length = this.slides.length;
    this.dots = [];
    this.dotsWrappers =
      typeof this.settings.dotsWrapper == 'string'
        ? document.querySelector(this.settings.dotsWrapper)
        : this.settings.dotsWrapper instanceof HTMLElement
        ? this.settings.dotsWrapper
        : null;

    this.init();
    this.events();
    this.auto = setInterval(this.updateNext, this.settings.autoSpeed);
  }

  init = () => {
    this.slides.forEach((d: HTMLElement) => (d.style.zIndex = '10'));
    this.currentSlide = this.slides[this.current];
    this.nextSlide = this.slides[this.current + 1];
    this.nextSlide.style.zIndex = '20';
    this.currentSlide.style.zIndex = '30';
    
    this.showDots();
    this.updateDot( this.current );
  };

  events = () => {
    this.arrowClass?.forEach((arrow: HTMLElement) => {
      arrow.addEventListener('click', () => {
        if (this.working) return;
        this.processBtn(arrow);
      });
    });
  };

  processBtn = (btn: HTMLElement) => {
    if (this.isAuto) {
      this.isAuto = false;
      clearInterval(this.auto);
    }
    if (btn.classList.contains('next')) {
      this.updateNext();
    }
    if (btn.classList.contains('previous')) {
      this.updatePrevious();
    }
  };

  updateNext = () => {
    this.goTo(this.current + 1);
  };

  goTo = (step: number) => {
    this.next = step % this.length;
    if (this.next < 0) {
      this.next = this.length - 1;
    }
    this.process();
  };

  updatePrevious = () => {
    this.goTo(this.current - 1);
  };
  process = () => {
    this.working = true;
    this.nextSlide = this.slides[this.next];
    this.nextSlide.style.zIndex = '20';
    this.currentSlide.style.zIndex = '30';
    this.currentSlide.classList.add('hide-animation');
    this.currentSlide.style.animationDuration = '' + this.settings.slideSpeed;
    this.updateDot(this.next);

    setTimeout(() => {
      this.currentSlide.style.zIndex = '10';
      this.nextSlide.style.zIndex = '30';
      this.currentSlide.classList.remove('hide-animation');
      this.currentSlide = this.nextSlide;
      this.current = this.next;
      this.working = false;
    }, this.settings.slideSpeed);
  };

  showDots = () => {
    console.log( "Show dots propsper", this.dotsWrappers );
    if (this.settings.showDots === true && this.dotsWrappers) {
      this.dotsWrappers.append(...this.buildDots());
    }
  };

  buildDots = (): NodeListOf<ChildNode> => {
    let dotNodes: DocumentFragment = new DocumentFragment();
    for (let i = 0; i < this.slides.length; i++) {
      const k = document.createElement('span');
      k.classList.add('dot');

      k.addEventListener('click', () => {
        if (this.current === i) return;
        this.goTo(i);
      });

      dotNodes.append(k);
      this.dots.push(k);
    }
    return dotNodes.childNodes;
  };

  updateDot = ( index: number ) => {
    if ( !this.dotsWrappers || this.settings.showDots === false ) return;
    this.dots.forEach((dot) => dot.classList.remove('active'));
    this.dots[index].classList.add('active');
  };
}
