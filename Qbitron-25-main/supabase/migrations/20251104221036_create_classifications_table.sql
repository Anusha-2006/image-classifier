/*
  # Create Classifications History Table

  1. New Tables
    - `classifications`
      - `id` (uuid, primary key) - Unique identifier for each classification
      - `image_name` (text) - Original filename of the classified image
      - `top_prediction` (text) - The highest confidence prediction
      - `top_confidence` (numeric) - Confidence score of top prediction (0-1)
      - `all_predictions` (jsonb) - All predictions with their confidence scores
      - `created_at` (timestamptz) - When the classification was performed

  2. Security
    - Enable RLS on `classifications` table
    - Add policy for public read access (since no auth is required for this demo)
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS classifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_name text NOT NULL,
  top_prediction text NOT NULL,
  top_confidence numeric NOT NULL,
  all_predictions jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view classifications"
  ON classifications
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert classifications"
  ON classifications
  FOR INSERT
  TO anon
  WITH CHECK (true);
