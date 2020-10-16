class ChangePokemonsNull < ActiveRecord::Migration[6.0]
  def change
    change_column :teams, :pokemons, :text, null: true
  end
end
