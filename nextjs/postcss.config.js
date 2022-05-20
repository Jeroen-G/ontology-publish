module.exports = {
    plugins: {
        tailwindcss: { config: './dev/tailwind.config.js' },
        autoprefixer: {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'custom-properties': false,
            },
        },
    },
}
