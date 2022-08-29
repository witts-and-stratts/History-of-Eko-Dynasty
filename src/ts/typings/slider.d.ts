type SliderDuration = {
  auto: number;
  slide: number;
};

type SliderSettings = {
  durations?: SliderDuration;
  autoSpeed?: number;
  slideSpeed?: number;
  arrowClass?: string | NodeListOf<HTMLElement>;
  dotsWrapper?: string | HTMLElement;
  showDots?: boolean;
};


interface JQuery {
  slick(options?: any): any;
}

declare var WebViewer: Function;
declare var AOS: any;
