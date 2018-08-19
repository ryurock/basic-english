import Artyom from 'artyom.js';

/**
 * コンストラクタ
 * @param {Window} window
 */
const Klass = function(window) {
  this._window = window;
  this._document = this._window.document;
  this._rootNode = this._window.document.querySelector('main');
  this._wordDictionary = require('../data/words.json');
};

Klass.prototype._template = `
  <div class="dict-word">
    <h1 class="word"></h1>
  </div>
  <div class="dict-dest">
    <h2 class="dest-word"></h2>
  </div>
`;

Klass.prototype.execute = function(){
  const self = this;
  let counter = 0;
  const artyom = new Artyom();
  // const timer = setInterval(() => {
    if (self._wordDictionary.length == counter) clearInterval(timer);
    const node = this._document.createElement('div');
    node.classList.add('container');
    node.setAttribute('data-container-id', counter);
    node.innerHTML = self._template;
    self._createWordElement(node.querySelector('.dict-word'), self._wordDictionary[counter].en);
    self._wordDictionary[counter].ja.forEach(destDict => {
      self._createDestWordElement(node.querySelector('.dict-dest'), destDict);
    });
    self._rootNode.appendChild(node);
    const beforeNode = this._rootNode.querySelector(`.container[data-container-id='${( counter - 1)}']`);

    //読み上げをする
    artyom.say(self._wordDictionary[counter].en.word);

    if (beforeNode) beforeNode.parentNode.removeChild(beforeNode);
    counter++;
  // }, 2000);
};

Klass.prototype._createDestWordElement = function(parentNode, dict){
  const self = this;
  parentNode.querySelector('.dest-word').innerHTML = dict.words.join(' / ');

  const partOfSpeechNode = self._createKVBlockTemplate('part-of-speech', '品詞');
  partOfSpeechNode.querySelector('.kvblock-value > h3').innerText = dict.wordClass.join(' / ');
  parentNode.appendChild(partOfSpeechNode);

  if ( dict.enEx.length > 0 ) {
    const exampleTextNode = self._createKVBlockTemplate('ex-text', '例文');
    exampleTextNode.querySelector('.kvblock-value > h3').innerText = dict.enEx.join(' / ');
    parentNode.appendChild(exampleTextNode);
  }
};

Klass.prototype._createKVBlockTemplate = function(parentNodeClassName, keyString){
  const kvBlockNode = this._document.createElement('div');
  kvBlockNode.classList.add(parentNodeClassName);

  kvBlockNode.innerHTML = `
  <ul>
    <li>
      <ul>
        <li class="kvblock-key">${keyString}</li>
        <li class="kvblock-value"><h3></h3></li>
      </ul>
    </li>
  </ul>
  `;
  return kvBlockNode;
};

Klass.prototype._createWordElement = function(parentNode, dict){
  parentNode.querySelector('h1.word').innerText = dict.word;
};

window.document.addEventListener('DOMContentLoaded', event => {
  const executer = new Klass(window);
  executer.execute();
});