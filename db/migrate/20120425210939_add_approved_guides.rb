class AddApprovedGuides < ActiveRecord::Migration
  def up
    add_column :guides, :type, :string
  end

  def down
  end
end
