class RemoveGcc < ActiveRecord::Migration
  def up
    drop_table :guide_categories
  end

  def down
  end
end
