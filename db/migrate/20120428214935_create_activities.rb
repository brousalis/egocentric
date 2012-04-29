class CreateActivities < ActiveRecord::Migration
  def self.up
    create_table :activities do |t|
      t.integer :user_id, :null => false
      t.integer :activity_type, :null => false
      t.integer :target_id, :null => false
      t.string  :target_type, :null => false
      t.timestamps
    end

     add_index :activities, [:target_id, :target_type]
     add_index :activities, :user_id

  end

  def self.down
    drop_table :activities
  end
end
