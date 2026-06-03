export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'bundle.js',
                chunkFileNames: 'bundle.js',
                assetFileNames: 'security_service.css'
            }
        }
    },
    // Оптимизация зависимостей
    optimizeDeps: {
        include: ['three']
    }
}
