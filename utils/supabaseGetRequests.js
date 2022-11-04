import { supabase } from "./supabaseClient";

export async function getAdminBrandData(uniqueId, callback) {
  let { data: brandUsers, error } = await supabase
    .from("brand_users")
    .select(`brands(id,name)`)
    .eq("user_id", uniqueId);
  if (error) {
    return callback(error);
  } else {
    return callback(brandUsers);
  }
}
export async function getBrandDetails(uniqueId, brandId, callback) {
  let { data: brandData, error } = await supabase
    .from("brands")
    .select(`id,name, slug, locations(id, name), brand_users(id, user_id(*))`)
    .eq("id", brandId);
  if (error) {
    return callback(error);
  } else {
    // TODO CHECK IF USER IS ADMIN
    return callback(brandData[0]);
  }
}

export async function getBrandName(brandId, callback) {
  let { data: brandData, error } = await supabase
    .from("brands")
    .select(`id,name`)
    .eq("id", brandId);
  if (error) {
    return callback(error);
  } else {
    return callback(brandData[0]);
  }
}

export async function getBrandLocations(brandId, callback) {
  let { data: locationData, error } = await supabase
    .from("locations")
    .select(`id,name`)
    .eq("brand_id", brandId);
  if (error) {
    return callback(error);
  } else {
    // TODO CHECK IF USER IS ADMIN
    return callback(locationData[0]);
  }
}

export async function getUserProfile(uniqueId, callback) {
  let { data: userData, error } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", uniqueId);
  if (error) {
    return callback(error);
  } else {
    // TODO CHECK IF USER IS ADMIN
    return callback(userData[0]);
  }
}

export async function getLocationName(locationdId, callback) {
  let { data: locationData, error } = await supabase
    .from("locations")
    .select(`id,name, brands(name)`)
    .eq("id", locationdId);
  if (error) {
    return callback(error);
  } else {
    return callback(locationData[0]);
  }
}

export async function getPublicBrandData(slug, callback) {
  let { data: brands, error } = await supabase
    .from("brands")
    .select(`id,name,description,locations(id, name)`)
    .eq("slug", slug);
  if (error) {
    return callback(error);
  } else {
    return callback(brands[0]);
  }
}
