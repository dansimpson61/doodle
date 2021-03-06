import * as tweak from '../tweak/lib.js'

export const mount = (doodle, canvas, configContainer) => {
	const ctx = canvas.getContext('2d')	

	const resizeCanvas = () => {
		canvas.width = canvas.parentElement.offsetWidth
		canvas.height = canvas.parentElement.offsetHeight
	}
	resizeCanvas()
	window.addEventListener('resize', resizeCanvas)

	let config
	tweak.render(tweak.field(doodle.config()), configContainer, (nextConfig) => {
		config = nextConfig

		const doodleParams = () => ({ config, canvas, ctx })

		// For now, call setup on every config change
		if (doodle.setup) doodle.setup(doodleParams())

		if (doodle.draw) {
			const loop = () => {
				if (config !== nextConfig) return;
				doodle.draw(doodleParams())
				requestAnimationFrame(loop)
			}
			loop()
		}
	})
}

