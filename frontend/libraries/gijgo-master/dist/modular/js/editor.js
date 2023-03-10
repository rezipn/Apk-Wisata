/*
 * Gijgo Editor v2.0.0-alpha-1
 * http://gijgo.com/editor
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.editor = {
    plugins: {},
    messages: {}
};

gj.editor.config = {
    base: {

        /** The height of the editor. Numeric values are treated as pixels.         */        height: 300,

        /** The width of the editor. Numeric values are treated as pixels.         */        width: undefined,

        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap.          */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons and Font Awesome.         */        iconsLibrary: 'materialicons',

        /** The language that needs to be in use.         */        locale: 'en-us',

        buttons: undefined,

        style: {
            wrapper: 'gj-editor gj-editor-md',
            buttonsGroup: 'gj-button-md-group',
            button: 'gj-button-md',
            buttonActive: 'active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-default gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-outline-secondary gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    materialicons: {
        icons: {
            bold: '<i class="gj-icon bold" />',
            italic: '<i class="gj-icon italic" />',
            strikethrough: '<i class="gj-icon strikethrough" />',
            underline: '<i class="gj-icon underlined" />',

            listBulleted: '<i class="gj-icon list-bulleted" />',
            listNumbered: '<i class="gj-icon list-numbered" />',
            indentDecrease: '<i class="gj-icon indent-decrease" />',
            indentIncrease: '<i class="gj-icon indent-increase" />',

            alignLeft: '<i class="gj-icon align-left" />',
            alignCenter: '<i class="gj-icon align-center" />',
            alignRight: '<i class="gj-icon align-right" />',
            alignJustify: '<i class="gj-icon align-justify" />',

            undo: '<i class="gj-icon undo" />',
            redo: '<i class="gj-icon redo" />'
        }
    },

    fontawesome: {
        icons: {
            bold: '<i class="fa fa-bold" aria-hidden="true"></i>',
            italic: '<i class="fa fa-italic" aria-hidden="true"></i>',
            strikethrough: '<i class="fa fa-strikethrough" aria-hidden="true"></i>',
            underline: '<i class="fa fa-underline" aria-hidden="true"></i>',

            listBulleted: '<i class="fa fa-list-ul" aria-hidden="true"></i>',
            listNumbered: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
            indentDecrease: '<i class="fa fa-indent" aria-hidden="true"></i>',
            indentIncrease: '<i class="fa fa-outdent" aria-hidden="true"></i>',

            alignLeft: '<i class="fa fa-align-left" aria-hidden="true"></i>',
            alignCenter: '<i class="fa fa-align-center" aria-hidden="true"></i>',
            alignRight: '<i class="fa fa-align-right" aria-hidden="true"></i>',
            alignJustify: '<i class="fa fa-align-justify" aria-hidden="true"></i>',

            undo: '<i class="fa fa-undo" aria-hidden="true"></i>',
            redo: '<i class="fa fa-repeat" aria-hidden="true"></i>'
        }
    }
};

