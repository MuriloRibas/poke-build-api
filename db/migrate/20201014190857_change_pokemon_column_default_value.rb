class ChangePokemonColumnDefaultValue < ActiveRecord::Migration[6.0]
  def change
    change_column :teams, :pokemons, :text, default: [].to_yaml
  end
end
