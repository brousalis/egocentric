class Addguides < ActiveRecord::Migration
  def up
    create_table :guides do |t|
      t.string :name
      t.text :body
      t.string :category
      t.references :user
      t.timestamps 
    end
  end

  def down

  end
end
