const source = {
  template: `<p style="text-align: justify;"><span style="font-size: 14pt;"><span style="color: #000000;"><strong><img src="http://markaz-al-forqane.be/images/folder_my_music.png" alt="" width="128" height="128" style="margin-left: 10px; margin-right: 10px; border: 0px; float: left;" /></strong></span></span></p>
<hr class="dotted" />
{{{ text }}}
<p class="box-content" style="text-align: center;"><span style="color: #000000; font-size: 14pt;">T&eacute;l&eacute;chargement des audios des cours</span></p>
<div id="accordion-30-4fbe5356299ed" class="wk-accordion wk-accordion-default clearfix" style="width: 800px;" data-widgetkit="accordion" data-options="{&quot;style&quot;:&quot;default&quot;,&quot;collapseall&quot;:1,&quot;matchheight&quot;:1,&quot;index&quot;:0,&quot;duration&quot;:500,&quot;width&quot;:500}">
{{#each audios}}
<h3 class="toggler">{{ audioTitle }}</h3>
<div>
<div class="content wk-content clearfix"><img src="http://markaz-al-forqane.be/images/sound-recorder.png" alt="Ecouter" width="115" height="115" class="align-left" border="0" />
<p>{audio}{{ mp3 }}|{{ ../scholar }}|{{ mp3 }}{/audio} | <a href="http://markaz-al-forqane.be/mp3/{{ mp3 }}" target="_blank" class="button-primary" title="T&eacute;l&eacute;charger">T&eacute;l&eacute;charger</a> | <img src="http://markaz-al-forqane.be/images/clock-time.png" alt="" style="vertical-align: middle;" />&nbsp;46 min</p>
<div class="intblock">&nbsp;</div>
</div>
</div>
{{/each}}
</div>`,
  fields: {
    scholar: 'input',
    text: 'text',
    audios: {
      audioTitle: 'input',
      mp3: 'file',
    },
  },
  defaults: {
    audios: {
      audioTitle: 'Cours ~',
      mp3: 'importance-voie-salafie-dhoufayri-hassan-0~.mp3',
    },
    scholar: 'Hassan Abou Asma',
    text: `Cette série est la traduction et le commentaire d'une conférence de **Shaykh Abdoullâh Adh-Dhoufayri -حفظه الله-** intitulée **"l'importance d'être lié à la voie des salafs et le danger de s'en éloigner".**

Ceci est une série de cours dispensés par **Hassan Abou Asma -حفظه الله-** à la mosquée Iqraa de Rambert d’Albon et diffusée en direct sur la radio du Markaz Al-Forqane: [www.mixlr.com/markaz-al-forqane](http://www.mixlr.com/markaz-al-forqane)`,
  },
};

export default source;
