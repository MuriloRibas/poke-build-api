class ChangePokemonsDefaultValueToNil < ActiveRecord::Migration[6.0]
  def change
    change_column_default(:teams, :pokemons, nil)
  end
end
