import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const env = loadEnv('', path.resolve(__dirname, '../'));

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
    build: {
        outDir: '../../lifts/monolith.staticfiles',
    },
    define: {
        'process.env.VITE_API_URL': env.VITE_API_URL,
    }
})