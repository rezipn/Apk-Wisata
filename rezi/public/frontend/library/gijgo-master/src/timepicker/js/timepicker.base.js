﻿/* global window alert jQuery gj */
/**
  * @widget TimePicker
  * @plugin Base
  */
gj.timepicker = {
    plugins: {}
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { width: 280 });
         * </script>
         * @example HTML.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'));
         * </script>
         */
        width: undefined,

        /** If set to true, the timepicker will have modal behavior.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { modal: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { modal: false, header: false, footer: false });
         * </script>
         */
        modal: true,

        /** If set to true, add header to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { header: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { header: false, mode: '24hr' });
         * </script>
         */
        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { footer: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { footer: false });
         * </script>
         */
        footer: true,

        /** Specifies the format, which is used to format the value of the timepicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * @type String
         * @default 'MM:HH'
         * @example Sample <!-- timepicker -->
         * <input id="timepicker" width="312" value="13.42" />
         * <script>
         *     var timepicker = new GijgoTimePicker(document.getElementById('timepicker'), {
         *         format: 'HH.MM'
         *     });
         * </script>
         */
        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <input id="timepicker" width="270" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'bootstrap', modal: false, footer: false });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial timepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        value: '13:42'
         *    });
         * </script>
         * @example HTML <!-- timepicker -->
         * <input id="timepicker" width="312" value="13:42" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'));
         * </script>
         */
        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.
         * @type ampm|24hr
         * @default 'ampm'
         * @example ampm <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { mode: 'ampm' });
         * </script>
         * @example 24hr <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { mode: '24hr' });
         * </script>
         */
        mode: '24hr',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'de-de'
         *    });
         * </script>
         * @example Bulgarian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'bg-bg'
         *    });
         * </script>
         * @example French <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'fr-fr'
         *    });
         * </script>
         * @example Brazil <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'pt-br'
         *    });
         * </script>
         * @example Russian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'ru-ru'
         *    });
         * </script>
         */
        locale: 'en-us',

        /** The size of the timepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { uiLibrary: 'bootstrap4', size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { uiLibrary: 'bootstrap4', size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { uiLibrary: 'bootstrap', size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { uiLibrary: 'bootstrap', size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { size: 'large' });
         * </script>
         */
        size: 'default',

        /** If set to true, show timepicker on input focus.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: false });
         * </script>
         */
        showOnFocus: true,

        /** If set to true, show timepicker icon on the right side of the input.
         * @type Boolean
         * @default true
         * @example False <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example True <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showRightIcon: true });
         * </script>
         */
        showRightIcon: true,

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-picker gj-picker-md timepicker',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control border',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        }
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig);
        return this;
    },

    initialize: function () {

    },

    initMouse: function (input, popup, data) {
        var body = popup.querySelector('[data-gj-role="body"]');
        body.addEventListener('mousedown', gj.timepicker.methods.mouseDownHandler(popup));
        body.addEventListener('mousemove', gj.timepicker.methods.mouseMoveHandler(input, popup, data));
        body.addEventListener('mouseup', gj.timepicker.methods.mouseUpHandler(input, popup, data));
    },

    createPopup: function (picker) {
        var date, amEl, pmEl, wrapper,
            data = picker.getConfig(),
            clock = document.createElement('div'),
            hour = document.createElement('div'),
            separator = document.createElement('span'),
            minute = document.createElement('div'),
            header = document.createElement('div'),
            mode = document.createElement('div'),
            body = document.createElement('div'),
            btnOk = document.createElement('button'),
            btnCancel = document.createElement('button'),
            footer = document.createElement('div');

        gj.core.addClasses(clock, data.style.clock);
        clock.setAttribute('role', 'picker');
        clock.setAttribute('data-gj-guid', picker.element.getAttribute('data-gj-guid'));

        hour.setAttribute('role', 'hour');
        minute.setAttribute('role', 'minute');
        header.setAttribute('role', 'header');
        mode.setAttribute('role', 'mode');
        body.setAttribute('role', 'body');

        gj.core.addClasses(btnOk, data.style.button);
        btnOk.innerText = gj.core.messages[data.locale].ok;

        gj.core.addClasses(btnCancel, data.style.button);
        btnCancel.innerText = gj.core.messages[data.locale].cancel;

        footer.setAttribute('role', 'footer');
        gj.core.addClasses(footer, data.style.footer);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            picker.element.setAttribute('hours', date.getHours());
        }

        if (data.header) {
            hour.addEventListener('click', function () {
                gj.timepicker.methods.renderHours(picker.element, clock, data);
            });
            minute.addEventListener('click', function () {
                gj.timepicker.methods.renderMinutes(picker.element, clock, data);
            });
            header.appendChild(hour);
            separator.innerText = ':';
            header.appendChild(separator);
            header.appendChild(minute);

            if (data.mode === 'ampm') {
                amEl = document.createElement('span');
                amEl.setAttribute('role', 'am');
                amEl.innerText = gj.core.messages[data.locale].am;
                mode.appendChild(amEl);
                amEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'am');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[data-gj-role="pm"]').classList.remove('selected');
                    if (hour >= 12) {
                        clock.setAttribute('hour', hour - 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                mode.appendChild(document.createElement('br'));

                pmEl = document.createElement('span');
                pmEl.setAttribute('role', 'pm');
                pmEl.innerText = gj.core.messages[data.locale].pm;
                mode.appendChild(pmEl);
                pmEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'pm');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[data-gj-role="am"]').classList.remove('selected');
                    if (hour < 12) {
                        clock.setAttribute('hour', hour + 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                header.appendChild(mode);
            }
            clock.appendChild(header);
        }
        
        clock.appendChild(body);

        if (data.footer) {
            btnCancel.addEventListener('click', function () { picker.close(); });
            footer.appendChild(btnCancel);
            btnOk.addEventListener('click', gj.timepicker.methods.setTime(picker, clock));
            footer.appendChild(btnOk);
            clock.appendChild(footer);
        }

        clock.style.display = 'none';

        document.body.appendChild(clock);

        if (data.modal) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'modal');
            gj.core.addClasses(wrapper, data.style.modal);
            clock.parentNode.insertBefore(wrapper, clock);
            wrapper.appendChild(clock);
            gj.core.center(clock);
        }

        gj.timepicker.methods.initMouse(picker, clock, data);

        return clock;
    },

    getHour: function (clock) {
        return parseInt(clock.getAttribute('hour'), 10) || 0;
    },

    getMinute: function (clock) {
        return parseInt(clock.getAttribute('minute'), 10) || 0;
    },

    getMode: function (clock) {
        return clock.getAttribute('mode')
    },

    setTime: function (picker, clock) {
        return function () {
            var hour = gj.timepicker.methods.getHour(clock),
                minute = gj.timepicker.methods.getMinute(clock),
                mode = gj.timepicker.methods.getMode(clock),
                date = new Date(0, 0, 0, (hour === 12 && mode === 'am' ? 0 : hour), minute),
                data = picker.getConfig(),
                value = gj.core.formatDate(date, data.format, data.locale);
            picker.value(value);
            picker.close();
        };
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case 'ampm': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24hr': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
            default:
                throw 'missing timepicker mode.';
        }
    },

    updateArrow: function(e, picker, clock, data) {
        var rect, type, value,
            mouseX = picker.mouseX(e),
            mouseY = picker.mouseY(e),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        rect = e.target.getBoundingClientRect();
        type = clock.getAttribute('type');
        if (type === 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, data.mode);
            clock.setAttribute('hour', data.mode === 'ampm' && clock.getAttribute('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (type === 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, 'minutes');
            clock.setAttribute('minute', value);
        }

        gj.timepicker.methods.update(picker, clock, data);
    },

    update: function (picker, clock, data) {
        var hour, minute, mode, arrow, type, visualHour, header, numbers, i, number;

        // update the arrow
        hour = gj.timepicker.methods.getHour(clock);
        minute = gj.timepicker.methods.getMinute(clock);
        mode = gj.timepicker.methods.getMode(clock);
        arrow = clock.querySelector('[data-gj-role="arrow"]');
        type = clock.getAttribute('type');
        if (type === 'hours' && (hour == 0 || hour > 12) && data.mode === '24hr') {
            arrow.style.width = 'calc(50% - 52px)';
        } else {
            arrow.style.width = 'calc(50% - 20px)';
        }

        if (type === 'hours') {
            arrow.style.transform = 'rotate(' + ((hour * 30) - 90).toString() + 'deg)';
        } else {
            arrow.style.transform = 'rotate(' + ((minute * 6) - 90).toString() + 'deg)';
        }
        arrow.style.display = 'block';

        // update the numbers
        visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour));
        numbers = clock.querySelectorAll('[data-gj-role="body"] span');
        for (i = 0; i < numbers.length; i++) {
            number = parseInt(numbers[i].innerText, 10);
            if (type === 'hours' && number === visualHour) {
                numbers[i].classList.add('selected');
            } else if (type === 'minutes' && number === minute) {
                numbers[i].classList.add('selected');
            } else {
                numbers[i].classList.remove('selected');
            }
        }

        // update the header
        if (data.header) {
            header = clock.querySelector('[data-gj-role="header"]');
            header.querySelector('[data-gj-role="hour"]').innerText = visualHour;
            header.querySelector('[data-gj-role="minute"]').innerText = gj.core.pad(minute);
            if (data.mode === 'ampm') {
                if (mode == "pm") {
                    header.querySelector('[data-gj-role="pm"]').classList.add('selected');
                    header.querySelector('[data-gj-role="am"]').classList.remove('selected');
                } else {
                    header.querySelector('[data-gj-role="am"]').classList.add('selected');
                    header.querySelector('[data-gj-role="pm"]').classList.remove('selected');
                }
            }
        }
    },

    mouseDownHandler: function (picker) {
        return function (e) {
            picker.mouseMove = true;
        };
    },

    mouseMoveHandler: function (picker, clock, data) {
        return function (e) {
            if (picker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, picker, clock, data);
            }
        };
    },

    mouseUpHandler: function (picker, clock, data) {
        return function (e) {
            var type = clock.getAttribute('type');
            if (type === 'hours' || type === 'minutes') {
                gj.timepicker.methods.updateArrow(e, picker, clock, data);
                picker.mouseMove = false;
                if (!data.modal) {
                    clearTimeout(picker.timeout);
                    picker.element.focus();
                }
                if (type === 'hours') {
                    setTimeout(function () {
                        gj.timepicker.events.select(picker.element, 'hour');
                        gj.timepicker.methods.renderMinutes(picker, clock, data);
                    }, 1000);
                } else if (type === 'minutes') {
                    if (data.footer !== true && data.autoClose !== false) {
                        gj.timepicker.methods.setTime(picker, clock)();
                    }
                    gj.timepicker.events.select(picker.element, 'minute');
                }
            }
        };
    },

    renderHours: function (picker, clock, data) {
        var dial, arrow, body = clock.querySelector('[data-gj-role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('data-gj-role', 'dial');

        arrow = gj.core.createElement('<div data-gj-role="arrow" style="display: none; transform: rotate(-90deg);" />');
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, -93.5307px)">1</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, -54px)">2</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(108px, 0px)">3</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, 54px)">4</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, 93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(6.61309e-15px, 108px)">6</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, 93.5307px)">7</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, 54px)">8</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-108px, 1.32262e-14px)">9</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, -93.5307px)">11</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.98393e-14px, -108px)">12</span>'));
        if (data.mode === '24hr') {
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(38px, -65.8179px)">13</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(65.8179px, -38px)">14</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(76px, 0px)">15</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(65.8179px, 38px)">16</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(38px, 65.8179px)">17</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(4.65366e-15px, 76px)">18</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-38px, 65.8179px)">19</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-65.8179px, 38px)">20</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-76px, 9.30732e-15px)">21</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-65.8179px, -38px)">22</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-38px, -65.8179px)">23</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.3961e-14px, -76px)">00</span>'));
        }
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[data-gj-role="header"] [data-gj-role="hour"]').classList.add('selected');
            clock.querySelector('[data-gj-role="header"] [data-gj-role="minute"]').classList.remove('selected');
        }

        clock.setAttribute('type', 'hours');

        gj.timepicker.methods.update(picker, clock, data);
    },

    renderMinutes: function (picker, clock, data) {
        var arrow, body = clock.querySelector('[data-gj-role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('data-gj-role', 'dial');

        arrow = document.createElement('div');
        arrow.setAttribute('data-gj-role', 'arrow');
        arrow.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)';
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, -93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(108px, 0px)">15</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, 54px)">20</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, 93.5307px)">25</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(6.61309e-15px, 108px)">30</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, 93.5307px)">35</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, 54px)">40</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-108px, 1.32262e-14px)">45</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, -54px)">50</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, -93.5307px)">55</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.98393e-14px, -108px)">00</span>'));
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[data-gj-role="header"] [data-gj-role="hour"]').classList.remove('selected');
            clock.querySelector('[data-gj-role="header"] [data-gj-role="minute"]').classList.add('selected');
        }
        
        clock.setAttribute('type', 'minutes');

        gj.timepicker.methods.update(picker, clock, data);
    },

    setAttributes: function (popup, data, date) {
        var hour = date.getHours();
        if (data.mode === 'ampm') {
            popup.setAttribute('mode', hour >= 12 ? 'pm' : 'am');
        }
        popup.setAttribute('hour', hour);
        popup.setAttribute('minute', date.getMinutes());

    },

    open: function (picker) {
        var time, data = picker.getConfig(),
            clock = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

        if (picker.value()) {
            time = gj.core.parseDate(picker.value(), data.format, data.locale);
        } else {
            time = new Date();
        }

        gj.timepicker.methods.setAttributes(clock, data, time);

        gj.timepicker.methods.renderHours(picker, clock, data);

        gj.picker.widget.prototype.open.call(picker, 'timepicker');
        return picker;
    },

    value: function (picker, value) {
        if (typeof (value) === "undefined") {
            return picker.element.value;
        } else {
            picker.element.value = value;
            gj.timepicker.events.change(picker.element);
            return picker;
        }
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are hour and minute.
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e) {
     *             alert('Select from type of "' + e.detail.type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function (el, type) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { 'type': type } }));
    },

    /**
     * Event fires when the timepicker is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Event fires when the timepicker is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         close: function (e) {
     *             alert('close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.type = 'timepicker';
    self.element = element;

    self.mouseMove = false;

    /** Gets or sets the value of the timepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- timepicker -->
     * <button class="gj-button-md" onclick="alert(picker.value())">Get Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     * @example Set <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.value('11:00')">Set Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.
     * @method
     * @return timepicker
     * @example sample <!-- timepicker -->
     * <button class="gj-button-md" onclick="timepicker.destroy()">Destroy</button>
     * <input id="picker" width="312" />
     * <script>
     *     var timepicker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     */
    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'timepicker');
    };

    /** Open the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), { modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.open = function () {
        return gj.timepicker.methods.open(this);
    };

    /** Close the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), { modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'timepicker');
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-gj-timepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTimePicker.prototype = new gj.picker.widget();
GijgoTimePicker.constructor = GijgoTimePicker;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.timepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTimePicker(this[0], method);
                } else {
                    $widget = new GijgoTimePicker(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
