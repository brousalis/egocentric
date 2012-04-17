class AddCategory < ActiveRecord::Migration
  def up
    drop_table :guidecategories
  end

  def down
  end
end
