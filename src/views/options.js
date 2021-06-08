(function(global) { 'use strict'; define(async ({ // This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
	'module!node_modules/web-ext-utils/browser/': { manifest, },
	'node_modules/web-ext-utils/options/editor/inline': Inline,
	'module!node_modules/web-ext-utils/utils/notify': notify,
	'module!../background/': { TST, },
}) => async (/**@type{Window}*/window, location) => { const { document, } = window;

document.head.insertAdjacentHTML('beforeend', String.raw`<style>

	#\.panel\.placeholder input { max-width: 150px; }
	#\.search\.fieldsPrefix input { max-width: 250px; }

	/* remove one level of indention */
	.pref-name-result .pref-name-styles .pref-children {
		border: none; padding: 0; margin: 0;
	}

	#\.advanced\.hideHeader .value-suffix { color: darkred; }
</style>`);

async function onCommand({ name, }, _buttonId) { try { switch (name) {
	case 'register': { try {
		(await TST.register()); notify.info('Registered', `${manifest.name} should now work!`);
	} catch (error) {
		notify.error('TST Registration Failed', `Are you sure Tree Style Tabs is installed and enabled?\nThis extension won't do anything without that.`);
	} } break;
} } catch (error) { notify.error(error); } }

(await Inline({ document, onCommand, }, location));

}); })(this);
