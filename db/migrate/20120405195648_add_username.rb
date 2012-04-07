class AddUsername < ActiveRecord::Migration
  def up
    add_column :users, :role, :string
    add_column :users, :username, :string
  end

  def down
    remove_column :users, :role
    remove_column :users, :username
  end
end
