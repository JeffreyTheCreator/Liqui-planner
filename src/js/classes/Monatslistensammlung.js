"use strict";

class Monatslistensammlung {

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    _eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatliste => {
            if (eintragsmonat === monatliste.monat() && eintragsjahr === monatliste.jahr()) {
                monatliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });

        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
        }

    }  

    _monatsliste_hinzufuegen(jahr, monat, eintrag) {
        let neue_monatsliste = new Monatsliste(jahr, monat);
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }
     
    _monatslisten_sortieren() {
        this._monatslisten.sort((monatliste_a, monatsliste_b) => {
            if (monatliste_a.jahr() < monatsliste_b.jahr()) {
                return 1;
            } else if (monatliste_a.jahr() > monatsliste_b.jahr()) {
                return -1;
            } else {
                if (monatliste_a.monat() < monatsliste_b.monat()) {
                    return 1;
                } else {
                    return -1;
                } 
            }
        });
    }


    _html_generieren() {
        let monatslisten = document.createElement("section");
        monatslisten.setAttribute("id", "monatslisten");

        this._monatslisten.forEach(monatliste => {
            monatslisten.insertAdjacentElement("beforeend", monatliste.html());
        });

        return monatslisten;
    }

    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag));
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        let monatslistensammlung = document.querySelector("#monatslisten");
        if (eingabeformular_container !== null) {
            if (monatslistensammlung !== null) {
                monatslistensammlung.remove();
            }
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }
    
}