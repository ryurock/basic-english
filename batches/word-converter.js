'use strict';

const fs = require('fs');
const pry = require('pryjs');

const asyncCall = async function() {
  let words = [
    {
      en: {
        word: 'even',
        sort: 'e'
      },
      ja: [
        {
          words: '均等な / 同じの'.split(' / '),
          wordClass: '形容詞'.split(' / '),
          enEx: [ 'an even chance' ]
        },
        {
          words: ' 〇〇だって /  〇〇でも（強調）'.split(' / '),
          wordClass: '副詞'.split(' / '),
          enEx: [ 'Even I can do it' ]
        }
      ]
    }
  ];

  const simpleWordtoJson = function() {
    const data = fs.readFileSync('./data/simple-words.csv', 'utf8');
    const lines = data.split('\n');
    const datas = lines.map((line) => {
      let arr = line.split(',').filter(v => v);

      const data = {
        en: {
          word: arr[0],
          sort: arr[0].substr(0,1)
        },
        ja: [
          {
            words: arr[1].split(' / ').map((v) => v.replace(/ /g,'')),
            wordClass: arr[2].split(' / ').map(v => v.replace(/ /g,'')),
            enEx: []
          }
        ]
      };
      return data;
    });
    return datas;
  };
  let simpleWords = await simpleWordtoJson();

  words = words.concat(simpleWords);

  const simpleWordsAndExampletoJson = function(){
    const data = fs.readFileSync('./data/simple-example-words.csv', 'utf8');
    const lines = data.split('\n');
    const datas = lines.map((line) => {
      let arr = line.split(',').filter(v => v);
      const data = {
        en: {
          word: arr[0],
          sort: arr[0].substr(0,1)
        },
        ja: [
          {
            words: arr[1].split(' / ').map(v => v.trim()),
            wordClass: arr[2].split(' / ').map(v => v.trim()),
            enEx: [ arr[3] ]
          }
        ]
      };
      return data;
    });
    return datas;
  };
  let wordsWithExample = await simpleWordsAndExampletoJson();

  words = words.concat(wordsWithExample);

  const doubleWordstoJson = function(){
    const data = fs.readFileSync('./data/words.csv', 'utf8');
    const lines = data.split('\n');
    const datas = lines.map((line) => {
      let arr = line.split(',').filter(v => v);
      const data = {
        en: {
          word: arr[0],
          sort: arr[0].substr(0,1)
        },
        ja: [
          {
            words: arr[1].split(' / ').map(v => v.trim()),
            wordClass: arr[2].split(' / ').map(v => v.trim()),
            enEx: []
          },
          {
            words: arr[3].split(' / ').map(v => v.trim()),
            wordClass: arr[4].split(' / ').map(v => v.trim()),
            enEx: []
          }
        ]
      };
      return data;
    });
    return datas;
  };
  let doubleWords = await doubleWordstoJson();
  words = words.concat(doubleWords);
  words = words.sort((a,b) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if ( alphabet.indexOf(a.en.word.substr(0, 1)) < alphabet.indexOf(b.en.word.substr(0, 1)) ) return -1;
    if ( alphabet.indexOf(a.en.word.substr(0, 1)) > alphabet.indexOf(b.en.word.substr(0, 1)) ) return 1;
    return 0;
  });
  fs.writeFileSync('./data/words.json', JSON.stringify(words, null, '  '), 'utf-8');
};
asyncCall();