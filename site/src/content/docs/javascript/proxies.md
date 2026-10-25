---
title: Proxy und Getter
description: Exkurs zu Gettern, Settern und Proxy und ein kleines reaktives System, das zeigt, wie Vue merkt, dass sich Daten ändern.
sidebar:
  order: 5
  badge:
    text: Exkurs
---

Dieses Kapitel ist ein Exkurs. Für die Prüfung brauchst du es nicht, und Vue funktioniert auch, ohne dass du es gelesen hast. Es zeigt aber, wie Vue merkt, dass sich Daten geändert haben, und warum manche Fehler mit Vue so aussehen, wie sie aussehen. In Teil 5 kommt der Kurs darauf zurück.

:::goals
Nach diesem Kapitel kannst du

- Getter und Setter schreiben und erklären, wann ihr Code läuft,
- mit einem `Proxy` das Lesen und Schreiben eines Objekts abfangen,
- erklären, wie ein reaktives System mit `track` und `trigger` Änderungen bemerkt,
- beschreiben, worin sich das Beispiel von Vue unterscheidet.
:::

## Getter und Setter

Ein Getter sieht von aussen aus wie ein Feld, ist aber eine Funktion, die bei jedem Lesen läuft. Ein Setter läuft bei jedem Schreiben. Beide kennst du von den Klassen aus der Einheit [Klassen und this](../../js/classes/), in Objekten funktionieren sie genauso.

::code{file="examples/01-javascript/proxies/{lang}/getter.mjs"}

`days` rechnet bei jedem Lesen neu, darum stimmt der Wert auch, nachdem sich das Ende der Reservation geändert hat. Der Setter von `deposit` prüft jeden neuen Wert, bevor er ihn speichert. Getter und Setter zeigen das Prinzip, auf dem Reaktivität beruht. Lesen und Schreiben eines Felds kann Code auslösen. Sie haben aber eine Grenze. Getter und Setter gelten nur für Felder, die schon beim Schreiben des Codes feststehen.

## Proxy

Ein `Proxy` legt sich um ein ganzes Objekt. Jeder Zugriff geht zuerst an Funktionen, die du festlegst, die sogenannten Traps. `get` läuft beim Lesen eines Felds, `set` beim Schreiben, auch bei Feldern, die es noch gar nicht gibt.

::code{file="examples/01-javascript/proxies/{lang}/proxy.mjs"}

Der Proxy meldet jeden Zugriff und gibt ihn danach an das eigentliche Objekt weiter. Darum steht das neue Datum am Schluss auch in `item`. Ein `set` muss `true` zurückgeben, sonst gilt das Schreiben als gescheitert, und in einem Modul meldet JavaScript dann einen `TypeError`.

## Ein kleines reaktives System

Mit einem Proxy lässt sich erkennen, welcher Code welche Felder liest. Ändert sich eines dieser Felder später, kann man genau diesen Code wieder ausführen. Das ist der Kern der Reaktivität von Vue.

::code{file="examples/01-javascript/proxies/{lang}/reactive.mjs"}

`watchEffect` merkt sich die Funktion als aktiven Effekt und führt sie einmal aus. Während sie läuft, liest sie `counts.available` und `counts.total`, und die Trap `get` notiert für beide Felder, dass dieser Effekt sie braucht. Diesen Schritt nennt Vue `track`. Schreibt später jemand eines der Felder, führt die Trap `set` alle notierten Effekte wieder aus. Diesen Schritt nennt Vue `trigger`. So erscheint nach jeder Änderung eine neue Zeile, ohne dass jemand die Ausgabe von Hand aufruft.

## Der Unterschied zu Vue

Das Beispiel zeigt die Idee, Vue setzt sie gründlicher um.

1. Vue notiert die Effekte pro Objekt und pro Feld, in einer `WeakMap` mit den Objekten als Schlüsseln. Das Beispiel notiert nur pro Feld, darum stören sich zwei Objekte mit gleichen Feldern, wie die Knobelei zeigt.
2. `reactive()` liefert einen Proxy wie im Beispiel. Für einzelne Werte wie eine Zahl gibt es `ref()`. Weil sich um eine Zahl kein Proxy legen lässt, packt Vue sie in ein Objekt mit einem Getter und Setter für `value`.
3. Vue führt Effekte nicht sofort nach jeder Änderung aus, sondern sammelt sie und aktualisiert die Oberfläche einmal, bevor der Browser die Seite neu zeichnet.
4. Verschachtelte Objekte macht Vue erst reaktiv, wenn jemand sie liest.

