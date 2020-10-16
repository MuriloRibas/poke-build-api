class UpdateForeignKey < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :teams, :trainers
    add_foreign_key :teams, :trainers, on_delete: :cascade
  end
end
