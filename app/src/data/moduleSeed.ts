import type { Modul } from '../types';

/**
 * Katalogdaten aus dem offiziellen Modulhandbuch Bachelor Wirtschaftsingenieurwesen (THD),
 * Stand 19.09.2025, PO 04.10.2018. Automatisiert extrahiert - bitte gegen dein aktuelles
 * Modulhandbuch/deinen Studienverlaufsplan prüfen, insb. bei Wahlpflichtfächern (W-19, W-20,
 * W-30 bis W-35), da hier nicht alle gelisteten Module gleichzeitig Pflicht sind.
 */
export const MODUL_KATALOG_WIW_THD: Array<Omit<Modul, 'id' | 'versuche' | 'dokumente' | 'status' | 'semesterIst' | 'pruefungstermin' | 'anmeldefrist' | 'voraussetzungen'>> = [
  {
    kuerzel: `W-01`,
    name: `Mathematische Grundlagen`,
    semesterSoll: 1,
    ects: 5.0,
    swsVorlesung: 6,
    workloadGesamt: 210,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Mengen und Abbildungen, Zahlen, Zahlbereiche N, Z, Q, R und Rechenregeln
o Vektoren
Verschiebungen. Vektoralgebra, geom. Interpretation.
Linearkombination, lin. Unabhängigkeit.
Skalarprodukt, Projektion, Kreuzprodukt.
Kanonische Basis, Rechenregeln für Vektoren in Koordinatendarstellung,
Richtungscosini, Zerlegen eines Vektors in vorgegebene Richtungen,
Basis-Wechsel.
Matrizen und Matrizen-Produkt
o Komplexe Zahlen
Def., Gleichheit und Grundrechenarten in cart. Form, Zahlen-Ebene,
konjugiert Komplexe, Trigonometrische Form, Umrechnen und Hauptwert,
Grundrechenarten in Trig. Form, Satz von Moivre, Euler-Formel,
Exponential-Form
Algebraische Gleichungen, Fundamentalsatz der AlgebraKreisteilungsgleichung,
Überlagerung von gleichfrequenten, reellen Schwingungen im Komplexen
7o Lin. Gleichungs-Systeme
2x2-Systeme mit geom. Interpretation
Allg. Fall, Matrix-Schreibweise, Interpretation als Linear-Kombination, Lösun-
gen
Gauss-Algorithmus
Spezielle Matrizen, Rechenregeln für Matrizen, Inverse mit Gauss-Jordan-Ver-
fahren
Info: Pseudo-Inverse und überbestimmte Systeme, Anfitten an Messdaten
Rang, Invertierbarkeit, Lösungstheorie lin. Gl.-Systeme, Beispiele
Determinanten, 2x2, nxn, Regel v. Sarrus f. 3x3, Eigenschaften von Determinan-
ten,
Laplace'scher Entwicklungs-Satz, Cramersche Regel, Inversenformel
o Funktionen
Darstellung von Funktionen (Analyt., graphisch, einfach/doppelt Logarithmisch,
tabellarisch, lin. Interpolation, Info: Parameter-Darstellung).
Allg. Eigenschaften: Symmetrie, Monotonie, Periodizität
Umkehrfunktion
Grenzwert: Anschaulich, epsilon-Def., Beispiele, Rechenregeln für Grenzwerte
Stetigkeit, Rechnen mit stetigen Funktionen, Zwischenwert-Satz, Arten der
Unstetigkeit
Polynome, Polynom-Division,
Gebrochen-rat. Funktionen, Partial-Bruch-Zerlegung
Trigonometrische Fktn., Arcus-Fktn., Exponential-Fkt., Logarithmus-Fkt.
o Zahlenfolgen, Konvergenz bzw. Divergenz, Grenzwert, Rechenregeln für kon-
vergente Folgen, wichtige Grenzwerte`,
    lehrziele: `Nach Abschluss des Moduls sind die Studierenden in der Lage
o die für diese Veranstaltung tyischen Aufgaben systematisch und schrittweise
strukturiert zu lösen und sowohl den Weg, als auch die Ergebnisse übersichtlich
und nachvollziehbar zu dokumentieren.
o sich quantitative oder geometrische Zusammenhänge zu veranschaulichen und
das zur Lösung bzw. zur Dokumentation zu nutzen.
o Voraussetzungen und Ergebnisse auf Plausibilität zu prüfen bzw. Proberech-
nungen durchzuführen.
o die einschlägigen Hilfsmittel fachgerecht zu benutzen.
o schriftlich und mündlich über einschlägige Themen zu kommunizieren.
5o die Rechenregeln für die Grundrechenarten, Potenzen, Wurzeln, Exponential-
funktion und Logarithmen richtig und zielführend einzusetzen.
o Die Lösungsmengen von einfachen Gleichungen, Ungleichungen und lin. Glei-
chungssystemen zu bestimmen.
o Algebraische Rechnungen mit Komplexen Zahlen in den üblichen Darstellungen
selbständig durchzuführen.
o Lösungswege mit algebraischen Rechnungen mit Vektoren (unter Einschluß von
Skalar- und Kreuzprodukt) auch in einfachen Anwendungsfällen selbständig zu
finden, ggf. geometrisch zu interpretieren und durchzurechnen.
o Rechnungen und einfache Anwendungen unter Zuhilfenahme von Matrizen und
Determinanten zu bewältigen und deren Rechenregeln zu beherrschen.
o Partialbruch-Zerlegung selbständig beherrschen
o Basierend auf der Kenntnis der Eigenschaften, Rechenmethoden und Graphen
mit einfachen Funktionen (Polynome, Gebr.-rat. Funktionen, Exponential-Funk-
tion, Sinus, Cosinus, Tangens und deren Umkehrfunktionen) zu arbeiten
o Konvergenzverhalten und ggf. Grenzwerte von Zahlenfolgen selbständig zu un-
tersuchen`,
  },
  {
    kuerzel: `W-02`,
    name: `Grundlagen der Ingenieurmathematik`,
    semesterSoll: 2,
    ects: 5.0,
    swsVorlesung: 6,
    workloadGesamt: 270,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Differenzialrechnung
Sekante -> Tangente, Differentzenquotient -> Differenzial-Quotient,
Ableitungen der elementaren Funktionen, Ableitungsregeln, Ableitung der
Umkehrfunktion, Beispiele
Implizite Fktn. und deren 1. Ableitung
Tangenten und Normalen an eine Kurve, Schnittwinkel.
Das Differenzial, geom. Interpretation, Anwendungen, Vergleich mit exakter
Rechnung
Mittelwertsatz, Satz von Rolle, Ableitung und Monotonie,
Regeln von Bernoulli-de l'Hospital zur Grenzwertbestimmung (und deren Gren-
zen)
Höhere Ableitungen (explizite, implizite Fktn)
12Endliche Summen
Summenzeichen, Binom. Satz, Arithm. Summe, Geom. Summe
Zahlenreihen
Partialsumme, unendliche Reihe, Konvergenz, Divergenz,
Info: Bei unendlichen Summen kann i.A. nicht wie mit endlichen Summen gerechnet
werden. Notwendigkeit von Konvergenzkriterien
Geometrische Reihe, deren Konvergenz-Eigenschaften und Um-Indizierung,
Partial-Bruch-Zerlegung und Teleskop-Summen,
Linearkombination konvergenter Reihen
Divergenz der harmonischen Reihe
Minorantenkriterium, Majorantenkriterium, SUM_{k} k 1/k^p -Vergleichsreihe,
Quotienten- und Wurzelkriterium, Leibniz-Kriterium,
Info: Umordnung nicht absolut konvergenter Reihen
Integralrechnung
f(x)*dx als Flächenzuwachs, Hauptsatz für unbestimmte Integrale,
Stammfunktion,
Info: Integral als Grenzwert einer unendlichen Summe
Bestimmtes und unbestimmtes Integral, Rechenregeln, Mittelwertsatz,
Verschieben bzw. Skalieren des Integrations-Intervalles,
Hauptsatz für best. Integrale
Grundintegrale, Partielle Integration, Substitution, Partialbruch-Zerlegung
Uneigentliche Integrale
Waagrechte und senkrechte Streifen, Flächenberechnung ebener Bereiche und
Mehrfach-Integrale, Fläche in Polarkoordinaten, Jacobi-Determinante
Bogenlänge, Mantelfläche, Volumen von Rotationskörpern
Taylor- & Potenzreihen
Taylor-Polynom, geom. Interpretation
Info: ein endliches Polynom kann z.B. sin(x) für x -> Unendlich nicht
beschreiben
Notwendigkeit einer Fehlerabschätzung
Satz von Taylor, Lagrange-Restglied, Beispiele und Anwendungen
Reihen wichtiger Funktionen; Binominal-Entwicklung
Potenzreihen: Struktur, Wurzel- und Quotienten-Kriterium, Konvergenz-Bereich,
Konvergenz-Radius, Beispiele,
Integrieren und Differenzieren von Potenzreihen
Info: Multiplikation von Potenzreihen
Fourier-Reihen
Period. Funktion, period. Fortsetzung, Minimale quadr. Abweichung,
Orthogonalitätsrelationen, Fourier-Koeffizienten, Fourier-Reihe,
Satz von Dirichlet, Beispiele
Info: Oberschwingungen, Spektrum
Info: Gibbs'sches Phänomen
13Symmetrie-Eigenschaften und deren Ausnutzung,
Fourier-Zerlegung im Komplexen
Info: Integration und Ableitung einer Fourier-Reihe
Info: Datenreduktion bei einem gepixelten Bild durch Fourier-Zerlegung
Differenzialrechnung in mehreren Variablen
Höhenlinien, 3D-Darstellung von z = f(x,y)
Schnittkurven
Grenzwert (z.B. längs vektorieller Geraden mit allg. Richtungsvektor)
Stetigkeit
Partielle Ableitungen 1. Ordnung, Steigungen der Schnittlinien
Totales Differenzial und Richtungsableitung, Gradient, AnwendungenSatz von H.A.
Schwarz
Info: Taylor-Entwicklung in mehreren Variablen`,
    lehrziele: `Methodisch: Strukturiertes Arbeiten und Kommunizieren der Überlegungen bzw. Er-
gebnisse vom Bekannten zum Neuen, vom Einfachen zum Komplizierten, am konkre-
ten Beispiel lernen/üben
o Ggf. Visualisierung
o Zerlegen in übersichtliche Teilschritte
o je nach Fall: vom Speziellen zum Allgemeinen (induktiv) oder umgekehrt (de-
duktiv)
evtl. Bewertung des Ergebnisses: auf Plausibilität prüfen, Proberechnung
o Trennung von Vermutungen/Annahmen und Tatsachen (und deren Gütigkeits-
bereich)
klare und eindeutige Begriffe
Fachlich: Nach Abschluss des Moduls sind die Studierenden in der Lage
o mit einfachen Zahlenfolgen umzugehen und deren Grenzwerte zu be-
stimmen. Begriff und Eigenschaften des Grenzwertes für Zahlenfolgen
und wichtige Grenzwerte sind bekannt.
10o typ. Beispiele von zusammengesetzten Funktionen abzuleiten. Ablei-
tungsregeln und geometrische Interpretation der ersten Ableitung von
expliziten, impliziten oder in Parameterform gegebenen Funktionen wer-
den beherrscht und z.B. zur Berechnung von Grenzwerten angewandt.
Die Berechnung von höheren Ableitungen wird durchgeführt.
o mit endlichen Summen zu rechnen. Unendliche Zahlen-Reihen als
Grenzwert der Folge der Partialsummen und die Begriffe Konvergenz
bzw. Divergenz einer Reihe sind bekannt. Die Notwendigkeit von Kon-
vergenzkriterien zum Rechnen mit Reihen wurde erklärt.
o Die Konvergenz-Eigenschaften der geometrischen Reihe und die Diver-
genz der harmonischen Reihe sind im Detail bekannt.
o Teleskop-Summen und Partialbruch-Zerlegung können an einschlägigen
Beispielen durchgeführt werden.
o Vergleichs-Kriterien, Wurzel- und Quotientenkriterium und das Leibniz-
Kriterium werden sicher beherrscht,
o die Konvergenz der alternierenden harmonischen Reihe wird gezeigt.
o das Integral geometrisch zu interpretieren. Der Zusammenhang mit der
Ableitung ("Hauptsatz"), die Begriffe "bestimmtes" und "unbestimmtes
Integral", deren Rechenregln und Grundintegrale sind vestanden. Integ-
rationsmethoden wie partielle Integration, Substitution und Partial-
bruch-Zerlegung werden je nach Beispiel selbständig ausgewählt und
angewandt.
Es werden Flächen ebener Bereiche mit waagrechten oder senkrechten
Streifen oder in Polarkoordinaten berechnet; dabei der Begriff des Mehr-
fach-Integrals erläutert. Die Berechnung von Bogenlängen von Kurven
und Mantelfläche bzw. Volumina von Rotantionskörpern werden be-
stimmt.
o -ine Funktion in eine Taylor-Reihe bzw. ein Taylor-Polynom zu entwi-
ckeln und einfache Fehler-Abschätzungen mit Hilfe des Restgliedes
durchzuführen.
o Taylor- bzw. McLaurin-Entwicklungen wichtiger Funktionen und einige
Anwendungen sind bekannt.
Der Begriff und die mathematische Struktur von Potenzreihen sind be-
kannt. Die systematische Untersuchung des Konvergenz-Bereiches einer
Potenzreihe erfolgt selbständig.
o
o
11o Begriff und Struktur einer Fourier-Reihe sind bekannt; period. Funktio-
nen werden (evtl. unter Ausnutzung ihrer Symmetrie) entwickelt.
o Über das Gibbsche Phänomen und Spektren in Anwendungen wurde in-
formiert.
o Funktionen von zwei Variablen geometrisch zu deuten: Fläche, Höhenli-
nien, Schnittkurven.
Die Bestimmung des Grenzwertes einer Funktion z = f(x,y) kann durchgeführt wer-
den. Partielle Ableitungen erster Ordnung werden berechnet; die geometrische Bedeu-
tung als Steigung der entspr. Schnittlinie ist klar.
Der Begriff des totalen Differenzials und sein Zusammenhang mit der Tangential-
Ebene, der Richtungsableitung und dem Gradient sind klar, diese Größen können ei-
genständig berechnet werden.
Die zweiten Ableitungen, der Satz von Schwarz und die Bedingungen für Extrema ste-
hen für eigene Berechnungen zur Verfügung.
Über den Satz von Taylor wurde informiert.`,
  },
  {
    kuerzel: `W-03`,
    name: `Informatik`,
    semesterSoll: 1,
    ects: 10.0,
    swsVorlesung: 8,
    workloadGesamt: 300,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Informatik 1 Vorlesung:
1. Einführung und historischer Rückblick
2. 3. 4. 5. 6. 7. Informationsdarstellung (Codierung, Speicherformen für Text, Bilder und Musik)
Zahlensysteme (Stellenwertsysteme allgemein, Umwandlung zw. Zahlensystemen,
Ganze Zahlen inkl. B-Komplement, Divisions- und Multiplikationsmethode und
Rückführung der Subtraktion auf die Addition, Reelle Zahlen mit Normierung und
Speicherform, Datentypen in Programmiersprachen)
Boolesche Algebra (Rechengesetze, disjunktive und konjunktive Normalform,
Schaltnetze und Schaltwerke, Addierwerk, Aussagenlogik)
Datenbanken und Datenmodellierung (Grundlagen Datenbanksysteme, ACID-Prin-
zip, Entity Relationship Modell, Überführung in das relationale Datenmodell, Nor-
malisierung)
Rechnernetze (Netzwerktopologien, Übertragungsmedien, Internet, OSI- und
TCP/IP-Modell, Kommunikationsprozess, Protokolle, IP-Adressierung)
Ablaufmodellierung (UML-Aktivitätsdiagramm, Struktogramm, Petri-Netze, BPMN)
Informatik 1 Praktikum:
1. 2. Erstellung einer Datenbank und SQL-Abfragen
Internet- und Webtechnologien (html, xml)
3. Hardware-Grundlagen
Informatik 2:
1. Vorgehen im Software-Engineering
2. 3. 4. Makros in Excel erstellen und nachbearbeiten, Grundlagen VBA
Grundlegende Programmelemente (Variablen, Konstanten, Operatoren, Arrays, Ty-
pumwandlung)
Kontrollstrukturen (bedingte und mehrseite Fallauswahl, bedingte und zählerge-
steuerte Wiederholung)
185. Prozeduren und Funktionen (Wert- und Referenzparameter, optionale Parameter,
vordefinierte Funktionen)
6. Such- und Sortieralgorithmen in VBA (Lineare und Binäre Suche, Bubble-, Inser-
tion- und Quick-Sort)
7. Programmieraufgaben (z.B. Berechnen einer konvexe Hülle, Petri-Netz Simulator)`,
    lehrziele: `Die Studierenden sind mit den Grundlagen der Informatik vertraut und sind befä-
higt zum Einsatz von IT in der Praxis.
Lernziele:
1. 2. 3. 4. 5. Zahlensysteme und Boolesche Algebra als zugrunde liegende Grundprinzipien der
Informatik beherrschen.
Grundtechniken der Datenmodellierung, relationaler Datenbanken und SQL-Abfra-
gen praktisch anwenden, z.B. in MS Access.
Grundlagen von Rechnernetzen und Fachbegriffe im Kontext korrekt anwenden.
Werkzeuge zur Modellierung und Strukturierung von Abläufen problemspezifisch
einsetzen.
Durch Einführung in Internet/Web-Technologien moderne Informationssysteme,
insb. Benutzeroberflächen, in den Grundlagen verstehen.
166. 7. 8. 9. Durch die Vorstellung von Hardware werden die Studierenden in die Lage versetzt,
Leistungsdaten sicher einzuschätzen.
Ein Einblick in die Organisation von Softwareprojekten befähigt die Studierenden,
sich bei Projekten in Unternehmen einbringen und Softwareprojekte begleiten zu
können.
Durch eine Einführung in die Programmierung beherrschen die Studierenden die
Grundelemente imperativer Programmierung und sind in der Lage, eigene Pro-
gramme für die tägliche Arbeitspraxis zu entwickeln. Ein Verständnis zur Übertra-
gung der allgemeinen Programmierprinzipien auf andere Programmiersprachen ist
gegeben.
Studierende haben analytische, strukturierte Vorgehensweisen entwickelt und
insb. algorithmisches Denken erlernt, z.B. durch die Programmierung.
Nach Absolvieren des Moduls Informatik haben die Studierenden somit insb. folgende
Kompetenzen erworben:
Fach- und Methodenkompetenz
Die Studierenden beherrschen die theoretischen und praktischen Grundlagen der In-
formatik, insb. zu theoretischen Grundlagen, Datenbanken, Rechnernetzen und Pro-
grammierung. Sie können problemspezifisch eigene, kleinere IT-gestützte Lösungen,
z.B. Excel Makros oder Datenbanken entwickeln.
Der Erwerb von sozialen Kompetenzen steht bei diesem Modul naturgemäß nicht im
Vordergrund, wird aber durch Kooperation der Studierenden und gemeinsames Erar-
beiten von Lösungen im Informatik Praktikum gefördert.
Die Selbstkompetenz wird durch vertieftes selbständiges Erarbeiten und Lösen von
Problemen gefördert. Durch die praktische Anwendung der IT und deren kritische
Durchdringung erarbeiten sich die Studierende die Fähigkeit zum abstrakten und ana-
lytischen Denken.`,
  },
  {
    kuerzel: `W-04`,
    name: `Technische Mechanik`,
    semesterSoll: 1,
    ects: 10.0,
    swsVorlesung: 12,
    workloadGesamt: 450,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Grundbegriffe
o Kräfte mit gemeinsamem Angriffspunkt
o Allgemeine Kraftsysteme und Gleichgewicht des starren Körpers
o Schwerpunkt
o Lagerreaktionen
o Fachwerke
o Schnittgrößen an Balken, Rahmen, Bogen
o Arbeit
o Haftung und Reibung

o Zug und Druck in Stäben
o Spannungszustand, Verzerrungszustand, Elastizitätsgesetz
o Balkenbiegung
22o Torsion
o Arbeitsbegriff in der Elastostatik
o Knickung`,
    lehrziele: `Vermittlung der grundlegenden Prinzipien und Methoden der technischen Mechanik ist
das Hauptziel der Vorlesung. Die Anwendung der Prinzipien und Methoden der Mecha-
nik zur Lösung von technisch relevanter Aufgabenstellung der Statik wie die Ermitt-
lung von Schnitt- und Auflagergrößensteht im Mittelpunkt im 1. Semester. Die Einfüh-
rung in die Tragwerksberechnung anhand ausgewählter Themen aus der Elastizitäts-
theorie und Festigkeitslehre ist der Kern der Vorlesung im 2. Semester.
Die Studierenden sind danach in der Lage:
17. mechanische Ersatzsysteme zu interpretieren, das Schnittprinzip anzuwenden, die
Gleichgewichts-bedingungen aufzustellen und die entstehenden Gleichungssys-
teme zu lösen,
18. die inneren Belastungen (Schnittgrößen) mechanischer Systeme zu berechnen,
19. Schwerpunkte zu bestimmen und den Einfluss der Reibung zu berücksichtigen,
2120. Spannungen und Verformungen mechanischer Ersatzsysteme für die drei Haupt-
Belastungsarten (Zug/Druck, Biegung, Torsion zu bestimmen,
21. einfache Fragestellungen zum mehrdimensionalen Spannungs- und Verformungs-
zustand zu beantworten,
22. den Arbeitsbegriff auf einfache Fragestellungen der Statik und Elastostatik anzu-
wenden
23. und die elementaren Knickfälle (Euler) zu berechnen`,
  },
  {
    kuerzel: `W-05`,
    name: `Marketing`,
    semesterSoll: 1,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Jeder Kauf ist letztendlich ein Vertrauensvorschuss des Kunden an den Hersteller bzw.
Verkäufer. Dieser Vertrauensvorschuss wird durch Maßnahmen des Marketing unter-
stützt.
Es werden anhand von Beispielen die vier grundlegenden Stellhebel des Marketing
(Marketing-Mix) erklärt. Weiterführend wird auf die Besonderheiten des Industriegü-
ter- und des Dienstleistungsmarketing eingegangen. Damit lernen die Studierenden
die Marketingstellhebel zu analysieren und adäquat anzuwenden und kennen die
Besonderheiten im Industriegüter- und Dienstleistungsmarketing.
Im weiteren wird auf Marktforschung, Unternehmensanalyse und Informationsbe-
schaffung eingegangen, besondere rechtliche Aspekte des Marketing werden erläu-
tert.
Gliederung der Veranstaltung
1. Grundlagen, Begriffsbestimmung
Geschichte des Marketing, Aspekte, Verwendung des Begriffes Marketing, strate-
gische Ausrichtungen des Marketing, Begriffsbestimmung - Märkte, Unternehmens-
ziele, Ziele des Marketing, Zielbeziehungen, Marketingstrategien, Marktsegmentie-
rung/Marktbearbeitungsstrategien, Produkt-Markt-Kombinationen, kundenorientierte
Strategien, Konsumentenverhalten, Konsumentenbedürfnisse, psychische und indivi-
duelle Determinanten des Verhaltens, das marketingpolitische Instrumentarium
252. Produktpolitik
Begriffsklärung, Ziele der Produktpolitik, verkaufsfördernde Faktoren- der Pro-
duktnutzen, was ist ein optimales Produkt?, Markenpolitik, Typisierung von Produkten,
Aufgaben der Produktpolitik, Produktlebenszyklus, Portfolioanalyse, Programm- / Sor-
timentspolitik, produktbegleitende Maßnahmen, Kundendienst / Service
3. Preispolitik
Begriffsklärung, Entscheidungsfelder der Preispolitik, Marktformen, Determinanten
der Preisfindung, Preiskomponenten, Preisstrategien, Preisdifferenzierung, psychologi-
sche Preiswirkung, preispsychologische Konsumententypen, psychologische Preisge-
staltung, Konditionenpolitik
4. Distributionspolitik
Begriffsklärung, Absatzwege, direkter Absatz, indirekter Absatz, Funktionen des
Handels, Sonderformen der Distribution, Logistik, Neue Medien in der Distributionspo-
litik
5. Kommunikationspolitik
Begriffsklärung, Kommunikationsplanungsprozess, Kommunikationsstrategie - Die
Botschaft, Instrumentarium der Unternehmenskommunikation, Corporate Identity
6. Marktanalyse,Marktforschung, Marketingforschung
Begriffsklärung, Aufgaben der Marktforschung, Formen der Marktforschung,
Marktforschungsprozess, Sekundärforschung, Primärforschung, Methoden der Primär-
forschung, Erhebungsverfahren, Outsourcing oder Inhouseforschung, Marktforschung
und Ethik
7. Industriegütermarketing / Dienstleistungsmarketing
Industriegütermarketing, Besonderheiten des Industriegütermarketing, Kaufver-
halten im Industriegütermarketing, Buying-Center
Dienstleistungsmarketing, Besonderheiten des Dienstleistungsmarketing, Wert-
schöpfungskette im Dienstleistungsmarketing, Differenzierung der angebotenen Leis-
tung gegenüber der Konkurrenz, Qualität und Dienstleistung
8. Rechtliche Aspekte
Wettbewerbsrecht, Gesetz gegen den unlauteren Wettbewerb (UWG), Kartellver-
bot (GWB), Schutzrechte für Marken, Produkte und Verfahren von Unternehmen,
Schutz von Marken und geschäftlichen Bezeichnungen, Geschmacksmusterschutz, Ge-
brauchsmusterschutz, Patentschutz, Verbraucherschutz, Urheberrecht, Datenschutz-
Grundverordnung`,
    lehrziele: `In Märkten mit Produkten und Leistungen, die immer mehr gegeneinander austausch-
bar sind, in einer Umgebung immer zunehmender Informationsüberlastung wird es für
Unternehmen immer schwieriger, sich eindeutig zu positionieren.
Ziel des Kurses ist es, den Studierenden die grundlegenden Konzepte und Begriffe des
strategischen und des operativen Marketing zu vermitteln. Sie erhalten Einblick in un-
terschiedliche Marketingansätze und werden vertraut mit der Positionierung am Markt
und den damit einhergehenden Schwierigkeiten.
Den Studierenden werden die Grundlagen des Marketing nahe gebracht, es wird ihnen
das Grundwerkzeug anhand der Marketing-Mix vermittelt. Sie lernen die Stellhebel
des Marketing verstehen, lernen, sich mit dem konzeptionellen Zusammenspiel der
Marketing-Mix-Instrumente und der besonderen Rolle des Menschen im Marketing an-
hand von praktischen Beispielen auseinander setzen. Weiterführend werden sie mit
den Unterschieden und Besonderheiten von Konsumgüter-, Industriegüter- und
Dienstleistungsmarketing vertraut gemacht.
Nach Absolvieren des Moduls Marketing haben die Studierenden somit folgende Kom-
petenzen erworben:
24Fach- und Methodenkompetenz
Die Studierenden beherrschen die theoretischen und praktischen Grundlagen der Mar-
keting. Sie können problemspezifisch, kleinere Marketinglösungen entwickeln.
Der Erwerb von sozialen und persönlichen Kompetenzen steht bei diesem Modul
naturgemäß nicht im Vordergrund, wird aber durch Kooperation der Studierenden und
gemeinsames Erarbeiten von Lösungen gefördert.
Die Selbstkompetenz wird durch vertieftes selbständiges Erarbeiten und Lösen von
Problemen gefördert. Durch beispielhafte, praktische Anwendung und deren kritische
Durchdringung erarbeiten sich die Studierenden die Fähigkeit zum abstrakten und
analytischen Denken.`,
  },
  {
    kuerzel: `W-06`,
    name: `Unternehmerische Grundlagen`,
    semesterSoll: 1,
    ects: 8.0,
    swsVorlesung: 10,
    workloadGesamt: 300,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Gegenstand und Grundlagen der Betriebswirtschaftslehre
o Wissenschaftliche Einordnung der Betriebswirtschaftslehre
o Der betriebliche Transformationsprozess
o Rechnungswesen und Bilanzierung
o Grundlagen des internen und externen Rechnungswesens
o Bilanz und Gewinn- und Verlustrechnung
o Finanz- und ertragswirtschaftliche Ebenen
o Grundzüge der Kapitalflussrechnung
o Kosten- und Leistungsrechnung
o Ziele und Aufgaben der Kosten- und Leistungsrechnung
o Kostenarten, Kostenstellen und Kostenträgerrechnung
o Kostenrechnungssysteme
o Finanzierung und Investition
o Grundlagen der Finanzierung und der Zinsrechnung
o Kapitalbedarfsermittlung
o Innenfinanzierung/Außenfinanzierung
o Grundlagen der Investition
30o Investitionsplanung
o Investitionsrechnung
o Unternehmensrechtsformen
o Organisation
o Aufbau-/Ablauforganisation
o Grundformen der betrieblichen Organisation

o Grundlagen des betrieblichen Rechnungswesens
o Begriff des betrieblichen Rechnungswesens
o Aufgaben des betrieblichen Rechnungswesens
o Struktur des betrieblichen Rechnungswesens
o Die Finanzbuchhaltung (FiBu)
o Die Buchführungspflicht nach dem Handelsrecht
o Die Buchführungspflicht nach dem Steuerrecht
o Verstöße gegen die Buchführungspflicht
o Die Grundsätze der ordnungsgemäßen Buchführung und Bilanzierung (GoB)
o Inventar und Inventur
o Kontenrahmen und Kontenplan
o Grundlagen der Umsatzsteuer und Vorsteuer
o Jahresabschluss und Finanzbuchhaltung
o Der Jahresabschluss allgemein
o Die Gewinn- und Verlustrechnung (GuV) als Bestandteil des Jahresabschlusses
o Die Bilanz als Bestandteil des Jahresabschlusses
o Ausgewählte Fälle der Finanzbuchhaltung

31o Grundlagen des Ökonomischen Denkens
o Märkte - Zusammentreffen von Angebot und Nachfrage
o Elastizitäten und wirtschaftspolitische Maßnahmen
o Marktversagen
o Zwischenstaatlicher Handel
o Wettbewerb
o Messung des Volkseinkommens
o Wachstum und Produktion
o Das monetäre System und das Finanzsystem

o Grundlagen (Wirtschaften, Produktionsfaktoren, Kennzahlen)
o Globalisierung
o Grundzüge internes Rechnungswesen (Kostenrechnung)
o Rechtsformen
o Grundlagen der Materialwirtschaft
o Grundlagen zu Absatz/Marketing
o Grundlagen zu Personalwesen und Unternehmensführung
o Mikro- und makroökonomische Grundlagen
o Volkswirtschaftslehre als Wissenschaft
o Angebots- und Nachfrageverhalten von Unternehmen und Haushalten
33o Preisbildung bei unterschiedlichen Markt- und Wettbewerbsbedingungen
o Träger, Ziele und Mittel der Wirtschaftspolitik
o Möglichkeiten und Grenzen wirtschaftspolitischer Gestaltung im Wandel gesell-
schaftlicher und ökologischer Herausforderungen
o Binnen- und außenwirtschaftliche Ursachen und Folgen gesamtwirtschaftlicher In-
stabilität
o Einblick in die Bedeutung staatlicher Einnahmen und Ausgaben sowie der öffentli-
chen Verschuldung
o Außenwirtschaftliche und währungspolitische Grundlagen

o Die Organisation der Buchführung
o (Grundsätze ordnungsgemäßer Buchhaltung, Bestandskonten, Erfolgskonten,
GuV, Bilanz)
o Spezielle Buchungsfälle
o (Die Umsatzsteuer in der Buchführung, Buchungen im Einkaufsbereich, im
Fertigungsbereich und im Verkaufsbereich)
o Das Problem einer periodengerechter Erfolgsabgrenzung
o Abschreibungen auf Anlagen und Forderungen
o Adressaten des Jahresabschlusses und deren Informationsbedürfnisse`,
    lehrziele: `Fachkompetenz:
In einer modernen Wirtschaftswelt bilden fundierte Grundkenntnisse betriebswirt-
schaftlicher und volkswirtschaftlicher Abläufe und Zusammenhänge, die Basis für jede
unternehmerische Entscheidung und demzufolge für die Wahrnehmung von Aufgaben
in der Unternehmensführung. Insbesondere für Wirtschaftsingenieure, die das Binde-
glied zwischen dem technischen und dem wirtschaftlichen Bereich in Unternehmen
darstellen, sind umfangreiche betriebs- sowie volkswirtschaftliche Kenntnisse uner-
lässlich.
Die Studierenden gewinnen in dieser Lehrveranstaltung einen grundlegenden Über-
blick über die wichtigsten betriebswirtschaftlichen Themengebiete, sowie über die be-
trieblichen Abläufe und Zusammenhänge in Betrieben und Unternehmen. Das geschaf-
28fene Verständnis befähigt sie, betriebswirtschaftliche Abläufe zu verstehen, Problem-
felder zu erkennen und zu analysieren, um geeignete Lösungsstrategien zu entwi-
ckeln.
Die Studieren sollen den Zweck, Aufbau sowie die grundlegenden Inhalte einer Bilanz
sowie einer Gewinn- und Verlustrechnung (GuV) als wichtige Bestandteile eines han-
delsrechtlichen Jahresabschlusses verstehen und anwenden können. Darüber hinaus
sollen sie verstehen, definieren und anwenden können, wer nach Handels- und Steu-
errecht persönlich buchführungspflichtig ist, welche Grundsätze ordnungsgemäßer
Buchführung und Bilanzierung maßgeblich sind, welche Grundsätze bei der Erstellung
eines Inventars und welche Ansatz- und Bewertungsvorschriften bei der Bilanzerstel-
lung zu berücksichtigen sind.
Des Weiteren sollen die Studierenden das System der kaufmännischen Buchführung
als einen in sich geschlossenen Kreislauf verstehen und anwenden können. Sie können
verstehen und erklären, welche Auswirkungen typische wirtschaftlich relevante Ge-
schäftsvorgänge auf die Bilanz und die GuV haben können.
Die Systematik der kaufmännischen Buchführung anhand der Verbuchung typischer
Geschäftsvorgänge und die Möglichkeit der Ansammlung, Aufbereitung und Auswer-
tung buchhalterischer Daten für betriebliche Entscheidungsprozesse sollen von den
Studierenden verstanden und angewandt werden können. Ebenso sollen die Studie-
renden in die Lage versetzt werden, den wirtschaftlichen Erfolg eines Unternehmens
periodengerecht und zuverlässig zu ermitteln.
Neben dem Verständnis für betriebsinterne Zusammenhänge ist auch ein Verständnis
für die Abläufe und Zusammenhänge in einer Volkswirtschaft gefragt, um für das ei-
gene Unternehmen die richtigen Schlüsse aus der gesamtökonomischen Lage ziehen
zu können. Die Studierenden gewinnen im Teilmodul Volkswirtschaftslehre einen
grundlegenden Überblick über die wichtigsten volkswirtschaftlichen Themengebiete.
Dazu wird zum einen das Unternehmen als Wirtschaftsakteur modelliert, welcher sich
mit Marktgegebenheiten auseinandersetzten muss (Mikroökonomie). Zudem wird ver-
mittelt, welche Faktoren die Wirtschaftskraft einer Volkswirtschaft maßgeblich beein-
flussen und was gesamtwirtschaftliche Kennzahlen aussagen (Makroökonomie).
Methoden- und Sozialkompetenz:
Die Studierenden gewinnen einen ersten Überblick über die wesentlichen betriebswirt-
schaftlichen Methoden, sowohl mathematischer als auch juristischer Art. Darüber hin-
aus erhalten Sie eine grundlegenden Überblick über die wichtigsten volkswirtschaftli-
chen Themengebiete.
Anwendungsorientiertes Wissen im externen Rechnungswesen und Kenntnis der ge-
setzlichen Grundlagen in Handels- und Steuerrecht sind dabei die Basis für gesetzes-
konformes Verhalten.`,
  },
  {
    kuerzel: `W-07`,
    name: `Wirtschaftsrecht`,
    semesterSoll: 2,
    ects: 10.0,
    swsVorlesung: 10,
    workloadGesamt: 360,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Einzelne Risikobereiche im Unternehmen
o Vertragsarten: Kaufvertrag, Werkvertrag, Werklieferungsvertra, Dienstvertrag
o Mögliche Folgen von Produktfehlern
37o Übersicht über die Rechtsverhältnisse und die wichtigsten Ansprüche in der Lie-
ferkette
o Die neue Rechtslage zur Sachmängelhaftung
o Die Produkthaftung nach dem Produkthaftungsgesetz
o Grundzüge des Schuldrechts
o Grenzen der Vertragsfreiheit
o AGB-Einbeziehung und -Kontrolle nach dem neuem Recht
o Überblick über das allgemeine Wirtschaftsrecht (Handels- und Gesellschafts-
recht)
o Grundzüge des Wirtschaftsstrafrechts
o Insolvenz
o Stufenaufbau des ESt-Rechts
o Wesentliche Begriffe des ESt-Rechts
o Methoden der Gewinnermittlung
o Verlustberücksichtigung im ESt-Recht
o Stufenaufbau des KSt-Rechts
o Ermittlung des zu versteuernden Einkommens
o Abziehbare und nichtabziehbare Aufwendungen
o Verdeckte Gewinnausschüttungen und Einlagen
o Stufenaufbau der GewSt-Schuld
o Steuertatbestände des UStG

o Einzelne Risikobereiche im Unternehmen
o Allgemeine Rechtsgeschäftslehre, Willenserklärungen
o Vertragsarten: Kaufvertrag, Werkvertrag, Werklieferungsvertrag, Dienstvertrag
39o Übersicht über die Rechtsverhältnisse und wichtigsten Ansprüche in der Liefer-
kette
o Die neue Rechtslage zur Sachmängelhaftung und mögliche Folgen von Produkt-
fehlern
o Strafrechtliche und zivilrechtliche Verantwortung von Managern, Abteilungslei-
tern und sonstigen Mitarbeiteren
o Stellvertretung / Prokura
o Grenzen der Vertragsfreiheit
o AGB-Einbeziehung und -Kontrolle nach neuem Recht
o Fernabsatzverträge und außerhalb von Geschäftsräumen geschlossene Ver-
träge
o Überblick über das allgemeine Wirtschaftsrecht (Handels- und Gesellschafts-
recht)
o Grundzüge des Bereicherungs- und Deliktsrechts

o Einführung in die Besteuerung
o (Grundbegriffe, Besteuerungsprinzipien, Einteilung der Steuern)
41o Einkommensteuer
o (Grundlagen, persönliche und sachliche Steuerpflicht,von der Summe der sie-
ben Einkunftsarten bis zum versteuernden Einkommen, Ermittlung der Steuer-
last)
o Körperschaftsteuer (Grundlagen, persönliche Steuerpflicht, Ermittlung des zu
versteuernden Einkommens, die steuerliche Behandlung des Anteilseigners ?
Abgeltungsteuer)
o Gewerbesteuer / Umsatzsteuer
o (Bemessungsgrundlage und Höhe der Gewerbesteuer)
o (Grundlagen und Aufbau des UStG, Steuerbare Umsätze, Steuerbefreiungen,
Bemessungsgrundlag und Steuersatz, Entstehen der Umsatzsteuer, Vorsteuer-
abzug, Besteuerung der Kleinunternehmer)
o Steuerstrafrecht / Tax Compliance
Zugangs- bzw. empfohlene Voraussetzungen
W1107 Bilanzierung`,
    lehrziele: `Fachkompetenz:
Um die Teilnehmer in die Lage zu versetzen, die typischen juristischen Risiken im Un-
ternehmen aufzudecken und konkrete Lösungsvorschläge aufzuzeigen, vermittelt die-
ses Modul grundlegende Kompetenzen im Bereich des Risiko- und Compliancemana-
gements und sensibilisiert zugleich für Vorgaben, Regelungen und Normen, die Mitar-
beiterinnen und Mitarbeiter sowie Unternehmen zu kennen, zu beachten und deren
Befolgung sie zu dokumentieren haben.
Mögliche Auswirkungen von Fehlern in diesem Bereich auf das Unternehmen und or-
ganisatorische Maßnahmen zur Gegensteuerung und Prophylaxe werden dabei aufge-
zeigt. Die Studierenden werden dabei nicht zu Juristen mit Einzelfallwissen ausgebil-
det, sondern primär für die Thematiken sensibilisiert. Darüberhinaus sollen die Studie-
renden in ihrem späterem Berufsleben frühzeitig erkennen können, ob aktuelle juristi-
sche Problemstellungen noch innerbetrieblich zu lösen sind, oder ob Juristen beizuzie-
hen sind.
36Im Teilmodul "Wirtschaftsprivatrecht" liegt der Schwerpunkt auf dem Vertragsrecht, in
welchem die Studierenden auch Einzelfallwissen z.B. im Bereich der allgemeinen Ge-
schäftsbedingungen und der Stellvertretung erwerben. Sie können mit diesen Themen
selbständig umgehen und Mitarbeitern diesbezügliche Weisungen erteilen.
Speziell werden im Teil "Steuern" grundlegende Vorschriften der Unternehmensbe-
steuerung sowie die steuerrechtlichen Spezifika ausgewählter Rechtsformen darge-
stellt. Ein Überblick über die Grundzüge des Ertrags- und Umsatzsteuergesetzes, so-
wie über die grundsätzlichen Unterschiede bei der Besteuerung von Personen- und Ka-
pitalgesellschaften komplettieren die Vorlesung.
Methodenkompetenz:
Die Studierenden kennen die juristische Arbeitsweise und können einfache Sachver-
halte unter die wichtigsten Normen des BGB subsumieren. Dabei können Sie Mei-
nungsstreitigkeiten einordnen und mit ihnen umgehen. Das Auffinden der erforderli-
chen Informationen in Kommentaren, Urteilen und Datenbanken wird verinnerlicht.
Sozialkompetenz:
Die Kenntnis der gesetzlichen Grundlagen des Wirtschaftsrechts ist die Basis für ge-
setzeskonformes Verhalten. Es wird Bewusstsein für die sozialen und finanziellen Kos-
ten von Rechtsstreitigkeiten geschaffen und konsensorientierte Möglichkeiten der Lö-
sung von Interessenkonflikten aufgezeigt.`,
  },
  {
    kuerzel: `W-09`,
    name: `Physik 2`,
    semesterSoll: 2,
    ects: 9.0,
    swsVorlesung: 14,
    workloadGesamt: 510,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Einheitensysteme
o Physikalische Grössen
o Kinematik der Massenpunkte (Bewegungen in ein, zwei und drei Dimensionen)
o Dynamik der Massenpunkte (die Newtonschen Axiome, Anwendungen der
Newtonschen Axiome)
o Arbeit, Leistung und Energie, Energieerhaltung
o Teilchensysteme und die Erhaltung des linearen Impulses
o Drehbewegungen und die Drehimpulserhaltung
o Mechanik der Fluide
o Schwingungen
o Wellen
o Thermodynamik idealer Gase
o Geometrische Optik

o Einheitensysteme
o Teil 1: Mechanik von Massenpunkten (eindimensionale Bewegung, Bewegung
in zwei und drei Dimensionen, Newton´sche Axiome, Anwendungen der
Newton´schen Axiome, Arbeit und Energie, Energieerhaltung, Teilchensysteme
und Erhaltung des linearen Impulses, Drehbewegungen,Drehimpulserhaltung,
Gravitation)
o Teil 2: Mechanik von starren und deformierbaren Körpern (Trägheitsmomente,
Spannungs- und Verformungszustände, Elastizitätskonstanten)
o Teil 3: Fluide und Gase (Druck, Auftrieb, Grenzflächen, Strömungen, Viskosi-
tät)
o Teil 4: Wärmelehre (Temperatur, Wärmeausdehnung, Wärmekapazität, statis-
tische Gastheorie, Phasenübergänge)
o Teil 5: Schwingungen (freie, gedämpfte, erzwungene Schwingung, harmoni-
sche Oszillatoren (Pendel), Resonanz, Überlagerung von Schwingungen)
o Teil 6: Wellen (mathematische Beschreibung, Ausbreitung, Überlagerung, ste-
hende Wellen, Beugung, Interferenz, Dopplereffekt)
o Teil 7: Optik (elektromagnet. Wellen, Spektrum, Dispersion, Strahlenoptik
(Abbildungen, optische Geräte), Wellenoptik (Beugung, Interferenz, Polarisa-
tion, Anwendungen in der Technik)

Fach "Physik 2"
o Einführung und Grundbegriffe (Temperatur, Temperaturskalen, Temperaturfel-
der, Wärme, Wärmestrom, Wärmestromdichte)
o Wärmetransportmechanismen (Leitung, Konvektion, Strahlung) und Transport-
gesetze
o Allgemeine Fouriersche Wärmeleitungsdifferentialgleichung (Anfangs- und
Randbedingungen, Lösungen)
51o Einfache Massen- und Energiebilanzen
o Elektrische Analogie (thermische Widerstände und Leitwerte, Serien- und Pa-
rallelschaltung), Wärmedurchgang und Transmission; Wärmedurchgangskoeffi-
zienten (U-Werte) ein- und mehrschichtiger homogener Bauteile; Kontaktwi-
derstand; Wärmedurchgang in gekrümmten Geometrien
o Normgerechte bauphysikalische Berechnungen: Luftschichten; Wärmedurch-
gangskoeffizienten inhomogener Bauteile; Wärmedurchgangskoeffizienten von
Fenstern und Türen; Wärmebrücken
o Energiesparender Wärmeschutz (Heizperiodenbilanzverfahren, Jahresheiz-
wärme- und Jahresprimärenergiebedarf von Gebäuden; nationale Vorschriften)
o Wirtschaftlichkeit von Maßnahmen der Energieeinsparung
o Instationäre Wärmeleitung (Normierung, ideal gerührter Behälter, halbunendli-
cher Körper, exakte Lösung, Näherungslösung für große Zeiten)
Fach "Praktikum Physik":
Versuche zu folgenden Themen (unter anderem, die Liste der Versuchsaufbauten wird
ständig erweitert):
o erzwungene lineare Federschwingung
o Torsionsschwingung und Massenträgheitsmoment
o Linsen und optische Geräte
o Wellenlängenbestimmung mit dem Gitterspektrometer
o Brechungsindexmessung mit dem Refraktometer
o Beugung von Ultraschallwellen
o Zustandsänderungen des idealen Gases
o Wärmeleitfähigkeit und Wärmeausdehnung
o Wheatstone\`sche Messbrücke
o Ersatzspannungsquellen`,
    lehrziele: `Nach dem erfolgreichen Abschluss des Moduls können die Studierenden zu realen phy-
sikalischen Vorgängen und Phänomenen aus dem Bereich der Mechanik, der Fluidme-
chanik, der Schwingungen, Wellen, Thermodynamik und der Strahlenoptik ein ideali-
siertes mathematisches Modell erstellen und anhand des Modells grundlegende Frage-
stellungen beantworten.
Insbesondere sind die Studierenden nach Abschluss des Moduls in der Lage,
o die physikalischen Grundlagen der Mechanik, Fluidmechanik, Schwingungen,
Wellen und Thermodynamik zu verstehen
o die Gesetze der linearen Bewegung und der Drehbewegung anzuwenden
o die Erhaltungssätze von Energie, linearem Impuls und Drehimpuls zur Lösung
von Problemen anzuwenden
o die Bewegungsgleichungen für reale Systeme aufzustellen und zu lösen
44o Berechnungen für gegebene Systemparameter anhand der erstellten Mo-
delle durchzuführen
o die Unterschiede zwischen Modell und realem System zu benennen
o den Übergang vom schwingenden Einzelkörper zur Welle im schwingenden
Kontinuum zu verstehen
o die Ausbreitung von Wellen in 1D, 2D und 3D zu erklären und die Auswirkun-
gen des Dopplereffekts zu berechnen
o die Effekte von Beugung und Interferenz in 1D, 2D und 3D zu erklären und zu
berechnen
o stehende Wellen auf begrenzten Medien als Modell für die Funktionsweise von
Musikinstrumenten heranzuziehen
o thermodynamische Systeme mittels ihrer Zustandsgrössen zu beschreiben
o thermodynamische Zustandsänderungen idealer Gase zu erklären und zu be-
rechnen
o mit Hilfe der Gesetze der Strahlenoptik (Reflexion und Brechung) den Weg von
Lichtstrahlen zu berechnen und zu zeichnen
o die Wirkung von brechenden Elementen zu erklären und zu berechnen
o die Funktionsweise einfacher optischer Geräte zu erklären und ihre Abbildung
zu berechnen und konstruieren
Die Studierenden können nach der Teilnahme an der Veranstaltung ihre erworbenen
Kenntnisse bei der Lösung formaler Aufgaben und bei realen Experimenten im Prakti-
kum anwenden
Zusätzlich sind die Studierenden nach Abschluss des Moduls in der Lage, in Kleingrup-
pen physikalische Probleme in der adäquaten Fachsprache zu diskutieren, sich gegen-
seitig physikalische Zusammenhänge zu erklären und gemeinsam eine Lösung des
Problems zu erarbeiten und zu bewerten.

Fach "Physik 2":
Die Studierenden erwerben ein umfassendes und vertieftes Verständnis der Mechanis-
men des Wärmetransports und des baulichen Wärme- und Kälteschutzes und können
die am Beispiel Gebäude erlernte universelle Methodik auf andere technische Systeme
übertragen. Auf Basis dieser Grundlagen besitzen sie die Fähigkeit zur selbständigen
fachgerechten Analyse komplexer technischer Systeme in Bezug auf die auftretenden
Massen- und Energieflüsse und die korrekte Beschreibung mit mathematischen Model-
len sowie die Plausibilisierung der daraus abgeleiteten Ergebnisse. Das sichere Formu-
lieren und Lösen von Massen- und Energiebilanzen an stationären und instationären
Systemen ermöglicht ihnen die fundierte technische und wirtschaftliche Bewertung der
Effizienz von Maßnahmen zur industriellen und privaten Energieeinsparung.
Fachkompetenz:
49Die Studierenden kennen und verstehen die Grundlagen und Mechanismen des statio-
nären und instationären Wärmetransport und können Massen- und Energiebilanzen
aufstellen. Sie sind mit nationalen Regeln des energiesparenden Wärmeschutzes ver-
traut. Sie lernen typische bauliche Lösungen kennen, wie die im Bereich des Wärme-
schutzes von Gebäuden praktisch eingesetzt werden.
Methodenkompetenz:
Die Studierenden können die erworbenen fachlichen Grundlagen sicher und eigenstän-
dig auf verschiedene technische Systeme anwenden, um deren Energieflüsse umfas-
send zu ermitteln und so die Wirtschaftlichkeit von Maßnahmen zur Energieeinsparung
zu evaluieren.
Analytische Kompetenz:
Die Studierenden sind in der Lage technische Systeme hinsichtlich des Energieflusses
mit geeigneten Modellen strukturiert mathematisch zu beschreiben, primäre Trans-
portmechanismen sicher zu identifizieren und unter Anwendung mathematischer Me-
thoden zu lösen.
Persönliche Kompetenz:
Das vertiefte selbständige Modellieren und Lösen komplexer technischer Fragestellun-
gen fördert die persönliche Kompetenz nachhaltig. Mit der Durchdringung mathemati-
scher Methoden und deren zielgerichtete Anwendung erweitern die Studierenden ihre
Fähigkeit zum strukturierten, vernetzten und analytischen Denken.
Soziale Kompetenz:
Auch wenn die Vermittlung sozialer Kompetenzen nicht im Vordergrund des Moduls
steht, werden sie dennoch durch das begleitende eLearning im Rahmen von Diskussio-
nen und kritischen Reflexionen im Kursforum sowie durch Teamarbeit im Rahmen des
freiwilligen Tutoriums gefördert.
Fach "Praktikum Physik":
Nach dem erfolgreichen Abschluss des Physik-Praktikums können die Studierenden an
einfachen Versuchsaufbauten selbstständig Messaufgaben durchführen, die Messun-
gen protokollieren und zusammenfassen. Insbesondere sind sie in der Lage,
1. verschiedene Laborinstrumente zu bedienen (Messschieber, Goniometer, Digi-
talthermometer, Multimeter, einfache Digitaloszilloskope, Labornetzteile, PC-
Schnittstellen mit zugehöriger Software....)
2. die Messgenauigkeit der Instrumente abzuschätzen und die Messergebnisse
entsprechend zu interpretieren
3. Messergebnisse an einem physikalischen Modell zu evaluieren und Übereinst-
immungen und Abweichung zu diskutieren und zu erklären
504. Experimente nachvollziehbar zu protokollieren
5. statistische Messfehler zu berechnen und die Verlässlichkeit eines Messergeb-
nisses anzugeben
Vor allem versetzt das Modul die Studierenden in die Lage, physikalische Experimente
selbst zu entwerfen und so grundlegende physikalische Effekte, die aus der Theo-
rie bekannt sind, selbst zu erleben.
Weiterhin sind die Studierenden nach Abschluss des Moduls in der Lage, in Teams ei-
nen Arbeitsablauf zu planen, strukturiert und arbeitsteilig durchzuführen und an-
schliessend die Ergebnisse gemeinsam zu diskutieren. Die Teams, die sich im Prakti-
kum bilden, sind in den meisten Fällen anschliessend für den Rest des Studiums auch
erfolgreiche Lerngruppen.`,
  },
  {
    kuerzel: `W-10`,
    name: `Wirtschaftsenglisch`,
    semesterSoll: 1,
    ects: 2.0,
    swsVorlesung: 2,
    workloadGesamt: 60,
    pruefungsform: `PStA, schr. P. 60 Min.`,
    inhalte: `55o Grundlagen des Geschäftslebens
o Unternehmensstrukturen
o Märkte und Marktstrukturen
o Unternehmensgründung
o Produkteinführung
o Innovation und Technologie in Unternehmen
o Online Geschäfte
o Marketing
o Kommunikation und Geschäftskorrespondenz
o Geschäftsbesprechungen und Präsentationen
o Internationale Geschäftsbeziehungen
o Aktuelle wirtschaftliche Themen`,
    lehrziele: `Wirtschaftsenglisch für Wirtschaftsingenieure (B2) zielt darauf ab, den Studierenden
spezialisierte Sprachkenntnisse zu vermitteln, die für eine selbständige Tätigkeit in ei-
nem globalisierten Bereich des Wirtschaftsingenieurwesens notwendig sind. Dabei wird
versucht, die Beziehung der Studierenden zur englischen Sprache im kaufmännischen
Bereich zu vertiefen, damit sie die Sprache effektiv und effizient als praktisches Kom-
munikationsmittel einsetzen können.
In diesem Zusammenhang setzt das Modul auf die Vermittlung der vier kardinalen
Sprachfertigkeiten (Hören, Lesen, Sprechen und Schreiben) in einem breiten Spekt-
rum von wirtschaftlichen Kernthemen im Bereich des Wirtschaftsingenieurwesens. Da-
bei gestalten Studierende ihren eigenen Wissenserwerb durch gezielte Bedürfnisanaly-
sen und eigengesteuerte Projekte.
Im Mittelpunkt des Moduls stehen die Optimierung der Sprach- und Kommunikations-
fähigkeiten sowie die Entwicklung eines klaren Verständnisses für die Feinheiten der
54textlichen und dialogbezogenen Bedeutungen. Durch eine Vielzahl von aufgabenbezo-
genen Sprech-, Hör- und Schreibübungen verbessern die Studierenden ihre aktive und
passive Sprachkompetenz und Fähigkeit, klare, prägnante und zusammenhängende
Texte zu verfassen - sei es in Form von E-Mails, Berichten oder erklärenden Beschrei-
bungen geschäftlicher Prozesse. Besonderer Wert wird auf die Verbesserung der rhe-
torischen Kompetenz und Teamfähigkeit der Studierenden gelegt, wobei in jedem Kurs
eine Team-Präsentation vorgesehen ist.
Nach Abschluss des Moduls haben die Studierenden die folgenden Lernziele erreicht:
Fachkompetenz
1. Die Studierenden beherrschen selbständig die für den Bereich des Wirtschaft-
singenieurwesens relevante kaufmännische Fachterminologie. Beherrschung
bezieht sich hier auf die mündliche und schriftliche Kommunikation sowie auf
das Hör- und Leseverständnis.
2. Die Studierenden sind in der Lage, Fähigkeiten wie genaues Lesen und klar
strukturiertes Schreiben auf B2 - Niveau einzusetzen.
3. Sie haben umfangreiche Kenntnisse über Sprachstile auf B2 - Niveau erworben
- sowohl für formale Studienkontexte als auch für semi-formale und formale
berufliche Situationen.
4. Sie verfügen über grundlegende Erfahrungen in der Präsentation von Themen
im Zusammenhang mit Wirtschaftsenglisch.
5. Methodenkompetenz
6. Die Studierenden haben gelernt, den Erwerb von Fachterminologie und gram-
matikalischer Inhalte besser zu strukturieren und geübt, wie man eine neue
Sprache verinnerlicht, um einen optimalen Lernnutzen zu erzielen.
7. Soziale Kompetenz
8. Die Studierenden haben wertvolle Erfahrungen im Training anderer persönli-
cher Kompetenzen wie Teamarbeit, Integrität und Zuverlässigkeit gesammelt.`,
  },
  {
    kuerzel: `W-11`,
    name: `Technisches Englisch`,
    semesterSoll: 2,
    ects: 2.0,
    swsVorlesung: 2,
    workloadGesamt: 60,
    pruefungsform: `PStA, schr. P. 60 Min.`,
    inhalte: `Die Kursinhalte verteilen sich auf eine Reihe von Pflichtthemen, die der Dozent festlegt
(60% der Inhalte) und nicht obligatorischer Themen, die die Studierenden auswählen
(40% der Inhalte).
Zu den obligatorischen Themen gehören unter anderem die folgenden:
o Mathematische Operationen und Zahlen
o Messungen und Einheiten
o Geometrische Formen
o Physikalische Grundlagen (z.B. Kräfte)
o Materialien und ihre Eigenschaften
o Fallstudie zu einem Thema im Bereich Technologie/Design/Ingenieurwesen
o Kommunikationsfähigkeiten (z.B. Präsentationen)
o Grammatikalische Themen (z.B. passiv vs. aktiv, Zeitformen, Konditionalsätze)
o Beispiele für nicht verbindliche Themen sind etwa:
o Erneuerbare Energien
o E-Mobilität
o Grundlagen der Elektrotechnik
o Computing
o Geoinformationssysteme
o Arbeitssicherheit`,
    lehrziele: `Technisches Englisch für Wirtschaftsingenieure (B2) zielt darauf ab, den Studierenden
spezialisierte Sprachkenntnisse zu vermitteln, die für eine selbständige Tätigkeit in ei-
nem globalisierten Bereich des Wirtschaftsingenieurwesens notwendig sind. Dabei wird
versucht, die Beziehung der Studierenden zur englischen Sprache im technischen Be-
reich zu vertiefen, damit sie die Sprache effektiv und effizient als praktisches Kommu-
nikationsmittel einsetzen können.
In diesem Zusammenhang setzt das Modul auf die Vermittlung der vier kardinalen
Sprachfertigkeiten (Hören, Lesen, Sprechen und Schreiben) in einem breiten Spekt-
rum von wirtschaftlichen und technischen Kernthemen im Bereich des Wirtschaftsin-
genieurwesens. Die Studierenden gestalten auch die Lerninhalte durch Bedarfsanaly-
sen und zahlreiche immersive und selbstgesteuerte Projekte selbst mit.
Im Mittelpunkt des Moduls stehen die Optimierung der Sprach- und Kommunikations-
fähigkeiten sowie die Entwicklung eines klaren Verständnisses für die Feinheiten der
textlichen und dialogbezogenen Bedeutungen. Durch eine Vielzahl von aufgabenbezo-
genen Sprech-, Hör- und Schreibübungen verbessern die Studierenden ihre aktive und
passive Sprachkompetenz und Fähigkeit, klare, prägnante und zusammenhängende
Texte zu verfassen - sei es in Form von E-Mails, (technischen) Berichten oder erklä-
58renden Beschreibungen technischer Prozesse. Besonderer Wert wird auf die Verbesse-
rung der rhetorischen Kompetenz und Teamfähigkeit der Studierenden gelegt, wobei
in jedem Kurs eine Team-Präsentation vorgesehen ist.
Nach Abschluss des Moduls haben die Studierenden die folgenden Lernziele erreicht:
Fachkompetenz
o Die Studierenden beherrschen selbständig die für den Bereich des Wirtschaft-
singenieurwesens relevante technische Fachterminologie. Beherrschung bezieht
sich hier auf die mündliche und schriftliche Kommunikation sowie auf das Hör-
und Leseverständnis.
o Die Studierenden sind in der Lage, Fähigkeiten wie genaues Lesen und klar
strukturiertes Schreiben auf B2 - Niveau einzusetzen und zwar für Spezialauf-
gaben im Bereich des Wirtschaftsingenieurwesens.
o Sie haben umfangreiche Kenntnisse über Sprachstile auf B2 - Niveau erworben
- sowohl für formale Studienkontexte als auch für semi-formale und formale
berufliche Situationen.
o Sie verfügen über grundlegende Erfahrungen in der Präsentation von Themen
im Zusammenhang mit Technischem Englisch. Ziel ist es, Spezialwissen in den
Manuskripten klar strukturierter, wirkungsvoll gehaltener öffentlicher Reden zu
bündeln.
Methodenkompetenz
o Die Studierenden haben gelernt, den Erwerb von Fachterminologie und gram-
matikalischer Inhalte besser zu strukturieren und geübt, wie man eine neue
Sprache verinnerlicht, um einen optimalen Lernnutzen zu erzielen.
o Durch mindestens zwei Forschungsprojekte haben sie ihre praktischen For-
schungskompetenzen in englischer Sprache erweitert und verfeinert - zum Bei-
spiel durch die Aufgabe, ein fachspezifisches Thema in einer Einzel- oder
Teampräsentation vorzustellen.
Soziale Kompetenz
o Die Studierenden haben wertvolle Erfahrungen im Training anderer persönli-
cher Kompetenzen wie Teamarbeit, Integrität und Zuverlässigkeit gesammelt.
o Sie haben zudem die Lernergebnisse verschiedener Immersionsprojekte verin-
nerlicht.`,
  },
  {
    kuerzel: `W-12`,
    name: `Konstruktion`,
    semesterSoll: 3,
    ects: 4.0,
    swsVorlesung: 6,
    workloadGesamt: 120,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `63o Geometrische Grundkonstruktionen
o Orthogonale Projektion (Dreitafelprojektion)
o Axonometrische Projektion / Freihandzeichnen
o Normgerechte Bemaßung
o Ausarbeiten der Produktionsunterlagen
o Schraubverbindungen
o Maß-Toleranzen und Passungen
o Form- und Lagetoleranzen
o Oberflächenbeschaffenheit
o Normzahlen und Normreihen
o Zeichnungssystematik`,
    lehrziele: `Das Modul vermittelt die Fähigkeit, Maschinenbauteile räumlich zu skizzieren und
normgerecht in einer technischen Zeichnung darzustellen sowie die Fähigkeit, Maschi-
nenbauteile nach funktionellen und technisch-wirtschaftlichen Gesichtspunkten auszu-
führen.`,
  },
  {
    kuerzel: `W-13`,
    name: `Werkstofftechnik`,
    semesterSoll: 4,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `1.Aufbau der Materie
1.1 Atommodelle
1.2 Bindungsarten
1.3 Thermodynamische Strukturgleichgewichte
2. Materialeigenschaften in Bezug auf den Aufbau der Materie
2.1 Mechanische Eigenschaften
2.2 Elektrische Eigenschaften
2.3 Magnetische Eigenschaften
2.4 Thermische Eigenschaften
2.5 Chemische Eigenschaften
2.6 Optische Eigenschaften
3. Herstellungsverfahren ausgewählter Werkstoffe`,
    lehrziele: `Nach Abschluss des Moduls kennen die Studierenden die Atommodelle und Bindungs-
arten.
Ihnen ist die Bedeutung der Elektronenzustände auf Bindungen und Materialeigen-
schaften bewusst.
Studierende verstehen Grundbegriffe und Kennzahlen der Werkstoffkunde und wen-
den sie an.
Sie kennen die Unterschiede der Materialgruppen Metalle, Keramiken und Polymere
und können diese mit den Bindungsarten korrelieren.
Sie sind in Gesprächen mit Fachleuten in der Lage, Plausibilitätsfragen zu stellen und
fachbezogen nach zu fragen`,
  },
  {
    kuerzel: `W-14`,
    name: `Grundlagen der Elektrotechnik`,
    semesterSoll: 3,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `1. Grundlagen der Elektrotechnik
2. Elektrische Grundgrößen
a. Elektrische Ladungen und Stromkreis
b. Stromdichte
c. Stromarten
d. Die elektrische Spannung
e. Das Ohmsche Gesetz
f. Arbeit und Leistung
3. Der Gleichstromkreis
a. Passive Zweipole
b. Aktive Zweipole
c. Ideale Quellen
d. Reale lineare Quellen
e. Bestimmung des Arbeitspunkts
f. Leistungsanpassung
3. Berechnung von Gleichstromkreisen
a. Die KIRCHHOFFschen Gesetze
b. Reihen- und Parallelschaltung von Widerständen
c. Spannungs- und Strommessung
d. Netzwerke mit einer Quelle
e. Überlagerungssatz
f. Ersatzquellen
g. Stern-/Dreieck-Umwandlung
68h. Grundbegriffe der Wechselstromtechnik
i. Periodische Zeitfunktionen
j. Sinus-Größen
k. Komplexe Wechselstromrechnung
l. Betrieb idealer passiver Zweipole mit Sinusgrößen
m. Sinusstromnetzwerke`,
    lehrziele: `o Erlangung von Kenntnis und Verständnis der physikalischen und mathemati-
schen Grundlagen der Elektrotechnik.
o Anwendung einfacher Prinzipien der Meß- und Regelungstechnik auf Probleme
der Praxis.
o Fähigkeit zur Anwendung der erlernten Kenntnisse auf die spezifischen techni-
schen Probleme.`,
  },
  {
    kuerzel: `W-15`,
    name: `Meß- und Regelungstechnik`,
    semesterSoll: 4,
    ects: 5.0,
    swsVorlesung: 5,
    workloadGesamt: 270,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Messtechnik:
o Messen: Messgrößen, Einheitensystem
71o Messsignale: Klassifizierung und Wandlung, Charakterisierung
o Messmethoden: Ausschlag, Differenzmethode, Kompensation
o Messeinrichtung: Grundstruktur, statische und dynamische Kenngrößen
o Bewertung von Messergebnissen: Abweichungen, Fehlerfortpflanzung von sys-
tematischen und zufälligen Abweichungen; Fehlertypen
o Messung elektrischer Größen: Strom, Spannung, Leistung, Widerstände, Kon-
densator, Spule, Zeit, Frequenz
o Messung nichtelektrischer Größen: Messkette, Sensoren zur Geometrie-, Kraft-
, Schwingungs-, Temperatur und Durchflussmessung; Koordinatenmesstechnik
o Automatisierte Messsysteme
o
Regelungstechnik:
o Einführung und Grundlagen (Historie, Prinzipien der Regelung, Wirkungsplan,
einfache Regelkreisbeispiele)
o Verhalten von Regelkreisgliedern, Modellbildung, nichtlinieare Modelle, Linear-
sierung)
o Lösung von Differenzialgleichungen mit Hilfe der Laplace-Transformation
o Beschreibung typischer technischer Regelstrecken im Zeit- und Laplace-Bereich
o Allgemeines Führungs- und Störverhalten
o Geschlossener Regelkreis mit P-, I-, PI-, PD- und PID-Regler
o Stabilität des geschlossenen Regelkreises Stabilitätskriterium und Stabilitäts-
prüfung
o Einfache Einstellregeln für PID-Regler`,
    lehrziele: `Meßtechniktechnik
o Erlangung von Kenntnis und Verständnis der
physikalischen und mathematischen Grundlagen der
Elektrotechnik.
o Anwendung einfacher Prinzipien der Mess- und
Regelungstechnik auf Probleme der Praxis.
o Fähigkeit zur Anwendung der erlernten Kenntnisse auf
die spezifischen technischen Probleme.
Regelungstechnik
Lernziele:
Das Teilmodul Regelungstechnik vermittelt den Studierenden das grundlegende Wis-
sen zum Verständnis und zur Analyse einfacher Regelkreissysteme in technischen An-
wendungen. Die Studierenden erlernen eine systemtheoretische Betrachtung von Re-
gelkreisen und kennen deren Struktur und Methoden zur Reglerauslegung sowie zur
wichtigen Beurteilung der Stabilität von Regelungssystemen.
Fachkompetenz:
701. Die Studierenden kennen die grundlegenden Strukturmerkmale von einfachen Re-
gelkreisen und wenden Methoden zur Beschreibung der Regelkreisdynamik und
Regelkreisstabilität an
o Sie verstehen technische Einsatzszenarien von Regelungen
o Sie führen das erlernte Wissen in der Lösung von Aufgabenstellungen des Regel-
kreisentwurfs zusammen.
Methodenkompetenz:
1. Anwenden von der grundlegenden Entwurfsmethoden:
 Laplace-Transformation
 Darstellung von Regekreisübertragungsfunktionen
 Einstellregeln für die Bestimmung von Reglerparameter (z. B. Ziegler-Nichols
o Verstehen und Anwenden einfacher Methoden zur Prüfung der Stabilität geschlos-
sener Regelkreise (Hurwitz-Test, Vorgabe einer Regelkreisdynamik
Personale Kompetenz:
1. Lösung von grundlegenden Aufgaben zum Entwurf und zur Beurteilung regelungs-
technischer Systeme.
Soziale Kompetenz:
1. Die Studierenden sind in der Lage, die Problemstellungen aus verschiedenen Per-
spektiven zu betrachten und ihre im Modul erworbenen Kompetenzen situations-
adäquat in Einzel- und Gruppengesprächen zu nutzen.`,
  },
  {
    kuerzel: `W-16`,
    name: `Fluid- und Energietechnik`,
    semesterSoll: 3,
    ects: 5.0,
    swsVorlesung: 6,
    workloadGesamt: 120,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Ideales, reales, Stoffverhalten
o Massen- und Energiebilanz
o Hauptsätze der Thermodynamik
o Kreisprozesse und thermische Maschinen
o Hydrostatik
o Bernoulli-Gleichung
o Stationäre Rohrströmung mit Druckverlust
o Impulssatz`,
    lehrziele: `o Die Studierenden kennen Grundgesetze der Strömungsmechanik und der
Thermodynamik und damit gewinnen ein Verständnis für die in Maschinen, An-
lagen und in der Natur ablaufenden Transportvorgänge von Masse, Impuls und
Energie.
o Die Studierenden sind in der Lage technische Anlagen als abstrahierte Sys-
teme zu modellieren und an den entsprechenden Systemgrenzen Masse, Ener-
gie zu bilanzieren.
o Die Studierenden lernen basierend auf praxisnahen Problemstellungen, wie di-
verse technische Problemstellungen methodisch und analytische zu lösen sind.`,
  },
  {
    kuerzel: `W-17`,
    name: `Regenerative Energien und Stofftechnik`,
    semesterSoll: 4,
    ects: 4.0,
    swsVorlesung: 4,
    workloadGesamt: 120,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `1. Einleitung
a. Drei Säulen der Nachhaltigkeit: sozial, ökologisch, ökonomisch
b. Treibhauseffekt, Treibhaugase
2. Bewertung
a. Ökologische Bewertung bzw. Ökobilanz
b. Lebensweganalyse (Life Cycle Assessment)
3. Sonnenenergie
a. Bestandenteile der Sonne, Entstehung der Sonnenergie
b. Fusionsreaktor, Solarkonstante, Emissionsspektrum der Sonne
4. Nicht-konzentrierende Solarthermie
a. Flachkollektor und Vakuumröhrenkollektor
b. Optische und thermische Vorgänge
5. Konzentrierende Solarthermie
a. Parabolrinnen-Kraftwerk (Dampfturbinenpozess)
b. Turm-Solarkraftwerk mit Salzschmelze
786. Windenergie
a. Windentstehung über globale und lokale Windssysteme
b. Leistungskennlinie einer Windkraftanlage, Leistungsberechnung
7. Photovoltaik
a. Eigenleitung und Störstellenleitung durch Dotierung
b. Prinzip Solarzelle im Energiebändermodel
8. Geothermie
a. Nutzung der Geothermie: Flächenkollektoren, Erdwärmesonden, tiefe Geother-
mie für Strom
b. Geothermische Kraftwerke mit Binär-Kreislauf
9. Bioenergie
a. Nachwachsende Rohstoffe
b. Thermochemische Umwandlung (Pyrolyse, Versagung, Verbrennung)
10. Energiespeicher
a. Warum brauchen wir Energiespeicher für erneuerbare Energie
b. Pumpspeicherkraftwerk usw.`,
    lehrziele: `Die Studierenden des Modules gewinnen einen Einblick, die Nutzung regenerativer
Energien ist ein wichtiger Teil von der Bundesregierung forcierten Energiewende bei
der Bekämpfung des Treibhauseffekts und anderer negativer Auswirkungen der heuti-
gen Energieversorgung.
Die Studierenden verstehen die physikalischen und technischen Grundlagen beim Auf-
bau und Betrieb von wichtigen erneuerbaren Energiesystemen. Der Schwerpunkt liegt
dabei auf Technologien mit einem großen Entwicklungspotenzial wie Solarthermie,
Photovoltaik, Windenergie, Geothermie und Bioenergie. Dazu erarbeiten sich die Stu-
dierenden darauf aufbauende Fähigkeiten im Umgang mit verschieden Quellen wissen-
schaftlichen Wissens. Die Studierenden kennen und verstehen die Quellen, die zur Ge-
winnung von erneuerbaren Energien genutzt werden können. Ein Hauptaugenmerk
liegt dabei darauf die physikalischen Grundlagen zum Verständnis der Hautquelle Son-
nenenergie zu verstehen. In der Vorlesung sind alle Energietechnologien zusammen-
gefasst, die aus regenerativen Rohstoffen oder Quellen gewonnen werden. Darüber
hinaus ist es Ziel der Vorlesung bei den Studierenden ein Verständnis für das Zusam-
menspiel der verschiedenen Energietechnologien zum Umbau der Energiesysteme von
fossil auf regenerativ kennen zu lernen.
76Nach Absolvieren des Moduls Regenerative Energien und Stofftechnik haben die Stu-
dierenden folgende Lernziele erreicht:
Fachkompetenz:
Die Studierenden kennen und verstehen die aktuellen Technologien und Entwicklun-
gen im Bereich der Regenerativen Energiesysteme im Kontext von Netzausbau, virtu-
ellen Kraftwerkskonzepten und Speichertechnologien sowie dem weiteren Zubau Re-
generativer Energien und können diese kritisch bewerten. Die Studierenden
o sind vertraut mit den drei Säulen der Nachhaltigkeit und dem anthropogenen
Treibhauseffekt.
o kennen die ökologische Bewertung sowie das Konzept „Cradle to Cradle“.
o verstehen die Entstehung der Sonnenenergie und berechnen die Solarkon-
stante
o erläutern die nicht-konzentrierende und konzentrierende Solarthermie mit Bei-
spiele
o analysieren die Windentstehung, beurteilen die Häufigkeitsverteilung von
Windgeschwindigkeit und Leistungskennlinie
o klassifizieren Festkörper zu Nichtleiter, Halbleiter und Leiter, zeichnen das Prin-
zip der Solarzelle
o beschreiben die Nutzung der Erdwärme
o beschreiben die verschiedenen Formen der Bioenergie und sind in der Lage
dazu die verschiedenen Umwandlungen einzuordnen
kennen die Methoden des Speicherns von Energie für verschiedene erneuer-
bare Energieträger
Methodenkompetenz
Die Studierenden
o beherrschen grundlegende Funktionen der verschiedenen erneuerbaren Ener-
gieträger und können die praktische Entwicklung nachvollziehen.
o sind in der Lage, methodisch, wissenschaftlich, kritisch und wissensbasiert re-
generative Energiesysteme zu verstehen, zu rezipieren und evaluieren.
o kennen die Herausforderungen der regenerativen Energien und können Maß-
nahmen zum effizienten Umbau der Energiesysteme bewerten, anwenden und
begründen.
Personale- soziale Kompetenz
77Die Studierenden
1. sind in der Lage ihre Argumente bei Kommunikationssituationen im Bereich der
Energietechnik nachvollziehbar zum Ausdruck zu bringen und mit anderen fach-
kompetent zu diskutieren.
o reflektieren die nachhaltigen Gedanken für ihr Fachgebiet sowie für ihr Verständnis
von Wissenschaft.`,
  },
  {
    kuerzel: `W-18`,
    name: `Investition und Finanzierung`,
    semesterSoll: 3,
    ects: 10.0,
    swsVorlesung: 8,
    workloadGesamt: 300,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Finanzwirtschaftliche Grundbegriffe, Ziele und Instrumente. Liquidität, Kapital-
bedarf, finanzielles Gleichgewicht, Organisation der betr. Finanzwirtschaft,
Zahlungsverkehr, Instrumente der finanzwirtschaftlichen Führung (Finanzkenn-
zahlen, -plan, -kontrollen)
o Insolvenztatbestände, -verfahren
o Grundzüge der Finanzplanung, Bilanzanalyse, Finanzanalyse, Finanzierungsre-
geln
o Kenntnis der Kapitalformen und Kapitalquellen
o Finanzierungsarten (insbesondere Absatz- und Investitions-finanzierung), fi-
nanzwirtschaftlich relevante Märkte, Finanzierungsersatz (Leasing, Factoring),
Kreditgespräch, Bonitätsprüfung, Kreditsicherung
o Eigenkapital, Dividendenpolitik, Kapitalerhöhung
o Grundzüge der Unternehmensbewertung
82o Moderne Unternehmen müssen betriebswirtschaftliche Entscheidungen schnell,
effizient und nachvollziehbar herbeiführen können, um im Wettbewerb zu be-
stehen.
o Investition steht in einem engen Zusammenhang mit dem Thema Finanzie-
rung. Dieses Modul bietet Entscheidungshilfen für Fälle, in denen mehrere In-
vestitionsalternativen zur Auswahl stehen.
o Die Vertrautheit mit den Methoden der Investitionsrechnung als Teilbereich des
betrieblichen Rechnungs-wesens und eines betrieblichen Informations- und
Controlling Systems ist Voraussetzung um als Wirtschaftsingenieur erfolgreich
mitwirken zu können.
o Die Grundlagen der Kostenrechnung werden vermittelt bzw. aus dem Modul
BWL wiederholt.
o Es werden die statischen und die dynamischen Verfahren der Investitionslehre
gelehrt.
o Das Problem der Differenzinvestitionen wird behandelt.
o Kennzahlensysteme bei der Auswertung der Bilanz und der GuV sind wesentli-
che Inhalte des Controllings.
o Das Kostenrechnungssystem wird als Schlüssel für ein erfolgreiches Controlling
vertieft vermittelt.`,
    lehrziele: `Fachkompetenz:
Aufbauend auf den betriebswirtschaftlichen Grundlagen werden im Modul Investition
und Finanzierung die Grundsätze der Unternehmensführung aus Sicht des Controllings
diskutiert. Die hierbei auftretenden Prozesse und Abhängigkeiten sollen für den Stu-
denten erkennbar und verständlich werden. Die benötigten Werkzeuge zu Finanzie-
rung, Investition und deren Controlling sollen in Ihrer Wirkungsweise und ihrem Ein-
satz vermittelt werden.
Im Teil "Investition und Controlling" erlernen die Studierenden schwerpunktmäßig die
Anwendung der Investitionsrechung sowie des Betriebsabrechnungsbogens.
Im Teil Finanzierung erlernen die Studierenden, erste Anzeichen der Insolvenztatbe-
stände im Zahlenwerk des Unternehmens zu erkennen und zu verstehen, welche Maß-
nahmen zu treffen sind. Hierfür können die Studierenden mit den verschiedenen Arten
der Eigen- und Fremdfinanzierung umgehen.
Methodenkompetenz:
81Die letztlich jeder betriebswirtschaftlichen Entscheidung zugrundeliegenden mathema-
tischen und juristischen Methoden werden nach 3 Semestern Übung in aufeinander
aufbauenden betriebswirtschaftlichen Grundlagenvorlesungen sicher angewandt.
Sozialkompetenz:
Die Kenntnis der rechtlichen Grundlagen der Wirtschaftstätigkeit ist Basis rechtskon-
formen Verhaltens, wobei die rechtlichen und finanziellen Folgen von Abweichungen
verstanden werden.`,
  },
  {
    kuerzel: `W-19`,
    name: `Allgemeinwissenschaftliches Wahlpflichtfach`,
    semesterSoll: 5,
    ects: 2.0,
    swsVorlesung: 2,
    workloadGesamt: 60,
    pruefungsform: `PStA, schr. P. 90 Min., mdl. P. 15 Min.`,
    inhalte: `Die konkreten Inhalte können der entsprechenden Kursbeschreibung entnommen wer-
den.
Siehe entsprechendes aktuelles Angebot der AWP Fächer und Pflichtsprachen der ein-
zelnen Studiengängen von der Homepage:
https://www.th-deg.de/de/studierende/awp-sprachen`,
    lehrziele: `Durch das AWP-Modul erwerben Studierende Kenntnisse und Fertigkeiten in
Themenbereichen, die über den gewählten Studiengang hinausgehen.
Studierende können sowohl Präsenzkurse als auch Kurse der virtuellen Hochschule
Bayern (VHB) auswählen. Die Studierenden können in folgenden Bereichen Kenntnisse
und Fähigkeiten erwerben:
o in einer oder mehreren Fremdsprachen (Sprachkompetenz)
o im didaktisch-pädagogischen Bereich (Methodenkompetenz)
o im gesellschaftswissenschaftlichen Bereich (Sozialkompetenz)
o im psychologisch-soziologischen Bereich (Sozialkompetenz)
o im technisch-naturwissenschaftlichen Bereich (Fachkompetenz)
o im philosophisch-sozialethischen Bereich (Persönliche Kompetenz)
o im betriebswirtschaftlichen Bereich
Die Studierenden können innerhalb des Wahlpflichtangebotes ihre Kurse selbst
85auswählen und so neigungsorientiert die Kenntnisse vertiefen.`,
  },
  {
    kuerzel: `W-20`,
    name: `Fachwissenschaftliches Wahlpflichtfach`,
    semesterSoll: 4,
    ects: 4.0,
    swsVorlesung: 24,
    workloadGesamt: 870,
    pruefungsform: `Endnotenbildende PStA, schr. P. 90 Min., mdl. P. 15`,
    inhalte: `Die Studierenden der TH Deggendorf sollen die wirtschaftlichen und technischen Fra-
gestellungen (Marktanalyse, Anforderungsliste, Kostenkalkulation, Konstruktionsent-
würfe, Fertigung) übernehmen und optimierte Lösungen erarbeiten. Natürlich müssen
die einzelnen Komponenten und Prototypen auch in verschiedenen Tests ihre Taug-
lichkeit beweisen. Zum Ende des Wintersemesters sollen die entwickelten Varianten
gemeinsam präsentiert werden.
Pflichtaufgaben
1. Teamzusammenarbeit zwischen Studierenden verschiedener THD-Fakultäten.
o grenzübergreifende Zusammenarbeit mit Studierenden der Westböhmischen Uni-
versität Pilsen
o Beteiligung an einem internationalen Arbeitsworkshop und Ausstellungen an der
TH Deggendorf, der Firstcontact-Messe Deggendorf und der Westböhmischen Uni-
versität in Pilsen.
91Projektvorteile
1. Innovative fachliche Arbeit in internationalen Teams
o Praxisorientierte Projektthemen im Bereich Grüne Energie.
o Kostenlose internationale, grenzübergreifende, mehrtägige Workshops und Ex-
kursionen.
o Soziale Kontakte mit den Projektteilnehmern knüpfen.
o Am Semesterende erhalten alle Teilnehmenden ein Zertifikat.
Zugangs- bzw. empfohlene Voraussetzungen
Interesse an Grüner Energie von morgen, interne Teamarbeit und Zusammenarbeit
mit der Westböhmischen Universität in Pilsen.

Der Kurs "Wissenschaftliches Arbeiten" vermittelt den Studierenden die allgemeinen
Grundlagen des wissenschaftlichen Arbeitens, welche für ihren Studienerfolg sowie die
93anschließende berufliche Praxis unersetzbar sind. Es sollen dabei insbesondere fol-
gende Themen bzw. Fragen behandelt werden: "Wie gliedere ich eine wissenschaftli-
che Arbeit?" ? ?Welche Bestandteile enthält eine wissenschaftliche Arbeit, und in wel-
cher Reihenfolge ordne ich diese richtigerweise an?? - "Wo und wie finde ich entspre-
chende verlässliche Literaturquellen, und wie kann man verlässlichen von unverlässli-
chen Quellen unterscheiden?" ? ?Wie lese ich wissenschaftliche Texte?? - "Wie zitiert
man richtig?" - ?Wie erstellt man ein Manuskript?? ? ?Wie fomuliert man einen Text
sachlich und objektiv?? - Was beinhaltet ein Exposé?? ? ?Wie organisiere ich mich bei
der Erstellung einer wissenschaftlichen Arbeit??, etc..
Der Kurs richtet sich vor allem an Studierende des Bachelorstudiengangs "Wirtschaft-
singenieurwesens" bis zum 4. Fachsemester. Doch auch Studierende höhererSemester
können aus diesem Kurs Vorteile ziehen und Unsicherheiten bei der Anfertigung wis-
senschaftlicher Arbeiten beseitigen.
Zugangs- bzw. empfohlene Voraussetzungen
Keine

Grundlage des Erfolgs bei der Planung und Realisierung von Fabrikprojekten ist eine
planvolle und durchgängig systematische Vorgehensweise.
Mit der Zielsetzung
o Erkennen und Beherrschen der grundlegenden Systematik des Fabrikplanungs-
prozesses.
o Erlernen der wesentlichen Werkzeuge zur Fabrikplanung und ihren Einsatz.
o Vermitteln der Fähigkeit, Aufgaben innerhalb der Thematik Fabrikplanung selb-
ständig zu lösen bzw. die für eine Entscheidungsfindung notwendigen Voraus-
setzungen zu erarbeiten
werden die Themen Systematische Vorgehensweise bei der Fabrikplanung von der
Vorplanung über die Phasen der Grobplanung Dimensionierung, Strukturierung zur
Feinplanung und Ausführungsplanung besprochen. Weitere Aspekte innerhalb des Fab-
rikplanungsprozesses zu z.B. Standortplanung, Fertigungsstrukturierung, Simulation
und Supply Chain Management werden diskutiert.
Ein begleitendes Beispiel wird ausgeführt.
In der Montage wird am Ende des Produktionsprozesses das Produkt unter den Rand-
bedingungen Preis, Termin und Qualität fertiggestellt.
Die aufeinander aufbauenden Ebenen Produkt/Prozess, Systemtechnik und Anlage so-
wie Organisation einer Montage werden dargestellt. Aspekte zur montagegerechten
Produktgestaltung und Planung einer Montage werden diskutiert. Im Kurs werden
Grundlagen der Montageprozesse wie Fügen, Handhaben, Kontrollieren und Justieren
erläutert. Große Aufmerksamkeit wird außerdem dem Thema Industrieroboter gewid-
met.
Anwendungsbeispiele und die Diskussion selbstgewählter Montageaufgaben illustrieren
95den Inhalt.
Zielsetzung ist:
o Kennen, auswählen und anpassen von Prozessen für Montageaufgaben nach
wirtschaftlichen Bedingungen.
o Kenntnis der Technologie, Anwendung und Eigenheiten von Verfahren der Mon-
tagetechnik.
o Bewertung von Anforderungen aus Montagegesichtpunkten an vor- und nach-
gelagerte Prozesse und das zu montierende Produkt.
Zugangs- bzw. empfohlene Voraussetzungen
keine

o Erwerb von Wissen über fremde Kulturen z.B. USA, Brasilien, Südafrika, dien, China, Russland
In-
o Vermeidung von Diskriminierung und Ausgrenzung
o Förderung des Einfühlungsvermögens in fremde Kulturen
o Entwicklung von Konfliktlösungsstrategien
o Einsicht in die Relativität von Weltinterpretationen
o Reflexion der kulturellen Gebundenheit eigenen Verhaltens und Handels
o Erkennen und Vermeiden von Stereotypen
o Förderung der Fähigkeit, mit Ungewissheiten und Unklarheiten im Interkultu-
rellen Handlungsfeld umzugehen
Zugangs- bzw. empfohlene Voraussetzungen
keine

o Grundlagen der Matlab-Syntax & wichtige Befehle
o Symbolisches Rechnen mit Matlab
o Graphische Darstellungen
o Programmierung in Matlab (Programmaufbau,
98o Subroutinen, Benutzerinteraktion mit Programmen, Ansprechen von Schnittstel-
len, Speichern und Einlesen von Daten.....)
o verschiedene physikalische und mathematische Problemstellungen als gemein-
same Programmierprojekte (in 2er-Gruppen)
o als benotete Studienarbeit (in 2er-Gruppen): weiterführende physikalische und
mathematische Problemstellungen als Programmierprojekte
Zugangs- bzw. empfohlene Voraussetzungen
Mathematik 1&2, Physik 1&2, Praktikum Physik`,
    lehrziele: `Es handelt sich um eine internationale Projektzusammenarbeit zwischen der Techni-
schen Hochschule Deggendorf und den Westböhmischen Universitäten in Pilsen.
Im Rahmen des Projekts soll ein neues, innovatives, grenzüberschreitendes Wahl-
pflichtfach Internationales EU-Projekt für Studierende in den Bereichen Lehre, For-
schung, künstliche Intelligenz, Technologie, Umwelterziehung und soziokulturelles
Wissen eingeführt werden. Die bestehenden Lehrpläne der beiden Bildungsinstitute
THD und WBU sollen verbessert und die Lücke zwischen theoretischen Grundlagen und
Praxis geschlossen werden. Ziel des Projekts ist es, die Kompetenzen der Studieren-
den in technischen Bereichen, wie beispielsweise Wärme- und Energieerzeugung zu
erhöhen. Die Hauptaufgabe besteht darin, die Einführung eines neuen grenzüber-
schreitenden Studienfachs an beiden Universitäten einschließlich der Entwicklung von
87Studienunterlagen zu erproben. Die im Projekt erzielten Ergebnisse sollen nicht nur
den Studierenden, sondern auch der breiten Öffentlichkeit durch neue Medien, grenz-
überschreitende Lehrveranstaltungen und gemeinsame Fachkurse vermittelt werden.
Diese Lehrveranstaltungen können in Lehrmodule von Bachelor- oder Masterstudien-
gängen integriert und von anderen Fakultäten der THD und der Westböhmischen Uni-
versität übernommen werden.
Unser Projektziel ist es, zusammen mit der Westböhmischen Universität Pilsen ver-
schiedene Anlagen zur Erzeugung und Speicherung von elektrischer und Wärmeener-
gie zu entwickeln und zu bauen. Die Studierenden der WBU und der THD werden
grenzübergreifend nach Einführungsunterlagen in internationalen Teams und nach zu-
sammengestellten Zeitdiagrammen unter Aufsicht eines wissenschaftlichen Mitarbei-
ters an einem Entwicklungsthema arbeiten: Hybride Erzeugung, Nutzung und Speiche-
rung von elektrischer und Wärmeenergie in einer Anlage im bayerisch-böhmischen
Grenzgebiet. Es wird eine Marktanalyse durchgeführt und die besten Varianten nach
Konstruktionsmethodik festgelegt. Außerdem wird beispielsweise die Effizienz der An-
lage berechnet, Design-Vorschläge skizziert und die technische Anlage entwickelt. In
dieser Projektphase werden die Teams grenzübergreifend über Microsoft-Teams-Mee-
tings kommunizieren und Vorschläge und Unterlagen austauschen. Jedes Semester
werden zwei neue, verschiedene Anlagevarianten für das Grenzgebiet entwickelt, die
von einem Fachgremium überprüft werden. Die Ergebnisse werden mit assoziierten
Partnern und Behörden abgestimmt. Bei Bedarf finden individuelle Treffen einzelner
Teammitglieder vor Ort statt.
Das Erlernen wissenschaftlichen Arbeitens ist natürlich für ein Studium sehr wichtig,
bspw. für die Anfertigung von Haus-/Seminararbeiten, oder Bachelor- und Masterar-
beiten, und auch darüber hinaus für die Kür ? die Dissertation. Doch auch wenn man
nach Abschluss des Studiums nicht beabsichtigt, in der Wissenschaft und Forschung
tätig zu sein, so sind umfassende Fähigkeiten im Bereich des wissenschaftli-
chen Arbeitens in der beruflichen Praxis überaus bedeutsam. Gerade Akademikerin-`,
  },
  {
    kuerzel: `W-21`,
    name: `Innovationsmanagement`,
    semesterSoll: 4,
    ects: 5.0,
    swsVorlesung: 8,
    workloadGesamt: 270,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Die Vorlesung folgt grundsätzlich der Struktur des Buches Innovationsmanagement,
wobei vorab grundlegende Begriffe erklärt werden, mit deren Hilfe das Theorem der
nachhaltig erfolgreichen Unternehmensführung erläutert wird. Es folgt die Einführung
in verschiedene Modelle (DISG, Belbin, House of Change etc.), um gut funktionable
Teams als Basis für gute Projektarbeit aufstellen zu können. Dann werden die Grund-
lagen samt Werkzeuge für ein ordentliches Projektmanagement behandelt
Im Weiteren werden die Inhalte der Kapitel des Buches mit praktischen Erfahrungen
verglichen und in Gruppenarbeiten vertiefend diskutiert. Dabei geht es um Verstehen,
Planen, Entwickeln und Umsetzen von Innovationen. Im Besonderen werden die bei-
den sehr unterschiedlichen Innovationsstrategien WOIS und Design Thinking vergli-
chen und exemplarisch zur Anwendung gebracht.`,
    lehrziele: `Die Studierenden sollen verstehen, dass Innovationen nicht nur die Triebfeder unseres
Wirtschaftswachstums sind, sondern eben deswegen auch ein wesentlicher Faktor für
die gesamtgesellschaftliche Entwicklung.
Innovationen werden auch als schöpferische Zerstörung bezeichnet, was sowohl eine
Verbindung zur Evolutionsbiologie wie auch zur Philosophie vermuten lässt. Sie sind
das Produkt komplexer, meist innerbetrieblicher, Prozesse.
Dies sollen die Studierenden verstehen, um in der Praxis die richtigen (Management-)
Tools zur rechten Zeit einsetzen zu können, um Innovationsprozesse sowohl beschrei-
ben als auch steuern zu können. Um die dazu notwendigen sozialen Kompetenzen wie
auch Methodenkompetenzen zu erwerben, wird ihnen eine ganze Reihe von Modellen
(DISG, Belbin, House of Change, PLP, KVP etc.) erläutert, um diese dann als Werk-
zeuge zur Problemlösung in der Praxis anzuwenden:
Wie lerne ich mich und meine Kollegen/-innen einzuschätzen (DISG) und wie gestalte
ich ein optimales Team (Belbin)?
100Wie kommt man zu einer Idee, dann zu einem Projekt und am Ende in kürzest mögli-
cher Zeit mit minimalem Ressourceneinsatz zu einem Produkt, das auf dem Markt ein
voller Erfolg wird?
Und wie steuert man das Ganze am besten?
Diese Fragen gilt es, innerhalb 15 Vorlesungen plus interner wie externer Gruppenar-
beit gemeinsam zu beantworten.
Die dadurch erworbenen persönlichen Kompetenzen sollen die Studierenden in die
Lage versetzen, selbst zu einem innovativen Betriebsklima beitragen und Innovations-
Projekte gut managen zu können. Darüber hinaus können sie den Begriff Innovations-
management in einer beliebigen betrieblichen Umgebung gut einschätzen und ggf. be-
einflussen.
Mittels der erworbenen Fachkenntnisse, besonders zu den Themen Nachhaltigkeit,
energieintensive Prozesse klimaneutral gestalten und Digitalisierung können die Stu-
dierenden Probleme erkennen, Lösungsideen erarbeiten und in Projekte überführen.`,
  },
  {
    kuerzel: `W-22`,
    name: `Unternehmensnachfolge und Business Simulation`,
    semesterSoll: 5,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `o Grundlagen zur Unternehmensnachfolge (Bedeutung des Mittelstandes in
Deutschland, Perspektiven der Unternehmensnachfolge)
o Die Unternehmensübergabe (Unternehmensbeschreibung, Wahl des Nachfol-
gers, Rolle der Familienmitglieder/des Übergebers)
o Die Unternehmensübernahme (Auswahl eines geeigneten Betriebes, Geschäfts-
plan, Unternehmenskultur, Akzeptanz des Nachfolgers im Unternehmen, För-
dermöglichkeiten und Finanzierung)
o Der Übergabeprozess (Nachfolgeprozesse, Unternehmenswert, Formen der Be-
triebsübergabe, Probleme und Konflikte, Kommunikation u. Zusammenarbeit
mit Geschäftspartnern)
o Testament und Erbfolge, Steuern und Nachfolge, gesellschaftsrechtliche As-
pekte
o Virtuelle Unternehmensgründung am PC und Präsentation des unternehmeri-
schen Erfolgs`,
    lehrziele: `Fachkompetenz:
Verständnis der theoretischen Grundlagen des Strategischen Managements. Anwen-
dung von Analyse- und Managementtools in Theorie und betrieblicher Praxis. Trainie-
ren des unternehmerischen Denkens und Handelns. Verdeutlichung betriebswirtschaft-
licher Zusammenhänge und strategischer Entscheidungsfelder durch praktische An-
wendung der Lehrinhalte in einem praxisnahen Unternehmensplanspiel. Detailierte
Darstellung und Visualisierung des Prozesses strategischer Entscheidungen am Bei-
spiel "Unternehmensnachfolge".
Methodenkompetenz:
Die Studierenden gewinnen vertiefte Einsicht in die betriebswirtschaftlichen Zusam-
menhänge durch "learning-by-doing" bzw. "Selbermachen" in der Unternehmenssimu-
lation - angefangen vom Businessplan und dessen Präsentation über simulierte Ge-
schäftstätigkeit im Wettbewerb bis hin zur Ergebnispräsentation vor Kapitalgebern.
103Sozialkompetenz:
Die Business Simulation ermöglicht vielfältige Erkenntnisse über die Zusammenarbeit
im Team, über die soziale Dynamik von Präsentationen und Besprechungen.`,
  },
  {
    kuerzel: `W-23`,
    name: `Betriebliche Qualität und Statistik`,
    semesterSoll: 4,
    ects: 7.0,
    swsVorlesung: 6,
    workloadGesamt: 210,
    pruefungsform: `schr. P. 120 Min.`,
    inhalte: `Teil Statistik:
1. Einführung, wo begegnet uns Statistik – wann brauchen wir sie?
2. Beschreibende Statistik (deskriptive Statistik)
o Grundbegriffe
o Häufigkeitsverteilung (eindimensional)
o Kumulierte Häufigkeiten und Verteilungsfunktion
o Lageparameter und Streuungsparameter
o Zweidimensionale Häufigkeitsverteilung
o Korrelationsrechnung und Regressionsrechnung
3. Wahrscheinlichkeitsrechnung
o Kombinatorische Grundlagen
o Ergebnisalgebra
o Wahrscheinlichkeit und Satz von Laplace
o Unabhängige Ereignisse und bedingte Wahrscheinlichkeiten
o Zufällige Variable und Wahrscheinlichkeitsverteilung
o Erwartungswert und Varianz einer Verteilung (zus. Statistische Prozesskon-
trolle)
o Wichtige diskrete Verteilungen
o Die Normalverteilung
108o Schließende Statistik
o Problemstellung, Zufallsstichproben
o Punktschätzung
o Intervallschätzung
o Hypothesentests

o Prozessorientiertes Qualitätsmanagement
o ISO 9000 ff.
o Aufbau und Einführung eines Qualitätsmanagementsystems
o Methoden und Werkzeuge der Qualitätsplanung
o Total Quality Management
o Entwicklung und Notwenigkeit des Qualitätsmanagement speziell im industriellen
Umfeld
o Position des Menschen
Zugangs- bzw. empfohlene Voraussetzungen
keine.

2. Einführung/Überblick
o Beschreibende Statistik
o Grundbegriffe der Wahrscheinlichkeitsrechnung
o Schließende Statistik
Zugangs- bzw. empfohlene Voraussetzungen
Analytische Grundlagen des Ingenieurstudiums/Ingenieurmathematik`,
    lehrziele: `Die Studierenden verstehen die Funktionszusammenhänge zum Leiten und Lenken ei-
nes Industriebetriebes anhand der Methoden des Qualitätsmanagements.
Die Studierenden erwerben zudem Grundkenntnisse der beschreibenden und schlie-
ßenden Statistik und werden an (Übungs-) Beispielen in die betreffenden Anwendun-
gen eingeführt.
Anhand von Beispielen werden zentrale Themengebiete des Operations Research vor-
gestellt und grundlegende mathematische Optimierungsverfahren zur Behandlung die-
ser Fragestellungen eingeführt.
Teil Statistik:
Die Studierenden des Studiengangs Wirtschaftsingenieurwesen erlernen im Rahmen
des Moduls Statistik, Grundkenntnisse der Deskriptiven Statistik, der Wahrscheinlich-
keitsrechnung (Kombinatorik) und der Beschreibenden Statistik. Das erworbene Wis-
106sen führt zur Fähigkeit Prozessparameter statistisch korrekt angeben zu können. Au-
ßerdem können die Studierenden, nach erfolgreichem Abschluss des Moduls, statis-
tisch korrekte Aussagen über die Signifikanz, bzw. über den Vergleich von statisti-
schen Massen treffen. Kombinatorische Vorgänge können anhand von Beispielen er-
klärt werden und der Begriff „Zufall“ kann mathematisch beschrieben werden. Ein Ein-
blick in verschiedene Verteilungsfunktionen zeigt den Zusammenhang in der Praxis
auf und kann daraus auch transferiert werden.
Fachkompetenz:
Die Studierenden kennen und verstehen grundlegende statistische Methoden und Prin-
zipien, die in der statistischen Betrachtung von Vorgängen, Anwendung finden. Sie
können beispielsweise Versuchsergebnisse statistisch korrekt darstellen und entschei-
den, ob signifikante Unterschiede bei einem Vergleich von statistischen Massen vorlie-
gen.
Methodenkompetenz:
Die Studierenden können in Fallbeispielen die richtigen statistischen Methoden anwen-
den und umsetzten. Dies ist die Grundlage zur Bewertung von Vorgängen (Versu-
chen/Vergleichen/Aufzeigen) in der Praxis.
Personale Kompetenz:
Die Absolventen des Moduls Statistik sind in der Lage die Durchdringung von Statistik
in Abläufen und Vorgängen in unserer modernen Gesellschaft ein zu ordnen. Sie kön-
nen die statistische Darstellung von Aussagen reflektieren.
Teil QM:
Identifikation qualitätsrelevanter Faktoren
Erfassen von Prozessen und qualitätsrelevanter Vorgänge
sichere Methodenkenntnisse im Bereich Qualitätsmanagement
Auswahl geeigneter Werkzeuge und Methoden zur Ausgestaltung und Optimierung von
Prozessen
Analyse
Erarbeiten von Lösungsmöglichkeiten
Auswahl von Lösungen nach qualitats- und wirtschaftlichen Gesetzmäßigkeiten
Überwachung der Implementierung
Interpretation der aktuellen Lage industrieller Abläufe`,
  },
  {
    kuerzel: `W-24`,
    name: `Operations Research`,
    semesterSoll: 5,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: ``,
    inhalte: `I. Einführung in Operations Research
o Begriffe, Anwendungsbeispiele und Geschichte des Operations Research
o Problemlösungsprozess, math. Modellbildung, Entscheidungsunterstützung, Opti-
mierung vs. Simulation
II. Lineare Programmierung (LP)
o LP-Problemformulierungen, Standardform, Voraussetzungen LP, Übungsaufgaben
LP
o Spreadsheet Modelling und Lösung mit Microsoft Excel Solver, Sensitivitätsanalyse
113o Der Simplex Algorithmus: erweitere Standardform, Simplex-Algorithmus in tabel-
larischer Form, Mixed Constraints und Spezialfälle, Sensitivitätsanalyse mit dem
Simplex-Tableau, Simplex Methode in Matrix Form und der Revidierte Simplex-Al-
gorithmus
o Grundlagen Dualitätstheorie
III. Spezielle Optimierungsprobleme
o Transportproblem und Erweiterungen
o Zuordnungsproblem
o Transshipmentproblem
IV. Gemischt-Ganzzahlige Lineare Programmierung (MIP)
o Grundlagen MIP und MIP-Modellierung mit Übungsaufgaben
o Das Branch-and-Bound Lösungsverfahren für MIP-Probleme
o MIP-Modellierung in der Praxis: Überblick über professionelle MIP-Modellierungs-
umgebungen, -sprachen und -Solver, MIP-Modellbildung mit Solver Studio und
AMPL, Lösung mittels MIP-Solver
V. Optimieren in Netzen
o Grundlagen Graphentheorie
o Shortest Path Problem und Dijkstra-Algorithmus
o Minimum Spanning Tree Problem und Prim Algorithmus
o Max Flow Problem und Ford-Fulkerson Algorithmus
o Minimum Cost Flow Problem
VI. Einblick in weitere Techniken des Operations Rearch und wenn möglich Gastvor-
trag aus der Praxis`,
    lehrziele: `Die Studierenden sind mit Techniken des Operations Research (OR) vertraut und sind
befähigt zur Lösung von Optimierungsproblemen der Praxis.
Nach dem Kurs können die Studierenden
o Problemstellungen mit Hilfe mathematischer Modelle formulieren.
o mathematische Modelle implementieren, lösen und die Lösung im Kontext des
Entscheidungsproblems interpretieren.
o Spezial-Software zur Lösung von Modellen anwenden.
o die Grundlagen der eingesetzten Lösungsverfahren erläutern.
o Der Kurs fokussiert dabei auf
o ausgewählte, klassische Problemstellungen und Lösungsverfahren des Operati-
ons Research.
o die praktische Anwendung von Verfahren des Operations Research.
o Nach Absolvieren des Moduls Operations Research haben die Studierenden so-
mit insb. folgende Kompetenzen erworben:
112Fach- und Methodenkompetenz
Die Studierenden modellieren selbständig Optimierungsaufgaben aus der betriebli-
chen Praxis und lösen diese mit Hilfe von geeigneten Lösungstechniken des Opera-
tions Research. Dabei hilft ihnen eine Auswahl von typischen Anwendungsbeispie-
len und gängigen Lösungsverfahren, die sie im Rahmen dieses Kurses vorgestellt
bekommen und zu beurteilen lernen. Mit Hilfe von Übungsaufgaben erlernen Sie
eigenständig zu modellieren, komplexe Probleme zu strukturieren und zu analysie-
ren, Lösungsverfahren zu evaluieren und zielgerichtet einzusetzen. Studierende
validieren und bewerten die erhaltene Lösung.
Soziale Kompetenz
Der Erwerb von sozialen Kompetenzen steht bei diesem Modul naturgemäß nicht
im Vordergrund, wird aber durch Kooperation der Studierenden und gemeinsames
Erarbeiten von Lösungen gefördert.
Persönliche Kompetenz
Die persönliche Kompetenz wird durch vertieftes selbständiges Erarbeiten und Lö-
sen komplexer Probleme gefördert. Durch die Anwendung mathematischer Lö-
sungstechniken und deren kritische Durchdringung erarbeiten sich die Studierende
die Fähigkeit zum abstrakten und analytischen Denken.`,
  },
  {
    kuerzel: `W-25`,
    name: `Kunststoff- und Fertigungstechnik`,
    semesterSoll: 5,
    ects: 10.0,
    swsVorlesung: 8,
    workloadGesamt: 300,
    pruefungsform: `schr. P. 120 Min.`,
    inhalte: `Die Vorlesung Kunststofftechnik beinhaltet:
o Motivation und Einführung: Markt und Produkte Kunststoffe; wichtige Vertreter;
Überblick Grundlagen
o Chemie des Kohlenstoff-Atoms: Elektronegativität und polare Bindung; Oxidations-
zahlen; Orbitalmodelle; Bindungen des C-Atoms; Verbindungsklassen / reaktive
Gruppen; Reaktionstypen der organischen Chemie
o Kunststoff-Erzeugung: Rohöl-Aufbereitung; Monomer-Gewinnung; Polymerisati-
ons-Reaktionen (Kettenwachstums- und Stufenwachstums-Reaktionen mit Beispie-
len); Additivierung; Verfahren zur Polymerisation
o Funktionalisierung von Kunststoffen: Partikelfreiheit und Reinraumfertigung; fle-
xible Elektronik; funktionale Oberflächen; Sterilisation von Kunststoff-Produkten;
wirtschaftliche und technische Aspekte der Verpackungsgestaltung
o Weiterverarbeitung von Kunststoffen:
 Extrusion und Blasformen: Fließfähigkeit von Kunststoff-Schmelzen; Zerklei-
nern, Mischen, Plastifizieren, Granulieren, Lagern; Kalandrieren; Extrusion;
Extrusions-Blasformen
 Kunststoff-Spritzguss: Grundlegendes Fertigungsprinzip, Werkzeugtechnologie,
Fließbilder, Schwindung und Verzug
 Rapid Prototyping: Verfahren der additiven Fertigung, konstruktive Besonder-
heiten und Möglichkeiten, Anwendungen
118o Polymere: Eigenschaften und Anwendung
Diskussion der wichtigsten Vertreter aus Thermoplasten und Duromeren; Reakti-
onstypen und Eigenschaften, Einsatzbereiche;
o Composites: Anwendungsbereiche von Hochleistungs-Faserverbund-Materialien,
Bestandteile und Wirkweise, Herstellverfahren
o Kunststoffrecycling: Kunststoffabfall-Fraktionen, grundlegende Verfahren zur Be-
handlung von Kunststoffabfällen unter Betrachtung von wirtschaftlichen und ökolo-
gischen Aspekten
Die Vorlesung spanende Fertigung beinhaltet folgende Themenschwerpunkte:
o Auswahlkriterien: Welche Werkzeugmaschine für welche Fertigungsaufgabe, Krite-
rien zur Verfahrensauswahl, Kriterien zur Maschinenauswahl, Hilfsmittel im Unter-
nehmensbereich Arbeitsvorbereitung
o Grundlagen der Zerspanung: Kinematik und Geometrie des Zerspanvorganges,
Schneidteilgeometrie, Spanbildung, Spanarten und Spanformen, Mechanische Be-
anspruchung ? Zerspankraft, Thermische Beanspruchung
o Werkzeuge und Schneidstoffe: Schneidstoffe, Verschleiß und Standgrößen, Kühl-
schmiermittel, Wirtschaftliche Schnittbedingungen
o Sägen: Definition, Anwendungsspektrum, Prozessgrößen, Typische Werkzeuge,
Bauformen
o Fräsen: Definition, Anwendungsspektrum, Prozessgrößen, Typische Werkzeuge,
Bauformen
o Drehen: Definition, Anwendungsspektrum, Prozessgrößen, Typische Werkzeuge,
Bauformen
o Bohren: Definition, Anwendungsspektrum, Prozessgrößen, Typische Werkzeuge,
Bauformen
o Räumen: Definition, Anwendungsspektrum, Prozessgrößen, Typische Werkzeuge,
Bauformen
o Feinbearbeitung: Definition, Anwendungsspektrum, Prozessgrößen, Typische
Werkzeuge, Bauformen
 Schleifen
 Hohnen
 Läppen
Die Vorlesung spanlose Fertigung beinhaltet folgende Themenschwerpunkte:
o Klassifikation der Fertigungsverfahren nach DIN8580
119o Urformen
 Einleitung der urformenden Verfahren
 Gießen: Gusswerkstoffe, Grundlagen der Erstarrung, Gussfehler
 Halbzeugguss
 Gießverfahren mit verlorenen Formen aus Dauermodellen
 Gießverfahren mit verlorenen Formen aus verlorenen Modellen
 Gießverfahren mit Dauerformen
 Pulvermetallurgie
o Additive Fertigungsverfahren
o Umformen
 Einleitung der umformenden Verfahren
 Werkstofftechnische Grundlagen des Umformens
 Massivumformverfahren: Stauchen, Schmieden, Walzen, Strang- und Fließ-
pressen
 Blechumformverfahren: Biegen, Drücken, Streck- und Tiefziehen
o Trennen: spanlose Trennverfahren
o Abtragen`,
    lehrziele: `Das Modul Fertigungstechnik soll den Studenten grundlegende Kenntnisse über heute
genutzte Fertigungsmethoden und Kunststoffe vermitteln. Die Vorlesungen sind als
Grundlagenvorlesung ausgelegt, damit der angehende Wirtschaftsingenieur die Be-
deutung einer modernen Fertigung aber auch mögliche Schwierigkeiten im Umgang
und in der Auslegung von Fertigungseinrich-tungen verstehen und bewerten kann.
Durch das Teilmodul Fertigungstechnik kennen die Studierenden die relevanten Ferti-
gungsverfahren der Hauptgruppen Urformen, Umformen und Trennen (DIN 8580) in
der industriellen Produktion. Sie können die Verfahren systematisieren und die Wirk-
mechanismen zwischen Werkstoff, Werkzeug und Fertigungsanlage theoretisch durch-
dringen. Die Studierenden können auf Basis der gegebenen theoretischen Kenntnisse
die relevanten Prozessparameter analysieren. Sie können durch Vergleich von pro-
duktbezogenen, werkstoffbezogenen, wirtschaftlichen und umwelttechnischen Verfah-
renskriterien eine Verfahrensauswahl für den Produktentwicklungsprozess begründen.
117Nach dem Besuch des Teilmoduls Kunststofftechnik haben die Studierenden einen
Überblick über Anwendungsfelder von Kunststoffprodukten. Sie kennen die relevanten
Fertigungsverfahren wie Extrusion, Spritzguss, Thermoformen und Additive Fertigung
und können diese unter Betrachtung von Stückzahlen, Investkosten und geometri-
scher Komplexität zielgerichtet für einen gegebenen Anwendungsfall auswählen. Die
Kenntnis der Reaktionsmechanismen mit der zugeordneten Verfahrenstechnik zur Dar-
stellung diverser Kunststoffe sowie die Einordnung der jeweiligen physikalischen und
chemischen Eigenschaften befähigt die Studierenden, den passenden Werkstoff für
eine Funktionsstruktur zu finden. Eine Übersicht zur Anwendung von Faserverbund-
strukturen rundet das Portfolio der Werkstoffauswahl ab. Eine Einführung zum Thema
Kunststoffrecycling ergänzt die Betrachtung von Kunststoffen in Richtung Nachhaltig-
keit.`,
  },
  {
    kuerzel: `W-26`,
    name: `Betriebliche Informationssysteme`,
    semesterSoll: 5,
    ects: 3.0,
    swsVorlesung: 4,
    workloadGesamt: 180,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Anhand der historischen Entwicklung des Industrie-Zeitalters wird die zunehmende
Bedeutung von Informationen und deren Verarbeitung zu Wissen als Grundlage für die
betrieblichen Entscheidungsprozesse veranschaulicht. Dabei wird anhand des Buches
"Das informierte Management" verdeutlicht, dass bis heute der Sprung vom MIS zum
MUS noch nicht vollendet ist. Dabei werden die für BIS wesentlichen Begriffe aus der
Wirtschaftsinformatik samt "Industrie 4.0" erläutert und der strukturelle Aufbau von
BIS erklärt.
Dann wird die Automatisierungspyramide nach ISA-95 erläutert und in Gruppenarbei-
ten vertiefend diskutiert, wie diese in ihren zukünftigen Arbeitsumgebungen nutzbrin-
gend angewendet werden kann.
Im Folgenden geht es um die Virtualisierung von Prozessen als Basis für Prozessopti-
mierung. Dabei müssen die Studierenden mit der Software iGrafx üben, Prozesse mit-
tels Swim-Lane-Diagrammen zu visualisieren und über das Repository mit Stammda-
ten zu versehen. Parallel lernen Sie Tools aus der Welt der Produktionssysteme ken-
nen, 5S, 7V, PLP, um die Prozesse schon während der Visualisierung optimieren zu
können.
123Dazu werden den Studierenden anhand von Übungsbeispielen und Projektarbeiten die
grundlegenden Anwendungsfähigkeiten vermittelt, wobei auf folgende Software näher
eingegangen wird: iGrafx (Prozesse & IMS), SAP und CSS (stellv. für ERP-Systeme),
PI & LEGATO (stellv. für MES), für die ERP-Prozessanalyse Celonis und für die Daten-
analyse und Informationsaufbereitung in Form von Dashboards und Berichten
QlikView.
Dazu sind auch einige Sondereinlagen von externen Spezialisten vorgesehen.`,
    lehrziele: `Die Studierenden sollen verstehen, wie der Begriff BIS im Rahmen der Wirtschaftsin-
formatik einzuordnen ist, welche Bedeutung BIS heute haben und dass deren rasante
Entwicklung eine notwendige Folge des im Zuge der "vierten industriellen Revolu-
tion" stetig steigenden Bedarfes an immer besser aufbereiteten Informationen als Wis-
sens-, und damit Entscheidungsgrundlage, ist und bleibt.
Sie sollen ferner wissen, wie BIS aufgebaut und welche Systemarchitekturen typisch
sind.
Auf Basis dieser Fachkompetenzen sollen die Studierenden lernen, ihre Methodenkom-
petenzen zu erweitern, u.a. wie BIS mit Hilfe der Automatisierungspyramide nach
ISA-95 eingeordnet werden können, um ihre zukünftige Arbeitsumgebung strukturell
analysieren und entsprechende Entscheidungsprozesse bei der Einführung neuer oder
Optimierung bestehender BIS unterstützen zu können.
Sie müssen verstehen, wie betriebliche Prozesse visualisiert und mit Ansätzen des
Lean Managements optimiert werden können.
122Sie sollen lernen, wie Informationen in Dashborads und zu Berichten aufbereitetet
werden können, um als wesentliches Hilfsmittel bei Problemlöse- und Entscheidungs-
prozessen dienlich zu sein. Dabei sollen sie sich selbst als Problemlöser in ihren zu-
künftigen Jobs erkennen und verstehen lernen.
Auf Basis der erworbenen persönlichen Kompetenzen sollen die Studierenden ihre so-
zialen Kompetenzen erweitern, indem sie in ihren Gruppen diskutieren, wie sie den
technischen wie gesellschaftlichen Paradigmenwechsel mitgestalten können, der durch
die Schaffung digitaler Zwillinge, AR und VR sowie dem Einsatz von KI bereits im Wer-
den ist.`,
  },
  {
    kuerzel: `W-27`,
    name: `Personalführung und Arbeitsrecht`,
    semesterSoll: 5,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Teil Personalführung:
Persönliche Kompetenz:
o Eigenbild/Fremdbild einer Führungskraft
o Persönlichkeitspsychologie und Temperamentenlehre
o Behaviourismus und Verhaltenspsychologie
Fachkompetenz:
o Flow-Diagramme als Grundlage der Personalführung und Entwicklung
o Stellenprofile, Persönlichkeitsprofile o Arbeitsplatz- und Stellenbeschreibungen
(Möglichkeiten und Grenzen)
0 Digital Leadership - Agile Leadership
Soziale Kompetenzen
o Mitarbeiter-Zielvereinbarungsgespräche
o Kommunikation und Krisenmanagement in der Personalführung
o Feedback und Feedbackschleifen
o Teampsychologie: Rollen, Verhalten, Phasen
o Veränderungspsychologie`,
    lehrziele: `Durch die didaktische Synthetisierung von Fach- mit Methoden-, Sozialen und Persön-
lichen Kompetenzen werden folgende Lernergebnisse erzielt:
Verständnis von ausgewählten Management- und Entscheidungstechniken mit vertief-
ter Anwendung in Führung und direktem Umgang mit Mitarbeitern innerhalb von ar-
beitsrechtlichen Rahmenbedingungen. Die Studierenden sollen zu diesem Zweck mo-
derne Instrumente der Personalführung (Recruiting, Personalentwicklung, Retention,
Change) analysieren und in konkreten Anwendungssituationen für das spätere Berufs-
leben einüben. Zusätzlich werden relevante arbeitsrechtlichen Kenntnisse fallbezogen
angewendet, die für einen juristisch korrekten und führungstechnisch erfolgreichen
Umgang mit Mitarbeitern, Kollegen und Vorgesetzten charakterisierend sind.`,
  },
  {
    kuerzel: `W-28`,
    name: `Praxismodul`,
    semesterSoll: 6,
    ects: 6.0,
    swsVorlesung: 6,
    workloadGesamt: 240,
    pruefungsform: ``,
    inhalte: `Praxisseminar:
o Erstellung und Ausführung einer Pitch-Presentation auf Basis eines Berichtes zu Tä-
tigkeiten und Aufgaben des Studierenden im Rahmen des Betriebspraktikums.
o Vertiefende Einblicke über Entwicklungen und Verfahren und Fertigkeiten, die in den
verschiedenen Unternehmen durchgeführt werden.
o Überblick zu verschiedenen Firmen und deren geforderten Kernkompetenzen und
Schwerpunkten.
Projektmanagement:
o Selbständig ein Projekt strukturieren
o Zeitplan mit realistischen Meilensteinen
o Fortschrittskontrolle
o Aufstellung realistischer Projektziele mit Ressourceneinsatz und Kosten-, Nutzenana-
lyse.
o Planungsschritte im Projekt.
o Steuerung des Projektablaufs.
o Kontrolle der Zielerreichung.
o Fallback-Lösungen für Notfallsituationen.
Präsentations- und Verhandlungstechnik:
o Was erwartet ein Manager von einer Entscheidungsvorlage?
129o Grundsätzlicher Aufbau einer Entscheidungsvorlage
o Berichtsstil vs. Erlebniserzählung
o Grundlagen der Kommunikation
o Zielgruppenadäquate Kommunikationsinstrumente
o Teilnehmer und Rollen bei Verhandlungen
o Menschen und Probleme getrennt voneinander behandeln
o Auf Interessen konzentrieren, nicht auf Positionen
o Optionen zum beiderseitigen Vorteil entwickeln
o Anwendung neutraler Beurteilungskriterien
o Tipps und Tricks o Bearbeitung von Fallstudien mit Rollenvorgaben, mit Ergebnisprä-
sentation, Q&A, Verhandlungsgesprächen`,
    lehrziele: `Praxisseminar:
Die Studierenden verstehen und bewerten von fachlichen, persönlichen und methodi-
schen Kompetenzen durchdirektem Bezug zur praktischen Tätigkeit in Unternehmen
und Betrieben. Weiter analysieren die Studierenden betriebliche Anforderungen und
daraus abzuleitenden Handlungskompetenzen in einer Ablauf- und Aufbauorganisa-
tion.
Projektmanagement
Die Studierenden lernen die Methoden des Projektmanagements kennen und wenden
diese in konkreten Fallbeispielen an. Die Studierenden vergleichen industrielle Anwen-
dungsbeispiele und differenzieren die Itinerarien des Projektmanagements. Sie über-
prüfen und bewerten die Projektergebnisse in einer Soll-Ist Analyse.
Präsentations- und Verhandlungstechnik:
Die Studierenden lernen die Grundkompetenzen und Systeme der Präsentations-, und
Verhandlungstechniken verstehen und anwenden. Die Fähigkeit zur Erstellung einer
Gliederung sowie der Aufbau einer Ergebnispräsentation für die Managementebene
128wird erarbeitet und eingeübt. Schließlich werden Prinzipien und Methoden von Ver-
handlungstechniken in case studies analysiert und bewertet.`,
  },
  {
    kuerzel: `W-29`,
    name: `Industriepraktikum`,
    semesterSoll: 6,
    ects: 24.0,
    swsVorlesung: 0,
    workloadGesamt: 720,
    pruefungsform: ``,
    inhalte: `Praktische Tätigkeit in einem Industrieunternehmen oder sonstigen geeigneten Ausbil-
dungsbetrieb für die Dauer von 18 Wochen. Die Studierenden werden in aktuelle Pro-
jekte des Betriebes eingebunden. Individuelle Themenstellung können sich dabei aus
folgenden Bereichen ergeben:
o Geschäftsfeld- und Produktplanung, Business Development
o Projektierung von Anlagen, Projektleitung und Projektcontrolling
o Innovations- und Technologiemanagement,
o Technische Planung und Controlling,
o Technischer Einkauf, Organisation und Logistik,
o Industriegütermarketing,
o Vertriebsingenieurwesen,
o Controlling für technische Fachbereiche,
o Assistenz der Geschäftsleitung
o Prozessmanagement`,
    lehrziele: `Synthetisierung sämtlicher Kompetenzfelder (Persönliche Kompetenzen, Soziale Kom-
petenzen, Fachliche Kompetenzen und Methodische Kompetenzen):
Ziel ist, den Studierenden die Gelegenheit zu geben, das von Ihnen erworbene Wissen
in der Praxis anzuwenden und gleichzeitig die betrieblichen Abläufe in einem Unter-
nehmen kennenzulernen.
Die in den vorangegangenen Lehrmodulen vermittelten theoretischen Inhalte werden
in der betrieblichen Praxis angewandt und im Praxismodul bewertet.
Synthese auf die spätere berufliche Tätigkeit
Durch die Einbindung in das Tagesgeschäft und das Team/die Abteilung eines Wirt-
schaftsunternehmen soll den Studierenden zudem eine Gelegenheit geboten werden,
ihre Personal- und Soft-Skills in den Bereichen Kooperations- und Kommunikationsfä-
higkeit, Teamarbeit und Präsentationstechnik aktiv zu üben. Damit sollen die Studie-
renden auf die Qualifikationsanforderung und Kompetenzmatrix potentieller Arbeitge-
ber vorbereitet werden. Ein Qualifikations-Ziel bei der Erweiterung der Methoden-
Kompetenz ist das Erlernen des Zeitmanagements in Industrieprojekten.
Die selbständige Erstellung wissenschaftlicher Texte und Berichte im Rahmen industri-
eller Tätigkeit ist ein Teil der zu erreichenden Methoden Kompetenz. Dies schließt ein
131selbständiges Erarbeiten der sachlich, technisch, beschreibenden Form und des logi-
schen Aufbaus ein. Dies beinhaltet auch die Literaturrecherche und das Literaturstu-
dium.`,
  },
  {
    kuerzel: `W-30`,
    name: `Unternehmensführung`,
    semesterSoll: 7,
    ects: 6.0,
    swsVorlesung: 6,
    workloadGesamt: 240,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Der Kurs baut auf den Grundlagen der Unternehmensführung auf und motiviert die
Studierenden, ihre Kenntnisse auf konkrete Fallbeispiele der Unternehmensgründung
zu übertragen. Dabei kommen analytische Instrumente und Lösungsansätze aus der
Entrepreneurshipforschung und verschiedenen unternehmerischen Funktionen zum
Einsatz. Ferner werden die unternehmerischen Entscheidungswege und die Konse-
quenzen unternehmerischen Handelns mit Fokus auf Unternehmen diverser Branchen
aufgezeigt.
Modul Management- und Entscheidungstechnik
Der Kurs baut auf den Grundlagen der Unternehmensführung auf und motiviert die
Studierenden, ihre Kenntnisse auf konkrete Fallbeispiele der Unternehmensführung zu
übertragen. Dabei kommen analytische Instrumente und Lösungsansätze aus dem Be-
reich Unternehmensführung in verschiedenen unternehmerischen Funktionen zum Ein-
satz. Ferner werden die unternehmerischen Entscheidungswege und die Konsequen-
zen unternehmerischen Handelns mit Fokus auf Unternehmen diverser Branchen auf-
gezeigt.
Grundbegriffe und System der Unternehmensführung
Verknüpfung mit der Normativen Unternehmensführung
Wertorientierte Unternehmensführung
Marktorientierte Unternehmensführung
Ressourcenorientierte Unternehmensführung
Strategieimplementierung
Führung des Wandels
Innovationsstrategien
Modul Gründungsmanagement
136Gründungsrelevante Kompetenzen
Ideenfindung und Evaluation von Geschäftsideen
Aufbau und Inhalte von Businessplänen
Geschäftsmodelle
Venture Capital und Unternehmensfinanzierung
Finanzplanung, Szenariobildung und Sensitivitätsanalyse
Investitionsplanung und Anlagespiegel
Personalplanung
öffentliche Fördermittel
Möglichkeiten der Haftungsbegrenzung
Gründerhaftung

Der Kurs baut auf den Grundlagen der Unternehmensführung auf und motiviert die
Studierenden, ihre Kenntnisse auf konkrete Fallbeispiele der Unternehmensführung zu
übertragen. Dabei kommen analytische Instrumente und Lösungsansätze aus dem Be-
reich Unternehmensführung in verschiedenen unternehmerischen Funktionen zum Ein-
satz. Ferner werden die unternehmerischen Entscheidungswege und die Konsequen-
zen unternehmerischen Handelns mit Fokus auf Unternehmen diverser Branchen auf-
gezeigt.
Grundbegriffe und System der Unternehmensführung
Verknüpfung mit der Normativen Unternehmensführung
Wertorientierte Unternehmensführung
Marktorientierte Unternehmensführung
Ressourcenorientierte Unternehmensführung
Strategieimplementierung
Führung des Wandels
Innovationsstrategien
Zugangs- bzw. empfohlene Voraussetzungen
keine

Der Kurs baut auf den Grundlagen der Unternehmensführung auf und motiviert die
Studierenden, ihre Kenntnisse auf konkrete Fallbeispiele der Unternehmensgründung
zu übertragen. Dabei kommen analytische Instrumente und Lösungsansätze aus der
Entrepreneurshipforschung und verschiedenen unternehmerischen Funktionen zum
Einsatz. Ferner werden die unternehmerischen Entscheidungswege und die Konse-
quenzen unternehmerischen Handelns mit Fokus auf Unternehmen diverser Branchen
aufgezeigt.
Gründungsrelevante Kompetenzen
141Ideenfindung und Evaluation von Geschäftsideen
Aufbau und Inhalte von Businessplänen
Geschäftsmodelle
Venture Capital und Unternehmensfinanzierung
Finanzplanung, Szenariobildung und Sensitivitätsanalyse
Investitionsplanung und Anlagespiegel
Personalplanung
öffentliche Fördermittel
Möglichkeiten der Haftungsbegrenzung
Gründerhaftung
Praktische Anwendung des theoretischen Wissen bei der Erstellung eines Businesspla-
nes als Gruppenprojekt
Zugangs- bzw. empfohlene Voraussetzungen
keine`,
    lehrziele: `Ein Unternehmen zu führen bedeutet vorrangig, die richtigen Entscheidungen zu tref-
fen und gravierende Fehlentscheidungen nach Möglichkeit zu vermeiden. Die wach-
senden beruflichen Herausforderungen erfordern eine stetige Weiterentwicklung und
Anpassung der Qualifikation. Im Modul Unternehmensführung werden für verschie-
dene Einsatzgebiete unternehmerische Kenntnisse vermittelt. Ein Unternehmen zu
führen bedeutet vorrangig, die richtigen Entscheidungen zu treffen und gravierende
Fehlentscheidungen nach Möglichkeit zu vermeiden. Ziel des Moduls ist es deshalb
dem Studierenden das notwendige Wissen zu vermitteln, dass es ihm ermöglicht, kon-
krete Strukturen und Prozesse eines Unternehmens und dessen Umfeldes zu analysie-
ren und darauf basierend robuste unternehmerische Entscheidungen in einem ganz-
heitlichen Prozess zu treffen.
Die Wichtigkeit einer detailierten Unternehmensplanung soll zudem an Hand des Bei-
spiels Gründungsmanagement verdeutlicht werden. Dabei soll auch für das Thema
Existenzgründung sensibilisiert und motiviert werden. Dem Studierenden soll ferner
die Möglichkeit geboten werden, durch das Erstellen eines individuellen Businessplans
im Rahmen eines Gruppenprojektes das vermittelte Wissen anzuwenden, zu trainieren
134und dadurch die Vorgehensweise, mögliche Probleme und Grenzen der Unterneh-
mensplanung an einem praxisnahen Beispiel nachzuvollziehen. Das Gruppenprojekt
umfasst die Gesamtplanung einer Geschäftsidee von der Ideenfindung, der Informati-
onsbeschaffung bis hin zur Erstellung eines detaillierten Geschäftsplanes. Das Engage-
ment der Teilnehmer und die Gruppendynamik während des Projektes tragen dabei
entscheidend zum Lernerfolg bei.
Qualifikationsziele
Im Einzelnen haben die Studierenden nach Abschluss des Moduls die folgenden Lern-
ziele erreicht:
Fachkompetenz
Die Studierenden sind in der Lage, im Rahmen des Ideengenerierung (Design Thinking
Prozesses) iterativ Lösungen für eine Problemstellung zu generieren und zu evaluie-
ren. Sie können aus einem Methodenset auswählen und an geeigneter Stelle Problem-
stellungen hinterfragen und analysieren. Sie können ihre Ideen in Prototypen umset-
zen und diese mit ihren Nutzern testen und evaluieren.
Methodenkompetenz
Die Studierenden sind befähigt, Methoden zu den geeigneten Phasen zuzuordnen und
anzuwenden. Die Lernmethoden dazu: Interaktives Seminar, Problem Based Learning,
Referate/ Präsentationen zu speziellen Aspekten, Selbstorganisation, Coaching-Sitzun-
gen mit dem Dozenten. Das Ziel, bereits vorhandene Wissen mit zu integrieren und
mit hohen Kommunikationsbereitschaft Lösungen zu finden.
Sozialkompetenz
Die Studierenden verfügen über Diskussionsvermögen, Teamfähigkeit und Kritikfähig-
keit. Sie sind in der Lage ihre Stärken in den Entwicklungsprozess und Geschäftsmo-
delldesign einzubringen und verfügen über ein kreatives Selbstbewusstsein. Durch die
Analyse aktueller Unternehmenssituationen in Teamarbeit erfolgt ein vertiefter Aus-
tausch über unterschiedliche strategische Konzepte zur Unternehmensführung im
Spannungsfeld von finanzieller Wertorientierung und werteorientierter Unternehmens-
führung. Durch Heterogenität der Gruppenmeinungen und Standpunkte in diesen Dis-
kussionen wird die Konflikt- und Kritikfähigkeit geschult.
Persönliche Kompetenz
Die Studierenden haben ein Startup-Mindset, das sie befähigt Problemstellungen zu
erfassen und nutzerzentrierte Lösungen zu entwickeln. Im Fall einer eignen Geschäfts-
idee oder Problemstellung konnten Sie ihr Verständnis für den Nutzer erweitern.`,
  },
  {
    kuerzel: `W-31`,
    name: `Produktion und Logistik`,
    semesterSoll: 7,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Es wird ein Überblick gegeben über zentrale Aufgabenfelder und Problemstellungen
der Produktion und der Logistik aus Sicht der quantitativen Betriebswirtschaftslehre.
Grundlegende Methoden zur Analyse, Modellierung und Lösung quantitativer betriebli-
cher Planungs- und Entscheidungsprobleme werden vorgestellt.
Im einzelnen werden folgende Themenbereiche behandelt:
- Inner- und überbetriebliche Standortplanung
- Distributionsmanagement
- Deterministisches und stochastisches Bestandsmanagement
- Strategische, taktische und operative Produktionsplanung
145- Mittel- und kurzfristige Personaleinsatzplanung
- Maschinenbelegungsplanung
- Transportlogistik`,
    lehrziele: `Das Modul gibt einen Überblick über fundamentale Aspekte von Produktion und Logis-
tik.
Nach erfolgreichem Abschluß des Moduls verfügen die Studenten über folgende Kom-
petenzen:
Fachkompetenz
Die Studenten kennen wesentliche Strukturen, Abläufe und Gestaltungselemente der
Produktion und der Beschaffungs-, Produktions-, Distributions- und Entsorgungslogis-
tik.
Methodenkompetenz
Sie beherrschen grundlegende Analyse-, Modellierungs- und Lösungsverfahren für we-
sentliche einschlägige betriebliche Planungs- und Entscheidungsprobleme.
Personale Kompetenz
Sie kennen die Möglichkeiten und Grenzen des Einsatzes quantitativer Methoden in
Produktion und Logistik.
144Soziale Kompetenz
Sie bereiten die Ergebnisse von Planungsrechnungen für Entscheider auf und präsen-
tieren die Resultate zielgruppenorientiert.`,
  },
  {
    kuerzel: `W-32`,
    name: `Betriebliche Organisation, Einkauf und Vertrieb`,
    semesterSoll: 7,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Es wird ein Überblick gegeben über zentrale Aufgabenfelder und Problemstellungen
der inner- und über- bzw. zwischenbetrieblichen Organisation, der Beschaffung und
des Einkaufs von Sachgütern und Dienstleistungen sowie des Vertriebs der betriebli-
chen Leistungen aus Sicht der quantitativen Betriebswirtschaftslehre. Grundlegende`,
    lehrziele: `Lernergebnisse/Qualifikationsziele:
Das Modul gibt einen Überblick über grundlegende Aspekte der betrieblichen Organi-
sation, des Einkaufs und des Vertriebs.
Nach erfolgreichem Abschluß des Moduls verfügen die Studenten über folgende Kom-
petenzen:
Fachkompetenz
Die Studenten kennen wesentliche Strukturen, Abläufe und Gestaltungselemente der
betrieblichen Organisation sowie des Einkaufs und Vertriebs der betrieblichen Leistun-
gen.
Methodenkompetenz
Sie beherrschen grundlegende Analyse-, Modellierungs- und Lösungsverfahren für we-
sentliche einschlägige betriebliche Planungs- und Entscheidungsprobleme.
147Personale Kompetenz
Sie kennen die Möglichkeiten und Grenzen des Einsatzes quantitativer Methoden in
Einkauf und Vertrieb.
Soziale Kompetenz
Sie bereiten Analyse- und Optimierungsergebnisse für Entscheider auf und präsentie-
ren die Resultate zielgruppenorientiert.`,
  },
  {
    kuerzel: `W-33`,
    name: `Optimierung und Simulation`,
    semesterSoll: 7,
    ects: 6.0,
    swsVorlesung: 6,
    workloadGesamt: 180,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Eine Auswahl aus den Gebieten:
o Modellierung Linearer, Nichtlinearer und Gemischt-Ganzzahliger Optimierungs-
probleme
o Wichtige allgemeine Klassen von Optimierungsproblemen (Rucksack-, Bin-Pa-
cking-, Set-Covering-
,
-Packing-
,
-Partitioning-, Zuschnitt-, Zuordnungs-, Rei-
henfolge-, Netzfluß-, Routing- und Scheduling-Probleme)
o Verfahren für Lineare Optimierungsprobleme mit spezieller Struktur
o Ganzzahlige und kombinatorische Optimierung
151o Dynamische Programmierung
o Constraint Programming
o Nichtlineare Optimierung
o Multi-Kriteria-Analyse
o Unscharfes Lineares Programmieren
o Stochastische Optimierung
o Heuristiken, Meta- und Hyperheuristiken
o Erzeugung von Zufallszahlen
o Ereignisorientierte Simulation
o Agentenbasierte Simulation
o System Dynamics
o Statistische Auswertung von Simulationsergebnissen
o Simulation und Industrie 4.0`,
    lehrziele: `Das Modul liefert anwendungsbezogenes Wissen und Methodenkompetenz zur Model-
lierung und algorithmengestützten Analyse und Lösung wesentlicher betrieblicher Pla-
nungs- und Entscheidungsprobleme.
Lernergebnisse/Qualifikationsziele:
Nach erfolgreichem Abschluß des Moduls verfügen die Studenten über folgende Kom-
petenzen:
Fachkompetenz
Sie kennen und definieren wesentliche Klassen mathematischer Optimierungsprob-
leme.
Methodenkompetenz
Sie wenden fortgeschrittene Techniken zur Modellierung unterschiedlicher Arten von
mathematischen Optimierungsproblemen an.
150Sie nutzen komplexe Verfahren zur Lösung der aufgestellten Modelle.
Sie setzen professionelle Optimierungs- und Simulationssoftware selbständig ein.
Sie beurteilen die Lösbarkeit von Modellen und Problemformulierungen und wählen
geeignete Lösungsmethodiken aus.
Sie evaluieren Optimierungs- und Simulationsergebnisse, insbesondere im Hinblick auf
Sensitivität und Robustheit und leiten aus Ergebnissen konkrete Handlungsempfehlun-
gen für betriebswirtschaftliche Entscheider ab.
Personale Kompetenz
Sie kennen die Möglichkeiten und Grenzen von Optimierung und Simulation.
Soziale Kompetenz
Sie bereiten Ergebnisse von Optimierungs- und Simulationsrechnungen für Entschei-
der auf und präsentieren Auswertungsergebnisse zielgruppenorientiert.`,
  },
  {
    kuerzel: `W-34`,
    name: `Produktion und Logistik`,
    semesterSoll: 7,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: ``,
    inhalte: `Es wird ein Überblick gegeben über zentrale Aufgabenfelder und Problemstellungen
der Produktion und der Logistik aus Sicht der quantitativen Betriebswirtschaftslehre.
Grundlegende Methoden zur Analyse, Modellierung und Lösung quantitativer betriebli-
cher Planungs- und Entscheidungsprobleme werden vorgestellt.
Im einzelnen werden folgende Themenbereiche behandelt:
- Inner- und überbetriebliche Standortplanung
- Distributionsmanagement
- Deterministisches und stochastisches Bestandsmanagement
- Strategische, taktische und operative Produktionsplanung
- Mittel- und kurzfristige Personaleinsatzplanung
- Maschinenbelegungsplanung
- Transportlogistik`,
    lehrziele: `Das Modul gibt einen Überblick über fundamentale Aspekte von Produktion und Logis-
tik.
Nach erfolgreichem Abschluß des Moduls verfügen die Studenten über folgende Kom-
petenzen:
Fachkompetenz
Die Studenten kennen wesentliche Strukturen, Abläufe und Gestaltungselemente der
Produktion und der Beschaffungs-, Produktions-, Distributions- und Entsorgungslogis-
tik.
Methodenkompetenz
Sie beherrschen grundlegende Analyse-, Modellierungs- und Lösungsverfahren für we-
sentliche einschlägige betriebliche Planungs- und Entscheidungsprobleme.
Personale Kompetenz
Sie kennen die Möglichkeiten und Grenzen des Einsatzes quantitativer Methoden in
Produktion und Logistik.
Soziale Kompetenz
153Sie bereiten die Ergebnisse von Planungsrechnungen für Entscheider auf und präsen-
tieren die Resultate zielgruppenorientiert.`,
  },
  {
    kuerzel: `W-35`,
    name: `Data Science`,
    semesterSoll: 7,
    ects: 5.0,
    swsVorlesung: 4,
    workloadGesamt: 150,
    pruefungsform: `schr. P. 90 Min.`,
    inhalte: `Big Data, Analytics und die Rolle des "Data Scientist"
Data Analytics Lifecycle
Explorative Datenanalyse
Klassische Verfahren der multivariaten Statistik: Eine Auswahl aus
– Clusteranalyse
– Faktorenanalyse
– Regressionsanalyse
– Varianzanalyse
– Diskriminanzanalyse
Klassische Verfahren aus dem Gebiet des maschinellen Lernens: Eine Auswahl aus
– Nächster-Nachbar-Klassikation
– Naive Bayes-Klassikation
– Entscheidungsbäume
– Assoziationsregeln
– Neuronale Netze
157Technologien und Werkzeuge für Analytics: Software "R"
Ein Analytics-Projekt operationalisieren und Daten visualisieren:
– Best Practices zur Operationalisierung eines Analytics-Projekts
– Best Practices zur Planung und Erstellung effektiver Datenvisualisierung`,
    lehrziele: `Das Modul liefert anwendungsbezogenes Wissen und Methodenkompetenz zu Data
Science und Business Analytics. Dies ist im 21. Jahrhundert nicht nur für Wirtschaft-
singenieure, sondern alle naturwissenschaftlichen, technischen sowie wirtschafts- und
sozialwissenschaftlichen Fächer unverzichtbar.
Lernergebnisse/Qualifikationsziele:
Nach erfolgreichem Abschluß des Moduls verfügen die Studenten über folgende Kom-
petenzen:
Fachkompetenz
Sie kennen und definieren wesentliche Begriffe für Data Science und Analytics, nutzen
selbständig einschlägige Methoden und Technologien und haben die Garbage-in-
Garbage-out-Problematik verinnerlicht.
Methodenkompetenz
Sie wenden fortgeschrittene statistische Methoden zur Aufbereitung und Analyse von
Daten an und leiten aus Analyseergebnissen Handlungsempfehlungen ab.
Personale Kompetenz
156Sie besitzen ein Verständnis für moralische Aspekte beim Umgang mit Daten.
Soziale Kompetenz
Sie bereiten quantitative Informationen für Entscheider auf und stellen Auswertungs-
ergebnisse zielgruppenorientiert dar.`,
  },
  {
    kuerzel: `W-36`,
    name: `Bachelormodul`,
    semesterSoll: 7,
    ects: 14.0,
    swsVorlesung: 2,
    workloadGesamt: 420,
    pruefungsform: `mdl. P. 30 Min., Bachelorarbeit`,
    inhalte: `Individuelle Themenstellungen`,
    lehrziele: `Die während des Studiums vermittelten Lehrinhalte werden in Form einer wissen-
schaftlichen Arbeit angewendet. Die Problemstellung ist innerhalb eines vorgegebenen
Zeitrahmens selbständig zu analysieren, zu strukturieren und zu bearbeiten. Dies trai-
niert die Fähigkeit zur selbstständigen ingenieurmäßigen Bearbeitung eines größeren
zusammenhängenden Themas und zur Aufbereitung der Ergebnisse in wissenschaftli-
cher Form. Schließlich soll dadurch die Fähigkeit zur transparenten Dokumentation der
Ergebnisse erlangt werden.`,
  },
];