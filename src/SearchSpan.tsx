import React, { ReactElement, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { JsxElement } from 'typescript';

interface SearcherProps{
  character: string
}

export function Searcher(prop:SearcherProps) {
  const [character, setCharacter] = useState(prop.character);
  const [fetchResult, setFetchResult] = useState("");
  const [lister, setLister] = useState([<p></p>]);

  // enum languageCode{
  //   m = "Mandarin",
  //   c = "Cantonese",
  //   h = "Hakka",
  //   mn = "Hokkien"
  // }

  const languageCode:Map<string, string> = new Map([
    ["m", "Mandarin"],
    ["c", "Cantonese"],
    ["h", "Hakka"],
    ["mn", "Hokkien"]
  ])

  useMemo(() => {
    let url = "https://en.wiktionary.org/w/api.php?"; 
    let params:Map<string, string> = new Map([ 
      ["action", "query"],
      ["prop", "revisions"],
      ["titles", character],
      ["rvprop", "content"],
      ["rvslots", "*"],
      ["format", "json"],
    ])
    params.forEach((v, k)=>{url += "&" + k + "=" + v})

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
      let page = response.query.pages
      let keyOfPage = Object.keys(page)[0]
      console.log(page[keyOfPage].revisions[0].slots.main["*"])
      setFetchResult(page[keyOfPage].revisions[0].slots.main["*"])

    })
    .catch(function(error){console.log(error);});

  }, [character])

  useEffect(()=>{
    if(fetchResult.length>0){
      let splitted = fetchResult.split(/={3}Pronunciation/)
      let filtered = splitted.filter(v=>v.includes("zh")&&(!v.includes("{{character info")))
      let languageItems = filtered.map(v=>v.match(/(\|)(\w+-?\w*=[\p{Letter}]+.*)/gu))
      // langaugeItems 2 d array, [pronunciation][dialect]
      // console.log(filtered)
      // console.log(languageItems)

      let entry:RegExpMatchArray = languageItems[0]!

      console.log(entry)
      
      setLister(
        entry.map((v, i, arr)=>{
          let k = v.substring(1, v.indexOf("="))
          let content = v.substring(v.indexOf("=")+1)
          // console.log(content)
          return <p key={i}>{languageCode.has(k)?languageCode.get(k)+":"+content:""}</p>
      })
      )
    }
  },[fetchResult])

  return (
    <div className="dropdown">
      <span>{character}</span>
      <div className="dropdown-content">
      {lister}
      </div>
    </div>
  );
}