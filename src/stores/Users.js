import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('')
  const loading = ref(false)
  const loadingUser = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { password, email } = credentials
    if (!validateEmail(email)) {
      return errorMessage.value = 'Email Invalid'
    }
    if (!password.length) {
      return errorMessage.value = 'Please add a password'
    }
    // now we call supabese so we start by loading
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    const { data: currentUser } = await supabase
      .from("users")
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: currentUser.id,
      email: currentUser.email,
      password: currentUser.password,
      username: currentUser.username

    }
    // here we clear out everything
    loading.value = false
    errorMessage.value = ''

  }
  // ********** START SIGNUP *************
  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;


    // we do validations
    if (password.length < 6) {
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
    loading.value = true

    const checkUser = await supabase
      .from("users")
      .select()
      .eq('username', username)
      .single()

    if (checkUser.data) {
      loading.value = false
      return errorMessage.value = "User already exists"
    }

    errorMessage.value = ''

    // we sign up our user
    const response = await supabase.auth.signUp({
      email,
      password
    })

    if (response.error) {
      loading.value = false
      return errorMessage.value = response.error.message
    }
    // everytime we want to retrieve data from a table we use the . from(name of the table)
    await supabase.from("users").insert({
      username,
      email
    })


    const newUser = await supabase
      .from("users")
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: newUser.data.id,
      email: newUser.data.email,
      username: newUser.data.username
    }
    console.log('this is the user, TESTING', user.value)
    loading.value = false
  }

  //*********** FINISH SIGN UP *************
  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  // ************ GETTING CURRENT USER ******************
  const getUser = async () => {
    loadingUser.value = true
    const response = await supabase.auth.getUser()
    if (!response.data.user) {
      loadingUser.value = false
      return user.value = null
    }

    const userWithEmail = await supabase
      .from("users")
      .select()
      .eq("email", response.data.user.email)
      .single()

    user.value = {
      username: userWithEmail.data.username,
      email: userWithEmail.data.email,
      id: userWithEmail.data.id,

    }
    loadingUser.value = false
  }

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }


  return {
    user,
    errorMessage,
    loading,
    loadingUser,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage
  }
})
