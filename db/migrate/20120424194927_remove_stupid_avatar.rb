class RemoveStupidAvatar < ActiveRecord::Migration
  def up
    remove_column :users, :avatar
  end

  def down
  end
end
