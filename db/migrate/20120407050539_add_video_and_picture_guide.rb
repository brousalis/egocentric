class AddVideoAndPictureGuide < ActiveRecord::Migration
  def up
    add_column :users, :avatar_file_name,    :string
    add_column :users, :avatar_content_type, :string
    add_column :users, :avatar_file_size,    :integer
    add_column :users, :avatar_updated_at,   :datetime

    add_column :guides, :avatar_file_name,    :string
    add_column :guides, :avatar_content_type, :string
    add_column :guides, :avatar_file_size,    :integer
    add_column :guides, :avatar_updated_at,   :datetime

    add_column :guides, :video, :string
end

  def down
  end
end
