let libs = ['js/script.js', 'js/search.js', 'js/sort.js'];

function injectLibFromStack() {
  if (libs.length > 0) {
    let nextLib = libs.shift();
    let bodyTag = document.getElementsByTagName('body')[0];
    let scriptTag = document.createElement('script');
    scriptTag.src = nextLib;
    scriptTag.type = 'module';
    scriptTag.onload = function () {
      injectLibFromStack();
    };
    bodyTag.appendChild(scriptTag);
  } else return;
}

injectLibFromStack();
