/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const landingController = () => import('#controllers/landings_controller')
const ulasanController = () => import('#controllers/ulasans_controller')
const homeController = () => import('#controllers/home_controller')
const chatboxController = () => import('#controllers/chatboxes_controller')
const contactController = () => import('#controllers/contacts_controller')
const authController = () => import('#controllers/auth_controller')
const aboutController = () => import('#controllers/about_controller')
const genimagesController = () => import('#controllers/genimages_controller')


router.get('/', [landingController, 'index']).as('landing.index')
router.get('/home', [homeController, 'index']).as('home.index')
router.get('/auth', [authController,'index']).as('auth.index')
router.get('/chat', [chatboxController, 'index']).as('chat.index')
router.get('/contact', [contactController,'index']).as('contact.index')
router.get('/about', [aboutController, 'index']).as('about.index')
router.get('/ulasan', [ulasanController, 'index']).as('ulasan.index')
router.get('/logout', [authController,'logout']).as('auth.logout')

router.post('/register',[authController, 'register']).as('auth.register')
router.post('/login', [authController,'login']).as('auth.login')
router.post('/process', [chatboxController, 'proses'])
// router.post('/genimage', [genimagesController, 'generateImage'])


