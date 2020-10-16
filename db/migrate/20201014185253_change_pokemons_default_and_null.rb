class ChangePokemonsDefaultAndNull < ActiveRecord::Migration[6.0]
  def change
    change_column :teams, :pokemons, :jsonb, null: false, default: '{}'
  end
end