gj.editor.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-editor', 'true');
        gj.editor.methods.initialize(this, this.getConfig());
        return this;
    },

    initialize: function (editor, data) {
        var group, groupEl, btn, btnEl, wrapper, body, toolbar;

        editor.element.style.display = 'none';

        if (editor.element.parentElement.getAttributes('data-gj-role') !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('data-gj-role', 'wrapper');
            editor.element.parentNode.insertBefore(wrapper, editor.element);
            wrapper.appendChild(editor.element);
        }

        gj.editor.methods.localization(data);
        gj.core.addClasses(wrapper, data.style.wrapper);
        if (data.width) {
            wrapper.style.width = data.width;
        }

        body = wrapper.querySelector('div[data-gj-role="body"]');
        if (!body) {
            body = document.createElement('div');
            body.setAttribute('data-gj-role', 'body');
            wrapper.appendChild(body);
            if (editor.element.innerText) {
                body.innerHTML = editor.element.innerText;
            }
        }
        body.setAttribute('contenteditable', true);
        body.addEventListener('keydown', function (e) {
            var key = e.keyCode || e.charCode;
            if (gj.editor.events.changing(editor.element) === false && key !== 8 && key !== 46) {
                e.preventDefault();
            }
        });
        body.addEventListener('mouseup keyup mouseout cut paste', function (e) {
            self.updateToolbar(editor, toolbar, data);
            gj.editor.events.changed(editor);
            editor.html(body.html());
        });

        toolbar = wrapper.querySelector('div[data-gj-role="toolbar"]');
        if (!toolbar) {
            toolbar = document.createElement('div');
            toolbar.setAttribute('data-gj-role', 'toolbar');
            body.parentNode.insertBefore(toolbar, body);

            for (group in data.buttons) {
                groupEl = document.createElement('div');
                groupEl.classList.add(data.style.buttonsGroup);
                for (btn in data.buttons[group]) {
                    btnEl = gj.core.createElement(data.buttons[group][btn]);
                    btnEl.addEventListener('click', function () {
                        gj.editor.methods.executeCmd(editor, body, toolbar, this, data);
                    });
                    groupEl.appendChild(btnEl);
                }
                toolbar.appendChild(groupEl);
            }
        }

        body.style.height = data.height - gj.core.height(toolbar, true) + 'px';
    },

    localization: function (data) {
        var msg = gj.editor.messages[data.locale];
        if (typeof (data.buttons) === 'undefined') {
            data.buttons = [
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.bold + '" data-gj-role="bold">' + data.icons.bold + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.italic + '" data-gj-role="italic">' + data.icons.italic + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.strikethrough + '" data-gj-role="strikethrough">' + data.icons.strikethrough + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.underline + '" data-gj-role="underline">' + data.icons.underline + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listBulleted + '" data-gj-role="insertunorderedlist">' + data.icons.listBulleted + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listNumbered + '" data-gj-role="insertorderedlist">' + data.icons.listNumbered + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentDecrease + '" data-gj-role="outdent">' + data.icons.indentDecrease + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentIncrease + '" data-gj-role="indent">' + data.icons.indentIncrease + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignLeft + '" data-gj-role="justifyleft">' + data.icons.alignLeft + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignCenter + '" data-gj-role="justifycenter">' + data.icons.alignCenter + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignRight + '" data-gj-role="justifyright">' + data.icons.alignRight + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignJustify + '" data-gj-role="justifyfull">' + data.icons.alignJustify + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.undo + '" data-gj-role="undo">' + data.icons.undo + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.redo + '" data-gj-role="redo">' + data.icons.redo + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function (editor, toolbar, data) {
        buttons = toolbar.querySelectorAll('[data-gj-role]').forEach(function(btn) {
            var cmd = btn.getAttribute('data-gj-role');

            if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                btn.classList.add(data.style.buttonActive);
            } else {
                btn.classList.remove(data.style.buttonActive);
            }
        });
    },

    executeCmd: function (editor, body, toolbar, btn, data) {
        body.focus();
        document.execCommand(btn.getAttribute('data-gj-role'), false);
        gj.editor.methods.updateToolbar(editor, toolbar, data);
    },

    content: function (editor, html) {
        var body = editor.element.parentElement.querySelector('div[data-gj-role="body"]');
        if (typeof html === "undefined") {
            return body.innerHTML;
        } else {
            body.innerHTML = html;
        }
    },

    destroy: function (editor) {
        var wrapper;
        if (editor.element.getAttribute('data-editor') === 'true') {
            wrapper = editor.element.parentElement;
            wrapper.querySelector('div[data-gj-role="body"]').remove();
            wrapper.querySelector('div[data-gj-role="toolbar"]').remove();
            editor.element.outerHTML = editor.element.innerHTML;
            editor.removeConfig();
            editor.element.removeAttribute('data-gj-guid');
            editor.element.removeAttribute('data-editor');
            //$editor.off();
            editor.element.display = 'block';
        }
        return editor;
    }
};

gj.editor.events = {

    /**
     * Event fires before change of text in the editor.
     *     */    changing: function (el) {
        return el.dispatchEvent(new Event('changing'));
    },

    /**
     * Event fires after change of text in the editor.
     *     */    changed: function (el) {
        return el.dispatchEvent(new Event('changed'));
    }
};

GijgoEditor = function (element, jsConfig) {
    var self = this,
        methods = gj.editor.methods;

    self.type = 'editor';
    self.element = element;

    /** Get or set html content in the body.     */    self.content = function (html) {
        return methods.content(this, html);
    };

    /** Remove editor functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    if ('true' !== element.getAttribute('data-editor')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoEditor.prototype = new gj.widget();
GijgoEditor.constructor = gj.editor.widget;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.editor = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoEditor(this, method);
                } else {
                    widget = new GijgoEditor(this, null);
                    if (widget[method]) {
                        return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}

gj.editor.messages['en-us'] = {
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    listBulleted: 'List Bulleted',
    listNumbered: 'List Numbered',
    indentDecrease: 'Indent Decrease',
    indentIncrease: 'Indent Increase',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    alignJustify: 'Align Justify',
    undo: 'Undo',
    redo: 'Redo'
};
gj.editor.messages['bg-bg'] = {
	bold: '??????????????????????',
	italic: '??????????????????',
	strikethrough: '??????????????????????',
	underline: '????????????????????????',
	listBulleted: '????????????',
	listNumbered: '?????????????????? ????????????',
	indentDecrease: '???????????????????? ???? ????????????',
	indentIncrease: '?????????????????????? ???? ????????????',
	alignLeft: '???????????????????????? ?? ????????',
	alignCenter: '????????????????????',
	alignRight: '???????????????????????? ?? ??????????',
	alignJustify: '??????????????????????',
	undo: '??????????',
	redo: '????????????'
};
gj.editor.messages['fr-fr'] = {
    bold: 'Gras',
    italic: 'Italique',
    strikethrough: 'Barr\u00e9',
    underline: 'Soulign\u00e9',
    listBulleted: 'Puces',
    listNumbered: 'Num\u00e9rotation',
    indentDecrease: 'Diminuer le retrait',
    indentIncrease: 'Augmenter le retrait',
    alignLeft: 'Aligner \u00e0 gauche',
    alignCenter: 'Centrer',
    alignRight: 'Aligner \u00e0 droite',
    alignJustify: 'Justifier',
    undo: 'Annuler',
    redo: 'R\u00e9tablir'
};
gj.editor.messages['de-de'] = {
    bold: 'Fett',
    italic: 'Kursiv',
    strikethrough: 'Durchgestrichen',
    underline: 'Unterstrichen',
    listBulleted: 'Aufz\u00e4hlung',
    listNumbered: 'Nummerierte Liste',
    indentDecrease: 'Einzug verkleinern',
    indentIncrease: 'Einzug vergr\u00f6\u00dfern',
    alignLeft: 'Linksb\u00fcndig ausrichten',
    alignCenter: 'Zentriert ausrichten',
    alignRight: 'Rechtsb\u00fcndig ausrichten',
    alignJustify: 'Blocksatz',
    undo: 'R\u00fcckg\u00e4ngig',
    redo: 'Wiederholen'
};
gj.editor.messages['pt-br'] = {
    bold: 'Negrito',
    italic: 'It\u00e1lico',
    strikethrough: 'Riscar',
    underline: 'Sublinhar',
    listBulleted: 'Lista n\u00e3o ordenada',
    listNumbered: 'Lista ordenada',
    indentDecrease: 'Diminuir recuo',
    indentIncrease: 'Aumentar recuo',
    alignLeft: 'Alinhar \u00e0 esquerda',
    alignCenter: 'Centralizar',
    alignRight: 'Alinhar \u00e0 direita',
    alignJustify: 'Justificar',
    undo: 'Desfazer',
    redo: 'Refazer'
};
gj.editor.messages['ru-ru'] = {
	bold: '????????????',
	italic: '????????????',
	strikethrough: '??????????????????????',
	underline: '????????????????????????',
	listBulleted: '????????????',
	listNumbered: '???????????????????????? ????????????',
	indentDecrease: '?????????????????? ????????????',
	indentIncrease: '?????????????????? ????????????',
	alignLeft: '?????????????????? ???? ???????????? ????????',
	alignCenter: '?????????????????? ???? ????????????',
	alignRight: '?????????????????? ???? ?????????????? ????????',
	alignJustify: '?????????????????? ???? ????????????',
	undo: '??????????',
	redo: '????????????'
};
gj.editor.messages['es-es'] = {
    bold: 'Negrita',
    italic: 'Italica',
    strikethrough: 'Tachado',
    underline: 'Subrayado',
    listBulleted: 'Puntos',
    listNumbered: 'Lista numerada',
    indentDecrease: 'Disminuir indentacion',
    indentIncrease: 'Aumentar indentacion',
    alignLeft: 'Alineaci??n izquierda',
    alignCenter: 'Alineaci??n centrada',
    alignRight: 'Alineaci??n derecha',
    alignJustify: 'Alineaci??n justificada',
    undo: 'Deshacer',
    redo: 'Repetir'
};
gj.editor.messages['it-it'] = {
    bold: 'Grassetto',
    italic: 'Corsivo',
    strikethrough: 'Barrato',
    underline: 'Sottolineato',
    listBulleted: 'Lista puntata',
    listNumbered: 'Lista numerata',
    indentDecrease: 'sposta testo a sinistra',
    indentIncrease: 'sposta testo a destra',
    alignLeft: 'Allineamento a sinistra',
    alignCenter: 'Centrato',
    alignRight: 'Allineamento a destra',
    alignJustify: 'Giustificato',
    undo: 'Annulla',
    redo: 'Ripeti'
};
gj.editor.messages['tr-tr'] = {
    bold: 'Kal??n',
    italic: '??talik',
    strikethrough: '??ok Kal??n',
    underline: 'Alt?? ??izgili',
    listBulleted: 'Noktal??',
    listNumbered: 'Rakaml??',
    indentDecrease: 'Girintiyi Azalt',
    indentIncrease: 'Girintiyi ??o??alt',
    alignLeft: 'Sola Yasla',
    alignCenter: 'Ortala',
    alignRight: 'Sa?? Yasla',
    alignJustify: 'Yay',
    undo: 'Geri Al',
    redo: '??leri Al'
};
gj.editor.messages['ja-jp'] = {
    bold: '??????',
    italic: '??????',
    strikethrough: '????????????',
    underline: '??????',
    listBulleted: '????????????',
    listNumbered: '????????????????????????',
    indentDecrease: '???????????????????????????',
    indentIncrease: '???????????????????????????',
    alignLeft: '?????????',
    alignCenter: '????????????',
    alignRight: '?????????',
    alignJustify: '????????????',
    undo: '????????????',
    redo: '????????????'
};
gj.editor.messages['zh-cn'] = {
    bold: '??????',
    italic: '??????',
    strikethrough: '?????????',
    underline: '?????????',
    listBulleted: '????????????',
    listNumbered: '????????????',
    indentDecrease: '????????????',
    indentIncrease: '????????????',
    alignLeft: '?????????',
    alignCenter: '??????',
    alignRight: '?????????',
    alignJustify: '????????????',
    undo: '??????',
    redo: '??????'
};
gj.editor.messages['zh-tw'] = {
    bold: '??????',
    italic: '??????',
    strikethrough: '?????????',
    underline: '?????????',
    listBulleted: '????????????',
    listNumbered: '????????????',
    indentDecrease: '????????????',
    indentIncrease: '????????????',
    alignLeft: '?????????',
    alignCenter: '??????',
    alignRight: '?????????',
    alignJustify: '????????????',
    undo: '??????',
    redo: '??????'
};
gj.editor.messages['lv-lv'] = {
	bold: 'Trekns',
	italic: 'Sl??praksts',
	strikethrough: 'Izsv??trots',
	underline: 'Pasv??trots',
	listBulleted: 'Saraksts',
	listNumbered: 'Numur??ts saraksts',
	indentDecrease: 'Samazin??t atk??pumu',
	indentIncrease: 'Palielin??t atk??pumu',
	alignLeft: 'Kreisais l??dzin??jums',
	alignCenter: 'Centr??lais l??dzin??jums',
	alignRight: 'Labais l??dzin??jums',
	alignJustify: 'Izl??dzin??t platum??',
	undo: 'Atpaka??',
	redo: 'Uz priek??u'
};
gj.editor.messages['cs-cz'] = {
    bold: 'Tu??n??',
    italic: 'Kurz??va',
    strikethrough: 'P??e??krtnut??',
    underline: 'Podtr??en??',
    listBulleted: 'Odr????kov?? seznam',
    listNumbered: '????slovan?? seznam',
    indentDecrease: 'Zmen??it odsazen??',
    indentIncrease: 'Zv??t??it odsazen??',
    alignLeft: 'Zarovnat vlevo',
    alignCenter: 'Zarovnat na st??ed',
    alignRight: 'Zarovnat vpravo',
    alignJustify: 'Zarovnat do bloku',
    undo: 'Zp??t',
    redo: 'Znovu'
};
gj.editor.messages['az-az'] = {
    bold: 'Qal??n',
    italic: '??talik',
    strikethrough: '??ox Qal??n',
    underline: 'Alt X??tli',
    listBulleted: 'Noqt??li',
    listNumbered: 'R??q??mli',
    indentDecrease: 'Abzas?? Azalt',
    indentIncrease: 'Abzas?? ??oxalt',
    alignLeft: 'Sola Daya',
    alignCenter: 'Ortala',
    alignRight: 'Sa??a Daya',
    alignJustify: 'H??r iki t??r??f?? daya',
    undo: 'Geri Al',
    redo: '??r??li Al'
};
gj.editor.messages['el-gr'] = {
    bold: '????????????',
    italic: '????????????',
    strikethrough: '??????????????????????',
    underline: '????????????????????????????',
    listBulleted: '?????????? ????????????????',
    listNumbered: '?????????? ??????????????????',
    indentDecrease: '???????????? ????????????',
    indentIncrease: '???????????? ????????????',
    alignLeft: '???????????????? ????????????????',
    alignCenter: '???????????????? ????????????????',
    alignRight: '?????????? ????????????????',
    alignJustify: '???????????? ????????????????',
    undo: '????????????????',
    redo: '??????????????????'
};
gj.editor.messages['hu-hu'] = {
    bold: 'F??lk??v??r',
    italic: 'D??lt',
    strikethrough: '??th??zott',
    underline: 'Al??h??zott',
    listBulleted: 'Felsorol??s',
    listNumbered: 'Sz??moz??s',
    indentDecrease: 'Beh??z??s cs??kkent??se',
    indentIncrease: 'Beh??z??s n??vel??se',
    alignLeft: 'Balra igaz??t??s',
    alignCenter: 'K??z??pre igaz??t??s',
    alignRight: 'Jobbra igaz??t??s',
    alignJustify: 'Sorkiz??r??s',
    undo: 'Visszavon??s',
    redo: 'M??gis'
};
gj.editor.messages['nl-nl'] = {
    bold: 'Vet',
    italic: 'Cursief',
    strikethrough: 'Doorgestreept',
    underline: 'Onderstreept',
    listBulleted: 'Opgesomde lijst',
    listNumbered: 'Genummerde lijst',
    indentDecrease: 'Inspringen verkleinen',
    indentIncrease: 'Inspringen vergroten',
    alignLeft: 'Links uitlijnen',
    alignCenter: 'Centreren',
    alignRight: 'Rechts uitlijnen',
    alignJustify: 'Uitlijnen',
    undo: 'Ongedaan maken',
    redo: 'Opnieuw'
};

gj.editor.messages['ro-ro'] = {
    bold: 'Bolduit',
    italic: 'Cursiv',
    strikethrough: 'T??iat',
    underline: 'Subliniat',
    listBulleted: 'List?? Nenumerotat??',
    listNumbered: 'List Numerotata',
    indentDecrease: 'Sc??dere Indentare',
    indentIncrease: 'Cre??tere Indentare',
    alignLeft: 'Aliniere St??nga',
    alignCenter: 'Aliniere Centrat',
    alignRight: 'Aliniere Dreapta',
    alignJustify: 'Aliniere Egal??',
    undo: 'Undo',
    redo: 'Redo'
};

