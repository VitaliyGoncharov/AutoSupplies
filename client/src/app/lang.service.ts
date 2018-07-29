import { Injectable } from '@angular/core';
import * as LANG_DIRS from './../locale/lang.conf.json';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor() { }

  setLanguage() {
    localStorage.setItem('lang',navigator.language);
  }

  getLanguage() {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      return navigator.language;
    }
    return lang;
  }

  getLangDir(): string {
    let userLang = this.getLanguage();
    let lang_keys = Object.keys(LANG_DIRS.default);

    for (let lang of lang_keys) {
      if (lang == userLang)
        return LANG_DIRS.default[lang];
    }
  }
}
