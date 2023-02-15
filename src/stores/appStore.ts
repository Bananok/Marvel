import { observable, action, makeObservable } from "mobx";

import { Card } from "../types/card";

class AppStore {
  @observable
  themeIsBlack: boolean = localStorage.getItem("themeIsBlack") === "true";

  @observable
  favourites: Card[] = JSON.parse(localStorage.getItem("favourites") || "[]");

  constructor() {
    makeObservable(this);
  }
  @action
  changeTheme = () => {
    this.themeIsBlack = !this.themeIsBlack;
    localStorage.setItem("themeIsBlack", String(this.themeIsBlack));
  };

  @action
  addOrRemoveFavourite = (card: Card) => {
    if (this.favourites.some((item) => item.id === card.id)) {
      this.favourites = this.favourites.filter((item) => item.id !== card.id);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    } else {
      this.favourites.push(card);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }
  };
  checkItem = (id: number) => {
    return this.favourites.some((item) => item.id === id);
  };
}
const appStore = new AppStore();

export default appStore;
