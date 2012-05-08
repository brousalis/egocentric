class AddMaps < ActiveRecord::Migration
  def up
    add_column :guides, :map, :string
  end

  def down
  end
end
