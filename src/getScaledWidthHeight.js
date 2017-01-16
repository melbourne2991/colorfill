module.exports = function getScaledWidthHeight(sourceW, sourceH, targetW, targetH) {
	const ratio = sourceW > sourceH ? (targetW / sourceW) : (targetH / sourceH);

	return {
		width: ratio * sourceW,
		height: ratio * sourceH
	}
}