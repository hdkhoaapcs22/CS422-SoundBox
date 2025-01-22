import artistSound from './artistSound.js';   

const adminRoutes = (app) => {
    app.use('/api/admin', artistSound);
}

export default adminRoutes;