Daraus erklärt sich ein Fehler, den Teil 5 genauer zeigt. Zerlegst du ein reaktives Objekt mit Destrukturieren in einzelne Variablen, liest du die Werte einmal aus dem Proxy. Die Variablen sind danach gewöhnliche Werte, und kein Effekt wird mehr ausgelöst, wenn sich das Objekt ändert.

## Aufgaben

Die Aufgaben dieses Exkurses laufen direkt im Browser. Ihre Lösungen kannst du mit «Ausführen» starten und mit «Bearbeiten» verändern.

::::exercise[Einstieg]
Ein Warenkorb hat eine Liste `items` mit Dingen und ihrem Pfand. Gib ihm einen Getter `total`, der die Summe der Pfänder liefert. Prüfe, dass `total` stimmt, nachdem ein weiteres Ding dazugekommen ist.

:::solution[Lösung]
::code{file="examples/01-javascript/proxies/{lang}/solution-1.mjs"}

Der Getter rechnet bei jedem Lesen mit `reduce` neu, darum stimmt die Summe nach `push` ohne weiteres Zutun. Ein Feld `total`, das du beim Anlegen einmal berechnest, wäre danach veraltet.
:::
::::

::::exercise[Vertiefung]
Schreib eine Funktion `checked(item)`, die einen Proxy um ein Ding legt. Der Proxy lässt nur Pfänder zwischen 10 und 80 Franken zu und meldet sonst einen `RangeError`. Alle anderen Felder lassen sich frei ändern.

:::solution[Lösung]
::code{file="examples/01-javascript/proxies/{lang}/solution-2.mjs"}

Die Trap `set` prüft nur das Feld `deposit` und lässt alle anderen durch. Anders als ein Setter wirkt der Proxy auf das ganze Objekt, die Prüfung gilt also auch, wenn das Feld beim Anlegen noch gar nicht existierte.
:::
::::

::::exercise[Knobelei]
Im reaktiven System des Beispiels stören sich zwei Objekte. Ändert sich bei einem Zelt das Feld `available`, läuft auch der Effekt einer Bohrmaschine, der nur die Bohrmaschine liest. Baue das System so um, dass es die Effekte pro Objekt und pro Feld notiert, wie Vue.

:::solution[Lösung]
::code{file="examples/01-javascript/proxies/{lang}/solution-3.mjs"}

Eine `WeakMap` ordnet jedem Objekt eine eigene `Map` von Feldern zu Effekten zu. Die Änderung am Zelt findet in der Map des Zelts keinen Effekt, die Ausgabe zeigt nur die beiden Zeilen der Bohrmaschine. Eine `WeakMap` hält ihre Schlüssel nicht fest. Braucht niemand mehr ein Objekt, darf JavaScript es samt seinen Einträgen aus dem Speicher räumen. Vue verwendet dieselbe Struktur.
:::
::::

## Selbstcheck

::::selfcheck
1. Wann läuft der Code eines Getters?
2. Was kann ein Proxy, was ein Setter nicht kann?
3. Was notiert ein reaktives System beim Lesen, und was tut es beim Schreiben?
4. Warum verliert eine Variable aus einem destrukturierten reaktiven Objekt die Reaktivität?

:::solution[Antworten]
1. Bei jedem Lesen des Felds.
2. Ein Proxy fängt Zugriffe auf alle Felder eines Objekts ab, auch auf Felder, die erst später dazukommen. Ein Setter gilt nur für das eine Feld, für das er geschrieben ist.
3. Beim Lesen notiert es, welcher Effekt welches Feld braucht. Beim Schreiben führt es die Effekte aus, die das geänderte Feld brauchen.
4. Destrukturieren liest den Wert einmal aus dem Proxy. Die Variable hält danach einen gewöhnlichen Wert, und Zugriffe auf sie gehen nicht mehr durch den Proxy.
:::
::::
