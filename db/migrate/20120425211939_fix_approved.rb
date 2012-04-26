class FixApproved < ActiveRecord::Migration
  def up
    remove_column :guides, :type
    add_column :guides, :guide_type, :string
  end

  def down
  end
end
