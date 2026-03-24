export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          color: string | null
          display_order: number
          is_active: boolean
          coming_soon: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          color?: string | null
          display_order?: number
          is_active?: boolean
          coming_soon?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          color?: string | null
          display_order?: number
          is_active?: boolean
          coming_soon?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          username: string
          first_name: string
          last_name: string
          avatar_url: string | null
          bio: string | null
          email_verified: boolean
          email_verification_code: string | null
          email_verification_expires_at: string | null
          role: "buyer" | "seller" | "admin"
          is_active: boolean
          is_seller_verified: boolean
          store_name: string | null
          store_description: string | null
          store_banner_url: string | null
          seller_tier: "basic" | "verified" | "premium"
          max_active_listings: number
          total_sales: number
          seller_rating: number
          total_reviews: number
          trust_score: number
          verified_id: boolean
          phone_number: string | null
          phone_verified: boolean
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email: string
          username: string
          first_name: string
          last_name: string
          avatar_url?: string | null
          bio?: string | null
          email_verified?: boolean
          email_verification_code?: string | null
          email_verification_expires_at?: string | null
          role?: "buyer" | "seller" | "admin"
          is_active?: boolean
          is_seller_verified?: boolean
          store_name?: string | null
          store_description?: string | null
          store_banner_url?: string | null
          seller_tier?: "basic" | "verified" | "premium"
          max_active_listings?: number
          total_sales?: number
          seller_rating?: number
          total_reviews?: number
          trust_score?: number
          verified_id?: boolean
          phone_number?: string | null
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          username?: string
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          bio?: string | null
          email_verified?: boolean
          email_verification_code?: string | null
          email_verification_expires_at?: string | null
          role?: "buyer" | "seller" | "admin"
          is_active?: boolean
          is_seller_verified?: boolean
          store_name?: string | null
          store_description?: string | null
          store_banner_url?: string | null
          seller_tier?: "basic" | "verified" | "premium"
          max_active_listings?: number
          total_sales?: number
          seller_rating?: number
          total_reviews?: number
          trust_score?: number
          verified_id?: boolean
          phone_number?: string | null
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
      }
    }
  }
}
