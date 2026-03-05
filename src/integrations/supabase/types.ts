export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      difficulty_survey: {
        Row: {
          created_at: string
          difficulty_rating: string
          id: string
          salary_tier: string | null
          score: number | null
          total_questions: number | null
        }
        Insert: {
          created_at?: string
          difficulty_rating: string
          id?: string
          salary_tier?: string | null
          score?: number | null
          total_questions?: number | null
        }
        Update: {
          created_at?: string
          difficulty_rating?: string
          id?: string
          salary_tier?: string | null
          score?: number | null
          total_questions?: number | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          description: string
          feedback_type: string
          id: string
          question_id: number | null
          resolved: boolean
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          feedback_type?: string
          id?: string
          question_id?: number | null
          resolved?: boolean
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          feedback_type?: string
          id?: string
          question_id?: number | null
          resolved?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      question_feedback: {
        Row: {
          category: string | null
          created_at: string
          feedback_type: string
          flagged_for_review: boolean
          id: string
          question_id: number
          session_id: string
          tier: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          feedback_type: string
          flagged_for_review?: boolean
          id?: string
          question_id: number
          session_id: string
          tier?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          feedback_type?: string
          flagged_for_review?: boolean
          id?: string
          question_id?: number
          session_id?: string
          tier?: string | null
        }
        Relationships: []
      }
      question_overrides: {
        Row: {
          active: boolean
          question_id: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          question_id: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          question_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          active: boolean
          category: string
          correctAnswers: Json
          difficulty: number
          explanation: string
          flagCount: number
          hint: string
          id: number
          multipleCorrect: boolean
          options: Json
          question: string
          salaryRange: string
          salaryTier: string
          source: string
          tier: number
        }
        Insert: {
          active?: boolean
          category: string
          correctAnswers: Json
          difficulty?: number
          explanation: string
          flagCount?: number
          hint: string
          id?: number
          multipleCorrect?: boolean
          options: Json
          question: string
          salaryRange: string
          salaryTier: string
          source?: string
          tier?: number
        }
        Update: {
          active?: boolean
          category?: string
          correctAnswers?: Json
          difficulty?: number
          explanation?: string
          flagCount?: number
          hint?: string
          id?: number
          multipleCorrect?: boolean
          options?: Json
          question?: string
          salaryRange?: string
          salaryTier?: string
          source?: string
          tier?: number
        }
        Relationships: []
      }
      quiz_sessions: {
        Row: {
          categories: Json | null
          completed_at: string
          id: string
          score: number
          tier: string | null
          total_questions: number
          user_id: string
        }
        Insert: {
          categories?: Json | null
          completed_at?: string
          id?: string
          score?: number
          tier?: string | null
          total_questions?: number
          user_id: string
        }
        Update: {
          categories?: Json | null
          completed_at?: string
          id?: string
          score?: number
          tier?: string | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          current_streak: number
          display_name: string | null
          email: string | null
          id: string
          last_session_date: string | null
          total_correct: number
          total_questions_answered: number
        }
        Insert: {
          created_at?: string
          current_streak?: number
          display_name?: string | null
          email?: string | null
          id: string
          last_session_date?: string | null
          total_correct?: number
          total_questions_answered?: number
        }
        Update: {
          created_at?: string
          current_streak?: number
          display_name?: string | null
          email?: string | null
          id?: string
          last_session_date?: string | null
          total_correct?: number
          total_questions_answered?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      record_quiz_session: {
        Args: {
          p_categories: Json
          p_score: number
          p_tier: string
          p_total_questions: number
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
