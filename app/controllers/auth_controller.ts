import { Redirect, type HttpContext } from '@adonisjs/core/http'
import {schema, rules} from '@adonisjs/validator'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { isLength } from 'validator'

export default class AuthController {

    async index({view} : HttpContext){
        return view.render('auth/index',{
            title: 'Authentication',
        })
    }

    async register({request, response, session} : HttpContext){
        const {usernameRegister, emailRegister, passwordRegister} = request.all()

          try {
            // Cek keunikan username dan email
            const existingUser = await User.query()
              .where('username', usernameRegister)
              .orWhere('email', emailRegister)
              .first()
        
            if (existingUser) {
            session.flash({failed: 'Username atau email sudah digunakan!'})
              return response.redirect('back')
            }
            
            const user = await User.create({
            username : usernameRegister,
            email : emailRegister,
            password : await hash.make(passwordRegister)
            })

            session.flash({success : 'Registrasi Berhasil!'})

            const token = await User.accessTokens.create(user)

            return response.redirect('back')
            
        }catch (error) {
            console.error(error) // Log kesalahan ke console
            session.flash({ error: "Error saat registrasi!" })
            return response.redirect('back') // Kembali ke halaman sebelumnya
        }   
    }   

    async login({auth, request, response, session} : HttpContext){
        const {usernameLogin, passwordLogin} = request.all()

        const user = await User.findBy('username', usernameLogin)

        if (!user) {
            session.flash({failedUser: "User tidak valid!"})
            return response.redirect('back')
        }

        const isPasswordValid = await hash.verify(user?.password!, passwordLogin)

        if (!isPasswordValid){
            session.flash({failedPassword: "Password salah!"})
            return response.redirect('back')
        }

        session.put('username', user.username!);

        return response.redirect('/home')
    }

    async logout({ session, response }: HttpContext) {
        session.clear(); // Hapus semua data session
        return response.redirect('/auth'); // Redirect ke halaman login
    }

}