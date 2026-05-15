-- DOUBLEULINK Database Schema

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  
  -- Social links
  instagram_url TEXT,
  twitter_url TEXT,
  pinterest_url TEXT,
  
  -- Theme settings
  theme_id VARCHAR(50) DEFAULT 'chrome',
  
  -- Wallpaper settings
  wallpaper_style VARCHAR(50) DEFAULT 'solid',
  wallpaper_color VARCHAR(50) DEFAULT '#1a1a1a',
  wallpaper_animation VARCHAR(50),
  
  -- Card settings
  card_bg_style VARCHAR(50) DEFAULT 'solid',
  card_bg_color VARCHAR(50) DEFAULT '#242424',
  card_bg_gradient TEXT,
  
  -- Spacing settings
  spacing_mode VARCHAR(20) DEFAULT 'simple',
  spacing_value INTEGER DEFAULT 16,
  spacing_top INTEGER,
  spacing_bottom INTEGER,
  spacing_left INTEGER,
  spacing_right INTEGER,
  
  -- Typography settings
  global_font VARCHAR(100) DEFAULT 'Inter',
  global_color VARCHAR(50) DEFAULT '#ffffff',
  title_size INTEGER DEFAULT 24,
  
  -- Corner radius
  corner_radius INTEGER DEFAULT 16,
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Links table
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50),
  position INTEGER NOT NULL DEFAULT 0,
  
  -- Custom styling (optional, overrides global)
  custom_font VARCHAR(100),
  custom_color VARCHAR(50),
  
  -- Stats
  click_count INTEGER DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shop items table
CREATE TABLE shop_items (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  badge VARCHAR(50),
  url TEXT NOT NULL,
  image_url TEXT,
  bg_color VARCHAR(50),
  fg_color VARCHAR(50),
  position INTEGER NOT NULL DEFAULT 0,
  
  -- Stats
  click_count INTEGER DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Collections table (for future use)
CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table (for tracking clicks)
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  link_id INTEGER REFERENCES links(id) ON DELETE SET NULL,
  shop_item_id INTEGER REFERENCES shop_items(id) ON DELETE SET NULL,
  event_type VARCHAR(50) NOT NULL, -- 'view', 'link_click', 'shop_click'
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_position ON links(position);
CREATE INDEX idx_shop_items_profile_id ON shop_items(profile_id);
CREATE INDEX idx_shop_items_position ON shop_items(position);
CREATE INDEX idx_analytics_profile_id ON analytics(profile_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at BEFORE UPDATE ON links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_items_updated_at BEFORE UPDATE ON shop_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
