const source = {
  template: `<p><a class="spotlight" target="_blank" href="http://markaz-al-forqane.be/images/{{ img }}">
<img src="http://markaz-al-forqane.be/images/{{ img }}" alt="{{ title }}" align="right" title="{{ title }}" width="100%" /></a></p>
{{{ text }}}`,
  fields: {
    title: 'input',
    img: 'file',
    text: 'text',
  },
  defaults: {
    title: 'Nouvelle session de cours d\'arabe et de tajwîd qui débutera le 6 février 2017',
    img: '170128-cours-arabe.jpg',
    text: `La Madrassah Al-Forqane a le plaisir de vous annoncer <strong>une nouvelle session de cours d'arabe et de tajwîd</strong> (pour hommes) qui débutera le 6 février 2017.

Pour les inscriptions et informations, une permanence aura lieu

* les samedis 28 janvier & 4 février
* les dimanches 29 janvier & 5 février 2017
* de 15h30 à 17h30 au [35 rue de la Limite, 1210 Bruxelles](https://goo.gl/maps/i87P2dQi2g32).

*À propager très largement, qu'Allah vous accorde la science bénéfique et vous élève en degrés.*`,
  },
};

export default source;
