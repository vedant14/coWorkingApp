import { supabase } from "./supabaseClient";
export async function createBrand({ name, uniqueId }) {
  const { data, error } = await supabase
    .from("brands")
    .insert([{ name: name, slug: "vedant" }]);
  console.log(data, error);
}
