import { supabase } from "./supabaseClient";

export async function getAdminBrandData(uniqueId, callback) {
  let { data: brand_users, error } = await supabase
    .from("brand_users")
    .select(`brands(id,name)`)
    .eq("user_id", uniqueId);
  if (error) {
    return callback(error);
  } else {
    return callback(brand_users);
  }
}
