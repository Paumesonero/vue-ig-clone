import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('')

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {

  }

  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    // we do validations
    if (password.length < 6) {
      console.log('password short')
      return errorMessage.value = 'Password needs to be more than six characters'
    }

    if (username.length < 4) {
      return errorMessage.value = 'Username needs to be more than four characters'
    }

    if (!validateEmail(email)) {
      return errorMessage.value = 'Email Invalid'
    }

    // End Validations

    // Validate if user exists:

    const checkUser = await supabase
      .from("users")
      .select()
      .eq('username', username)
      .single()

    if (checkUser.data) {
      return errorMessage.value = "User already exists"
    }

    errorMessage.value = ''

    // we sign up our user
    const response = await supabase.auth.signUp({
      email,
      password
    })

    if (response.error) {
      return errorMessage.value = response.error.message
    }
    // everytime we want to retrieve data from a table we use the . from(name of the table)
    await supabase.from("users").insert({
      username,
      email
    })

  }
  const handleLogout = () => {

  }
  const getUser = () => {

  }


  return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser }
})
