declare module "charming" {
  function charming(element: Element, {
    tagName = 'span',
    split,
    setClassName = function (index) {
      return 'char' + index
    }
  }?: any ): any;
  
  export = charming;
};
