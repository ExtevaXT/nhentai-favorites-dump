## Usage
Open devtools on [https://nhentai.net](https://nhentai.net) by `Ctrl+Shift+C` or `Ctrl+Shift+I` or `Right-click -> Inspect`

Take out that 2 values from `Application -> Cookies -> https://nhentai.net`
```js
const sessionid = '...'
const cf_clearance = '...'
```

Copypaste [script](/script.js) into `Console`

Increase rate if it returns `Too many requests`
```js
const rate = 10
```

It will download json with that format. You can find most doujins by `fullTitle` on e-hentai or sukebei or hitomi
```json
[
  {
    "id": "495105",
    "thumb": "https://t5.nhentai.net/galleries/2820610/thumb.jpg",
    "title": "[Hatsuyasumi] Mukashi no Sugata ni Modotta Tsuma to no Sex wa Uwaki desu ka? | Is Having Sex With My Rejuvenated Wife Considered Cheating? [English] [Benri]",
    "fullTitle": "[はつやすみ] 昔の姿に戻った妻とのセックスは浮気ですか? [英訳]"
  },
  ...
]
```
