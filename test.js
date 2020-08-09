import { mount, tweak } from './lib.js'

const TAU = 2 * Math.PI

const doodle = {
	config: () => tweak.describe('Modify the config: the doodle will react!', tweak.field({
		rows: 18,
		cols: 12,
		size: 30,

		color: tweak.union({
			polar: tweak.field({ angle: 0, magnitude: 1 }),
			cartesian: tweak.field({x: 1, y: 0}),
		}),

		phases: [
			{
				size: 0.4,
				period:10,
				x: 17,
				y: 10,
			},
			{
				size: 0.2,
				period: 7,
				x: 0,
				y: 11,
			},
			{
				size: 0.6,
				period: -19,
				x: 0,
				y: 13,
			},
		],
	})),

	setup: ({ config, canvas, ctx }) => {
		canvas.style.background = '#eee'
	},

	draw: ({ config, ctx, canvas }) => {
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.translate(canvas.width / 2, canvas.height / 2)

		ctx.globalAlpha = 0.1
		ctx.fillStyle = '#022'

		ctx.save()

		ctx.scale(config.size, config.size)
		ctx.translate(-(config.cols - 1) / 2, -(config.rows - 1) / 2)

		for (let i = 0; i < config.rows; i++) {
			for (let j = 0; j < config.cols; j++) {
				let rad = 0
				for (const { size, period, x, y } of config.phases) {
					const freq = period && (1 / period)
					const ifreq = y && (1 / y)
					const jfreq = x && (1 / x)
					rad += size * (Math.sin(
						Date.now() * TAU / 1000 * freq
						+ j * TAU * jfreq
						+ i * TAU * ifreq
					) + 1) * 0.5
				}

				ctx.beginPath()
				ctx.rect(j - rad, i - rad, rad * 2, rad * 2)
				ctx.fill()
			}
		}

		ctx.restore()
	},
}

mount(doodle, document.querySelector('canvas'), document.querySelector('#config-container'))

