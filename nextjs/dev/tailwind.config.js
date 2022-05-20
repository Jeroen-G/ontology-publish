module.exports = {
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    a: {
                        textDecoration: 'none',
                        fontWeight: 600,
                        borderBottomWidth: '4px',
                        borderColor: theme('colors.yellow.300'),
                    },
                    blockquote: {
                        borderLeftColor: theme('colors.yellow.300'),
                        'p:first-of-type::before': {
                            content: 'none !important',
                        },
                    },
                    code: {
                        color: theme('colors.gray.600'),
                        backgroundColor: theme('colors.gray.100'),
                    }
                },
            },
        }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}
