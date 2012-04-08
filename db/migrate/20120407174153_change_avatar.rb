class ChangeAvatar < ActiveRecord::Migration
  def up
    add_column :guides, :avatar, :string
  end

  def down
  end
end
