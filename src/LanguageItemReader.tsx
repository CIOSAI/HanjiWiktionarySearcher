enum languageCodeEnum{
  MANDARIN = "m",
  CANTONESE = "c",
  HAKKA = "h",
  HOKKIEN = "mn",
}

export const languageCode:Map<string, string> = new Map([
  [languageCodeEnum.MANDARIN, "Mandarin"],
  [languageCodeEnum.CANTONESE, "Cantonese"],
  [languageCodeEnum.HAKKA, "Hakka"],
  [languageCodeEnum.HOKKIEN, "Hokkien"]
])

export type LanguageItemReader = (x:string)=>string[]

export function getLanguageItemReader(x:string):LanguageItemReader{
  return languageItemRead.has(x)?languageItemRead.get(x)!:basicLanguageItemReader
}

function basicLanguageItemReader(x:string):string[]{
  return [x]
}

const languageItemRead:Map<string, LanguageItemReader> = new Map([
  [languageCodeEnum.MANDARIN, x=>[x]],
  [languageCodeEnum.CANTONESE, x=>[x]],
  [languageCodeEnum.HAKKA, x=>[x]],
  [languageCodeEnum.HOKKIEN, x=>{
    return x.split(/\//).map(v=>v.substring(v.indexOf(":")+1))
  }],
])