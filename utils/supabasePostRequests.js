import { randomIntFromInterval } from "./helperFunctions";
import { supabase } from "./supabaseClient";
export async function createBrand(name, uniqueId, callback) {
  const { data, error } = await supabase
    .from("brands")
    .insert([{ name: name, slug: `${randomIntFromInterval(1, 100)}VEDANT` }])
    .select();
  if (error) {
    return callback(error);
  } else {
    createBrandUser(
      data[0].id,
      "9030169c-e80c-4e73-9655-9cb14565ac65",
      function (response) {
        return callback(response);
      }
    );
  }
}

async function createBrandUser(brandId, uniqueId, callback) {
  const { data, error } = await supabase
    .from("brand_users")
    .insert([{ brand_id: brandId, user_id: uniqueId, created_by: uniqueId }]);
  if (error) {
    return callback(error);
  } else {
    return callback(true);
  }
}

export async function createLocation(name, uniqueId, brand_id, callback) {
  const { data, error } = await supabase
    .from("locations")
    .insert([{ name: name, city: "Nagpur", country: "IND", state: "MH" }]);
  if (error) {
    return callback(error);
  } else {
    return callback(true);
  }
}
