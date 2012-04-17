class AddColumnsToGc < ActiveRecord::Migration
  def change
    add_column :guide_categories, :name,    :string
  end
end
