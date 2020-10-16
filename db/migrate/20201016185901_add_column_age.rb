class AddColumnAge < ActiveRecord::Migration[6.0]
  def change
    add_column :trainers, :age, :integer, default: 18
  end
end
