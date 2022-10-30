import { supabase } from "./supabaseClient";

export async function userSignUpEmail(
  firstName,
  lastName,
  email,
  password,
  callback
) {
  let { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  if (error) {
    return callback(error);
  } else {
    getLoggedInUser(function (currentUser) {
      return callback(currentUser);
    });
  }
}

export async function userLoginEmail(userEmail, password, callback) {
  const { error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: password,
  });
  if (error) {
    return callback(error);
  } else {
    return callback(true);
  }
}

export async function getLoggedInUser(callback) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return callback(user);
}
export async function userSignOut(callback) {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return callback(error);
  } else {
    return callback(true);
  }
}
