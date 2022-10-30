import { randomIntFromInterval, slugify } from "./helperFunctions";
import { supabase } from "./supabaseClient";
export async function createBrand(name, uniqueId, callback) {
  const { data, error } = await supabase
    .from("brands")
    .insert([
      {
        name: name,
        slug: slugify(name + "-" + Math.random().toString(36).slice(6)),
      },
    ])
    .select();
  if (error) {
    return callback(error);
  } else {
    createBrandUser(data[0].id, uniqueId, function (response) {
      return callback(response);
    });
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
  const { data, error } = await supabase.from("locations").insert([
    {
      name: name,
      brand_id: brand_id,
      city: "Nagpur",
      country: "IND",
      state: "MH",
    },
  ]);
  if (error) {
    return callback(error);
  } else {
    return callback(true);
  }
}

export async function updateSlug(uniqueId, brand_id, slug, callback) {
  // check for user admin
  const { data, error } = await supabase
    .from("brands")
    .update({ slug: slugify(slug) })
    .eq("id", brand_id);
  if (error) {
    return callback(error);
  } else return callback(true);
}
