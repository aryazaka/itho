/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const homeController = () => import('#controllers/home_controller')
const loginController = () => import('#controllers/login_controller')
const chatboxController = () => import('#controllers/chatboxes_controller')
const contactController = () => import('#controllers/contacts_controller')

router.get('/', [homeController, 'index']).as('home.index')
router.get('/login', [loginController, 'index']).as('login.index')
router.get('/chat', [chatboxController, 'index']).as('chat.index')
router.get('/contact', [contactController,'index']).as('contact.index')

router.post('/process', [chatboxController, 'proses'])
