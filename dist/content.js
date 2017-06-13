/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pageCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);




const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
             SCROLL_ENABLED_URL =  chrome.extension.getURL('icons/scroll-enabled.png'),
             SCROLL_DISABLED_URL =  chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

const onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();

    if (options !== null && options['redirectToYTGaming'] === true) {
        setTimeout(__WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].youtubeGaming, 2500);
    }

    __WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].livestreamPage();
};

(function() {

    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* isNode */])(target)) {
        return;
    }

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

chrome.runtime.sendMessage('requestLocalstorage', function(response) {

    options = response;

    if (options['disableAvatars']) {
        $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important; }</style>').appendTo('head');
    }

    if (options['enableChatColors']) {
        const a = chrome.extension.getURL('external/chat-colors.css');
        $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
    }

    if (options['enableSplitChat']) {
        $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
    }

    if(options['showDeletedMessages']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
    }

    if(options['mentionHighlight']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
    }

    onNewPageLoad();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(10);




class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__["a" /* default */])();

        setTimeout(function() {

            const $loading = $('.iptv-loading-emotes');

            if ($loading[0]) {

                $loading.css({
                    'color': '#c0392b',
                    'background-color': '#282828',
                    'right': '19px'
                });

                $loading.text('Failed loading some emotes (API servers down)');
            }

            setTimeout(function() {
                $('.iptv-loading-emotes').remove();
            }, 7.5 * 1000);

        }, 10 * 1000);

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch']) Emote.loadTwitchEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub']) Emote.loadSubEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce']) Emote.loadIceEmotes();

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV']) {
            Emote.loadBTTVEmotes();
            Emote.loadBTTVChannelEmotes();
        }

        Emote.waitTillEmotesLoaded();
    };

    /**
     * setTimeout that keeps running until all emotes are loaded.
     * @static
     */
    static waitTillEmotesLoaded()
    {
        if ((__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            Emote.messages = {};
        }, 1000 * 60 * 5);

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
    };

    /**
     * Replace existing text with emotes in chat, happens when emotes are done loading.
     * @static
     */
    static replaceExistingEmotes()
    {
        const chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

        if (chatElements.length < 1) {
            setTimeout(Emote.replaceExistingEmotes, 250);
            return;
        }

        chatElements.each(function (i, el) {
            Emote.emoteCheck(el);
        });
    };

    /**
     * Checks if a message contains emotes.
     * @static
     * @param {node} node - Message node
     */
    static emoteCheck(node)
    {
        const $message = $(node).find('#message');
        Emote.kappaCheck($message);

        let oldHTML = $message.html().trim();
        let msgHTML = oldHTML;

        if (typeof Emote.messages[msgHTML] == 'undefined') {

            const words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
            const uniqueWords = [];
            let emoteCount = 0;

            $.each(words, function (i, el) {
                if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
            });

            for (let i = 0; i < uniqueWords.length; i++) {

                const word = uniqueWords[i];

                if (typeof Emote.emotes[word] === 'undefined') {
                    continue;
                }

                emoteCount++;

                const span = document.createElement('span');
                span.setAttribute('aria-label', word);
                span.classList.add('hint--top');

                const img = document.createElement('img');
                img.src = Emote.emotes[word]['url'];
                img.alt = word;
                img.style.display = 'inline';
                img.style.width = 'auto';
                img.style.overflow = 'hidden';

                span.appendChild(img);

                msgHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* replaceAll */])(msgHTML, word, span.outerHTML);
            }

            if (emoteCount < 1) return;

            $message.html(msgHTML);
            Emote.messages[oldHTML.replace(/\s/g,'')] = msgHTML;

        } else {
            $message.html(Emote.messages[oldHTML]);
        }

        $message.parent().parent().bind('DOMSubtreeModified', function () {

            const $message = $(this).find('#message');
            Emote.kappaCheck($message);

            let html = $message.html().trim();
            html = html.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').replace(/\s/g,'');

            if (typeof Emote.messages[html] !== 'undefined') {

                if (html == Emote.messages[html]) {
                    return;
                }

                $message.html(Emote.messages[html]);
            }
        });
    };

    /**
     * Checks if a message contains a kappa emote.
     * @static
     * @param {node} msg - Message node
     */
    static kappaCheck(msg)
    {
        $('img', msg).each(function() {

            const $img = $(this);

            if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
                $img.replaceWith(document.createTextNode('Kappa'));
            }
        });
    };

    /**
     * Load Twitch emotes.
     * @static
     */
    static loadTwitchEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/global.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['emotes'];

            for (const emote in emoteDic) {

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
                };
            }

            Emote.states['twitch'].loaded = true;
        }
    };

    /**
     * Load Twitch subscriber emotes.
     * @static
     */
    static loadSubEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/subscriber.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['channels'];

            for (const channel in emoteDic) {

                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];

                    if (Emote.isValidEmote(code)) {
                        Emote.emotes[code] = {
                            url: urlTemplate + dict['image_id'] + '/' + '1.0'
                        };
                    }
                }
            }

            Emote.states['sub'].loaded = true;
        }
    };

    /**
     * Load BTTV emotes.
     * @static
     */
    static loadBTTVEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.betterttv.net/2/emotes');
        xhr.send();
        const urlTemplate = '//cdn.betterttv.net/emote/';

        xhr.ontimeout = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onload = function () {

            const emoteList = JSON.parse(xhr.responseText)['emotes'];

            for (const i in emoteList) {

                const dict = emoteList[i];

                if (!Emote.containsDisallowedChar(dict['code'])) {
                    Emote.emotes[dict['code']] = {
                        url: urlTemplate + dict['id'] + '/' + '1x'
                    };
                }
            }

            Emote.states['BTTV'].loaded = true;
        }
    };

    /**
     * Load BTTV channel emotes.
     * @static
     */
    static loadBTTVChannelEmotes()
    {
        const channels = __WEBPACK_IMPORTED_MODULE_1__main__["options"]['BTTVChannels'];
        const commaChannels = channels.replace(/\s+/g, '').split(',');

        commaChannels.forEach(function (channel) {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
            xhr.send();
            const urlTemplate = '//cdn.betterttv.net/emote/';

            xhr.ontimeout = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }

            xhr.onload = function () {

                const emoteList = JSON.parse(xhr.responseText)['emotes'];

                for (const i in emoteList) {

                    const dict = emoteList[i];

                    if (!Emote.containsDisallowedChar(dict['code'])) {
                        Emote.emotes[dict['code']] = {
                            url: urlTemplate + dict['id'] + '/' + '1x',
                            channel: channel + ' (bttv)'
                        };
                    }
                }

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }
        }, this);
    };

    /**
     * Load Ice's old subscriber emotes.
     * @static
     */
    static loadIceEmotes()
    {
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        const iceEmotes = {
            "purple1": { "image_id": 96873 },
            "purple2": { "image_id": 96874 },
            "purple3": { "image_id": 96875 },
            "purple4": { "image_id": 96876 },
            "purpleArm1": { "image_id": 84687 },
            "purpleArm2": { "image_id": 84533 },
            "purpleBluescreen": { "image_id": 157415 },
            "purpleBruh": { "image_id": 132893 },
            "purpleCigrip": { "image_id": 161828 },
            "purpleCreep": { "image_id": 153620 },
            "purpleCx": { "image_id": 91876 },
            "purpleEnza": { "image_id": 105444 },
            "purpleFake": { "image_id": 91874 },
            "purpleFrank": { "image_id": 76640 },
            "purpleHuh": { "image_id": 133286 },
            "purpleIce": { "image_id": 80215 },
            "purpleKKona": { "image_id": 121771 },
            "purpleM": { "image_id": 121772 },
            "purpleNose": { "image_id": 65152 },
            "purpleOmg": { "image_id": 160462 },
            "purplePride": { "image_id": 62560 },
            "purpleRofl": { "image_id": 121495 },
            "purpleTaco": { "image_id": 132726 },
            "purpleThink": { "image_id": 121770 },
            "purpleW": { "image_id": 70838 },
            "purpleClaus": { "image_id": 132737 },
            "purpleCoolstory": { "image_id": 153621 },
            "purpleDog": { "image_id": 105228 },
            "purpleFro": { "image_id": 86444 },
            "purpleKkona": { "image_id": 121494 },
            "purpleLeo": { "image_id": 73632 },
            "purpleLUL": { "image_id": 126511 },
            "purpleReal": { "image_id": 91873 },
            "purpleThump": { "image_id": 86501 },
            "purpleTongue": { "image_id": 70838 },
            "purpleWalnut": { "image_id": 109084 },
            "purpleWat": { "image_id": 105229 },
            "purpleWut": { "image_id": 133844 }
        };

        for(const emote in iceEmotes) {
            Emote.emotes[emote] = {
                url: urlTemplate + iceEmotes[emote]['image_id'] + '/' + '1.0'
            }
        }
    };

    /**
     * Checks if text is a valid emote
     * @static
     * @param {string} text
     */
    static isValidEmote(text)
    {
        return !(text[0].match(/[A-Z]/g) ||
            text.match(/^[a-z]+$/g) ||
            text.match(/^\d*$/g)
        );
    };

    /**
     * Checks if text contains disallowed characters.
     * @static
     * @param {string} word
     */
    static containsDisallowedChar(word)
    {
        for (const c in __WEBPACK_IMPORTED_MODULE_1__main__["DISALLOWED_CHARS"]) {
            if (word.indexOf(c) > -1) {
                return true;
            }
        }

        return false;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Emote;
;

Emote.states = {
    twitch: {
        loaded: false
    },
    sub: {
        loaded: false
    },
    BTTV: {
        loaded: false
    },
    BTTVChannels: {
        loaded: false,
        loadedCount: 0
    }
};

Emote.emotes = {};
Emote.messages = {};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatObserver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(7);







class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        const iframe = document.getElementById('live-chat-iframe');

        const $textWrapper = $('.yt-user-info');
        const text = $textWrapper.find('a').text();

        const url = document.location.href;

        if (text == 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

            const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

            if (redirectConfirm === true) {
                window.location = 'https://gaming.youtube.com/ice_poseidon/live';
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        const target = document.getElementById('owner');
        const chat = document.getElementById('chat');
        const text = $(target).find('span').text();

        const url = document.location.href;

        if ((!target || !chat) && (!url.includes('live_chat') && !url.includes('is_popout=1'))) {

            PageCheck.streampageChecks++;

            if (PageCheck.streampageChecks < 25) {
                setTimeout(PageCheck.livestreamPage, 250);
            }

            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__chatObserver__["a" /* default */])();
        }

        if(text == 'Ice Poseidon') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__["a" /* default */])();

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__["a" /* default */])();
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mentionHighlight__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkAuthorName__ = __webpack_require__(5);




