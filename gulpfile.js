const { src, dest } = require('gulp');

function buildIcons() {
	return src('nodes/**/*.{svg,ico}').pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;