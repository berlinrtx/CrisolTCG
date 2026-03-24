import { createClient } from "@/lib/supabase/server"

export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  color: string | null
  display_order: number
  is_active: boolean
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  category_id: string
  name: string
  slug: string
  display_order: number
  is_active: boolean
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  // Fetch categories ordered by display_order
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError)
    return []
  }

  // Fetch all subcategories
  const { data: subcategories, error: subcategoriesError } = await supabase
    .from("subcategories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (subcategoriesError) {
    console.error("Error fetching subcategories:", subcategoriesError)
    return categories || []
  }

  // Group subcategories by category_id
  const categoriesWithSubs = (categories || []).map((category) => ({
    ...category,
    subcategories: (subcategories || []).filter((sub) => sub.category_id === category.id),
  }))

  return categoriesWithSubs
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (categoryError || !category) {
    return null
  }

  // Fetch subcategories for this category
  const { data: subcategories } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  return {
    ...category,
    subcategories: subcategories || [],
  }
}