/**
 * Binds chat mutation observer and listen for new chat messages.
 */
function chatObserver()
{
    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
    const authorname = $('#author #author-name').text().toLowerCase();

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            const newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                const $nodes = $(newNodes);

                $nodes.each(function () {

                    const $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__mentionHighlight__["a" /* default */])($node);
                    __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].emoteCheck($node);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__checkAuthorName__["a" /* default */])($node);
                });
            }
        });
    });

    const options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CheckAuthorLength;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
function CheckAuthorLength(node)
{
    var authorName = $(node).find('#author-name').text();

    /* Temp fix */
    if (authorName === null) {
        return false;
    }

    if (authorName.length > 25) {
        authorName = authorName.substr(0,25) + '...';
        node.find('#author-name').get(0).innerHTML = authorName;
    }
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MentionHighlight;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
function MentionHighlight(node)
{
    const authorname = $('#author #author-name').text().toLowerCase();

    /* Temp fix */
    if (authorname === null) {
        return false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__main__["options"]['mentionHighlight'] && authorname.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id') // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid.length > 30 && (authorname == "ice poseidon" || message.indexOf(' '+authorname+' ') !== -1 || message.indexOf('@'+authorname+' ') !== -1)) { // If your name is in the message, and it's not your message
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


class AlwaysScrollDown
{
    /**
     * Creates 'Always scroll down' overlay and binds the necessary listeners.
     * @constructor
     */
    static init()
    {
        if ($('.iptv-scrolldown-wrapper').length) {
            $('.iptv-scrolldown-wrapper').remove();
        };

        const scrollWrapper = document.createElement('div');

        scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
        scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

        $(scrollWrapper).css({
            'position': 'absolute',
            'right': '113px',
            'bottom': '18px'
        });

        $(scrollWrapper).html(`
            <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
                <img src="${__WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"]}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
            </a>
        `);

        document.body.appendChild(scrollWrapper);

        $(document).on('click', '.iptv-scrolldown-toggle', function() {
            AlwaysScrollDown.toggleScrollDown();
        });

        setInterval(function () {
            if (AlwaysScrollDown.scrollDown === true) {
                $('#item-scroller').scrollTop(999999999);
            }
        }, 100);

        AlwaysScrollDown.hideScrollOnCinema(scrollWrapper);
        AlwaysScrollDown.hideScrollOnSponsorMenu(scrollWrapper);
        AlwaysScrollDown.bindScrollListener();
        AlwaysScrollDown.bindScrollDownListener();
    };

    /**
     * Hides the 'Always scroll down' overlay when cinema mode is open
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnCinema(scrollWrapper)
    {
        const watchPage = 'ytg-watch-page';

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((m) => {
                $(m.target).is('[sidebar-collapsed]') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['sidebar-collapsed']
        }

        const addObserver = setInterval(() => {
            if ($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    };

    /**
     * Hides the 'Always scroll down' overlay when sponsor menu is open.
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnSponsorMenu(scrollWrapper)
    {
        const chatInputRenderer = 'yt-live-chat-message-input-renderer';

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((m) => {
                $(m.target).attr('creator-open') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['creator-open']
        }

        const sponsorClick = setInterval(() => {
            if ($(chatInputRenderer).length) {
                observer.observe($(chatInputRenderer)[0], observerOpts);
                clearInterval(sponsorClick);
            }
        }, 250);
    };

    /**
     * Disables 'Always scroll down' functionality when scrolling manually.
     * @static
     */
    static bindScrollListener()
    {
        const target = document.getElementById('item-scroller');

        if (!target) {
            setTimeout(() => { AlwaysScrollDown.bindScrollListener() }, 250);
            return;
        }

        $('#item-scroller').on('mousewheel DOMMouseScroll', function (event) {
            AlwaysScrollDown.toggleScrollDown(false);
        });

        $('#item-scroller').on('mousedown', function (event) {
            if(event.target === this) {
                AlwaysScrollDown.toggleScrollDown(false);
            }
        });
    };

    /**
     * Enables 'Always scroll down' functionality when blue jump down button is clicked.
     * @static
     */
    static bindScrollDownListener()
    {
        const target = document.getElementById('show-more');

        if (!target) {
            window.setTimeout(() => { AlwaysScrollDown.bindScrollDownListener() }, 250);
            return;
        }

        target.onmousedown = function () {
            AlwaysScrollDown.toggleScrollDown(true);
            return true;
        };
    };

    /**
     * Toggle scrollDown state and adjust overlay accordingly.
     * @static
     */
    static toggleScrollDown(state)
    {
        if (typeof state === 'undefined') {
            AlwaysScrollDown.scrollDown = !AlwaysScrollDown.scrollDown;
        } else {
            AlwaysScrollDown.scrollDown = state;
        }

        $('.iptv-scrolldown-wrapper').attr('aria-label', AlwaysScrollDown.scrollDown ? 'Always scroll down (Enabled)' : 'Always scroll down (Disabled)');
        $('.iptv-scrolldown-toggle-icon').attr('src', AlwaysScrollDown.scrollDown ? __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"] : __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_DISABLED_URL"]);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysScrollDown;
;

AlwaysScrollDown.scrollDown = true;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIfWatchingLive;
/**
 * Checks if user is behind in livestream and warns them.
 */
function checkIfWatchingLive() {

    let liveCheckInterval = null;

    liveCheckInterval = setInterval(function() {

        const $liveButton = $('.ytp-live-badge.ytp-button');

        if ($liveButton.is(':enabled') && $liveButton.is(':visible')) {
            $('#player-container').append(`
                <div class="iptv-live-warning">
                    <div class="iptv-live-warning-text">
                        You\'re watching old footage, click the LIVE button in the bottom left corner to watch live.
                    </div>
                    <div class="iptv-live-warning-dismiss">
                        <a href="javascript:void(0)" class="iptv-live-warning-close">✕</a>
                    </div>
                </div>
            `);
        }
    }, 15 * 1000);

    $(document).on('click', '.iptv-live-warning-close', function() {
        $('.iptv-live-warning').remove();
        clearInterval(liveCheckInterval);
    });

    $(document).on('mousedown', '.ytp-live-badge', function() {
        $('.iptv-live-warning').remove();
    });
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = donateButton;
/**
 * Adds donate button to livestream page.
 */
function donateButton()
{
    $('.iptv-donate-button-0').remove();

    const donateIcon = chrome.extension.getURL('/icons/donate-icon.png');
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');

    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const donateButton = `
        <iptv-donate-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-donate-button-0">
            <iron-signals class="style-scope iptv-donate-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-donate-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="Donate to Ice_Poseidon">
                <div class="layout horizontal center-justified style-scope iptv-donate-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-donate-button">
                        <yt-icon class="style-scope iptv-donate-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-donate-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">DONATE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-donate-button>`;

    const donateImage = `<img src="${donateIcon}" alt="dollar-sign" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    // Insert donateButton next to sponsorButton
    const sponsorButton = '.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0';

    $(sponsorButton).before(donateButton);
    $(donateButton).ready( function() { $('.style-scope.iptv-donate-button.x-scope.yt-icon-0').html(donateImage); });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0').on('click', () => {
        window.open('https://youtube.streamlabs.com/iceposeidon#/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0 paper-button')[0].blur();
    });

    // Change sponsorButton icon to star
    $(`${sponsorButton} .style-scope.ytg-membership-offer-button.x-scope.yt-icon-0`).html(sponsorImage);
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadingEmotesInfo;
/**
 * Show emote loading information.
 */
function loadingEmotesInfo()
{
    const div = document.createElement('div');

    $(div).text('Loading emotes...');

    $(div).css({
        'font-size': '16px',
        'position': 'absolute',
        'right': '25px',
        'bottom': '75px',
        'color': '#fff',
        'text-shadow': '2px 2px 2px rgba(0,0,0,0.75)'
    });

    $(div).addClass('iptv-loading-emotes');

    document.body.appendChild(div);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2MwMGI1NDc0YjNmMWVkYmQ5NjIiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tBdXRob3JOYW1lLmpzIiwid2VicGFjazovLy8uL21lbnRpb25IaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ2lCOztBQUVqQjtBQUNBO0FBQ0EseUY7Ozs7QUFBQTtBQUFBO0FBQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixzREFBc0Q7QUFDcEYsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBLCtGQUErRixZQUFZLGFBQWEsbUJBQW1CLG9CQUFvQixFQUFFLCtEQUErRCwwQkFBMEIsRUFBRSwwREFBMEQsMEJBQTBCLEVBQUU7QUFDbFY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRkFBbUYsaUNBQWlDLG9DQUFvQyxFQUFFO0FBQzFKOztBQUVBO0FBQ0Esc0pBQXNKLGlCQUFpQiwwRkFBMEYsa0NBQWtDLEVBQUUscUhBQXFILGtDQUFrQyxFQUFFLDZEQUE2RCxjQUFjO0FBQ3pnQjs7QUFFQTtBQUNBLHFIQUFxSCxtREFBbUQsNkJBQTZCLEVBQUU7QUFDdk07O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQ2hFb0I7QUFDZTtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWIsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYiwyQkFBMkIsd0JBQXdCOztBQUVuRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsMkJBQTJCLG9CQUFvQjtBQUMvQywyQkFBMkIsb0JBQW9CO0FBQy9DLGlDQUFpQyxxQkFBcUI7QUFDdEQsMkJBQTJCLHFCQUFxQjtBQUNoRCw2QkFBNkIscUJBQXFCO0FBQ2xELDRCQUE0QixxQkFBcUI7QUFDakQseUJBQXlCLG9CQUFvQjtBQUM3QywyQkFBMkIscUJBQXFCO0FBQ2hELDJCQUEyQixvQkFBb0I7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQixvQkFBb0I7QUFDOUMsNEJBQTRCLHFCQUFxQjtBQUNqRCx3QkFBd0IscUJBQXFCO0FBQzdDLDJCQUEyQixvQkFBb0I7QUFDL0MsMEJBQTBCLHFCQUFxQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDJCQUEyQixxQkFBcUI7QUFDaEQsMkJBQTJCLHFCQUFxQjtBQUNoRCw0QkFBNEIscUJBQXFCO0FBQ2pELHdCQUF3QixvQkFBb0I7QUFDNUMsNEJBQTRCLHFCQUFxQjtBQUNqRCxnQ0FBZ0MscUJBQXFCO0FBQ3JELDBCQUEwQixxQkFBcUI7QUFDL0MsMEJBQTBCLG9CQUFvQjtBQUM5Qyw0QkFBNEIscUJBQXFCO0FBQ2pELDBCQUEwQixvQkFBb0I7QUFDOUMsMEJBQTBCLHFCQUFxQjtBQUMvQywyQkFBMkIsb0JBQW9CO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsNkJBQTZCLG9CQUFvQjtBQUNqRCw2QkFBNkIscUJBQXFCO0FBQ2xELDBCQUEwQixxQkFBcUI7QUFDL0MsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDdGJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ2tCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRGtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuQmtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpS0FBaUs7QUFDaks7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekJrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLDBGQUEwRjtBQUMxRiw0QkFBNEIsMERBQW1CO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsNENBQTRDO0FBQ2pGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7OztBQzNLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ2pDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNDQUFzQyxZQUFZLHlDQUF5QyxnQkFBZ0IsYUFBYSxjQUFjOztBQUV0STtBQUNBLHlEQUF5RCxnREFBZ0QsYUFBYTtBQUN0SDtBQUNBLDZDQUE2QywyQkFBMkIsY0FBYztBQUN0RjtBQUNBLDRDQUE0QyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxXQUFXLGdEQUFnRCxnQkFBZ0IsYUFBYSxjQUFjOztBQUUzSTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLDBFQUEwRSxFQUFFOztBQUVuSDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsU0FBUyxjQUFjO0FBQ3ZCOzs7Ozs7OztBQ3pDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYzAwYjU0NzRiM2YxZWRiZDk2MiIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XHJcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vdXRpbCc7XHJcblxyXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcclxuICAgICAgICAgICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWVuYWJsZWQucG5nJyksXHJcbiAgICAgICAgICAgICBTQ1JPTExfRElTQUJMRURfVVJMID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZGlzYWJsZWQucG5nJyk7XHJcblxyXG5leHBvcnQgbGV0IG9wdGlvbnMgPSBudWxsO1xyXG5cclxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICQoJ1tjbGFzc149XCJpcHR2LVwiXScpLnJlbW92ZSgpO1xyXG5cclxuICAgIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnNbJ3JlZGlyZWN0VG9ZVEdhbWluZyddID09PSB0cnVlKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2sueW91dHViZUdhbWluZywgMjUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlKCk7XHJcbn07XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xyXG4gICAgICAgICAgICBvbk5ld1BhZ2VMb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7IHN1YnRyZWU6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcclxufSgpKTtcclxuXHJcbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0TG9jYWxzdG9yYWdlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHJcbiAgICBvcHRpb25zID0gcmVzcG9uc2U7XHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ2Rpc2FibGVBdmF0YXJzJ10pIHtcclxuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyICNhdXRob3ItcGhvdG8geyB3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgbWFyZ2luLXJpZ2h0OiAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgfS5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci5uby10cmFuc2l0aW9ueyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIgI2F2YXRhciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uc1snZW5hYmxlQ2hhdENvbG9ycyddKSB7XHJcbiAgICAgICAgY29uc3QgYSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdleHRlcm5hbC9jaGF0LWNvbG9ycy5jc3MnKTtcclxuICAgICAgICAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBhICsgJ1wiID4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zWydlbmFibGVTcGxpdENoYXQnXSkge1xyXG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJvcmRlci10b3A6IDAuNXB4IHNvbGlkICMzMzMzMzM7IGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICMwMDAwMDA7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYob3B0aW9uc1snc2hvd0RlbGV0ZWRNZXNzYWdlcyddKSB7XHJcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7ZGlzcGxheTogaW5saW5lO30gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZTpiZWZvcmV7Y29udGVudDogXCIgIFwifTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihvcHRpb25zWydtZW50aW9uSGlnaGxpZ2h0J10pIHtcclxuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAubWVudGlvbi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTQsIDE1LCAxNSwgMCkgIWltcG9ydGFudDsgcGFkZGluZzogMHB4IDBweCAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV3UGFnZUxvYWQoKTtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByZXBsYWNlQWxsIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgb3B0aW9ucywgRElTQUxMT1dFRF9DSEFSUyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBsb2FkaW5nRW1vdGVzSW5mbyBmcm9tICcuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1vdGVcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGFsbCBlbmFibGVkIGVtb3Rlcy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgbG9hZGluZ0Vtb3Rlc0luZm8oKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRsb2FkaW5nID0gJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkbG9hZGluZ1swXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRsb2FkaW5nLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJzogJyNjMDM5MmInLFxyXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMyODI4MjgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcxOXB4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcudGV4dCgnRmFpbGVkIGxvYWRpbmcgc29tZSBlbW90ZXMgKEFQSSBzZXJ2ZXJzIGRvd24pJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCA3LjUgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgfSwgMTAgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc1R3aXRjaCddKSBFbW90ZS5sb2FkVHdpdGNoRW1vdGVzKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc0ljZSddKSBFbW90ZS5sb2FkSWNlRW1vdGVzKCk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNCVFRWJ10pIHtcclxuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZFbW90ZXMoKTtcclxuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZDaGFubmVsRW1vdGVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldFRpbWVvdXQgdGhhdCBrZWVwcyBydW5uaW5nIHVudGlsIGFsbCBlbW90ZXMgYXJlIGxvYWRlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHdhaXRUaWxsRW1vdGVzTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICBpZiAoKG9wdGlvbnNbJ2Vtb3Rlc1R3aXRjaCddICE9PSBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKG9wdGlvbnNbJ2Vtb3Rlc1N1YiddICE9PSBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCkpIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoRW1vdGUud2FpdFRpbGxFbW90ZXNMb2FkZWQsIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRlbXAgZml4IHRvIHByZXZlbnQgcmFtIGZyb20gZmlsbGluZyB1cCB3aXRoIG1lc3NhZ2VzLlxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgRW1vdGUubWVzc2FnZXMgPSB7fTtcclxuICAgICAgICB9LCAxMDAwICogNjAgKiA1KTtcclxuXHJcbiAgICAgICAgJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKS5yZW1vdmUoKTtcclxuICAgICAgICBFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIHRleHQgd2l0aCBlbW90ZXMgaW4gY2hhdCwgaGFwcGVucyB3aGVuIGVtb3RlcyBhcmUgZG9uZSBsb2FkaW5nLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0RWxlbWVudHMgPSAkKCcuc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlci54LXNjb3BlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCcpO1xyXG5cclxuICAgICAgICBpZiAoY2hhdEVsZW1lbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMsIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXRFbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZW1vdGVDaGVjayhub2RlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJChub2RlKS5maW5kKCcjbWVzc2FnZScpO1xyXG4gICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBsZXQgb2xkSFRNTCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgbGV0IG1zZ0hUTUwgPSBvbGRIVE1MO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIEVtb3RlLm1lc3NhZ2VzW21zZ0hUTUxdID09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3b3JkcyA9IG1zZ0hUTUwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVdvcmRzID0gW107XHJcbiAgICAgICAgICAgIGxldCBlbW90ZUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaCh3b3JkcywgZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGVsLCB1bmlxdWVXb3JkcykgPT09IC0xKSB1bmlxdWVXb3Jkcy5wdXNoKGVsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuaXF1ZVdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZCA9IHVuaXF1ZVdvcmRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUuZW1vdGVzW3dvcmRdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVtb3RlQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB3b3JkKTtcclxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gRW1vdGUuZW1vdGVzW3dvcmRdWyd1cmwnXTtcclxuICAgICAgICAgICAgICAgIGltZy5hbHQgPSB3b3JkO1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgICAgIGltZy5zdHlsZS53aWR0aCA9ICdhdXRvJztcclxuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoaW1nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtc2dIVE1MID0gcmVwbGFjZUFsbChtc2dIVE1MLCB3b3JkLCBzcGFuLm91dGVySFRNTCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChtc2dIVE1MKTtcclxuICAgICAgICAgICAgRW1vdGUubWVzc2FnZXNbb2xkSFRNTC5yZXBsYWNlKC9cXHMvZywnJyldID0gbXNnSFRNTDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChFbW90ZS5tZXNzYWdlc1tvbGRIVE1MXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQodGhpcykuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5yZXBsYWNlKC9cXHMvZywnJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLm1lc3NhZ2VzW2h0bWxdICE9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChodG1sID09IEVtb3RlLm1lc3NhZ2VzW2h0bWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRtZXNzYWdlLmh0bWwoRW1vdGUubWVzc2FnZXNbaHRtbF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBhIGthcHBhIGVtb3RlLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBtc2cgLSBNZXNzYWdlIG5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGthcHBhQ2hlY2sobXNnKVxyXG4gICAge1xyXG4gICAgICAgICQoJ2ltZycsIG1zZykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRpbWcgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKC9cXHVkODNjXFx1ZGYxZC9nLnRlc3QoJGltZy5hdHRyKCdhbHQnKSkpIHtcclxuICAgICAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0thcHBhJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBUd2l0Y2ggZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZFR3aXRjaEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL2dsb2JhbC5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW1vdGUgaW4gZW1vdGVEaWMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZW1vdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBlbW90ZURpY1tlbW90ZV1bJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIFR3aXRjaCBzdWJzY3JpYmVyIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRTdWJFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9zdWJzY3JpYmVyLmpzb24nKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2NoYW5uZWxzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5uZWwgaW4gZW1vdGVEaWMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ11baV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRpY3RbJ2NvZGUnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVtb3RlLmlzVmFsaWRFbW90ZShjb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkQlRUVkVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvZW1vdGVzJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCdcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIEJUVFYgY2hhbm5lbCBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkQlRUVkNoYW5uZWxFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0gb3B0aW9uc1snQlRUVkNoYW5uZWxzJ107XHJcbiAgICAgICAgY29uc3QgY29tbWFDaGFubmVscyA9IGNoYW5uZWxzLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XHJcblxyXG4gICAgICAgIGNvbW1hQ2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbm5lbCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2NoYW5uZWxzLycgKyBjaGFubmVsKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xyXG5cclxuICAgICAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjb21tYUNoYW5uZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCArICcgKGJ0dHYpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY29tbWFDaGFubmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIEljZSdzIG9sZCBzdWJzY3JpYmVyIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRJY2VFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIGNvbnN0IGljZUVtb3RlcyA9IHtcclxuICAgICAgICAgICAgXCJwdXJwbGUxXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3MyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZTJcIjogeyBcImltYWdlX2lkXCI6IDk2ODc0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlM1wiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGU0XCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUFybTFcIjogeyBcImltYWdlX2lkXCI6IDg0Njg3IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQXJtMlwiOiB7IFwiaW1hZ2VfaWRcIjogODQ1MzMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVCbHVlc2NyZWVuXCI6IHsgXCJpbWFnZV9pZFwiOiAxNTc0MTUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVCcnVoXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI4OTMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDaWdyaXBcIjogeyBcImltYWdlX2lkXCI6IDE2MTgyOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNyZWVwXCI6IHsgXCJpbWFnZV9pZFwiOiAxNTM2MjAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDeFwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVFbnphXCI6IHsgXCJpbWFnZV9pZFwiOiAxMDU0NDQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVGYWtlXCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUZyYW5rXCI6IHsgXCJpbWFnZV9pZFwiOiA3NjY0MCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUh1aFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMzMjg2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlSWNlXCI6IHsgXCJpbWFnZV9pZFwiOiA4MDIxNSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUtLb25hXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVNXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVOb3NlXCI6IHsgXCJpbWFnZV9pZFwiOiA2NTE1MiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZU9tZ1wiOiB7IFwiaW1hZ2VfaWRcIjogMTYwNDYyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlUHJpZGVcIjogeyBcImltYWdlX2lkXCI6IDYyNTYwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlUm9mbFwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNDk1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlVGFjb1wiOiB7IFwiaW1hZ2VfaWRcIjogMTMyNzI2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlVGhpbmtcIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVdcIjogeyBcImltYWdlX2lkXCI6IDcwODM4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ2xhdXNcIjogeyBcImltYWdlX2lkXCI6IDEzMjczNyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNvb2xzdG9yeVwiOiB7IFwiaW1hZ2VfaWRcIjogMTUzNjIxIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRG9nXCI6IHsgXCJpbWFnZV9pZFwiOiAxMDUyMjggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVGcm9cIjogeyBcImltYWdlX2lkXCI6IDg2NDQ0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlS2tvbmFcIjogeyBcImltYWdlX2lkXCI6IDEyMTQ5NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUxlb1wiOiB7IFwiaW1hZ2VfaWRcIjogNzM2MzIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVMVUxcIjogeyBcImltYWdlX2lkXCI6IDEyNjUxMSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVJlYWxcIjogeyBcImltYWdlX2lkXCI6IDkxODczIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlVGh1bXBcIjogeyBcImltYWdlX2lkXCI6IDg2NTAxIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlVG9uZ3VlXCI6IHsgXCJpbWFnZV9pZFwiOiA3MDgzOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVdhbG51dFwiOiB7IFwiaW1hZ2VfaWRcIjogMTA5MDg0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV2F0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMDUyMjkgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXdXRcIjogeyBcImltYWdlX2lkXCI6IDEzMzg0NCB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IGVtb3RlIGluIGljZUVtb3Rlcykge1xyXG4gICAgICAgICAgICBFbW90ZS5lbW90ZXNbZW1vdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGljZUVtb3Rlc1tlbW90ZV1bJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGlzIGEgdmFsaWQgZW1vdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc1ZhbGlkRW1vdGUodGV4dClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0ZXh0WzBdLm1hdGNoKC9bQS1aXS9nKSB8fFxyXG4gICAgICAgICAgICB0ZXh0Lm1hdGNoKC9eW2Etel0rJC9nKSB8fFxyXG4gICAgICAgICAgICB0ZXh0Lm1hdGNoKC9eXFxkKiQvZylcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGNvbnRhaW5zIGRpc2FsbG93ZWQgY2hhcmFjdGVycy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3b3JkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb250YWluc0Rpc2FsbG93ZWRDaGFyKHdvcmQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjIGluIERJU0FMTE9XRURfQ0hBUlMpIHtcclxuICAgICAgICAgICAgaWYgKHdvcmQuaW5kZXhPZihjKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVtb3RlLnN0YXRlcyA9IHtcclxuICAgIHR3aXRjaDoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBzdWI6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgQlRUVjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWQ2hhbm5lbHM6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgIGxvYWRlZENvdW50OiAwXHJcbiAgICB9XHJcbn07XHJcblxyXG5FbW90ZS5lbW90ZXMgPSB7fTtcclxuRW1vdGUubWVzc2FnZXMgPSB7fTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9lbW90ZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbChzdHIsIGZpbmQsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZpbmQsICdnJyksIHJlcGxhY2UpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZShvKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIHR5cGVvZiBOb2RlID09PSAnb2JqZWN0JyA/IG8gaW5zdGFuY2VvZiBOb2RlIDogbyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG8ubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSAnc3RyaW5nJ1xyXG4gICAgKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xyXG5pbXBvcnQgZG9uYXRlQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9kb25hdGVCdXR0b24nO1xyXG5pbXBvcnQgY2hlY2tJZldhdGNoaW5nTGl2ZSBmcm9tICcuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZSc7XHJcbmltcG9ydCBBbHdheXNTY3JvbGxEb3duIGZyb20gJy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VDaGVja1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGZyb20gd3JvbmcgbGl2ZXN0cmVhbSBwYWdlIGFuZCB3YXJucyB0aGVtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgeW91dHViZUdhbWluZygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtY2hhdC1pZnJhbWUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkdGV4dFdyYXBwZXIuZmluZCgnYScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKHRleHQgPT0gJ0ljZSBQb3NlaWRvbicgJiYgIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSAmJiBpZnJhbWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0Q29uZmlybSA9IGNvbmZpcm0oJ1tJY2UgUG9zZWlkb25UVl0gR28gdG8gdGhlIG9mZmljaWFsIEljZSBQb3NlaWRvbiBsaXZlc3RyZWFtIHBhZ2U/Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVkaXJlY3RDb25maXJtID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnaHR0cHM6Ly9nYW1pbmcueW91dHViZS5jb20vaWNlX3Bvc2VpZG9uL2xpdmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGEgbGl2ZXN0cmVhbSBvbiBZb3V0dWJlIGdhbWluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpdmVzdHJlYW1QYWdlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3duZXInKTtcclxuICAgICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gJCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS50ZXh0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIGlmICgoIXRhcmdldCB8fCAhY2hhdCkgJiYgKCF1cmwuaW5jbHVkZXMoJ2xpdmVfY2hhdCcpICYmICF1cmwuaW5jbHVkZXMoJ2lzX3BvcG91dD0xJykpKSB7XHJcblxyXG4gICAgICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcysrO1xyXG5cclxuICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgMjUpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlLCAyNTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzU3ViJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzQlRUViddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2Vtb3Rlc0ljZSddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIENoYXRPYnNlcnZlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGV4dCA9PSAnSWNlIFBvc2VpZG9uJykgZG9uYXRlQnV0dG9uKCk7XHJcblxyXG4gICAgICAgIEVtb3RlLmxvYWRFbW90ZXMoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmluaXQoKTtcclxuICAgICAgICBjaGVja0lmV2F0Y2hpbmdMaXZlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhZ2VDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgTWVudGlvbkhpZ2hsaWdodCBmcm9tICcuL21lbnRpb25IaWdobGlnaHQnO1xuaW1wb3J0IENoZWNrQXV0aG9yTGVuZ3RoIGZyb20gJy4vY2hlY2tBdXRob3JOYW1lJztcblxuLyoqXG4gKiBCaW5kcyBjaGF0IG11dGF0aW9uIG9ic2VydmVyIGFuZCBsaXN0ZW4gZm9yIG5ldyBjaGF0IG1lc3NhZ2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGF0T2JzZXJ2ZXIoKVxue1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xuICAgIGNvbnN0IGF1dGhvcm5hbWUgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgc2V0VGltZW91dChjaGF0T2JzZXJ2ZXIsIDI1MCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcblxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcblxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xuXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlcyA9ICQobmV3Tm9kZXMpO1xuXG4gICAgICAgICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoISRub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKCRub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tBdXRob3JMZW5ndGgoJG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tBdXRob3JMZW5ndGgobm9kZSlcbntcbiAgICB2YXIgYXV0aG9yTmFtZSA9ICQobm9kZSkuZmluZCgnI2F1dGhvci1uYW1lJykudGV4dCgpO1xuXG4gICAgLyogVGVtcCBmaXggKi9cbiAgICBpZiAoYXV0aG9yTmFtZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGF1dGhvck5hbWUubGVuZ3RoID4gMjUpIHtcbiAgICAgICAgYXV0aG9yTmFtZSA9IGF1dGhvck5hbWUuc3Vic3RyKDAsMjUpICsgJy4uLic7XG4gICAgICAgIG5vZGUuZmluZCgnI2F1dGhvci1uYW1lJykuZ2V0KDApLmlubmVySFRNTCA9IGF1dGhvck5hbWU7XG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hlY2tBdXRob3JOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICcuL21haW4nO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgbWVudGlvbiBhbmQgY2hhbmdlcyBiYWNrZ3JvdW5kIHRvIEJUVFYgc3R5bGUgYmFja2dyb3VuZC5cclxuICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZW50aW9uSGlnaGxpZ2h0KG5vZGUpXHJcbntcclxuICAgIGNvbnN0IGF1dGhvcm5hbWUgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8qIFRlbXAgZml4ICovXHJcbiAgICBpZiAoYXV0aG9ybmFtZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uc1snbWVudGlvbkhpZ2hsaWdodCddICYmIGF1dGhvcm5hbWUubGVuZ3RoID4gMiAmJiAhbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWxlZ2FjeS1wYWlkLW1lc3NhZ2UtcmVuZGVyZXItMCcpKSB7IC8vIENoZWNrIGl0J3Mgbm90IHNwb25zb3IgLyBzdXBlcmNoYXQsIGFsc28gbWVudGlvbkhpZ2hsaWdodCBlbmFibGVkXHJcblxyXG4gICAgICAgIGNvbnN0IHVuaXF1ZWlkID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdpZCcpIC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZC5sZW5ndGggPiAzMCAmJiAoYXV0aG9ybmFtZSA9PSBcImljZSBwb3NlaWRvblwiIHx8IG1lc3NhZ2UuaW5kZXhPZignICcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZVxyXG4gICAgICAgICAgICBub2RlLmdldCgwKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDAsMCwwLjQwKVwiO1xyXG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcclxuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXHJcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhZGRPYnNlcnZlciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQod2F0Y2hQYWdlKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJCh3YXRjaFBhZ2UpWzBdLCBvYnNlcnZlck9wdHMpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhZGRPYnNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gc3BvbnNvciBtZW51IGlzIG9wZW4uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhdElucHV0UmVuZGVyZXIgPSAneXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXInO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmF0dHIoJ2NyZWF0b3Itb3BlbicpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY3JlYXRvci1vcGVuJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwb25zb3JDbGljayA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoY2hhdElucHV0UmVuZGVyZXIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKGNoYXRJbnB1dFJlbmRlcmVyKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3BvbnNvckNsaWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIHNjcm9sbGluZyBtYW51YWxseS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxMaXN0ZW5lcigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW0tc2Nyb2xsZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5vbignbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gYmx1ZSBqdW1wIGRvd24gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsRG93bkxpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykuYXR0cignYXJpYS1sYWJlbCcsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/ICdBbHdheXMgc2Nyb2xsIGRvd24gKEVuYWJsZWQpJyA6ICdBbHdheXMgc2Nyb2xsIGRvd24gKERpc2FibGVkKScpO1xyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTUgKiAxMDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBBZGRzIGRvbmF0ZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9uYXRlQnV0dG9uKClcclxue1xyXG4gICAgJCgnLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZG9uYXRlLWljb24ucG5nJyk7XHJcbiAgICBjb25zdCBzcG9uc29ySWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvc3BvbnNvci1pY29uLnBuZycpO1xyXG5cclxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlQnV0dG9uID0gYFxyXG4gICAgICAgIDxpcHR2LWRvbmF0ZS1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj48L2lyb24tc2lnbmFscz5cclxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJEb25hdGUgdG8gSWNlX1Bvc2VpZG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+RE9OQVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1kb25hdGUtYnV0dG9uPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSW1hZ2UgPSBgPGltZyBzcmM9XCIke2RvbmF0ZUljb259XCIgYWx0PVwiZG9sbGFyLXNpZ25cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIC8vIEluc2VydCBkb25hdGVCdXR0b24gbmV4dCB0byBzcG9uc29yQnV0dG9uXHJcbiAgICBjb25zdCBzcG9uc29yQnV0dG9uID0gJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnO1xyXG5cclxuICAgICQoc3BvbnNvckJ1dHRvbikuYmVmb3JlKGRvbmF0ZUJ1dHRvbik7XHJcbiAgICAkKGRvbmF0ZUJ1dHRvbikucmVhZHkoIGZ1bmN0aW9uKCkgeyAkKCcuc3R5bGUtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wJykuaHRtbChkb25hdGVJbWFnZSk7IH0pO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8veW91dHViZS5zdHJlYW1sYWJzLmNvbS9pY2Vwb3NlaWRvbiMvJywgJ19ibGFuaycpO1xyXG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHNwb25zb3JCdXR0b24gaWNvbiB0byBzdGFyXHJcbiAgICAkKGAke3Nwb25zb3JCdXR0b259IC5zdHlsZS1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24ueC1zY29wZS55dC1pY29uLTBgKS5odG1sKHNwb25zb3JJbWFnZSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9kb25hdGVCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9