import { render } from './tweak/index.js'

export const mount = (doodle, canvas, configContainer) => {
	const ctx = canvas.getContext('2d')	

	const resizeCanvas = () => {
		canvas.width = canvas.parentElement.offsetWidth
		canvas.height = canvas.parentElement.offsetHeight
	}
	resizeCanvas()
	window.addEventListener('resize', resizeCanvas)

	let config
	render(doodle.config(), configContainer, (nextConfig) => {
		config = nextConfig

		doodle.setup && doodle.setup({
			config,
			canvas,
			ctx,
		})

		const loop = () => {
			if (config !== nextConfig) return;

			doodle.draw({
				config,
				canvas,
				ctx
			})
			requestAnimationFrame(loop)
		}
		loop()
	})
}

