import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
    hmr: {
      port: 443,
    },
    proxy: {
      '/api': {
        target: 'https://Final-Project-AJAX-Server-WatchWeb.ecs162instruct.repl.co',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },

}
